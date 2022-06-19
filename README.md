# Webcam Chat Room

> **Application Description**
>
> A simple WebRTC React App built on Node.js+Express Server that facilitates pairing two clients through the assigned ID.
>
> Once the clients are paired, and a video and audio connection is established, the users start a video call.

:seedling: This code is meant as a practice code for learning WebRTC, Sockets, React and Material UI, as such there is not guarantee it will be fully functional, an example of good practices or up to date and maintained.

To learn more about how the different application components work, check the [Wiki](https://github.com/koscakluka-web-practice/webcam-chat-room/wiki).

## How To...

### Host the Application

If you want to host your own server, inside the `server` directory, run

```
npm run start-server
```

This will start a server on port 5000 (or the port specified by PORT environmental variable).

---

If you want to host your own client, first you will have to build the client application. Inside `client` directory run

```
npm run build
npm run start-server
```

This will start a client server on port 5000. Use `npm run start-server -- -l 8080` to start the client server on port 8080 (or replace 8080 with your preferred port).

### Use the Application

Consult the [Wiki](https://github.com/koscakluka-web-practice/webcam-chat-room/wiki) to learn how to use the application.

## Libraries Used

For specific ways how (and why) these libraries were used check the [Wiki](https://github.com/koscakluka-web-practice/webcam-chat-room/wiki).

### Server

- [cors](https://github.com/expressjs/cors) (2.8.5),
- [express](https://expressjs.com) (4.18.1)
- [socket.io](https://socket.io) (4.5.1)

### Client

- [create-react-app](https://create-react-app.dev) (5.0.1)
- [react](https://reactjs.org) (18.2.0)
- [react-dom](https://reactjs.org/docs/react-dom.html) (18.2.0)
- [Material UI](https://mui.com) (5.8.4)
- [socket.io-client](https://socket.io/docs/v3/client-installation/) (4.5.1)
- [socket.io-client](https://socket.io/docs/v3/client-installation/) (4.5.1)
- [simple-peer]() (9.11.1)
- [react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard) (5.1.0)

## Attribution

- [Tutorial](https://youtu.be/oxFr7we3LC8) on which the repo is based
- [Icon](https://www.flaticon.com/free-icons/photograph) used as favicon
