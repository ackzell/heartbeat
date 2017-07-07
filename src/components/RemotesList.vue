<template>
  <v-card>
    <v-card-title primary-title class="light-blue white--text">
      <div class="headline">My Remotes List</div>
    </v-card-title>
    <v-list>
      <remote v-for="(key, val, idx) in myRemotes" :key="idx" :name="key.alias"></remote>
    </v-list>
  </v-card>
</template>

<script>
import Remote from './Remote.vue'


const services = [
  {
    uri: 'http://localhost:8761/health',
    alias: 'Registry',
  },
  {
    uri: 'http://localhost:9999/uaa/health',
    alias: 'SSO',
  },
  {
    uri: 'http://localhost:8765/health',
    alias: 'Gateway this is a very long name 2234',
  },
  {
    uri: 'http://localhost:9090/health',
    alias: 'Homepage',
  },
  {
    uri: 'http://localhost:8010/health',
    alias: 'Consumer Exposure longer name',
  }
];

export default {
  components: {
    Remote
  },
  data() {
    return {
      myRemotes: services
    }
  }
}
</script>

<style>

</style>
