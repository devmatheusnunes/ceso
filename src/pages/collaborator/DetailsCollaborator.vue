<template>
  <q-page padding>
    <q-card>
      <p class="text-h5 text-bold q-ml-xl q-pt-md">Detalhes</p>
      <q-card-section>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">FOTO:</p>
          <p class="q-pl-md q-pt-sm">{{ collaborator.img_url }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl">CÓDIGO:</p>
          <p class="q-pl-md">{{ collaborator.id }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">NOME:</p>
          <p class="q-pl-md q-pt-sm">{{ collaborator.name }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">CPF:</p>
          <p class="q-pl-md q-pt-sm">{{ collaborator.cpf }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">DATA DE NASCIMENTO:</p>
          <p class="q-pl-md q-pt-sm">{{ collaborator.birth }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">TELEFONE:</p>
          <p class="q-pl-md q-pt-sm">{{ collaborator.phone }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">E-MAIL:</p>
          <p class="q-pl-md q-pt-sm">{{ collaborator.email }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">BANCO:</p>
          <p class="q-pl-md q-pt-sm">{{ collaborator.bank }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">CÓDIGO DO BANCO:</p>
          <p class="q-pl-md q-pt-sm">{{ collaborator.code_bank }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">AGÊNCIA:</p>
          <p class="q-pl-md q-pt-sm">{{ collaborator.agency }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">CONTA:</p>
          <p class="q-pl-md q-pt-sm">{{ collaborator.account }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">PIX:</p>
          <p class="q-pl-md q-pt-sm">{{ collaborator.pix }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">COMENTÁRIOS:</p>
          <p class="q-pl-md q-pt-sm">{{ collaborator.comments }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">PIS:</p>
          <p class="q-pl-md q-pt-sm">{{ collaborator.pis }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">EMPRESA:</p>
          <p class="q-pl-md q-pt-sm">{{ collaborator.company_id }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">OFFICE:</p>
          <p class="q-pl-md q-pt-sm">{{ collaborator.office_id }}</p>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import useApi from 'src/composables/UseApi'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageDetailsCollaborator',

  setup () {
    const collaborator = ref([])
    const table = 'collaborator'
    const route = useRoute()
    const { notifyError } = useNotify()
    const { getById, list } = useApi()

    const isDetails = computed(() => route.params.id)

    const nameCompany = ref([])
    const nameOffice = ref([])

    onMounted(() => {
      listName()
      if (isDetails.value) {
        handleGetCollaborator(isDetails.value)
      }
    })

    const listName = async () => {
      nameCompany.value = await list('company')
      nameOffice.value = await list('company')
    }

    const handleGetCollaborator = async (id) => {
      try {
        collaborator.value = await getById(table, id)
      } catch (error) {
        notifyError(error.message)
      }
    }
    return {
      collaborator
    }
  }
})
</script>

<style>

</style>
