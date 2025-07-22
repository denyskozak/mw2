
import { create } from 'zustand'

export const useGameState = create((set) => ({
  skin: 'brand',
}))