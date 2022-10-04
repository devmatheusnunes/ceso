<template>
  <q-page padding>
    <q-card class="q-mt-md">
      <p class="text-h5 text-bold q-ml-xl q-pt-md">
        Formulário de Empresa
      </p>
      <q-form class="q-gutter-y-sm q-pt-md" @submit.prevent="handleSubmit">
        <div class="q-ml-xl" style="max-width: 50%;">
          <p class="text-bold" style="margin-bottom:0">NOME:</p>
          <q-input
            outlined
            v-model="form.name"
            dense
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />
        </div>

        <div class="q-ml-xl" style="max-width: 50%;">
          <p class="text-bold" style="margin-bottom:0">CNPJ:</p>
          <q-input
            outlined
            v-model="form.cnpj"
            dense
            mask="##.###.###/####-##"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />
        </div>

        <div class="q-ml-xl" style="max-width: 50%;">
          <p class="text-bold" style="margin-bottom:0">Inscrição Estadual:</p>
          <q-input
            outlined
            v-model="form.ie"
            dense
            style="min-width: 40%;"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />
        </div>

        <div class="q-ml-xl" style="max-width: 50%;">
          <p class="text-bold" style="margin-bottom:0">CSC:</p>
          <q-input
            outlined
            v-model="form.csc"
            dense
            style="min-width: 40%;"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />
        </div>

        <div class="q-pa-md" align="right">
          <q-btn
            class="q-mr-sm"
            label="Cancelar"
            color="red"
            rounded
            style="width: 150px;"
            :to="{ name: 'list-company' }"
          />
          <q-btn
            :label="isUpdate ? 'Atualizar' : 'Salvar'"
            class="q-mr-xl"
            color="blue"
            rounded
            style="width: 150px;"
            type="submit"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageFormCompany',

  setup () {
    const table = 'company'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const date = new Date()

    const today = date.toLocaleDateString()

    const isUpdate = computed(() => route.params.id)

    let company = {}
    const form = ref({
      name: '',
      cnpj: '',
      ie: '',
      csc: '',
      created_at: today
    })

    onMounted(() => {
      if (isUpdate.value) {
        handleGetCompany(isUpdate.value)
      }
    })

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          await update(table, form.value)
          notifySuccess('Empresa atualizada com sucesso!')
        } else {
          await post(table, form.value)
          notifySuccess('Empresa cadastrada com sucesso!')
        }
        router.push({ name: 'list-company' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetCompany = async (id) => {
      try {
        company = await getById(table, id)
        form.value = company
      } catch (error) {
        notifyError(error.message)
      }
    }
    return {
      form,
      handleSubmit,
      isUpdate
    }
  }
})
</script>

<style>

</style>
