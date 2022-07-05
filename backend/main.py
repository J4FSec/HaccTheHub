import yaml
import docker
from flask import Flask
from flask_cors import CORS
from flask_restx import Resource, Api
from docker.errors import APIError


app = Flask(__name__)
api = Api(app)
CORS(app)


def is_network_running():
    "Returns a boolean whether or not the 'haccthehub' network is started in Docker"
    client = docker.from_env()
    networks = client.networks.list()
    network_names = [net.name for net in networks]

    return "haccthehub" in network_names


def hth_index():
    "Returns the parsed HaccTheHub Index file"
    with open("index.yml", "r") as f:
        return yaml.safe_load(f)


def tags_in_index():
    "Returns a list of images with the included from the HTH Index file"
    hth_if = hth_index()
    tags = [f"{box['image']}:{box['tag']}" for box in hth_if['boxes']]

    return tags


def aliases_in_index():
    "Returns a list of image name WITHOUT tag from the HTH Index file"
    hth_if = hth_index()
    names = [box['name'] for box in hth_if['boxes']]

    return names


def alias_to_image_name(name: str):
    "Returns the image name from the alias in the HTH Index file"
    hth_if = hth_index()
    for box in hth_if['boxes']:
        if box['name'] == name:
            return box['image']

    return None

def alias_to_display_name(name: str):
    hth_if = hth_index()
    for box in hth_if['boxes']:
        if box['name'] == name:
            return box['displayname']


def alias_to_tags(name: str):
    "Returns the image name WITH tags from the alias in the HTH Index file"
    hth_if = hth_index()
    for box in hth_if['boxes']:
        if box['name'] == name:
            return f"{box['image']}:{box['tag']}"

    return None


def name_to_networking_config(name: str):
    "Returns the port forwarding config from the alias in the HTH Index file"
    hth_if = hth_index()
    ports = {}
    for box in hth_if['boxes']:
        if box['name'] == name:
            try:
                for port in box['ports']:
                    ports[f"{port['src']}/{port['prot']}"] = (
                        "0.0.0.0", port['host'])
                return ports
            except KeyError:
                return None


def running_containers_name():
    "Returns a list of name from running containers"
    client = docker.from_env()
    containers = client.containers.list()

    return [con.name for con in containers]


def name_to_container(name: str):
    client = docker.from_env()
    containers = client.containers.list()
    for c in containers:
        if c.name == name:
            return c

    return None


def pulled_images_with_tag():
    "Returns a list of docker images which both exists on the system and the HTH Index file"
    client = docker.from_env()
    images = client.images.list()
    return [img.tags[0] for img in images if len(img.tags) >0 if img.tags[0] in tags_in_index()]


@api.route('/health_check')
class HealthCheck(Resource):
    def get(self):
        return "OK"


@api.route("/images")
class Images(Resource):
    def get(self):
        return pulled_images_with_tag()


@api.route("/images/pull/<string:name>")
class PullImage(Resource):
    def post(self, name):
        client = docker.from_env()
        image = alias_to_image_name(name)
        client.images.pull(image)
        return "success"


@api.route("/network")
class Networks(Resource):
    def get(self):
        return is_network_running()

    def post(self):
        client = docker.from_env()
        if not is_network_running():
            client.networks.create("haccthehub", "bridge")
            return "started network"
        else:
            return "network already started"

    def delete(self):
        client = docker.from_env()
        if is_network_running():
            networks = client.networks.list()
            hth_net = [net for net in networks if net.name == "haccthehub"]
            hth_net[0].remove()
            return "stopped network"
        else:
            return "network not started"


@api.route("/container/<string:name>")
class Container(Resource):
    def get(self, name):
        client = docker.from_env()
        image = alias_to_image_name(name)
        try:
            client.containers.run(
                image, network="haccthehub", ports=name_to_networking_config(name), detach=True, name=name)
            return "success"
        except APIError:
            return "container already started"

    def delete(self, name):
        container = name_to_container(name)
        if container == None:
            return "container already stopped"
        else:
            container.remove(force=True)
            return "success"


@api.route("/boxes/status")
class Box(Resource):
    def get(self):
        "Check for all aliases in HTH Index file and match them against Docker images and containers on the system"
        names = aliases_in_index()
        response = []
        for n in names:
            box = {}
            box['name'] = n
            if n in running_containers_name():
                box['status'] = "running"
            elif alias_to_tags(n) in pulled_images_with_tag():
                box['status'] = "pulled"
            else:
                box['status'] = "not pulled"
            box['display_name'] = alias_to_display_name(n)
            response.append(box)

        return response


@api.route("/lessons")
class Lessons(Resource):
    def get(self):
        hth_if = hth_index()
        return [l for l in hth_if['lessons']]

@api.route("/lesson/<string:name>")
class Lesson(Resource):
    def get(self, name):
        with open(f"./lessons/{name}.md") as f:
            content = f.read()
        return content

if __name__ == '__main__':
    app.run(port=8000, debug=True)
