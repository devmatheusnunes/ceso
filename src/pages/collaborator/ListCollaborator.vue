<template>
  <q-page padding>
    <div class="row">
      <q-table :rows="collaborator" :columns="columns" row-key="id" class="col-12" :loading="loading">
        <template v-slot:top>
          <span class="text-h6">
            Lista de Colaboradores
          </span>
          <q-space />
          <q-btn label="Adicionar Colaborador" color="blue" :to="{ name: 'form-collaborator' }" />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-pencil-outline" color="yellow-9" dense size="sm" @click="handleEdit(props.row)">
              <q-tooltip>
                Editar
              </q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemoveCollaborator(props.row)">
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
  { name: 'id', align: 'left', label: 'Código', field: 'id', sortable: true },
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'cpf', align: 'left', label: 'CPF', field: 'cpf', sortable: true },
  { name: 'birth', align: 'left', label: 'Nascimento', field: 'birth', sortable: true },
  { name: 'phone', align: 'left', label: 'Telefone', field: 'phone', sortable: true },
  { name: 'email', align: 'left', label: 'E-mail', field: 'email', sortable: true },
  { name: 'bank', align: 'left', label: 'Banco', field: 'bank', sortable: true },
  { name: 'code_bank', align: 'left', label: 'Código Bancário', field: 'code_bank', sortable: true },
  { name: 'agency', align: 'left', label: 'Agência', field: 'agency', sortable: true },
  { name: 'account', align: 'left', label: 'Conta', field: 'account', sortable: true },
  { name: 'operation', align: 'left', label: 'Operação', field: 'operation', sortable: true },
  { name: 'pix', align: 'left', label: 'Pix', field: 'pix', sortable: true },
  { name: 'company_id', align: 'left', label: 'Empresa Registrada', field: 'company_id', sortable: true },
  { name: 'actions', align: 'right', label: 'Ações', field: 'actions', sortable: true }
]

import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageListCollaborator',

  setup () {
    const collaborator = ref([])
    const loading = ref(true)
    const router = useRouter()
    const $q = useQuasar()
    const table = 'collaborator'
    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const handleListCollaborator = async () => {
      try {
        loading.value = true
        collaborator.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (collaborator) => {
      router.push({ name: 'form-collaborator', params: { id: collaborator.id } })
    }

    const handleRemoveCollaborator = async (collaborator) => {
      try {
        $q.dialog({
          title: 'Você está deletando um colaborador',
          message: `Deseja realmente excluir o(a) colaborador(a) ${collaborator.name}?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, collaborator.id)
          notifySuccess('Colaborador(a) excluído(a) com sucesso!')
          handleListCollaborator()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListCollaborator()
    })

    return {
      columns,
      collaborator,
      loading,
      handleEdit,
      handleRemoveCollaborator
    }
  }
})
</script>
