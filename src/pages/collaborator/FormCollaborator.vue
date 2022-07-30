<template>
  <q-page padding class="bg-grey-3">
    <q-card class="q-mt-md">
        <p class="text-h5 flex flex-center q-pt-md">Formulário de Colaboradores</p>
        <q-form class="q-gutter-y-sm q-pt-md" @submit.prevent="handleSubmit">
            <p class="text-h6 q-ml-md">Dados Pessoais</p>
            <div class="row q-gutter-x-md flex flex-center">
                <q-input
                    outlined
                    dense
                    lazy-rules
                    v-model="form.name"
                    label="Nome:"
                    style="width: 50%;"
                    :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
                <q-input
                    outlined
                    dense
                    lazy-rules
                    v-model="form.cpf"
                    label="CPF:"
                    mask="###.###.###-##"
                    style="width: 20%;"
                    :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
                <q-input
                    outlined
                    dense
                    lazy-rules
                    v-model="form.pis"
                    label="PIS:"
                    style="width: 20%;"
                    mask="###.#####.##-#"
                    :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
            </div>
            <div class="row q-gutter-x-md flex flex-center">
                <q-input
                    outlined
                    dense
                    lazy-rules
                    v-model="form.birth"
                    label="Data de Nascimento:"
                    style="width: 30%;"
                    mask="##/##/####"
                    :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
                <q-input
                    outlined
                    dense
                    lazy-rules
                    v-model="form.phone"
                    label="Telefone:"
                    mask="(##) # #### - ####"
                    style="width: 30%;"
                    :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
                <q-input
                    outlined
                    dense
                    lazy-rules
                    v-model="form.email"
                    label="E-Mail:"
                    type="email"
                    style="width: 30%;"
                    :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
            </div>
            <div class="row flex flex-center">
                <q-input
                    outlined
                    dense
                    lazy-rules
                    v-model="form.company_id"
                    label="Empresa Registrada:"
                    style="width: 40%;"
                    :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
            </div>
            <p class="text-h6 q-ml-md">Dados Bancários</p>
            <div class="row q-gutter-x-md flex flex-center">
                <q-input
                    outlined
                    dense
                    lazy-rules
                    v-model="form.bank"
                    label="Banco:"
                    style="width: 30%;"
                    :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
                <q-input
                    outlined
                    dense
                    lazy-rules
                    v-model="form.code_bank"
                    label="Código do Banco:"
                    mask="###"
                    style="width: 30%;"
                    :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
                <q-input
                    outlined
                    dense
                    lazy-rules
                    v-model="form.agency"
                    label="Agência:"
                    style="width: 30%;"
                    mask="#####"
                    :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
            </div>
            <div class="row q-gutter-x-md flex flex-center">
                <q-input
                    outlined
                    dense
                    lazy-rules
                    v-model="form.operation"
                    label="Operação:"
                    style="width: 30%;"
                    mask="###"
                    :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
                <q-input
                    outlined
                    dense
                    lazy-rules
                    v-model="form.account"
                    label="Conta:"
                    style="width: 30%;"
                    mask="#######-#"
                    :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
                <q-input
                    outlined
                    dense
                    lazy-rules
                    v-model="form.pix"
                    label="Pix:"
                    style="width: 30%;"
                    :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
            </div>
            <p class="text-h6 q-ml-md">Observações</p>
            <div class="row q-gutter-x-md q-pb-md flex flex-center">
                <q-input
                    outlined
                    dense
                    v-model="form.comments"
                    type="textarea"
                    style="width: 95%;"
                />
            </div>
            <div class="flex flex-center q-pt-md">
                <q-btn
                    :label="isUpdate ? 'Atualizar' : 'Salvar'"
                    color="blue"
                    rounded
                    dense
                    style="width: 40%;"
                    type="submit"
                />
                </div>
            <div class="flex flex-center q-pb-sm">
                <q-btn
                    label="Cancelar"
                    color="red"
                    class="col-md-4 col-sm-6 col-xs-10 full"
                    rounded
                    dense
                    flat
                    :to="{ name: 'list-collaborator' }"
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
    const { post, getById, update } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const isUpdate = computed(() => route.params.id)

    let collaborator = {}
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
      company_id: ''
    })

    onMounted(() => {
      if (isUpdate.value) {
        handleGetCollaborator(isUpdate.value)
      }
    })

    const handleSubmit = async () => {
      try {
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
      isUpdate
      /* options: [
        'empresa 1', 'empresa 2', 'empresa 3'
      ] */
    }
  }
})
</script>

<style>

</style>
