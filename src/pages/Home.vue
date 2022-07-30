<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <div>Olá {{ user.user_metadata.name }}</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'

export default defineComponent({
  name: 'PageHome',

  setup () {
    const { user } = useAuthUser()

    return {
      user
    }
  }
})
</script>
