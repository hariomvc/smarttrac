import { io } from "socket.io-client";
import { API_BASE_URL } from "../api";
const socket = io.connect(API_BASE_URL);
export default socket;
