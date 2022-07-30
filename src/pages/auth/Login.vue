<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h6 text-center">Conecte-se</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">

        <q-input
          label="EMail"
          v-model="form.email"
          type="email"
          outlined
          rounded
          dense
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Por favor, insira seu email']"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>

        <q-input
          label="Senha"
          v-model="form.password"
          type="password"
          outlined
          rounded
          dense
          lazy-rules
          :rules="[val => (val && val.length >= 6) || 'Por favor, insira sua senha']"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>

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
            color="black"
            flat
            :to="{ name:'forgot-password'}"
          />
        </div>
        <div class="q-pt-md">
          <q-btn
            class="full-width"
            label="criar nova conta"
            color="blue-6"
            rounded
            :to="{ name:'register' }"
          />
        </div>

      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageLogin',

  setup () {
    const router = useRouter()
    const { login, isLoggedIn } = useAuthUser()
    const { notifySuccess, notifyError } = useNotify()

    const form = ref({
      email: '',
      password: ''
    })

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'home' })
      }
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        notifySuccess('Bem-vindo!!')
        router.push({ name: 'home' })
      } catch (error) {
        notifyError('Email ou senha inválida')
      }
    }

    return {
      form,
      handleLogin
    }
  }
})
</script>
