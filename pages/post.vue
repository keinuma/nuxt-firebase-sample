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
        <button class="button is-success">
          投稿
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { Article } from '~/types/article'

interface Data {
  articles: Article[];
}

export default createComponent({
  layout: 'default',
  setup () : Data {
    return {
      articles: []
    }
  }
})
</script>
