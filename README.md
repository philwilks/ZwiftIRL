# [ZwiftIRL.com](https://zwiftirl.com)

Upload your real-life photo and add the [Zwift](https://www.zwift.com) user interface over the top!

This is all done in the browser using React and HTML Canvas, without the need for a server to compose
the image. I didn't know this was possible until I started this project, but it turns out Canvas
is pretty powerful and well supported.

The original project was pretty much made in a day. I'm now working on it in the evenings and weekends to add a few more features. If you have an idea and want to contribute, please start by making an issue so we can discuss it.

Hosted with [AWS Amplify](https://aws.amazon.com/amplify/) which is a great way of hosting front-end apps. Styled using [Tailwind CSS](https://tailwindcss.com), which is awesome.

## Reading list

Blog posts and tutorials that were useful in making this...

+ [JS fiddle for downloading HTML canvas as image](https://jsfiddle.net/user2314737/28wqq1gu/)
+ [How to upload image into canvas](https://stackoverflow.com/questions/10906734/how-to-upload-image-into-html5-canvas)
+ [Using custom fonts on the canvas](https://stackoverflow.com/questions/2756575/drawing-text-to-canvas-with-font-face-does-not-work-at-the-first-time)
+ [Preloading images using Promise.all](https://jack72828383883.medium.com/how-to-preload-images-into-cache-in-react-js-ff1642708240)


## Running this project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory just run `npm start` which runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.


## Running this project in a Docker container

First install the Docker daemon (or on a PC/Mac install the [Docker Desktop](https://www.docker.com/products/docker-desktop)).
And make sure Docker is up and running.

### Create a Docker Image form the provided Dockerfile

```sh
$ docker build -t [imagename:version] .
```
+ The `imagename` is the name of the image that will be created, additional you can add a version number after the colon.
+ The dot at the end of the command refers to the Dockerfile in build directory.

```sh
$ docker build -t zwiftirl:2 .
```

### Running the created image

Once the build process has been completed you can start the image.

```sh
$ docker run --name zwiftirl --detach --publish 3000:3000 [imagename:version]
```

With the Docker run command will start a new container based on the image you have created earlier.
+ the container name `--name` can be changed in this example it's `zwiftirl`
+ to start the container in the background use the `--detach` node
+ to expose ports use the `--publish` command, in this example we expose port 3000 from within the container to the outside the container (this can be change, to run multiple instances at the same time)
+ the last part is to fill in the image name that have been created earlier, in this example `zwiftirl:2` and hit enter to start the container

```sh
$ docker run --name zwiftirl --detach --publish 3000:3000 zwiftirl:2
```

To check if everything is running run the `docker ps` command
```sh
docker ps
CONTAINER ID   IMAGE        COMMAND                  CREATED          STATUS          PORTS                                       NAMES
168447cb3a3a   zwiftirl:2   "docker-entrypoint.s…"   42 seconds ago   Up 41 seconds   0.0.0.0:3000->3000/tcp, :::3000->3000/tcp   zwiftirl
```

Note: it could take some time to fully start the container/application, to show the application log use the `docker logs zwiftirl` command.

When the application is started you can browse to [http://localhost:3000](http://localhost:3000).
