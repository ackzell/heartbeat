<template>
  <v-app>
    <main>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>

            <v-tabs dark centered grow>

              <v-tabs-bar slot="activators">

                <v-tabs-slider class="white"></v-tabs-slider>

                <v-tabs-item href="#remotes-list" >
                  Remotes list
                </v-tabs-item>
                <v-tabs-item href="#tab-2" >
                  Config
                </v-tabs-item>
              </v-tabs-bar>

              <v-tabs-content id="remotes-list">
                <v-layout justify-center>
                  <v-flex xs8 class="mt-5 mb-5">
                    <v-card class="pb-4">
                      <v-card-text>
                        <v-btn
                        absolute
                        dark
                        fab
                        bottom
                        right
                        small
                        class="primary"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                      <remotes-list></remotes-list>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-tabs-content>

              <v-tabs-content id="tab-2">
                <v-card>
                  hello
                </v-card>
              </v-tabs-content>

            </v-tabs>

          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </main>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed">
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import RemotesList from './components/RemotesList.vue'

  export default {
    components: {
      RemotesList
    },
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'bubble_chart', title: 'Inspire' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'heartbeat'
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
