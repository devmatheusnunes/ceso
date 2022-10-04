<template>
  <q-page padding>
    <div class="row">
      <q-table :rows="collaborator" :columns="columnsCollaborator" row-key="id" class="col-12" :loading="loading">

        <template v-slot:top>
          <span class="text-h6 text-bold">
            Lista de Colaboradores
          </span>
          <q-space />
          <q-btn label="Adicionar Colaborador" color="primary" :to="{ name: 'form-collaborator' }" />
        </template>

        <template v-slot:body-cell-img_url="props">
          <q-td :props="props">
            <q-avatar v-if="props.row.img_url">
              <img :src="props.row.img_url" />
            </q-avatar>
            <q-avatar v-else color="grey" text-color="white" icon="mdi-image-off" />
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">

            <q-btn icon="mdi-eye-outline" color="info" dense size="sm" @click="handleDetails(props.row)">
              <q-tooltip>
                Ver Detalhes DetailsCollaborator
              </q-tooltip>
            </q-btn>

            <q-btn icon="mdi-pencil-outline" color="warning" dense size="sm" @click="handleEdit(props.row)">
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
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { columnsCollaborator } from 'src/components/Tables'
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

    const handleDetails = (collaborator) => {
      router.push({ name: 'details-collaborator', params: { id: collaborator.id } })
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
      columnsCollaborator,
      collaborator,
      loading,
      handleEdit,
      handleRemoveCollaborator,
      handleDetails
    }
  }
})
</script>
