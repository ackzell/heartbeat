<template>
  <form @keyup.enter="save">
    <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
    <v-card v-if="!loading" class="pa-2">
      <v-card-title>Remote</v-card-title>
      <v-card-text>
        <v-text-field prepend-icon="visibility" label="Alias" suffix=" " v-model="remote.alias"></v-text-field>
        <v-text-field prepend-icon="cloud" label="URI" suffix=" " v-model="remote.uri"></v-text-field>
        <v-text-field prepend-icon="timer" label="Interval" suffix="ms" v-model="remote.interval"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat class="" @click.native="save">Save</v-btn>
        <v-btn flat @click.native="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>

<script>
export default {
  methods: {
    cancel() {
      this.$router.push({ path: '/' })
    },
    save() {
      this.$store.commit('saveRemote', this.remote)
      this.$router.push({ path: '/' })
    },

  },
  created() {
    this.loading = false;
    this.remote = this.$store.getters.remote(this.remote.id)
    this.remote.interval = this.remote.interval || this.$store.getters.defaultInterval
  },
  data() {
    return {
      loading: true,
      remote: {
        alias: this.$route.params ? this.$route.params.alias : '',
        uri: this.$route.params ? this.$route.params.uri : '',
        interval: this.$route.params ? this.$route.params.interval : '',
        id: this.$route.params ? this.$route.params.id : null
      }
    }
  }
}
</script>
