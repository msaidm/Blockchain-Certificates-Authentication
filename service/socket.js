import io from "socket.io-client";
import { IP_address } from '../constants'

export const socket = io(IP_address);
