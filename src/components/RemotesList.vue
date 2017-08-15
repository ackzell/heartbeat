<template>
  <v-card class="remotes-list" v-if="allRemotes.length">
    <v-list two-line>
      <remote v-for="(key, val, idx) in allRemotes" :key="idx" :alias="key.alias" :uri="key.uri" :status="key.status"></remote>
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

  .remotes-list
    top: -15px
  .no-remotes
    top: 160px

</style>
