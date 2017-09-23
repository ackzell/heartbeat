<template>
  <v-list-tile avatar>

    <v-list-tile-avatar>
      <v-icon v-if="remote.status === 'online'" class="light-green darken-1 white--text">swap_vertical_circle</v-icon>
      <v-icon v-else class="grey lighten-2 white--text">report_problem</v-icon>
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
          <v-list-tile :to="{ path: `remote/${remote.id}` }">
            <v-list-tile-title>Edit</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click.native="deleteRemote( remote.id )">
            <v-list-tile-title>Remove</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-list-tile-action>

  </v-list-tile>
</template>

<script>

import { mapState } from 'vuex'


const Monitor = require('ping-monitor')

export default {
  props: {
    remote: {
      type: Object,
      default() {
        return {
          alias: '',
          uri: '',
          status: '-',
          id: '',
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
  mounted() {

    console.log(' triggering twice? ')

    this.monitor = new Monitor({
      website: this.remote.uri,
      interval: (10 / 60)
    })

    this.monitor.start()

    this.monitor.on('up', res => {

      console.log('Yay!! ' + this.remote.alias + ' is up.')

      if (this.$store.getters.currentStatus(this.remote.id) !== 'online') {
        this.$store.commit('updateStatus', { remoteId: this.remote.id, status: 'online' })
      }

    })

    this.monitor.on('error', err => {
      console.error('oops', err)
      this.$store.commit('updateStatus', { remoteId: this.remote.id, status: '-' })
    })
  },
  methods: {
    deleteRemote(id) {
      this.$store.commit('deleteRemote', id)
    }
  }
}
</script>

<style lang="stylus">

</style>
