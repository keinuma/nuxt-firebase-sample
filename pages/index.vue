<template>
  <h1>
    Hello World! {{ count }}
  </h1>
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
