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
        <p v-if="state.message" class="has-text-info mb-spacer-m">
          {{ state.message }}
        </p>
        <div class="field">
          <label class="label">
            メールアドレス
          </label>
          <div class="control">
            <input :value="email" type="email" class="input" disabled>
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
import { computed, createComponent, reactive, watch } from '@vue/composition-api'
import { FirebaseError } from 'firebase'
import { Author } from '@/types/article'
import firebase from '@/plugins/firebase'
import useUserState from '@/services/use-user-state'

interface State {
  author: Author
  message: string
  error: FirebaseError
}

export default createComponent({
  layout: 'default',
  setup (_, context) {
    const { user, author, error, setAuthor } = useUserState()
    const state = reactive<State>({
      author: { id: '', name: '', account: '', image: '' },
      message: '',
      error: {
        code: '',
        message: '',
        name: ''
      }
    })
    watch(() => error.value, () => {
      if (error.value !== null && 'code' in error.value) {
        context.root.$router.push('/')
      }
    })
    watch(() => author.value, () => {
      if (author.value !== null && 'id' in author.value) {
        state.author = author.value
      }
    })
    const email = computed(() => {
      if (user.value === null) { return '' }
      return user.value.email
    })
    const onSaveAuthor = async () => {
      state.message = ''
      const db = firebase.firestore()
      if (user.value === null) { return }
      if (author.value === null) {
        // 初回登録処理
        await db.collection('authors').doc(user.value.uid).set({
          ...state.author,
          id: user.value.uid
        }).catch((err: FirebaseError) => {
          state.error = err
        })
        if (state.error.code === '') {
          setAuthor(state.author)
          state.message = '更新が完了しました'
        }
      } else {
        await db.collection('authors').doc(author.value.id).update({
          ...state.author
        }).catch((err: FirebaseError) => {
          state.error = err
        })
        if (state.error.code === '') {
          setAuthor(state.author)
          state.message = '更新が完了しました'
        }
      }
    }
    return {
      state,
      user,
      email,
      onSaveAuthor
    }
  }
})
</script>
