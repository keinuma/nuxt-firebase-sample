import { toRefs, reactive } from '@vue/composition-api'
import { User, FirebaseError } from 'firebase'
import firebase from '@/plugins/firebase'

type State = {
  user: null | User
  error: null | FirebaseError
  loading: boolean
}

export default () => {
  const state = reactive<State>({
    user: null,
    error: null,
    loading: true
  })

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      state.user = user
    } else {
      state.user = null
    }
    state.loading = false
  })
  return {
    ...toRefs(state)
  }
}
