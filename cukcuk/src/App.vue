<script setup>
import TheHeader from "./layout/TheHeader.vue";
import TheSidebar from "./layout/TheSidebar.vue";
import TheMain from "./layout/TheMain.vue";
</script>

<template>
  <div id="app">
    <TheHeader />
    <div class="main__content">
      <TheSidebar />
      <TheMain>
      </TheMain>
    </div>
  </div>
</template>

<style scoped lang="scss">
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main__content {
  display: flex;
  height: calc(100% - 56px);
  background-color: #b90e0e;
}
</style>
