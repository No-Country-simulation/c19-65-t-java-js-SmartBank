import { create } from 'zustand'

export const useUserData = create ((set) => ({
  name: '',
  setName: (name) => set({ name })
}))
