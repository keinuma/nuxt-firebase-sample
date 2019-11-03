<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            記事一覧
          </h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container container-layout">
        <div
          v-for="article in state.articles"
          :key="article.createdAt"
          class="card card-width"
        >
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">
                  {{ article.author.name }}
                </p>
                <p class="subtitle is-6">
                  {{ article.author.account }}
                </p>
              </div>
            </div>

            <div class="content">
              {{ article.content }}
            </div>
            <footer class="card-footer">
              <div class="card-footer-item card-footer-layout">
                <time datetime="2016-1-1">
                  投稿日: {{ article.createdAt | formatDate }}
                </time>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { onMounted, createComponent, reactive } from '@vue/composition-api'
import firebase from '@/plugins/firebase'
import { Article } from '~/types/article'

interface State {
  articles: Article[];
}

export default createComponent({
  layout: 'default',
  setup () {
    const state = reactive<State>({
      articles: []
    })
    onMounted(async () => {
      const db = firebase.firestore()
      const querySnapshot = await db.collection('articles').get()
      querySnapshot.docs.forEach((doc) => {
        const data = doc.data()
        state.articles.push((data as Article))
      })
    })
    return {
      state
    }
  }
})
</script>

<style lang="scss" scoped>
.container-layout {
  display: flex;
  justify-content: center;
}
.card-width {
  width: 80%;
}
.card-footer-layout {
  justify-content: flex-end;
  padding-bottom: 0;
}
</style>
