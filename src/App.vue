<template>
  <v-app>
    <main>
      <v-container fluid class="pa-0">
        <v-slide-y-transition mode="out-in">
          <v-layout>
            <v-flex>
              <v-card>

                <v-toolbar class="primary" dark fixed>
                  <v-toolbar-title>Heartbeat</v-toolbar-title>
                   <v-btn fab
                          bottom
                          absolute
                          right
                          dark
                          class="mr-5"
                          @click.native.stop="add"
                          >
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-toolbar>

                <v-card-text class="pa-0">
                 <remotes-list :remotes-list="services"></remotes-list>
                </v-card-text>

              </v-card>
            </v-flex>
          </v-layout>
        </v-slide-y-transition>
      </v-container>

      <settings-dialog :dialog.sync="settingsDialog"></settings-dialog>

    </main>

    <v-footer :fixed="true">
      <span>&copy; 2017</span>
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

  const services = [
  {
    uri: 'http://localhost:8761/health',
    alias: 'Registry',

  },
  {
    uri: 'http://localhost:9999/uaa/health',
    alias: 'SSO',
  },
  {
    uri: 'http://localhost:8765/health',
    alias: 'Gateway this is a very long name 2234',
    status: 'online'
  },
  {
    uri: 'http://localhost:9090/health',
    alias: 'Homepage',
  },
  {
    uri: 'http://localhost:8010/health',
    alias: 'Consumer Exposure longer name',
  }
]

  export default {
    components: {
      RemotesList,
      SettingsDialog
    },
    data () {
      return {
        services,
        settingsDialog: false
      }
    },
    methods: {
      add() {

      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
