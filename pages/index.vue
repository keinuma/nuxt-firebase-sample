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
      <div class="container">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">
                  John Smith
                </p>
                <p class="subtitle is-6">
                  @johnsmith
                </p>
              </div>
            </div>

            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br>
              <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </div>
        </div>
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
