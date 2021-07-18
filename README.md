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
$ docker built -t [imagename:version] .
```
+ The "imagename" is the name of the image that will be created, additional you can add a version number after the colon.
+ The dot at the end of the command refers to the Dockerfile in build directory.

```sh
$ docker built -t zwiftirl:2 .
```

### Running the created image

Once the build process has been completed you can start the image.

```sh
$ docker run -d -p:3000:3000 [imagename:version]
```

The Docker run command will start the image in the background (-d) and expose (-p) port 3000 from within the container to the outside world. Next fill in the image name that have been created earlier (zwiftirl:2) and hit enter to start the image.
Once the container have been started (should not take more dan 30 second) you can browse to [http://localhost:3000](http://localhost:3000) to access the application.
