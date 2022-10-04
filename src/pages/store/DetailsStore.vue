<template>
  <q-page padding>
    <q-card>
      <p class="text-h5 text-bold q-ml-xl q-pt-md">Detalhes</p>
      <q-card-section>
        <div class="row">
          <p class="text-bold q-ml-xl">CÓDIGO:</p>
          <p class="q-pl-md">{{ store.id }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">NOME:</p>
          <p class="q-pl-md q-pt-sm">{{ store.name }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">TELEFONE FIXO:</p>
          <p class="q-pl-md q-pt-sm">{{ store.telephone }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">CELULAR:</p>
          <p class="q-pl-md q-pt-sm">{{ store.cell }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">RUA:</p>
          <p class="q-pl-md q-pt-sm">{{ store.street }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl">NÚMERO:</p>
          <p class="q-pl-md">{{ store.number }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">BAIRRO:</p>
          <p class="q-pl-md q-pt-sm">{{ store.district }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">CIDADE:</p>
          <p class="q-pl-md q-pt-sm">{{ store.city }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">CEP:</p>
          <p class="q-pl-md q-pt-sm">{{ store.cep }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">ESTADO:</p>
          <p class="q-pl-md q-pt-sm">{{ store.state }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl">PAÍS:</p>
          <p class="q-pl-md">{{ store.country }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">EMPRESA REGISTRADA:</p>
          <p class="q-pl-md q-pt-sm">{{ store.company_id }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">GERENTE GERAL:</p>
          <p class="q-pl-md q-pt-sm">{{ store.manager_master_id }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">GERENTE DA LOJA:</p>
          <p class="q-pl-md q-pt-sm">{{ store.manager_id }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">VENDEDORES:</p>
          <p class="q-pl-md q-pt-sm">{{ store.seller1_id }}</p>
          <p class="q-pl-md q-pt-sm">{{ store.seller2_id }}</p>
          <p class="q-pl-md q-pt-sm">{{ store.seller3_id }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">CADASTRADO EM:</p>
          <p class="q-pl-md q-pt-sm">{{ store.created_at }}</p>
        </div>
        <!--
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">CADASTRADO POR:</p>
          <p class="q-pl-md q-pt-sm">{{ store.user_id }}</p>
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
    const store = ref([])
    const table = 'store'
    const route = useRoute()
    const { notifyError } = useNotify()
    const { getById } = useApi()

    const isDetails = computed(() => route.params.id)

    onMounted(() => {
      if (isDetails.value) {
        handleGetStore(isDetails.value)
      }
    })

    const handleGetStore = async (id) => {
      try {
        store.value = await getById(table, id)
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      store
    }
  }
})
</script>

<style>

</style>
