<template>
    <v-list-tile>

      <v-list-tile-content>
        <v-list-tile-title>{{ name }}</v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <i v-if="status === 'UP'"
            class="material-icons md-18 online">swap_vertical_circle</i>
        <i v-else
            class="material-icons md-18 offline">report_problem</i>
      </v-list-tile-action>

    </v-list-tile>
</template>

<script>
export default {
  props: {
    name: String,
    status: String
  }
}
</script>

<style lang="stylus">
.offline
  color: #8091ff

.online
  color: #36e0d2

</style>
