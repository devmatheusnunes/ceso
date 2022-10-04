<template>
  <q-page padding>
    <div class="row">
      <q-table :rows="company" :columns="columnsCompany" row-key="id" class="col-12" :loading="loading">
        <template v-slot:top>
          <span class="text-h6 text-bold">
            Lista de Empresas
          </span>
          <q-space />
          <q-btn label="Adicionar Empresa" color="primary" :to="{ name: 'form-company' }" />
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
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemoveCompany(props.row)">
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
import { columnsCompany } from 'src/components/Tables'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageListCompany',

  setup () {
    const company = ref([])
    const loading = ref(true)
    const router = useRouter()
    const $q = useQuasar()
    const table = 'company'
    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const handleListCompany = async () => {
      try {
        loading.value = true
        company.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (company) => {
      router.push({ name: 'form-company', params: { id: company.id } })
    }

    const handleDetails = (company) => {
      router.push({ name: 'details-company', params: { id: company.id } })
    }

    const handleRemoveCompany = async (company) => {
      try {
        $q.dialog({
          title: 'Você está deletando uma Empresa',
          message: `Deseja realmente excluir a empresa ${company.name}?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, company.id)
          notifySuccess('Empresa excluída com sucesso!')
          handleListCompany()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListCompany()
    })

    return {
      columnsCompany,
      company,
      loading,
      handleEdit,
      handleRemoveCompany,
      handleDetails
    }
  }
})
</script>
