<template>
  <div>
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <div class="navbar-item ml-spacer-m">
          <nuxt-link to="/">
            一覧
          </nuxt-link>
        </div>
        <div class="navbar-item">
          <nuxt-link class="navbar-item" to="/post">
            投稿
          </nuxt-link>
        </div>
      </div>
    </nav>
    <nuxt />
  </div>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'

export default createComponent({
  setup () {
    const routing = computed(() => {
      return ['/', '/post']
    })
    return {
      routing
    }
  }
})
</script>
