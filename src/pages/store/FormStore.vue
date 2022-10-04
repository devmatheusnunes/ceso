<template>
  <q-page padding>
    <q-card class="q-mt-md">
      <p class="text-h5 text-bold q-ml-xl q-pt-md">
        Formulário de Lojas
      </p>

      <p class="text-h6 text-bold q-ml-xl q-pt-md">
        Loja
      </p>

      <q-form class="q-gutter-y-sm q-pt-md" @submit.prevent="handleSubmit">
        <div class="row">
          <div class="q-ml-xl" style="max-width: 50%;">
            <p class="text-bold" style="margin-bottom:0">NOME:</p>
            <q-input
              v-model="form.name"
              style="width: 500px;"
              outlined
              dense
            />
          </div>

          <div class="q-ml-xl" style="max-width: 50%;">
            <p class="text-bold" style="margin-bottom:0">TELEFONE FIXO:</p>
            <q-input
              v-model="form.telephone"
              mask="(##) #### - ####"
              style="width: 350px;"
              outlined
              dense
            />
          </div>
        </div>

        <div class="row">
          <div class="q-ml-xl" style="max-width: 50%;">
            <p class="text-bold" style="margin-bottom:0">EMPRESA REGISTRADA:</p>
            <q-select
              label="Selecione uma Empresa"
              v-model="form.company_id"
              :options="optionsCompany"
              option-value="id"
              option-label="name"
              style="width: 500px;"
              map-options
              emit-value
              outlined
              dense
            />
          </div>

          <div class="q-ml-xl" style="max-width: 50%;">
            <p class="text-bold" style="margin-bottom:0">CELULAR:</p>
            <q-input
              v-model="form.cell"
              mask="(##) # #### - ####"
              style="width: 350px;"
              outlined
              dense
            />
          </div>
        </div>

        <p class="text-h6 text-bold q-ml-xl q-pt-md">
          Endereço
        </p>

        <div class="row">
          <div class="q-ml-xl" style="max-width: 50%;">
            <p class="text-bold" style="margin-bottom:0">RUA:</p>
            <q-input
              v-model="form.street"
              style="width: 350px;"
              outlined
              dense
            />
          </div>

          <div class="q-ml-xl" style="max-width: 50%;">
            <p class="text-bold" style="margin-bottom:0">NÚMERO:</p>
            <q-input
              v-model="form.number"
              mask="####"
              style="width: 100px;"
              outlined
              dense
            />
          </div>

          <div class="q-ml-xl" style="max-width: 50%;">
            <p class="text-bold" style="margin-bottom:0">BAIRRO:</p>
            <q-input
              v-model="form.district"
              style="width: 350px;"
              outlined
              dense
            />
          </div>
        </div>

        <div class="row">
          <div class="q-ml-xl" style="max-width: 50%;">
            <p class="text-bold" style="margin-bottom:0">CIDADE:</p>
            <q-input
              label="Cidade:"
              v-model="form.city"
              style="width: 350px;"
              outlined
              dense
            />
          </div>

          <div class="q-ml-xl" style="max-width: 50%;">
            <p class="text-bold" style="margin-bottom:0">CEP:</p>
            <q-input
              v-model="form.cep"
              mask="#####-###"
              style="width: 100px;"
              outlined
              dense
            />
          </div>

          <div class="q-ml-xl" style="max-width: 50%;">
            <p class="text-bold" style="margin-bottom:0">ESTADO:</p>
            <q-input
              label="Estado:"
              v-model="form.state"
              style="width: 350px;"
              outlined
              dense
            />
          </div>
        </div>

        <div class="q-ml-xl" style="max-width: 50%;">
          <p class="text-bold" style="margin-bottom:0">PAÍS:</p>
          <q-input
            label="País:"
            v-model="form.country"
            style="width: 350px;"
            outlined
            dense
          />
        </div>

        <p class="text-h6 text-bold q-ml-xl q-pt-md">
          Colaboradores
        </p>

        <div class="row">
          <div class="q-ml-xl" style="max-width: 50%;">
            <p class="text-bold" style="margin-bottom:0">GERENTE GERAL:</p>
            <q-select
              label="Selecione um Gerente Geral"
              v-model="form.manager_master_id"
              :options="optionsCollaborator"
              option-value="id"
              option-label="name"
              style="width: 350px;"
              map-options
              emit-value
              outlined
              dense
            />
          </div>

          <div class="q-ml-xl" style="max-width: 50%;">
            <p class="text-bold" style="margin-bottom:0">GERENTE DA LOJA:</p>
            <q-select
              label="Selecione um Gerente da Loja:"
              v-model="form.manager_id"
              :options="optionsCollaborator"
              option-value="id"
              option-label="name"
              style="width: 350px;"
              map-options
              emit-value
              outlined
              dense
            />
          </div>
        </div>

        <div class="row q-mt-lg">
          <div class="q-ml-xl" style="max-width: 50%;">
            <p class="text-bold" style="margin-bottom:0">VENDEDOR(A):</p>
            <q-select
              label="Selecione um vendedor(a):"
              v-model="form.seller1_id"
              :options="optionsCollaborator"
              option-value="id"
              option-label="name"
              style="width: 350px;"
              map-options
              emit-value
              outlined
              dense
            />
          </div>

          <div class="q-ml-xl" style="max-width: 50%;">
            <p class="text-bold" style="margin-bottom:0">VENDEDOR(A):</p>
            <q-select
              label="Selecione um vendedor(a):"
              v-model="form.seller2_id"
              :options="optionsCollaborator"
              option-value="id"
              option-label="name"
              style="width: 350px;"
              map-options
              emit-value
              outlined
              dense
            />
          </div>
        </div>

        <div class="q-ml-xl" style="max-width: 50%;">
          <p class="text-bold" style="margin-bottom:0">VENDEDOR(A):</p>
          <q-select
            label="Selecione um vendedor(a):"
            v-model="form.seller3_id"
            :options="optionsCollaborator"
            option-value="id"
            option-label="name"
            style="width: 350px;"
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
            style="width: 150px;"
            :to="{ name: 'list-store' }"
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
  name: 'PageFormStore',

  setup () {
    const table = 'store'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update, list } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const date = new Date()

    const today = date.toLocaleDateString()

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
      manager_id: '',
      manager_master_id: '',
      seller1_id: '',
      seller2_id: '',
      seller3_id: '',
      created_at: today
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
