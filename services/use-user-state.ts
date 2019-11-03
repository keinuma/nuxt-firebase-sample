import { reactive } from '@vue/composition-api'
import * as firebase from 'firebase'
import { Author } from '~/types/article'

type State = {
  user: firebase.User | null;
  author: Author | null
}

export default () => {
  const userState = reactive<State>({
    user: null,
    author: null
  })

  const setUser = (): boolean => {
    userState.user = firebase.auth().currentUser
    return userState.user !== null
  }

  const setAuthor = (author: Author) => {
    userState.author = author
  }

  return {
    userState,
    setUser,
    setAuthor
  }
}
