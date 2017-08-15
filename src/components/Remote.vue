<template>
  <v-list-tile avatar>
  
    <v-list-tile-avatar>
      <v-icon v-if="status === 'online'" class="light-green darken-1 white--text">swap_vertical_circle</v-icon>
      <v-icon v-else class="grey lighten-2 white--text">report_problem</v-icon>
    </v-list-tile-avatar>
  
    <v-list-tile-content>
      <v-list-tile-title>{{ alias }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ uri }}</v-list-tile-sub-title>
    </v-list-tile-content>
  
    <v-list-tile-action>
      <v-menu>
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-title>Edit</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click.native="deleteRemote( uri )">
            <v-list-tile-title>Remove</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-list-tile-action>
  
  </v-list-tile>
</template>

<script>

export default {
  props: {
    alias: String,
    uri: String,
    status: String
  },
  methods: {
    deleteRemote(uri) {
      this.$store.commit('deleteRemote', uri)
    }
  }
}
</script>

<style lang="stylus">

</style>
