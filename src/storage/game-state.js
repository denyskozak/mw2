import { create } from 'zustand'

export const useGameState = create((set) => ({
  skin: 'brand',
  chatMessages: [],
  character: {
    class: 'mage',
  },
  scoreboardData: [],
  scoreboardVisible: false,
  statsVisible: false,
  menuVisible: false,
  joinedMatch: null,
  buffs: [],
  debuffs: [],
  players: [],
  setStatsVisible: (visible) => set({ statsVisible: visible }),
  setMenuVisible: (visible) => set({ menuVisible: visible }),
  addChatMessage: (text) => set((state) => ({
    chatMessages: [...state.chatMessages, { text, id: Date.now() }],
  })),
  setCharacter: (character) => set({ character }),
  setBuffs: (buffs) => set({ buffs }),
  setDebuffs: (debuffs) => set({ debuffs }),
  setScoreboardData: (data) => set({ scoreboardData: data }),
  setScoreboardVisible: (visible) => set({ scoreboardVisible: visible }),
}))
