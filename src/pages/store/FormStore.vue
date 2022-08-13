<template>
  <q-page padding>
    <q-card class="q-mt-md">
      <p class="text-h5 flex flex-center q-pt-md">
        Formulário de Lojas
      </p>
      <q-form class="q-gutter-y-sm q-pt-md" @submit.prevent="handleSubmit">
        <p class="text-h6 q-ml-xl">Loja</p>
        <div class="row q-gutter-x-md flex flex-center">

          <q-input
            label="Nome:"
            v-model="form.name"
            style="width: 22.5%;"
            outlined
            dense
          />

          <q-select
            label="Empresa Registrada:"
            v-model="form.company_id"
            :options="optionsCompany"
            option-value="id"
            option-label="name"
            style="width: 22.5%;"
            map-options
            emit-value
            outlined
            dense
          />

          <q-input
            label="Telefone Fixo:"
            v-model="form.telephone"
            mask="(##) #### - ####"
            style="width: 22%;"
            outlined
            dense
          />

          <q-input
            label="Telefone Celular:"
            v-model="form.cell"
            mask="(##) # #### - ####"
            style="width: 22%;"
            outlined
            dense
          />
        </div>

        <p class="text-h6 q-ml-xl">Endereço</p>

        <div class="row q-gutter-x-md flex flex-center">
          <q-input
            label="Rua:"
            v-model="form.street"
            style="width: 50%;"
            outlined
            dense
          />

          <q-input
            label="Nº:"
            v-model="form.number"
            mask="####"
            style="width: 10%;"
            outlined
            dense
          />

          <q-input
            label="Bairro:"
            v-model="form.district"
            style="width: 30%;"
            outlined
            dense
          />
        </div>

        <div class="row q-gutter-x-md flex flex-center">
          <q-input
            label="Cidade:"
            v-model="form.city"
            style="width: 22%;"
            outlined
            dense
          />

          <q-input
            label="CEP:"
            v-model="form.cep"
            mask="#####-###"
            style="width: 22%;"
            outlined
            dense
          />

          <q-input
            label="Estado:"
            v-model="form.state"
            style="width: 22%;"
            outlined
            dense
          />

          <q-input
            label="País:"
            v-model="form.country"
            style="width: 22.5%;"
            outlined
            dense
          />
        </div>

        <p class="text-h6 q-ml-xl">Colaboradores</p>

        <div class="row q-gutter-x-md flex flex-center">
         <q-select
            label="Empresa Registrada:"
            v-model="form.company_id"
            :options="optionsCompany"
            option-value="id"
            option-label="name"
            style="width: 22.5%;"
            map-options
            emit-value
            outlined
            dense
          />

          <q-select
            label="Empresa Registrada:"
            v-model="form.company_id"
            :options="optionsCompany"
            option-value="id"
            option-label="name"
            style="width: 22.5%;"
            map-options
            emit-value
            outlined
            dense
          />

          <q-select
            label="Empresa Registrada:"
            v-model="form.company_id"
            :options="optionsCompany"
            option-value="id"
            option-label="name"
            style="width: 22.5%;"
            map-options
            emit-value
            outlined
            dense
          />
        </div>

        <div class="q-pa-md" align="right">
          <q-btn
            class="q-mr-sm"
            label="Cancelar"
            color="red"
            rounded
            style="width: 10%;"
            :to="{ name: 'list-store' }"
          />
          <q-btn
            :label="isUpdate ? 'Atualizar' : 'Salvar'"
            class="q-mr-xl"
            color="blue"
            rounded
            style="width: 10%;"
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
  name: 'PageFormStore',

  setup () {
    const table = 'store'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update, list } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const isUpdate = computed(() => route.params.id)

    let store = {}
    const optionsCompany = ref([])
    const optionsCollaborator = ref([])
    const form = ref({
      name: '',
      telephone: '',
      cell: '',
      street: '',
      number: '',
      district: '',
      city: '',
      cep: '',
      state: '',
      country: '',
      company_id: '',
      collaborator_id: []
    })

    onMounted(() => {
      handleListCompany()
      if (isUpdate.value) {
        handleGetStore(isUpdate.value)
      }
    })

    const handleListCompany = async () => {
      optionsCompany.value = await list('company')
      optionsCollaborator.value = await list('collaborator')
    }

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          await update(table, form.value)
          notifySuccess('Empresa atualizada com sucesso!')
        } else {
          await post(table, form.value)
          notifySuccess('Empresa cadastrada com sucesso!')
        }
        router.push({ name: 'list-store' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetStore = async (id) => {
      try {
        store = await getById(table, id)
        form.value = store
      } catch (error) {
        notifyError(error.message)
      }
    }
    return {
      form,
      handleSubmit,
      isUpdate,
      optionsCompany,
      optionsCollaborator
    }
  }
})
</script>

<style>

</style>
