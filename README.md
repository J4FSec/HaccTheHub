# HaccTheHub
![](./logo.png)
Open source self-hosted cyber security learning platform

## About The Project
HaccTheHub is an open source project that provides cyber security

The HaccTheHub system consists of 3 main parts:
* Docker: containing all of the boxes creating the environment in which we'll be learning on.
* The backend: controlling Docker and responsible for starting/destroying indivisual box in the system and managing the networking that joins them into a unified system.
* The frontend: GUI for the user to interact with the system via their web browser.
### Built With
* [Flask-RESTX](https://github.com/python-restx/flask-restx)
* [Next.js](https://nextjs.org/)

## Getting Started

To get HaccTheHub up and running, you would need to setup the followings

### Prerequisites

* Docker (refer to [Docker's Documentation](https://docs.docker.com/get-docker/) for setup)
* Python 3 ([Download](https://www.python.org/downloads/)) or just install `python3` from your package manager.
* Node.js 16 ([Download](https://nodejs.org/en/download/)) or use your [package manager](https://nodejs.org/en/download/package-manager/)


### Installation
1. Clone the repo
```sh
git clone https://github.com/J4FSec/HaccTheHub.git
```
2. Install dependencies for the backend
```sh
cd HaccTheHub/backend
python3 -m pip install -r requirements.txt
```
3. And dependencies for the frontend
```sh
cd ../client
npm install
```

## Usage
1. Start up Docker
2. Start the backend
```sh
cd ../backend
python3 main.py
```
3. And the frontend
```
cd ../client
npm start
```

The WebUI should now be accessible via http://localhost:8080.

## Contributing
Any contributions are **much appreciated**. If you have a suggestion, please fork the repo and create a pull request. You can also open an issue with the tag `enhancement`.

1. Fork the project
2. Create a new branch for the new feature (`git checkout -b feature/EpicFeature`)
3. Commit your changes (`git commit -m "Add EpicFeature"`)
4. Push to the branch (`git push origin feature/EpicFeature`)
5. Open a pull request.

## License
Distributed under the GNU Affero General Public License v3.0. See `LICENSE` for more information.

## Authors
* Dong Duong ([@Cu64](https://github.com/Cu64/)) - dongduongdev@gmail.com
* watch-dog-man ([@watch-dog-man](https://github.com/watch-dog-man))

## Contributors
* [@Nehozun](https://github.com/Nehozun) - Completely re-made the frontend. We'd be lost without him.

## Acknowledgement
