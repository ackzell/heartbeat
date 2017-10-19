<template>
  <v-list two-line v-if="allRemotes.length">
    <v-subheader>Remotes list</v-subheader>
    <transition-group name="list" type="transition">
      <remote v-for="rem in allRemotes" :key="rem._id" :remote="rem" class="list-item">
      </remote>
    </transition-group>
  </v-list>
  <v-card v-else class="no-remotes text-xs-center elevation-1">
    <v-card-text>
      Please add a remote to listen to
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
    ...mapGetters(['allRemotes'])
  }
}
</script>

<style lang="stylus">
.no-remotes {
  top: 160px;
}

.list-item {
  transition: all 1s;
  display: block;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
