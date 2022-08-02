<template>
  <q-page padding>
    <div class="row">
      <q-table :rows="store" :columns="columnsStore" row-key="id" class="col-12" :loading="loading">
        <template v-slot:top>
          <span class="text-h6">
            Lista de Lojas
          </span>
          <q-space />
          <q-btn label="Adicionar Loja" color="primary" :to="{ name: 'form-store' }" />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-eye-outline" color="info" dense size="sm" @click="handleDetails(props.row)">
              <q-tooltip>
                Ver Detalhes
              </q-tooltip>
            </q-btn>
            <q-btn icon="mdi-pencil-outline" color="warning" dense size="sm" @click="handleEdit(props.row)">
              <q-tooltip>
                Editar
              </q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemoveStore(props.row)">
              <q-tooltip>
                Deletar
              </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { columnsStore } from 'src/components/Tables'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageListStore',

  setup () {
    const store = ref([])
    const loading = ref(true)
    const router = useRouter()
    const $q = useQuasar()
    const table = 'store'
    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const handleListStore = async () => {
      try {
        loading.value = true
        store.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (store) => {
      router.push({ name: 'form-company', params: { id: store.id } })
    }

    const handleDetails = (store) => {
      router.push({ name: 'details-company', params: { id: store.id } })
    }

    const handleRemoveStore = async (store) => {
      try {
        $q.dialog({
          title: 'Você está deletando uma Empresa',
          message: `Deseja realmente excluir a empresa ${store.name}?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, store.id)
          notifySuccess('Empresa excluída com sucesso!')
          handleListStore()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListStore()
    })

    return {
      columnsStore,
      store,
      loading,
      handleEdit,
      handleRemoveStore,
      handleDetails
    }
  }
})
</script>
