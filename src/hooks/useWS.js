import { useCurrentAccount } from "@mysten/dapp-kit";

import { SOCKET_URL } from '../consts/index.js'
import { useGameState } from '../storage/game-state.js'

const socket = new WebSocket(`ws://${SOCKET_URL}`);

// const socket = new WebSocket('ws://localhost:8080');
export const useWS = (matchId = null) => {
  const account = useCurrentAccount();
  const address = account?.address;
  const character = useGameState((s) => s.character);
  const joinedMatch = useGameState((s) => s.joinedMatch);

  const sendToSocket = (data) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    const id = matchId ?? joinedMatch ?? null;
    socket.send(JSON.stringify({ address, matchId: id, character, ...data }));
  };

  return { socket, sendToSocket };
};
