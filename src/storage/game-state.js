
import { create } from 'zustand'

export const useGameState = create((set) => ({
  skin: 'brand',
  chatMessages: [],
  character: null,
  scoreboardData: [],
  scoreboardVisible: false,
  statsVisible: false,
  menuVisible: false,
  joinedMatch: null,
  buffs: [],
  debuffs: [],
  players: [],
}))