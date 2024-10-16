<template>
    <div id="map"></div>
</template>

<script setup>
  import useMap from './setEcahrt'
  import { nextTick } from 'vue'
  nextTick(() => {
    const { myChart } = useMap(document.getElementById('map'))
  })
</script>

<style scoped lang="less">
#map {
  width: 100%;
  height: 100%;
}
</style>
