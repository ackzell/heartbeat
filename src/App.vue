<template>
  <v-app>
    <v-toolbar class="primary" dark fixed>
      <v-toolbar-title>Heartbeat</v-toolbar-title>

      <v-scale-transition mode="out-in" origin="center center">

        <v-btn v-if="!$route.path.includes('/remote')" fab bottom absolute right dark class="mr-5" @click.native.stop="add">
          <v-icon>add</v-icon>
        </v-btn>
      </v-scale-transition>

    </v-toolbar>
    <main>

      <v-container fluid class="pa-0">
        <v-layout column>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-layout>
      </v-container>

      <settings-dialog :dialog.sync="settingsDialog"></settings-dialog>

    </main>

    <v-footer :fixed="true">
      <span>2017</span>
      <v-spacer></v-spacer>
      <v-btn icon @click.native.stop="settingsDialog = true">
        <v-icon>settings</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import RemotesList from './components/RemotesList.vue'
import SettingsDialog from './components/SettingsDialog.vue'

export default {
  components: {
    RemotesList,
    SettingsDialog
  },
  data() {
    return {
      settingsDialog: false
    }
  },
  methods: {
    add() {
      this.$router.push('/remote');
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'

  main
    height: 475px
</style>
