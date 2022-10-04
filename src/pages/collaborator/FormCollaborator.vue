<template>
  <q-page padding>
    <q-card class="q-mt-md">
      <p class="text-h5 text-bold q-ml-xl q-pt-md">Formulário de Colaboradores</p>

      <q-form class="q-gutter-y-sm q-pt-md" @submit.prevent="handleSubmit">

        <div class="row">
            <div class="q-ml-xl">
              <p class="text-bold" style="margin-bottom:0">FOTO:</p>
              <q-card bordered style="max-width: 250px; min-height: 280px;">
                <q-input v-model="img" type="file"
                dense accept="image/*"/>
                <q-img :src="img[0]" width="100" height="100"/>
              </q-card>
            </div>

            <div>
              <div class="q-ml-xl">
                <p class="text-bold" style="margin-bottom:0">NOME:</p>
                <q-input
                  v-model="form.name"
                  style="width: 350px;"
                  outlined
                  dense
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
              </div>

              <div class="q-ml-xl">
                <p class="text-bold" style="margin-bottom:0">CPF:</p>
                <q-input
                  v-model="form.cpf"
                  mask="###.###.###-##"
                  style="width: 350px;"
                  outlined
                  dense
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
              </div>

              <div class="q-ml-xl">
                <p class="text-bold" style="margin-bottom:0">PIS:</p>
                <q-input
                  v-model="form.pis"
                  mask="###.#####.##-#"
                  style="width: 350px;"
                  outlined
                  dense
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
              </div>

              <div class="q-ml-xl">
                <p class="text-bold" style="margin-bottom:0">DATA DE NASCIMENTO:</p>
                <q-input
                  v-model="form.birth"
                  mask="##/##/####"
                  style="width: 350px;"
                  outlined
                  dense
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
              </div>
          </div>
          <div>
            <div class="q-ml-xl">
                <p class="text-bold" style="margin-bottom:0">TELEFONE:</p>
                <q-input
                  v-model="form.phone"
                  mask="(##) # #### - ####"
                  style="width: 350px;"
                  outlined
                  dense
                  lazy-rules
                  rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
            </div>

            <div class="q-ml-xl">
                <p class="text-bold" style="margin-bottom:0">E-MAIL:</p>
                <q-input
                  v-model="form.email"
                  type="email"
                  style="width: 350px;"
                  outlined
                  dense
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
                />
            </div>

            <div class="q-ml-xl">
                <p class="text-bold" style="margin-bottom:0">EMPRESA REGISTRADA:</p>
                <q-select
                  v-model="form.company_id"
                  :options="optionsCompany"
                  option-value="id"
                  option-label="name"
                  map-options
                  emit-value
                  style="width: 350px;"
                  outlined
                  dense
                  lazy-rules
                />
            </div>

            <div class="q-ml-xl q-mt-md">
                <p class="text-bold" style="margin-bottom:0">CARGO:</p>
                <q-select
                  v-model="form.office_id"
                  :options="optionsOffice"
                  option-value="id"
                  option-label="name"
                  map-options
                  emit-value
                  style="width: 350px;"
                  outlined
                  dense
                  lazy-rules
                />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="q-ml-xl q-mt-md">
            <p class="text-bold" style="margin-bottom:0">CÓDIGO DO BANCO:</p>
            <q-input
              v-model="form.code_bank"
              mask="###"
              style="width: 250px;"
              outlined
              dense
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
            />
          </div>

          <div class="q-ml-xl q-mt-md">
            <p class="text-bold" style="margin-bottom:0">AGÊNCIA:</p>
            <q-input
              v-model="form.agency"
              mask="#####"
              style="width: 350px;"
              outlined
              dense
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
            />
          </div>

          <div class="q-ml-xl q-mt-md">
            <p class="text-bold" style="margin-bottom:0">BANCO:</p>
            <q-input
              v-model="form.bank"
              style="width: 350px;"
              outlined
              dense
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
            />
          </div>
        </div>

        <div class="row">
          <div class="q-ml-xl q-mt-md">
            <p class="text-bold" style="margin-bottom:0">OPERAÇÃO:</p>
            <q-input
              v-model="form.operation"
              mask="###"
              style="width: 250px;"
              outlined
              dense
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
            />
          </div>

          <div class="q-ml-xl q-mt-md">
            <p class="text-bold" style="margin-bottom:0">CONTA:</p>
            <q-input
              v-model="form.account"
              mask="#######-#"
              style="width: 350px;"
              outlined
              dense
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
            />
          </div>

          <div class="q-ml-xl q-mt-md">
            <p class="text-bold" style="margin-bottom:0">PIX:</p>
            <q-input
              v-model="form.pix"
              style="width: 350px;"
              outlined
              dense
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
            />
          </div>
        </div>

        <div class="q-ml-xl q-mt-md">
          <p class="text-bold"  style="margin-bottom:0">OBSERVAÇÕES:</p>
          <q-input
            v-model="form.comments"
            type="textarea"
            style="max-width: 1050px;"
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
    const optionsOffice = ref([])
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
      office_id: '',
      img_url: ''
    })
    const img = ref([])

    onMounted(() => {
      handleListOptions()
      if (isUpdate.value) {
        handleGetCollaborator(isUpdate.value)
      }
    })

    const handleListOptions = async () => {
      optionsCompany.value = await list('company')
      optionsOffice.value = await list('office')
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
      optionsOffice,
      img
    }
  }
})
</script>

<style>

</style>
