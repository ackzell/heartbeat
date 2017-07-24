<template>
      <v-card class="elevation-0" style="position: relative;">
        <v-card-title>Remote</v-card-title>
        <v-card-text>
          <v-text-field prepend-icon="visibility" label="Alias"></v-text-field>
          <v-text-field prepend-icon="cloud" label="URI"></v-text-field>
          <v-text-field prepend-icon="timer" label="Interval" suffix="ms"></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat class="" @click.native="save">Save</v-btn>
            <v-btn flat @click.native="cancel">Cancel</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  methods: {
    cancel() {
      console.log('meeh')
      this.$router.push({ path: '/'})
    },
    save() {

    }
  }
}
</script>
