const http = require("http");
const https = require("https");
const app = require("./app");
const config = require("./config/config");
const fs = require("fs");

//HTTPS options are used to check HTTPS certificates
var https_options = {};

//We added a debug option that enables the devs to run the server in local.
// If we specify "debug" mode, the program will search for the certificates
if (process.argv[2] === "debug") {
    https_options = {
        key: fs.readFileSync("/etc/ssl/HH-v1.key"),
        cert: fs.readFileSync("/etc/ssl/HH.crt"),
    };
}

const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(config.port);
app.set("port", port);

const errorHandler = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind =
        typeof address === "string" ? "pipe " + address : "port: " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges.");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use.");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = https.createServer(https_options, app);
// const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
    const address = server.address();
    const bind =
        typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Listening on " + bind);
});

server.listen(port);
