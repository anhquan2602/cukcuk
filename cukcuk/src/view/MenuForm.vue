<template>
  <MISAModalForm @keydown="handleKeydown" @close-modal="closeForm">
    <div class="menu-form">
      <div class="tab">
        <ul>
          <li
            class="tab-item"
            :class="{ 'active-tab': !isTab }"
            @click="isTab = false"
          >
            Thông tin chung
          </li>
          <li
            class="tab-item"
            :class="{ 'active-tab': isTab }"
            @click="isTab = true"
          >
            Sở thích phục vụ
          </li>
        </ul>
      </div>
      <div class="favor-form" v-show="isTab === true">
        <div class="title-favor">Món ăn:</div>
        <div class="detail-favor">
          <div class="icon-detail"></div>
          <p class="detail">
            Ghi lại các sở thích của khách hàng giúp nhân viên phục vụ chọn
            nhanh order.
            <br />
            VD: không cay/ít hành/thêm phomai...
          </p>
        </div>
        <!-- table favorite -->
        <div class="table-favor">
          <div class="wraped-table">
            <table>
              <thead class="thead">
                <th style="width: 60%">Sở thích phục vụ</th>
                <th>Thu thêm</th>
              </thead>
              <tbody class="tbody">
                <tr
                  class="row-default"
                  v-for="(row, index) in rowTableFavor"
                  :key="index"
                >
                  <td  >
                    <MISACombobox
                      class="combo_thead"
                      :class="{ 'isFocus': isFocusCombobox }"
                      style="z-index: 9; width: 100%; height: 100%"
                      plus
                      search
                      combobox
                    ></MISACombobox>
                  </td>
                  <td>
                    <MISAInput placeholder="0" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="function-tbody">
            <MISAButton
              style="
                padding-left: 5px;
                width: 100px;
                height: 25px;
                font-weight: normal;
              "
              type="i-pri"
              action="Thêm dòng"
              @click="addRow()"
            >
              <template #icon>
                <MISAIcon icon="add" />
              </template>
            </MISAButton>
            <MISAButton
            :disabled="isButtonDisabled"
            @click="deleteRow()"
              style="
                padding-left: 5px;
                width: 100px;
                height: 25px;
                font-weight: normal;
              "
              type="i-pri"
              action="Xóa dòng"
            >
              <template #icon>
                <MISAIcon icon="delete" />
              </template>
            </MISAButton>
          </div>
        </div>
      </div>
      <div class="main-form" v-show="isTab === false">
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
            combobox
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
            <MISACombobox combobox class="combo_thead" plus></MISACombobox>
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
            <MISACombobox
            combobox
              placeholder="Bếp"
              class="combo_thead"
              plus
            ></MISACombobox>
          </div>
          <div class="group-checkbox">
            <input type="checkbox" />
            <div class="title-checkbox">Không hiện thị trên thực đơn</div>
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
import { onMounted, ref, watch } from "vue";
import { convertNewDate } from "../common/convert-data.js";
import Enum from "../common/enum.js";
import { Validator } from "../common/validatior.js";
import { useDialog } from "../stores/dialog";
import { useModalForm } from "../stores/modalform";
import MISAInput from "../components/input/MISAInput.vue";

const formData = ref({})
const dialog = useDialog()
const isButtonDisabled = ref(true);
const couterChangeForm = ref(0);
const validateForm = ref({});
const modalForm = useModalForm();
const lissErrorMessage = ref([]);
const isTab = ref(false);
const isFocusCombobox = ref(false);
const rowTableFavor = ref([
  {
    favor: "",
    price: "",
  },
]);

/**
 * AUTHOR: Anh Quân (27/06/2023)
 * Description: Thêm một dòng vào table
 */
const newRow = ref({
  favor: "",
  price: 0,
});


// Thêm dòng mới vào table sở thích
function addRow() {
  rowTableFavor.value.push({ newRow }); // thêm dòng mới vào table
  isFocusCombobox.value = true;
  if (rowTableFavor.value.length > 0 ) {
    isButtonDisabled.value = false;
  }else{
    isButtonDisabled.value = true;
  }
}
function deleteRow() {
  rowTableFavor.value.pop({ newRow });
}
/*
 **
 * Author: Anh Quân (27/06/2023)
 * Description: hàm đóng modal
 * nếu thay đổi dữ liệu mà đóng modal thì bật dialog
 */
function closeForm() {
  console.log(lissErrorMessage.value);
  // nếu có lỗi thì đóng form
  if (lissErrorMessage.value.length > 0) {
    modalForm.close();
  } else if (couterChangeForm.value > 1) {
    dialog.setObjectData(formData.value);
    dialog.setMethod(modalForm.method);
    dialog.open({
      title: "Có sự thay đổi",
      content: "Dữ liệu bị thay đổi. Bán có muốn cất không ?",
      action: "Có",
      buttonSec: "Không",
      type: "pri",
      icon: "warning",
      buttonThird: "Hủy",
    });
  } else {
    modalForm.close();
  }
}
/**
 * Author: Anh Quân (03/07/2023)
 * Description: hàm để lấy ra danh sách lỗi khi có lỗi thì add list lỗi vào mảng
 */
 const getListErrorMessage = () => {
  const listError = Object.keys(validateForm.value).map((key) => validateForm.value[key])
  lissErrorMessage.value = listError
  return listError
}
/**
 * Author: Anh Quân (11/07/2023)
 * Description: hàm xử lý khi gõ phím gửi form
 */
const handleKeydown = (e) => {
  if (e.ctrlKey && e.shiftKey && e.keyCode === Enum.Keyboard.S) {
    e.preventDefault();
    buttonSaveAdd.value.$emit("click");
    return;
  }
  if (e.ctrlKey && e.keyCode === Enum.Keyboard.S) {
    e.preventDefault();
    buttonSave.value.$emit("click");
  }
  if (e.keyCode === Enum.Keyboard.ESC) {
    closeForm();
  }
};
watch(
  () => validateForm.value,
  () => {
    getListErrorMessage();
  },
  { deep: true }
);


/**
 * Author: Anh Quân (03/07/2023)
 * Description: watch kiểm tra khi form thay đổi lưu
 */
 watch(
  () => formData.value,
  () => {
    couterChangeForm.value++
  },
  { deep: true }
)

/**
 * Author: Anh Quân (28/06/2023)
 * Description: Hàm get api bộ phận làm việc
 */
 const getDataUnit = async () => {
  try {
    departmentApi.method = Enum.ApiMethod.GET
    const res = await departmentApi.request()
    departments.value = res.data.map((data) => {
      return {
        option: data.DepartmentName,
        value: data.DepartmentId
      }
    })
  } catch (error) {
    console.log(error)
  }
}
</script>
<style lang="scss">
@import url(./form.scss);
</style>