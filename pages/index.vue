<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Hello World! {{ count }}s
          </h1>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Data {
  count: number;
}

export default Vue.extend({
  data () : Data {
    return {
      count: 1
    }
  }
})
</script>
