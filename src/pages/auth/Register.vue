<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h6 text-center">Cadastro de Usuário</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">

        <q-input
          label="Nome"
          v-model="form.name"
          outlined
          rounded
          dense
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Por favor, insira seu nome']"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>

        <q-input
          label="EMail"
          v-model="form.email"
          type="email"
          outlined
          rounded
          dense
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Por favor, insira um email']"
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
          :rules="[val => (val && val.length >= 6) || 'Por favor, digite uma senha com no mínimo 6 dígitos']"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>

        <div class="q-pt-md q-gutter-y-sm">
          <q-btn
            class="full-width"
            label="Cadastrar"
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
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageRegister',

  setup () {
    const router = useRouter()
    const { register } = useAuthUser()
    const { notifySuccess, notifyError } = useNotify()

    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    const handleRegister = async () => {
      try {
        await register(form.value)
        notifySuccess('Cadastro efetuado com sucesso')
        router.push({
          name: 'email-confirmation',
          query: { email: form.value.email }
        })
        console.log(register)
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleRegister
    }
  }
})
</script>
