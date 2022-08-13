<template>
  <q-page padding>
    <q-card class="q-mt-md">
      <p class="text-h5 flex flex-center q-pt-md">Formulário de Colaboradores</p>

      <q-form class="q-gutter-y-sm q-pt-md" @submit.prevent="handleSubmit">
        <p class="text-h6 q-ml-xl">Dados Pessoais</p>
        <div class="row q-gutter-x-md flex flex-center">

          <q-input
            label="Nome:"
            v-model="form.name"
            style="width: 50%;"
            outlined
            dense
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />

          <q-input
            label="CPF:"
            v-model="form.cpf"
            mask="###.###.###-##"
            style="width: 20%;"
            outlined
            dense
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />

          <q-input
            label="PIS:"
            v-model="form.pis"
            mask="###.#####.##-#"
            style="width: 20%;"
            outlined
            dense
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />
        </div>

        <div class="row q-gutter-x-md flex flex-center">
          <q-input
            label="Data de Nascimento:"
            v-model="form.birth"
            mask="##/##/####"
            style="width: 30%;"
            outlined
            dense
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />

          <q-input
            label="Telefone:"
            v-model="form.phone"
            mask="(##) # #### - ####"
            style="width: 30%;"
            outlined
            dense
            lazy-rules
            rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />

          <q-input
            label="E-Mail:"
            v-model="form.email"
            type="email"
            style="width: 30%;"
            outlined
            dense
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />
        </div>

        <div class="row q-gutter-x-md flex flex-center">
          <q-select
            label="Empresa Registrada:"
            v-model="form.company_id"
            :options="optionsCompany"
            option-value="id"
            option-label="name"
            map-options
            emit-value
            style="width: 40%;"
            outlined
            dense
            lazy-rules
          />

          <q-input
            label="Imagem"
            v-model="img"
            stack-label
            type="file"
            accept="image/*"
            style="width: 40%;"
            outlined
            dense
          />
        </div>

        <p class="text-h6 q-ml-xl">Dados Bancários</p>

        <div class="row q-gutter-x-md flex flex-center">
          <q-input
            label="Banco:"
            v-model="form.bank"
            style="width: 30%;"
            outlined
            dense
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />

          <q-input
            label="Código do Banco:"
            v-model="form.code_bank"
            mask="###"
            style="width: 30%;"
            outlined
            dense
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />

          <q-input
            label="Agência:"
            v-model="form.agency"
            mask="#####"
            style="width: 30%;"
            outlined
            dense
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
            />
        </div>

        <div class="row q-gutter-x-md flex flex-center">
          <q-input
            label="Operação:"
            v-model="form.operation"
            mask="###"
            style="width: 30%;"
            outlined
            dense
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />

          <q-input
            label="Conta:"
            v-model="form.account"
            mask="#######-#"
            style="width: 30%;"
            outlined
            dense
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />

          <q-input
            label="Pix:"
            v-model="form.pix"
            style="width: 30%;"
            outlined
            dense
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />
        </div>

        <p class="text-h6 q-ml-xl">Observações</p>

        <div class="row q-mx-md flex flex-center">
          <q-input
            v-model="form.comments"
            type="textarea"
            style="width: 95%;"
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
            :to="{ name: 'list-collaborator' }"
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
  name: 'PageFormCollaborator',

  setup () {
    const table = 'collaborator'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update, list, uploadImg } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const isUpdate = computed(() => route.params.id)

    let collaborator = {}
    const optionsCompany = ref([])
    const form = ref({
      name: '',
      cpf: '',
      birth: '',
      phone: '',
      email: '',
      bank: '',
      code_bank: '',
      agency: '',
      account: '',
      operation: '',
      pix: '',
      comments: '',
      pis: '',
      company_id: '',
      img_url: ''
    })
    const img = ref([])

    onMounted(() => {
      handleListCompany()
      if (isUpdate.value) {
        handleGetCollaborator(isUpdate.value)
      }
    })

    const handleListCompany = async () => {
      optionsCompany.value = await list('company')
    }

    const handleSubmit = async () => {
      try {
        if (img.value.length > 0) {
          const imgUrl = await uploadImg(img.value[0], 'collaborator-img')
          form.value.img_url = imgUrl
        }
        if (isUpdate.value) {
          await update(table, form.value)
          notifySuccess('Colaborador(a) atualizado(a) com sucesso!')
        } else {
          await post(table, form.value)
          notifySuccess('Colaborador(a) cadastrado(a) com sucesso!')
        }
        router.push({ name: 'list-collaborator' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetCollaborator = async (id) => {
      try {
        collaborator = await getById(table, id)
        form.value = collaborator
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleSubmit,
      isUpdate,
      optionsCompany,
      img
    }
  }
})
</script>

<style>

</style>
