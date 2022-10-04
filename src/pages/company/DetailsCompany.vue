<template>
  <q-page padding>
    <q-card>
      <p class="text-h5 text-bold q-ml-xl q-pt-md">Detalhes</p>
      <q-card-section>
        <div class="row">
          <p class="text-bold q-ml-xl">CÓDIGO:</p>
          <p class="q-pl-md">{{ company.id }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">NOME:</p>
          <p class="q-pl-md q-pt-sm">{{ company.name }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">CNPJ:</p>
          <p class="q-pl-md q-pt-sm">{{ company.cnpj }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">INSCRIÇÃO ESTADUAL:</p>
          <p class="q-pl-md q-pt-sm">{{ company.ie }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">CSC:</p>
          <p class="q-pl-md q-pt-sm">{{ company.csc }}</p>
        </div>
        <!--
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">CADASTRADO EM:</p>
          <p class="q-pl-md q-pt-sm">{{ company.created_at }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">CADASTRADO POR:</p>
          <p class="q-pl-md q-pt-sm">{{ company.user_id }}</p>
        </div>
        -->
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
  name: 'PageDetailsCompany',

  setup () {
    const company = ref([])
    const table = 'company'
    const route = useRoute()
    const { notifyError } = useNotify()
    const { getById } = useApi()

    const isDetails = computed(() => route.params.id)

    onMounted(() => {
      if (isDetails.value) {
        handleGetCompany(isDetails.value)
      }
    })

    const handleGetCompany = async (id) => {
      try {
        company.value = await getById(table, id)
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      company
    }
  }
})
</script>

<style>

</style>
