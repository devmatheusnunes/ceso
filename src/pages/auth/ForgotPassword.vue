<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
      <p class="col-12 text-h6 text-center"> Recuperar Senha </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">

        <q-input
          label="EMail"
          v-model="email"
          type="email"
          outlined
          rounded
          dense
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Por favor, insira seu e-mail' ]"
        />

        <div class="q-pt-md q-gutter-y-sm">
          <q-btn
            class="full-width"
            label="recuperar senha"
            color="positive"
            rounded
            type="submit"
          />

          <q-btn
            class="full-width"
            label="voltar"
            color="negative"
            flat
            @click="$router.replace('login')"
          />
        </div>

      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageForgotPassword',

  setup () {
    const { sendPasswordRestEmail } = useAuthUser()
    const { notifySuccess, notifyError } = useNotify()

    const email = ref('')

    const handleForgotPassword = async () => {
      try {
        await sendPasswordRestEmail(email.value)
        notifySuccess(`Email enviado para resetar sua senha foi: ${email.value}`)
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      email,
      handleForgotPassword
    }
  }
})
</script>
