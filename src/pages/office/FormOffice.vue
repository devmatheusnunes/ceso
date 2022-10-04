<template>
  <q-page padding>
    <q-card class="q-mt-md">
      <p class="text-h5 text-bold q-ml-xl q-pt-md">
        Formulário de Cargos
      </p>
      <q-form class="q-gutter-y-sm q-pt-md" @submit.prevent="handleSubmit">
        <div class="q-ml-xl">
          <p class="text-bold" style="margin-bottom:0">NOME:</p>
          <q-input
            v-model="form.name"
            dense
            outlined
            style="max-width: 40%;"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Este campo não pode ficar em branco']"
          />
        </div>

        <div class="q-py-md" align="right">
          <q-btn
            class="q-mr-sm"
            label="Cancelar"
            color="red"
            rounded
            style="width: 150px;"
            :to="{ name: 'list-office' }"
          />
          <q-btn
            :label="isUpdate ? 'Atualizar' : 'Salvar'"
            class="q-mr-xl"
            color="primary"
            rounded
            style="width: 150px;"
            type="submit"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageFormOffice',

  setup () {
    const table = 'office'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const date = new Date()

    const today = date.toLocaleDateString()

    const isUpdate = computed(() => route.params.id)

    let office = {}
    const form = ref({
      name: '',
      created_at: today
    })

    onMounted(() => {
      if (isUpdate.value) {
        handleGetOffice(isUpdate.value)
      }
    })

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          await update(table, form.value)
          notifySuccess('Cargo atualizado com sucesso!')
        } else {
          await post(table, form.value)
          notifySuccess('Cargo cadastrado com sucesso!')
        }
        router.push({ name: 'list-office' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetOffice = async (id) => {
      try {
        office = await getById(table, id)
        form.value = office
      } catch (error) {
        notifyError(error.message)
      }
    }
    return {
      form,
      handleSubmit,
      isUpdate
    }
  }
})
</script>

<style>

</style>
