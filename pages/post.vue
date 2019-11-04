<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            記事投稿
          </h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <p v-if="state.error.code" class="has-text-danger">
          {{ state.error.message }}
        </p>
        <p v-if="state.message" class="has-text-info">
          {{ state.message }}
        </p>
        <div class="field">
          <label class="label">
            本文
          </label>
          <div class="control">
            <textarea v-model="state.article.content" class="textarea" rows="10">
              ブログ本文
            </textarea>
          </div>
        </div>
        <div class="field">
          <div class="text-center mt-spacer-m">
            <button class="button is-success" @click="onPostArticle">
              投稿
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'
import dayjs from 'dayjs'
import { FirebaseError } from 'firebase'
import firebase from '@/plugins/firebase'
import { Article } from '~/types/article'
import useUserState from '@/services/use-user-state'

interface State {
  article: Article
  message: string
  error: FirebaseError
}

export default createComponent({
  layout: 'default',
  setup () {
    const { author } = useUserState()
    const state = reactive<State>({
      message: '',
      article: {
        content: '',
        createdAt: dayjs().toISOString(),
        author: {
          id: '',
          name: '',
          account: '',
          image: ''
        }
      },
      error: {
        code: '',
        message: '',
        name: ''
      }
    })
    const onPostArticle = async () => {
      const db = firebase.firestore()
      const result = await db.collection('articles').add({
        ...state.article,
        createdAt: dayjs().toISOString(),
        author: author.value || state.article.author
      }).catch((err: FirebaseError) => {
        state.error = err
      })
      if (result !== void 0) {
        state.article.content = ''
        state.message = '記事が保存されました。'
      }
    }
    return {
      state,
      onPostArticle
    }
  }
})
</script>
