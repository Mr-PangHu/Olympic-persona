<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  position: fixed;
  z-index: -1;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  background-color: rgba(144, 144, 144, 0.3);
}
::-webkit-scrollbar-track {
  position: fixed;
  z-index: -1;
  right: 0;
  bottom: 0;
  background-color: transparent;
}
</style>
