<template>
  <div v-if="isShow" class="overley-dialog">
    <div @click.stop class="modal-dialog">
      <div class="quan-dialog">
        <div class="dialog-header">
          <h3 class="dialog-title">{{ title }}</h3>
        </div>
        <div class="dialog-body">
          <p v-if="icon" class="dialog-icon center">
            <MISAIcon width="24" height="24" :icon="icon"></MISAIcon>
          </p>
          <template v-if="errorMessage.length > 0">
            <MISACol
              ><p>{{ errorMessage }}</p>
            </MISACol>
          </template>
          <p>{{ content }}</p>
        </div>
        <div class="dialog-function">
          <MISAButton
            style="width: 75px; height: 25px; font-weight: normal"
            type="i-pri"
            action="Có"
            @click="submitDialog"
          >
          </MISAButton>
          <MISAButton
            style="width: 75px; height: 25px; font-weight: normal"
            type="i-pri"
            action="Không"
            @click="handleClose"
          >
          </MISAButton>
          <MISAButton
            style="width: 86px; height: 25px; font-weight: normal"
            type="i-pri"
            action="Hủy bỏ"
            @click="dialog.close()"
          >
          </MISAButton>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import url(./dialog.scss);
</style>
<script setup>
import { storeToRefs } from "pinia";
import { useDialog } from "../../stores/dialog";
import Enum from "../../common/enum.js";
import { useModalForm } from "../../stores/modalform";
import MISAButton from "../button/MISAButton.vue";
const emit = defineEmits(["delete-data", "submit-form"]);
const dialog = useDialog();
const modal = useModalForm();

const {
  objectData,
  isShow,
  actionDialog,
  buttonThird,
  title,
  content,
  type,
  buttonSec,
  icon,
  method,
  buttonType,
  errorMessage,
} = storeToRefs(dialog);
const handleClose = () => {
  dialog.close();
  modal.close();
};
/**
 * Author: Anh Quân (30/06/2023)
 * Description: Hàm click submit dialog
 */

const submitDialog = () => {
  if (buttonType.value === "Close") {
    dialog.close();
    emit("close-dialog");
  }
  if (
    method.value === Enum.EditMode.Add ||
    method.value === Enum.EditMode.Update
  ) {
    emit("submit-form", objectData.value, false);
  }
  if (method.value === Enum.EditMode.Delete) {
    emit("delete-data");
  } else {
    dialog.close();
  }
};
</script>