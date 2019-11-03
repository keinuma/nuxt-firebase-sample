<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            設定
          </h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <p v-if="state.error.code" class="has-text-danger">
          {{ state.error.message }}
        </p>
        <div class="field">
          <label class="label">
            メールアドレス
          </label>
          <div class="control">
            <input v-model="email" type="email" class="input" disabled>
          </div>
        </div>
        <div class="field">
          <label class="label">
            名前
          </label>
          <div class="control">
            <input v-model="state.author.name" type="email" class="input">
          </div>
        </div>
        <div class="field">
          <label class="label">
            アカウント名
          </label>
          <div class="control">
            <input v-model="state.author.account" type="email" class="input">
          </div>
        </div>
        <div class="field">
          <div class="text-center">
            <button class="button is-success" @click="onSaveAuthor">
              更新
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { createComponent, onMounted, reactive } from '@vue/composition-api'
import { FirebaseError } from 'firebase'
import { Author } from '@/types/article'
import firebase from '@/plugins/firebase'
import useUserState from '@/services/use-user-state'

interface State {
  author: Author
  error: FirebaseError
}

export default createComponent({
  layout: 'default',
  setup (_, context) {
    const { userId, email, author, initialize, setAuthor } = useUserState()
    const state = reactive<State>({
      author: { id: '', name: '', account: '', image: '' },
      error: {
        code: '',
        message: '',
        name: ''
      }
    })
    onMounted(() => {
      if (!initialize(state)) {
        context.root.$router.push('/')
      }
    })
    const onSaveAuthor = async () => {
      const db = firebase.firestore()
      if (author === null) {
        await db.collection('authors').add({
          ...state.author,
          id: userId.value
        }).catch((err: FirebaseError) => {
          state.error = err
        })
        if (state.error === null) {
          setAuthor(state.author)
        }
      } else {}
    }
    return {
      state,
      email,
      onSaveAuthor
    }
  }
})
</script>
