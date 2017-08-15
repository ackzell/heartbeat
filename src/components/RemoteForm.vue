<template>
  <form @keyup.enter="save">
    <v-card style="position: relative; top: -15px" class="pa-2">
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
      this.$store.commit('addRemote', this.remote)
      this.$router.push({ path: '/' })
    },
  },
  data() {
    return {
      remote: {}
    }
  }
}
</script>
