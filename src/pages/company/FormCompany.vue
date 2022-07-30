<template>
  <q-page padding class="bg-grey-2">
    <q-card class="q-mt-md">
      <p class="text-h5 flex flex-center q-pt-md">
        Formulário de Empresa
      </p>
      <q-form class="q-gutter-y-sm q-pt-md" @submit.prevent="handleSubmit">
        <div class="row q-gutter-x-md flex flex-center">
          <q-input
            outlined
            v-model="form.name"
            label="Nome:*"
            dense
            style="min-width: 40%;"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />
          <q-input
            outlined
            v-model="form.cnpj"
            label="CNPJ:*"
            dense
            mask="##.###.###/####-##"
            style="min-width: 40%;"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />
        </div>
        <div class="row q-gutter-x-md flex flex-center">
          <q-input
            outlined
            v-model="form.ie"
            label="Inscrição Estadual:*"
            dense
            style="min-width: 40%;"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />
          <q-input
            outlined
            v-model="form.csc"
            label="CSC:*"
            dense
            style="min-width: 40%;"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />
        </div>
        <div class="flex flex-center q-pt-md q-pb-sm">
          <q-btn
            :label="isUpdate ? 'Atualizar' : 'Salvar'"
            color="blue"
            rounded
            dense
            style="width: 40%;"
            type="submit"
          />
        </div>
        <div class="flex flex-center q-py-sm">
          <q-btn
            label="Cancelar"
            color="red"
            class="col-md-4 col-sm-6 col-xs-10 full"
            rounded
            dense
            flat
            :to="{ name: 'list-company' }"
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

    const isUpdate = computed(() => route.params.id)

    let company = {}
    const form = ref({
      name: '',
      cnpj: '',
      ie: '',
      csc: ''
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
