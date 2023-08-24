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
      <MISATableVue
        :columns="columnsTable"
        :dataTable="dataTable"
        @set-pagesize="setPageSize"
        @select-row="selectRowTable"
        @edit-data="handleShowEditInfo"
      />
    </div>
    <teleport to="#app">
      <MenuForm v-if="isShow" @submit-form="submitFormData"> </MenuForm>
      <MISADialog
        @close-dialog="closeWhenCheck"
        @submit-form="submitFormData"
        @delete-data="deleteEmployee"
      />
    </teleport>
  </div>
</template>
<style lang="scss">
@import url(./menu.scss);
</style>
<script setup>
import { ref, watch } from "vue";
import MISACombobox from "../components/combobox/MISACombobox.vue";
import MISATableVue from "../components/table/MISATable.vue";
import { convertDataTable } from "../common/convert-data.js";
import { storeToRefs } from "pinia";
import { useModalForm } from "../stores/modalform";
import Enum from "../common/enum.js";
import MenuForm from "./MenuForm.vue";
import MISADialog from "../components/dialog/MISADialog.vue";

const modalForm = useModalForm();
const { isShow, method, object } = storeToRefs(modalForm);
const columnsTable = ref();
const dataTable = ref([]);
const formFood = ref()
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
      inputType: "combobox",
      columType: "text",
    },
    {
      title: "Mã món",
      dataIndex: "code",
      key: "FoodCode",
      type: "code",
      inputType: "filter",
      columType: "text",
    },
    {
      title: "Tên món",
      dataIndex: "name",
      key: "FoodName",
      type: "name",
      inputType: "filter",
      columType: "text",
    },
    {
      title: "Nhóm thực đơn",
      dataIndex: "FoodGroupId",
      key: "FoodGroupId",
      type: "foodGroup",
      inputType: "filter",
      columType: "text",
    },
    {
      title: "Đơn vị tính",
      dataIndex: "Unit",
      key: "Unit",
      type: "Unit",
      inputType: "filter",
      columType: "text",
    },
    {
      title: "Giá bán",
      dataIndex: "SellPrice",
      key: "SellPrice",
      inputType: "compare",
      type: "price",
      columType: "text",
    },
    {
      title: "Thay đổi theo giá",
      inputType: "combobox",
      columType: "checkbox",
    },
    // Địa chỉ
    {
      title: "Điều chỉnh giá tự do",
      inputType: "combobox",
      columType: "checkbox",
    },
    //Tên ngân hàng
    {
      title: "Định lượng NVL",
      inputType: "combobox",
      columType: "text",
    },
    // Tài khoản ngân hàng
    {
      title: "Hiển thị trên thực đơn",
      inputType: "combobox",
      columType: "checkbox",
    },
    // Chi nhánh ngân hàng
    {
      title: "Ngừng bán",
      inputType: "combobox",
      columType: "checkbox",
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


const closeWhenCheck = () => {
  formFood.value.codeFocus()
}

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
/**
 * Author: Anh Quân (09/07/2023)
 * Description: Hàm nhận emit khi click sửa thông tin
 */
const handleShowEditInfo = (data) => {
  modalForm.open();
  modalForm.setAction("Thông tin nhân viên");
  modalForm.setMethod(Enum.EditMode.Update);
  dialog.setMethod(Enum.EditMode.Update);
  modalForm.setObjectForm(data);
};

// /**
//  * Author: Anh Quân (11/07/2023)
//  * Description: Hàm nhận emit set pagesize cho bảng dữ liệu
//  */
const setPageSize = (pageSize) => {
  paging.value.pageSize = pageSize;
  // paging.value.currentPage = pageNumber;
  dataTable.value = [];
  getData();
};
// /**
//  * Author: Anh Quân (01/07/2023)
//  * Description: hàm nhận emit chọn hàng trên table
//  */
const selectRowTable = (isChecked, data) => {
  try {
    dataTable.value = dataTable.value.map((employee) => {
      if (employee.EmployeeId === data.EmployeeId) {
        employee.isChecked = isChecked;
      }
      return employee;
    });
  } catch (error) {
    console.log(error);
  }
};
</script>