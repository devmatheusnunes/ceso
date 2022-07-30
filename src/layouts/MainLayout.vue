<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          CESO System
        </q-toolbar-title>

        <q-btn-dropdown color="white" flat icon="settings">
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: '',
    icon: 'mdi-home-outline',
    routeName: 'home'

  },
  {
    title: 'Colaboradores',
    caption: '',
    icon: 'mdi-badge-account-outline',
    routeName: 'list-collaborator'
  },
  {
    title: 'Empresas',
    caption: '',
    icon: 'mdi-city-variant-outline',
    routeName: 'list-company'
  },
  {
    title: 'Lojas',
    caption: '',
    icon: 'mdi-storefront-outline',
    routeName: 'list-store'
  }
]

import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const $q = useQuasar()
    const router = useRouter()
    const { logout } = useAuthUser()
    const handleLogout = async () => {
      $q.dialog({
        title: 'Logou',
        message: 'Você realmente deseja sair?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await logout()
        router.replace({ name: 'login' })
      })
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      handleLogout
    }
  }
})
</script>
