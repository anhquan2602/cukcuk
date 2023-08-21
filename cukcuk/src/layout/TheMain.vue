<template>
  <div class="main">
    <div class="main__title">
      Thực đơn
      <div class="feedback">
        <MISAButton
          style="
            margin: 0px;
            width: 104px;
            height: 28px;
            right: 8px;
            left: 8px;
            top: 14px;
            font-weight: normal;
          "
          type="i-pri"
          action="Phản hồi"
        >
          <template #icon>
            <MISAIcon icon="feedback" />
          </template>
        </MISAButton>
      </div>
    </div>
    <div class="main__content">
     <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
</script>
<style lang="scss">
.main {
  background-color: white;
  padding: 24px 6px 6px 6px;
  padding-top: 16px;
  height: 100%;
  flex: 1;
  width: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  z-index: 1;
  .main__title {
    font-size: 22px;
    line-height: 24px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;

    .feedback {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .main__content{
    width: 100%;
    height: 100%;
    border: 1px solid var(--boder-color-main);
  }
}
</style>