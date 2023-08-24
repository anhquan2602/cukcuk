<template>
  <header class="header">
    <div class="header__left">
      <div class="header__logo"></div>
      <div class="header__title"></div>
    </div>
    <div class="header__right">
      <div class="left__side">
        <MISACombobox combobox value placeholder="Chuỗi nhà hàng" filter style="width: 220px;"/>
        <MISACombobox placeholder="Tiếng Việt" />
      </div>
      <div class="right__side">
        <div class="pop__right-side">
         <div class="icon__header"></div>
         <div class="icon__header"></div>
        </div>
        <div class="avatar__right-side">
          <div class="avatar__header"></div>
          <div class="name__header" style="color: white;">Anh Quân</div>
          <div class="dropdown__header"></div>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import MISACombobox from "../components/combobox/MISACombobox.vue";
import MISAIcon from "../components/icon/MISAIcon.vue";
</script>
<style lang="scss">
@import url(./theheader.scss);
</style>