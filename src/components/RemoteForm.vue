<template>
  <div>
    <v-progress-linear :indeterminate="true" v-if="loading">
    </v-progress-linear>

    <form v-if="!loading" @keyup.enter="save" @keyup.esc="cancel">

      <v-card class="pa-2 elevation-0">

        <v-card-title>Remote</v-card-title>
        <v-card-text>
          <v-text-field prepend-icon="visibility" label="Alias" suffix=" " v-model="remote.alias" autofocus></v-text-field>
          <v-text-field prepend-icon="cloud" prefix="http://" suffix=" " :value="remote.uri | hideProtocol" @input="value => { remote.uri = value }"></v-text-field>
          <v-text-field prepend-icon="timer" label="Interval" suffix="s" v-model="remote.interval"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="cancel">Cancel</v-btn>
          <v-btn class="secondary" @click.native="save">Save</v-btn>
        </v-card-actions>

      </v-card>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    cancel() {
      this.$router.push({ path: '/' })
    },
    save() {
      // this is the data we want to actually persist
      const remote = {
        _id: this.remote._id,
        alias: this.remote.alias,
        uri: this.remote.uri,
        interval: this.remote.interval,
        monitoring: this.remote.monitoring
      }

      this.loading = true
      this.$store.dispatch('storeRemote', remote).then(
        () => {
          this.loading = false
          this.$router.push({ path: '/' })
        },
        err => {
          console.log(err)
        }
      )
    }
  },
  created() {
    this.loading = false
    this.remote = this.$store.getters.remote(this.remote._id)
    this.remote.interval =
      this.remote.interval || this.$store.getters.defaultInterval
    this.remote.monitoring = this.remote.monitoring || true
    this.remote.status = this.remote.status || '-'
  },
  data() {
    return {
      loading: true,
      remote: {
        alias: this.$route.params ? this.$route.params.alias : '',
        uri: this.$route.params ? this.$route.params.uri : '',
        interval: this.$route.params ? this.$route.params.interval : '',
        _id: this.$route.params ? this.$route.params._id : null
      }
    }
  },
  filters: {
    hideProtocol: function(value) {
      if (!value) return ''
      value = value.toString()
      return value.replace('http://', '')
    }
  }
}
</script>
