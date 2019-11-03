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
        <button class="button is-success" @click="onPostArticle">
          投稿
        </button>
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

interface State {
  article: Article;
  error: FirebaseError
}

export default createComponent({
  layout: 'default',
  setup () {
    const state = reactive<State>({
      article: {
        content: 'テスト',
        createdAt: dayjs().toISOString(),
        author: {
          id: '',
          name: 'ぬま',
          account: 'keinuma',
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
      await db.collection('articles').add({
        ...state.article
      }).catch((err: FirebaseError) => {
        state.error = err
      })
    }
    return {
      state,
      onPostArticle
    }
  }
})
</script>
