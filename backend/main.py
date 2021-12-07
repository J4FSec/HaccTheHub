import yaml
import docker
from flask import Flask
from flask_restx import Resource, Api
from docker.errors import APIError
from docker.client import DockerClient

app = Flask(__name__)
api = Api(app)


def check_network_running():
    client = docker.from_env()
    networks = client.networks.list()
    network_names = [net.name for net in networks]
    return "haccthehub" in network_names


def load_hth_index_file():
    with open("index.yml", "r") as f:
        return yaml.safe_load(f)


def hth_boxes_images():
    hth_if = load_hth_index_file()
    names = [f"{box['image']}:{box['tag']}" for box in hth_if['boxes']]

    return names


def get_hth_image_by_name(name: str):
    hth_if = load_hth_index_file()
    for box in hth_if['boxes']:
        if box['name'] == name:
            return box['image']
    return None


def get_hth_network_by_name(name: str):
    hth_if = load_hth_index_file()
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


def get_hth_container_by_name(name: str):
    client = docker.from_env()
    containers = client.containers.list()
    for con in containers:
        if con.name == name:
            return con
    return None


@api.route('/health_check')
class HealthCheck(Resource):
    def get(self):
        return "OK"


@api.route("/images")
class Images(Resource):
    def get(self):
        client = docker.from_env()
        images = client.images.list()
        return [img.tags[0] for img in images if img.tags[0] in hth_boxes_images()]


@api.route("/images/pull/<string:name>")
class PullImage(Resource):
    def post(self, name):
        client = docker.from_env()
        image = get_hth_image_by_name(name)
        client.images.pull(image)
        return "success"


@api.route("/network")
class Networks(Resource):
    def get(self):
        client = docker.from_env()
        if not check_network_running():
            client.networks.create("haccthehub", "bridge")
            return "started network"
        else:
            return "network already started"

    def delete(self):
        client = docker.from_env()
        if check_network_running():
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
        image = get_hth_image_by_name(name)
        try:
            client.containers.run(
                image, network="haccthehub", ports=get_hth_network_by_name(name), detach=True, name=name)
            return "success"
        except APIError:
            return "container already started"

    def delete(self, name):
        container = get_hth_container_by_name(name)
        if container == None:
            return "container already stopped"
        else:
            container.stop()


if __name__ == '__main__':
    app.run(port=8000, debug=True)
