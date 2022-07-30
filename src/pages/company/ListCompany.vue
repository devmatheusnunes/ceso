<template>
  <q-page padding>
    <div class="row">
      <q-table :rows="company" :columns="columns" row-key="id" class="col-12" :loading="loading">
        <template v-slot:top>
          <span class="text-h6">
            Lista de Empresas
          </span>
          <q-space />
          <q-btn label="Adicionar Empresa" color="blue" :to="{ name: 'form-company' }" />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-pencil-outline" color="yellow-9" dense size="sm" @click="handleEdit(props.row)">
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
const columns = [
  { name: 'name', align: 'left', label: 'Razão Social', field: 'name', sortable: true },
  { name: 'cnpj', align: 'left', label: 'CPNJ', field: 'cnpj', sortable: true },
  { name: 'ie', align: 'left', label: 'Inscrição Estadual', field: 'ie', sortable: true },
  { name: 'csc', align: 'left', label: 'CSC', field: 'csc', sortable: true },
  { name: 'actions', align: 'right', label: 'Ações', field: 'actions', sortable: true }
]

import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
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
      columns,
      company,
      loading,
      handleEdit,
      handleRemoveCompany
    }
  }
})
</script>
