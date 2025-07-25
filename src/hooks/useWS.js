import { useCurrentAccount } from "@mysten/dapp-kit";

import { SOCKET_URL } from '../consts/index.js'
import { useGameState } from '../storage/game-state.js'

const socket = new WebSocket(`ws://${SOCKET_URL}`);

// const socket = new WebSocket('ws://localhost:8080');
export const useWS = (matchId = null) => {
  const account = useCurrentAccount();
  const address = account?.address;
  const character = useGameState(s => s.character);

  const sendToSocket = (data) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    socket.send(JSON.stringify({ address, matchId, character, ...data }));
  };

  return { socket, sendToSocket };
};
