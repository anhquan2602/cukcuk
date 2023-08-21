<template>
  <div class="menu-food">
    <div class="menu-function">
      <MISAButton
        type="default"
        action="Thêm"
        style="
          height: 90%;
          box-sizing: border-box;
          margin-left: 2px;
          padding: 2px 4px;
          font-weight: normal;
        "
        @click="showModalAddFood"
      >
        <template #icon>
          <MISAIcon icon="add" />
        </template>
      </MISAButton>
      <MISAButton
        type="default"
        action="Nhân bản"
        style="
          height: 90%;
          box-sizing: border-box;
          margin-left: 2px;
          padding: 2px 4px;
          font-weight: normal;
        "
      >
        <template #icon>
          <MISAIcon icon="copy" />
        </template>
      </MISAButton>
      <MISAButton
        type="default"
        action="Sửa"
        style="
          height: 90%;
          box-sizing: border-box;
          margin-left: 2px;
          padding: 2px 4px;
          font-weight: normal;
        "
      >
        <template #icon>
          <MISAIcon icon="edit" />
        </template>
      </MISAButton>
      <MISAButton
        type="default"
        action="Xóa"
        style="
          height: 90%;
          box-sizing: border-box;
          margin-left: 2px;
          padding: 2px 4px;
          font-weight: normal;
        "
      >
        <template #icon>
          <MISAIcon icon="delete" />
        </template>
      </MISAButton>
      <MISAButton
        type="default"
        action="Nạp"
        style="
          height: 90%;
          box-sizing: border-box;
          margin-left: 2px;
          padding: 2px 4px;
          font-weight: normal;
        "
        >>
        <template #icon>
          <MISAIcon icon="reload" />
        </template>
      </MISAButton>
    </div>
    <div class="quan-table">
      <MISATableVue :columns="columnsTable" :dataTable="dataTable" />
    </div>
  </div>
  <teleport to="#app">
    <MenuForm
    v-if="isShow">
    </MenuForm>
  </teleport>
</template>
<style lang="scss">
@import url(./menu.scss);
</style>
<script setup>
import { ref, watch } from "vue";
import MISACombobox from "../components/combobox/MISACombobox.vue";
import MISATableVue from "../components/table/MISATable.vue";
import { convertDataTable } from "../common/convert-data.js";
import { storeToRefs } from 'pinia'
import { useModalForm } from '../stores/modalform'
import Enum from "../common/enum.js";
import MenuForm from "./MenuForm.vue";


const modalForm = useModalForm()
const { isShow, method, object } = storeToRefs(modalForm)
const columnsTable = ref();
const dataTable = ref([]);
// /**
//  * Author: Anh Quân (11/07/2023)
//  * Description: Hàm set các loại cột cho table
//  */
const setColumnTable = () => {
  columnsTable.value = [
    {
      title: "Loại món",
      dataIndex: "id",
      key: "FoodId",
      type: "id",
      tooltip: "Loại món",
      inputType: "combobox",
    },
    {
      title: "Mã món",
      dataIndex: "code",
      key: "FoodCode",
      type: "code",
      tooltip: "Mã món",
      inputType: "filter",
    },
    {
      title: "Tên món",
      dataIndex: "name",
      key: "FoodName",
      type: "name",
      tooltip: "Tên món",
      inputType: "filter",
    },
    {
      title: "Nhóm thực đơn",
      dataIndex: "FoodGroupId",
      key: "FoodGroupId",
      tooltip: "Nhóm thực đơn",
      type: "foodGroup",
      inputType: "filter",
    },
    {
      title: "Đơn vị tính",
      dataIndex: "Unit",
      key: "Unit",
      type: "Unit",
      tooltip: "Đơn vị tính",
      inputType: "filter",
    },
    {
      title: "Giá bán",
      dataIndex: "SellPrice",
      key: "SellPrice",
      tooltip: "Giá bán",
      inputType: "compare",
      type: "price",
    },
    {
      title: "Thay đổi theo giá",
      tooltip: "Thay đổi theo giá",
      inputType: "combobox",
    },
    // Địa chỉ
    {
      title: "Điều chỉnh giá tự do",
      tooltip: "Điều chỉnh giá tự do",
      inputType: "combobox",
    },
    //Tên ngân hàng
    {
      title: "Định lượng NVL",
      tooltip: "Định lượng NVL",
      inputType: "combobox",
    },
    // Tài khoản ngân hàng
    {
      title: "Hiển thị trên thực đơn",
      tooltip: "Hiển thị trên thực đơn",
      inputType: "combobox",
    },
    // Chi nhánh ngân hàng
    {
      title: "Ngừng bán",
      tooltip: "Ngừng bán",
      inputType: "combobox",
    },
  ];
};
setColumnTable();
// /**
//  * Author: Anh Quân (11/07/2023)
//  * Description: Khi số lượng cột thay đổi thì chạy lại
//  */
watch(() => {
  setColumnTable();
});

// /**
//  * Author: Anh Quân (28/06/2023)
//  * Description: hàm click vào button thêm
//  */
const showModalAddFood = () => {
  modalForm.setAction("Thêm món");
  modalForm.setObjectForm({});
  modalForm.setMethod(Enum.EditMode.Add);
  modalForm.open();
};
</script>