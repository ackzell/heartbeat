<template>
  <v-list-tile avatar>
    <v-list-tile-avatar>
      <transition name="fade">
        <v-icon v-if="remote.status === 'online'" class="light-green darken-1 white--text">swap_vertical_circle</v-icon>
        <v-icon v-else class="grey lighten-2 white--text">report_problem</v-icon>
      </transition>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title>{{ remote.alias }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ remote.uri }}</v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <v-menu>
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile :to="{ path: `remote/${remote._id}` }">
            <v-list-tile-title>Edit</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="removeRemote( remote._id )">
            <v-list-tile-title>Remove</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-list-tile-action>

  </v-list-tile>
</template>

<script>

import { mapActions } from 'vuex'
import Monitor from '../mixins/pingLogic'

export default {
  mixins: [Monitor],
  props: {
    remote: {
      type: Object,
      default() {
        return {
          alias: '',
          uri: '',
          status: '-',
          _id: '',
          interval: 0
        }
      }
    }
  },
  data() {
    return {
      monitor: null
    }
  },
  methods: {
    ...mapActions([
      'removeRemote'
    ])
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .8s
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}
</style>
