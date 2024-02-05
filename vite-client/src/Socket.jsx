import { io } from "socket.io-client";

const URL = "http://localhost:5173";

export const socket = io(URL);
