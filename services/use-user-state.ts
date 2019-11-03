import { computed, reactive } from '@vue/composition-api'
import firebase from '@/plugins/firebase'
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

  const initialize = async (state: any): Promise<boolean> => {
    userState.user = firebase.auth().currentUser
    if (userState.user === null) {
      return false
    }
    const db = firebase.firestore()
    const snapshot = await db.collection('authors')
      .where('id', '==', userState.user.uid)
      .get()
      .catch(() => {
        return false
      })
    if (typeof snapshot === 'boolean') { return false }
    snapshot.forEach((doc) => {
      state.author = userState.author = (doc.data() as Author)
    })
    return true
  }

  const setAuthor = (author: Author) => {
    userState.author = author
  }

  const userId = computed(() => {
    if (userState.user === null) { return '' }
    return userState.user.uid
  })

  const email = computed(() => {
    if (userState.user === null) { return '' }
    return userState.user.email
  })

  return {
    userId,
    email,
    get author () {
      return userState.author
    },
    initialize,
    setAuthor
  }
}
