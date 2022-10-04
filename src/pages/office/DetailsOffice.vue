<template>
  <q-page padding>
    <q-card>
      <p class="text-h5 text-bold q-ml-xl q-pt-md">Detalhes</p>
      <q-card-section v-if="office">
        <div class="row">
          <p class="text-bold q-ml-xl">CÓDIGO:</p>
          <p class="q-pl-md">{{ office.id }}</p>
        </div>
        <div class="row">
          <p class="text-bold q-ml-xl q-pt-sm">NOME:</p>
          <p class="q-pl-md q-pt-sm">{{ office.name }}</p>
        </div>
        <!--
        <div>
          <p class="text-bold">CADASTRADO EM:</p>
          <p class="q-pl-md">{{ office.created_at }}</p>
        </div>
        <div>
          <p class="text-bold">CADASTRADO POR:</p>
          <p class="q-pl-md">{{ office.user_id }}</p>
        </div>
        -->
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import useNotify from 'src/composables/UseNotify'
import useApi from 'src/composables/UseApi'

export default defineComponent({
  name: 'PageDetailsOffice',

  setup () {
    const office = ref([])
    const table = 'office'
    const route = useRoute()
    const { notifyError } = useNotify()
    const { getById } = useApi()

    const isDetails = computed(() => route.params.id)

    onMounted(() => {
      if (isDetails.value) {
        handleGetOffice(isDetails.value)
      }
    })

    const handleGetOffice = async (id) => {
      try {
        office.value = await getById(table, id)
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      office
    }
  }
})
</script>
