<template>
  <div>
    <remote v-for="x in 10"></remote>
  </div>
</template>

<script>
import Remote from './Remote.vue'
export default {
  components: {
    Remote
  }
}
</script>

<style>

</style>
