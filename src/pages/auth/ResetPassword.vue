<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h6 text-center"> Nova Senha </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">

        <q-input
          label="Nova Senha"
          v-model="password"
          type="password"
          outlined
          rounded
          dense
          lazy-rules
          :rules="[val => (val && val.length >= 6) || 'Por favor, digite uma senha com no mínimo 6 dígitos']"
        />

        <div class="q-pt-md q-gutter-y-sm">
          <q-btn
            class="full-width"
            label="salvar nova senha"
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
import { useRouter, useRoute } from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageResetPassword',

  setup () {
    const { resertPassword } = useAuthUser()
    const router = useRouter()
    const route = useRoute()
    const token = route.query.token
    const { notifySuccess, notifyError } = useNotify()

    const password = ref('')

    const handlePasswordReset = async () => {
      try {
        await resertPassword(token, password.value)
        notifySuccess('Nova senha salva com sucesso!')
        router.push({ name: 'login' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      password,
      handlePasswordReset
    }
  }
})
</script>
