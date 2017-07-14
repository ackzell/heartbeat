<template>
    <v-list-tile avatar>
      <v-list-tile-avatar>
        <i v-if="status === 'online'"
            class="material-icons md-24 online">swap_vertical_circle</i>
        <i v-else
            class="material-icons md-24 offline">report_problem</i>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ alias }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ uri }}</v-list-tile-sub-title>
      </v-list-tile-content>

    </v-list-tile>

</template>

<script>
export default {
  props: {
    alias: String,
    uri: String,
    status: String
  }
}
</script>

<style lang="stylus">
.offline
  color: lightgray

.online
  color: yellowgreen

</style>
