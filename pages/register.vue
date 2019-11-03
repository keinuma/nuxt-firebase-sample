<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">
          会員登録
        </h1>
        <div class="content">
          <p v-if="state.error.code" class="has-text-danger">
            {{ state.error.message }}
          </p>
          <p v-if="state.completeMessage" class="has-text-info">
            {{ state.completeMessage }}
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
            <button class="button is-link" @click="onClickRegister">
              登録
            </button>
          </div>
        </div>
        <div class="field">
          <div class="text-center">
            <nuxt-link to="/login">
              <button class="button is-link is-outlined">
                アカウントをお持ちの方はこちら
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
  setup () {
    const state = reactive({
      email: '',
      password: '',
      completeMessage: '',
      error: {
        code: '',
        message: ''
      }
    })
    const onClickRegister = async () => {
      await firebase.auth().createUserWithEmailAndPassword(state.email, state.password).catch((err) => {
        state.error.code = err.code
        state.error.message = err.message
      })
      if (state.error.code === '') {
        state.completeMessage = '登録が完了しました。メールをご確認ください。'
      }
    }
    return {
      state,
      onClickRegister
    }
  }
})
</script>
