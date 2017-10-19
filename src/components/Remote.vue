<template>
  <v-list-tile avatar>
    <v-list-tile-avatar>
      <transition name="fade">
        <v-icon class="white--text" :class="icon.classes">{{icon.name}}</v-icon>
      </transition>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title>{{ remote.alias }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ remote.uri }}</v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <v-layout>
        <v-switch v-model="remote.monitoring" color="primary" @change="toggleMonitor"></v-switch>
        <v-menu>
          <v-btn icon slot="activator" class="ml-2">
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
      </v-layout>
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
          interval: 0,
          monitoring: true
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
    ...mapActions(['removeRemote']),
    toggleMonitor(event) {
      this.remote.status = '-'

      if (this.remote.monitoring) {
        this.createMonitor()
      } else {
        this.destroyMonitor()
      }

      this.$store.dispatch('storeRemote', this.remote)
    }
  },
  computed: {
    icon() {
      let name = ''
      let classes = []

      if (
        !this.remote.monitoring ||
        !this.remote.status ||
        this.remote.status === '-'
      ) {
        name = 'report_problem'
        classes = ['grey', 'lighten-2']
      } else {
        if (this.remote.status === 'online') {
          name = 'swap_vert'
          classes = ['light-green', 'darken-1']
        } else if (this.remote.status === 'offline') {
          name = 'not_interested'
          classes = ['red', 'darken-1']
        }
      }

      return {
        name,
        classes
      }
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
