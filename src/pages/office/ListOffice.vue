<template>
  <q-page padding>
    <div class="row">
      <q-table :rows="office" :columns="columnsOffice" row-key="id" class="col-12" :loading="loading">
        <template v-slot:top>
          <span class="text-h6 text-bold">
            Lista de Cargos
          </span>
          <q-space />
          <q-btn label="Adicionar Cargo" color="primary" :to="{ name: 'form-office' }" />
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
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemoveOffice(props.row)">
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
import { columnsOffice } from 'src/components/Tables'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageListOffice',

  setup () {
    const office = ref([])
    const loading = ref(true)
    const router = useRouter()
    const $q = useQuasar()
    const table = 'office'
    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const handleListOffice = async () => {
      try {
        loading.value = true
        office.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (office) => {
      router.push({ name: 'form-office', params: { id: office.id } })
    }

    const handleDetails = (office) => {
      router.push({ name: 'details-office', params: { id: office.id } })
    }

    const handleRemoveOffice = async (office) => {
      try {
        $q.dialog({
          title: 'Você está deletando um Cargo',
          message: `Deseja realmente excluir o cargo ${office.name}?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, office.id)
          notifySuccess('Cargo excluído com sucesso!')
          handleListOffice()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListOffice()
    })

    return {
      columnsOffice,
      office,
      loading,
      handleEdit,
      handleRemoveOffice,
      handleDetails
    }
  }
})
</script>
