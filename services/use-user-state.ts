import { reactive, toRefs, watch } from '@vue/composition-api'
import { FirebaseError } from 'firebase'
import firebase from '@/plugins/firebase'
import useAuth from '@/services/use-auth'
import { Author } from '@/types/article'

type State = {
  user: firebase.User | null
  author: Author | null
  error: FirebaseError | null
}

export default () => {
  const { user, loading, error } = useAuth()
  const state = reactive<State>({
    user: user.value,
    author: null,
    error: null
  })

  watch(() => loading.value, async () => {
    // 認証取得処理が終了したらユーザー情報を取得
    if (loading.value) { return }
    if (user.value === null || error.value !== null) {
      state.error = error.value
      return
    }
    state.user = user.value
    const db = firebase.firestore()
    const result = await db.collection('authors')
      .doc(user.value.uid)
      .get()
      .catch((err: FirebaseError) => {
        return err
      })
    if ('code' in result || !result.exists) { return result }
    state.author = (result.data() as Author)
  })

  const setAuthor = (author: Author) => {
    state.author = author
  }

  return {
    setAuthor,
    ...toRefs(state)
  }
}
