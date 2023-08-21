<template>
  <MISAModalForm @keydown="handleKeydown" @close-modal="closeForm">
    <div class="menu-form">
      <div class="tab">
        <ul>
          <li class="tab-item">Thông tin chung</li>
          <li class="tab-item">Sở thích phục vụ</li>
        </ul>
      </div>
      <div class="main-form">
        <div class="main-left">
          <div class="group-input">
            <div class="title-input">
              <div class="name-input">Tên món</div>
              <span class="require">(*)</span>
            </div>
            <MISAInput></MISAInput>
          </div>
          <div class="group-input">
            <div class="title-input">
              Mã món
              <span class="require">(*)</span>
            </div>
            <MISAInput></MISAInput>
          </div>
          <div class="group-input">
            <div class="title-input">Nhóm thực đơn</div>
            <MISACombobox
              class="combo_thead"
              style="z-index: 9"
              plus
            ></MISACombobox>
          </div>
          <div class="group-input">
            <div class="title-input">
              Đơn vị tính
              <span class="require">(*)</span>
            </div>
            <MISACombobox class="combo_thead" plus></MISACombobox>
          </div>
          <div class="group-input">
            <div class="title-input" style="width: 100px">
              Giá bán
              <span class="require">(*)</span>
            </div>
            <MISAInput style="width: 150px" placeholder="0"></MISAInput>
          </div>
          <div class="group-input">
            <div class="title-input" style="width: 100px">Giá vốn</div>
            <MISAInput style="width: 150px" placeholder="0"></MISAInput>
          </div>
          <div class="group-input">
            <div class="title-input" style="width: 125px">Mô tả</div>
            <Textarea class="text-area"></Textarea>
          </div>
          <div class="group-input">
            <div class="title-input">Chế biến tại</div>
            <MISACombobox placeholder="Bếp" class="combo_thead" plus></MISACombobox>
          </div>
        </div>
        <div class="main-right">
          <div class="image-choosing">
            <div class="title-image">Ảnh đại diện</div>
            <div class="main-image">
              <div class="main-image-left">
                <MISAButton
                  type="default"
                  action="Biểu tượng"
                  style="
                    box-sizing: border-box;
                    padding: 2px 4px;
                    font-weight: normal;
                  "
                >
                  <template #icon>
                    <MISAIcon icon="pen" />
                  </template>
                </MISAButton>
              </div>
              <div class="main-image-right">
                <MISAButton
                  style="
                    margin: 0px;
                    width: 24px;
                    height: 24px;
                    font-weight: normal;
                  "
                  type="i-pri"
                  action="..."
                  class="firstBtn"
                >
                </MISAButton>
                <MISAButton
                  style="
                    margin: 0px;
                    width: 24px;
                    height: 24px;
                    font-weight: normal;
                    text-align: center;
                    color: red;
                  "
                  type="i-pri"
                  action="x"
                >
                </MISAButton>
              </div>
            </div>
            <div class="script-image">
              <div class="script-small">Chọn các ảnh có định dạng</div>
              <div class="script-big">(.jpg, .jpeg, .png, .gif)</div>
            </div>
            <button class="btn-pick">Chọn từ thư viện ảnh</button>
          </div>
        </div>
      </div>
    </div>
    <template #action>
      <div class="function-footer">
        <div class="function-left">
          <MISAButton
            style="width: 75px; height: 25px; font-weight: normal"
            type="i-pri"
            action="Giúp"
          >
            <template #icon>
              <MISAIcon icon="help" />
            </template>
          </MISAButton>
        </div>
        <div class="function-right">
          <MISAButton
            style="width: 75px; height: 25px; font-weight: normal"
            type="i-pri"
            action="Cất"
          >
            <template #icon>
              <MISAIcon icon="save" />
            </template>
          </MISAButton>
          <MISAButton
            style="width: 123px; height: 25px; font-weight: normal"
            type="i-pri"
            action="Cất & Thêm"
          >
            <template #icon>
              <MISAIcon icon="saveadd" />
            </template>
          </MISAButton>
          <MISAButton
            style="width: 86px; height: 25px; font-weight: normal"
            type="i-pri"
            action="Hủy bỏ"
            @click="closeForm"
            @keydown.enter="closeForm"
          >
            <template #icon>
              <MISAIcon icon="cancel" />
            </template>
          </MISAButton>
        </div>
      </div>
    </template>
  </MISAModalForm>
</template>
<script setup>
import MISAButton from "../components/button/MISAButton.vue";
import MISACombobox from "../components/combobox/MISACombobox.vue";
import MISAModalForm from "../components/modalform/MISAModalForm.vue";
import { onMounted, ref, watch } from 'vue'
import { convertNewDate } from '../common/convert-data.js'
import Enum from '../common/enum.js';
import { Validator } from '../common/validatior.js'
import { useDialog } from '../stores/dialog'
import { useModalForm } from '../stores/modalform'

const couterChangeForm = ref(0)
const validateForm = ref({
})
const modalForm = useModalForm()
const lissErrorMessage = ref([])
/*
 **
 * Author: Anh Quân (27/06/2023)
 * Description: hàm đóng modal
 * nếu thay đổi dữ liệu mà đóng modal thì bật dialog
 */
 function closeForm() {
  // nếu có lỗi thì đóng form
  if (lissErrorMessage.value.length > 0) {
    modalForm.close()
  } else if (couterChangeForm.value > 1) {
    dialog.setObjectData(formData.value)
    dialog.setMethod(modalForm.method)
    dialog.open({
      title: 'Có sự thay đổi',
      content: 'Dữ liệu bị thay đổi. Bán có muốn cất không ?',
      action: 'Có',
      buttonSec: 'Không',
      type: 'pri',
      icon: 'warning',
      buttonThird: 'Hủy'
    })
  } else {
    modalForm.close()
  }
}

/**
 * Author: Anh Quân (11/07/2023)
 * Description: hàm xử lý khi gõ phím gửi form
 */
 const handleKeydown = (e) => {
  if (e.ctrlKey && e.shiftKey && e.keyCode === Enum.Keyboard.S) {
    e.preventDefault()
    buttonSaveAdd.value.$emit('click')
    return
  }
  if (e.ctrlKey && e.keyCode === Enum.Keyboard.S) {
    e.preventDefault()
    buttonSave.value.$emit('click')

  }
  if (e.keyCode === Enum.Keyboard.ESC) {
    closeForm()
  }
}
watch(
  () => validateForm.value,
  () => {
    getListErrorMessage()
  },
  { deep: true }
)
</script>
<style lang="scss">
@import url(./form.scss);
</style>