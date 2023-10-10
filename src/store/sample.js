/* eslint-disable import/prefer-default-export */
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

const userStore = set => ({
	user: '',
	setUser: userInput => set({ user: userInput }),
});

export const useTesterStore = create(persist(
	process.env.REACT_APP_MODE !== 'production' ? devtools(userStore) : userStore,
    {name: 'user', storage: createJSONStorage(() => localStorage)}
));
