import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { User } from 'firebase'
import { Author } from '@/types/article'

type State = {
  user: User | null;
  author: Author | null
}

export const state = (): State => ({
  user: null,
  author: null
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  SET_USER: (state, newUser: User) => (state.user = newUser),
  SET_AUTHOR: (state, newAuthor: Author) => (state.author = newAuthor)
}

export const actions: ActionTree<RootState, RootState> = {
  setUser ({ commit }, user: User) {
    commit('SET_USER', user)
  },
  setAuthor ({ commit }, author: Author) {
    commit('SET_AUTHOR', author)
  }
}
