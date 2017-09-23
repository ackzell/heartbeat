<template>
  <v-card class="remotes-list" v-if="allRemotes.length">
    <v-list two-line>
      <remote v-for="rem in allRemotes"
              :key="rem.id"
              :remote="rem">
      </remote>
    </v-list>
  </v-card>
  <v-card v-else class="no-remotes text-xs-center elevation-1">
    <v-card-text>
      Please Add a remote to listen to
    </v-card-text>
  </v-card>
</template>

<script>
import Remote from './Remote.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Remote
  },
  computed: {
    ...mapGetters([
      'allRemotes'
    ])
  }
}
</script>

<style lang="stylus">

  .no-remotes
    top: 160px

</style>
