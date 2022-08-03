<template>
  <q-page class="flex flex-center">
    <q-form @submit.prevent="handleLogin">
      <q-card style="max-width: 350px;" bordered>
        <p class="text-h4 text-center q-mt-md">Conecte-se</p>

        <q-card-sections>
          <q-input
            class="q-mx-md q-mb-sm"
            outlined
            rounded
            placeholder="E-mail"
            dense
            v-model="form.email"
            type="email"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Por favor, digite seu e-email']"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>

          <q-input
            class="q-mx-md q-mb-lg"
            outlined
            rounded
            placeholder="Senha"
            dense
            v-model="form.password"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[val => (val && val.length >= 6) || 'Por favor, digite sua senha']"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-card-sections>

        <q-card-sections class="flex flex-center">
          <q-btn
            class="q-btn q-mx-md"
            rounded
            dense
            color="primary"
            label="Entrar"
            type="submit"
            style="width: 20vw;"
          />
          <q-btn
            class="q-btn q-mx-md q-my-sm"
            color="white"
            flat
            rounded
            dense
            text-color="black"
            label="Esqueci a Senha"
            to="forgot-password"
          />
        </q-card-sections>

      </q-card>
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
    const { notifyError, notifySuccess } = useNotify()
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
        notifySuccess('Olá, Bem-vindo')
        router.replace({ name: 'home' })
      } catch (error) {
        notifyError('E-mail ou senha inválidos')
      }
    }
    return {
      form,
      isPwd: ref(true),
      handleLogin
    }
  }
})
</script>

<style scoped>

</style>
