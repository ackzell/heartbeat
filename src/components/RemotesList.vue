<template>
  <v-list two-line>
      <remote v-for="(key, val, idx) in remotesList" :key="idx"
              :alias="key.alias"
              :uri="key.uri"
              :status="key.status"
              ></remote>
  </v-list>
</template>

<script>
import Remote from './Remote.vue'


export default {
  components: {
    Remote
  },
  props: {
    remotesList: Array
  },
  data() {
    return {
    }
  }
}
</script>

<style>

</style>
