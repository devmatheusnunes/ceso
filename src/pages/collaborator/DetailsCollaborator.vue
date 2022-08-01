<template>
  <q-page padding>
    <q-card>
      <p class="text-h5 flex flex-center q-pt-md">Detalhes</p>
      <q-card-section>
        <p>CÓDIGO:</p>
        <p>NOME:</p>
        <p>CNPJ:</p>
        <p>INSCRIÇÃO ESTADUAL:</p>
        <p>CSC:</p>
        <p>CADASTRADO EM:</p>
        <p>CADASTRADO POR:</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageDetailsCollaborator',
  setup () {
    return {
    }
  }
})
</script>

<style>

</style>
