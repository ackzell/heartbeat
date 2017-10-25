<template>
  <v-app dark>

    <v-toolbar style="-webkit-app-region: drag;" dark fixed>

      <v-toolbar-title>Heartbeat</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-icon>close</v-icon>
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

      <v-btn icon @click.native.stop="settingsDialog = true">
        <v-icon class="grey--text text--darken-3">settings</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-scale-transition mode="out-in" origin="center center">
        <v-btn v-if="!$route.path.includes('/remote')" fab top right absolute class=" accent" @click.native.stop="add">
          <v-icon>add</v-icon>
        </v-btn>
      </v-scale-transition>

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
      this.$router.push('/remote')
    }
  }
}
</script>

<style lang="stylus">
@import './stylus/main';

.container {
  background-color: $grey.darken-3;
  overflow: scroll;
}

html, body {
  height: 100%;
  width: 100%;
  overflow: auto;
}

html {
  overflow: hidden;
}
</style>
