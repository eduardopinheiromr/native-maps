import { LocationObject } from "expo-location";
import io, { Socket } from "socket.io-client";

export const socket: Socket = io("http://192.168.0.189:3001", {
  autoConnect: false,
  transports: ["websocket"],
});

export const disconnect = (): void => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export const connect = (): void => {
  disconnect();

  socket.connect();
};

export const updateSocketLocation = (location: LocationObject) => {
  const { latitude, longitude } = location?.coords;

  const payload = {
    coordinates: { latitude, longitude },
  };

  socket.emit("update_user_location", payload);
};
