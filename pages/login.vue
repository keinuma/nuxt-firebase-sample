<template>
  <div>
    <section class="section is-medium">
      <div class="container">
        <h1 class="title">
          ログイン
        </h1>
        <div class="content">
          <p v-if="state.error.code" class="has-text-danger">
            {{ state.error.message }}
          </p>
        </div>
        <div class="field">
          <label class="label">
            メールアドレス
          </label>
          <div class="control">
            <input v-model="state.email" type="email" class="input" placeholder="blog@example.com">
          </div>
        </div>
        <div class="field">
          <label class="label">
            パスワード
          </label>
          <div class="control">
            <input v-model="state.password" type="password" class="input" placeholder="●●●●●●●●●●●●">
          </div>
        </div>
        <div class="field is-medium mt-spacer-m">
          <div class="text-center">
            <button class="button is-link" @click="onClickLogin">
              ログイン
            </button>
          </div>
        </div>
        <div class="field mt-5">
          <div class="text-center">
            <nuxt-link to="/register">
              <button class="button is-link is-outlined">
                新規登録の場合はこちら
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { createComponent, reactive } from '@vue/composition-api'
import firebase from '@/plugins/firebase'

export default createComponent({
  layout: 'auth',
  setup (_, context) {
    const state = reactive({
      email: '',
      password: '',
      error: {
        code: '',
        message: ''
      }
    })
    const onClickLogin = async () => {
      const result = await firebase.auth().signInWithEmailAndPassword(state.email, state.password).catch((err) => {
        state.error.code = err.code
        state.error.message = err.message
      })
      if (result !== void 0) {
        context.root.$router.push('/')
      }
    }
    return {
      state,
      onClickLogin
    }
  }
})
</script>
