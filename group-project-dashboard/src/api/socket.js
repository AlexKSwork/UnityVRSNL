const openSocket = require("socket.io-client");
const socket = openSocket("http://localhost:3001");

function login(username, password) {
    socket.emit("login_details", [username, password]);
}

function loginSuccess(cb) {
    socket.on("login_success", (data) => {
        if (data === true)
            cb(null, true)
        else
            cb(null, false)
    })
}

function loggedIn() {
    socket.emit("clientType", "web");
}

function newPlayers(cb) {
    socket.on("gameDisconnect", (data) => {
        if (data !== "unknownName")
            cb(null, data);
    });
}

function playerDisconnect(cb) {
    socket.on("gameDisconnect", (data) => {
        cb(null, data)
    })
}

function requestDetails() {
    socket.emit("getDetails", true)
}

function recieveDetails(cb) {
    socket.on("details", (details) => {
        cb(null, details)
    })
}

function saveDetails(details) {
    socket.emit("save", details);
}


export {saveDetails, requestDetails, recieveDetails, login, loginSuccess, loggedIn, newPlayers, playerDisconnect}