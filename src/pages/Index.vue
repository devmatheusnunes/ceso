<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h6 text-center"> Login </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">

        <q-input
          label="EMail"
          v-model="form.email"
          filled
          rounded
        />
        <q-input
         label="Password"
         v-model="form.password"
         filled
         rounded
        />

        <div class="q-pt-md">
          <q-btn
            class="full-width"
            label="entrar"
            color="positive"
            rounded
            type="submit"
          />
          <q-btn
            class="full-width"
            label="recuperar senha"
            color="negative"
            flat
            :to="{ name:'forgot-password'}"
          />
        </div>
        <div class="q-pt-md">
          <q-btn
            class="full-width"
            label="criar nova conta"
            color="primary"
            rounded
            :to="{ name:'register' }"
          />
        </div>

      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageLogin',

  setup () {
    const router = useRouter()

    const { login } = useAuthUser()

    const form = ref({
      email: '',
      password: ''
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        router.push({ name: 'me' })
      } catch (error) {
        alert(error.message)
      }
    }

    return {
      form,
      handleLogin
    }
  }
})
</script>
