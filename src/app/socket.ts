import { io } from "socket.io-client";

export const socket = io("http://localhost:8081");

export const emitInitializeInput = () => {
	console.log("Emit");
	socket.emit("message", { data: `Úser Is Join` });
};

const Connect = () => {
	console.log("connect");
};

export const Connected = () => {
	socket.on("connect", Connect);
};
