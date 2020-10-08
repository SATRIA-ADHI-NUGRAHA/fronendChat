<template>
  <div class="container">
    <h1>GOOGLE MAPS</h1>
    <google-maps class="map" :center="{lat: -6.923477, lng: 107.606335}" :zoom="12"></google-maps>
  </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'

export default {
  components: {
    'google-maps': VueGoogleMaps.Map
  }
}
</script>
<style scoped>
  .map {
    width: 100%;
    height: 500px;
  }
</style>
