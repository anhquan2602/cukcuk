<template class="quan-table">
  <div class="wrap-table">
    <table>
      <div class="wrap-thead">
        <thead class="table-thead">
          <tr class="table-trow">
            <th
              class="colum_thead"
              scope="col"
              v-for="item in columnsTable"
              :key="item.dataIndex"
            >
              <div class="name__thead">{{ item.title }}</div>
              <p
                @mousedown="
                  (e) => {
                    startResize(e, item.key);
                  }
                "
                v-if="index < columnsTable.length - 1"
                class="table-col--resize"
              ></p>
              <div class="input__theader">
                <MISACombobox
                  v-if="item.inputType == 'combobox'"
                  class="combo_thead"
                  placeholder="Tất cả"
                />
                <MISAInput
                  v-if="item.inputType == 'filter'"
                  class="input_thead"
                  filter
                />
                <MISAInput
                  v-if="item.inputType == 'compare'"
                  class="input_thead"
                  compare
                />
              </div>
            </th>
          </tr>
        </thead>
      </div>
      <tbody class="tbody">
        <tr
          :class="{
            'table-row--action':
              rowData[props.propertiesIdName] ===
              dialog.objectData[propertiesIdName],
          }"
          v-for="rowData in dataTable"
          :key="rowData[propertiesIdName]"
        >
          <td
            :class="[{ 'table-row--checked': rowData.isChecked }]"
            scope="row"
          >
            <label class="container-input center">
              <input
                @change="handleSelectRow(rowData)"
                class="table__input--checkbox"
                :checked="rowData.isChecked"
                type="checkbox"
                name="table"
                id=""
              />
              <div class="checkmark"></div>
            </label>
          </td >

          <td
            :class="[
              { 'table-row--checked': rowData.isChecked },
              { 'td-control': item.dataIndex === 'action' },
              ,
            ]"
            @dblclick="handleShowEditInfo(rowData)"
            v-for="item in columnsStyle"
            :style="{
              textAlign: item.align,
              width: item.width,
              maxWidth: item.width,
            }"
            :key="item.dataIndex"
            v-tooltip="rowData[item.key]"
          >
            <slot :name="item.key" v-bind="rowData">
              {{ rowData[item.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
      <tfoot class="tfoot"></tfoot>
    </table>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watch } from "vue";
import MISAInput from "../input/MISAInput.vue";
const props = defineProps({
  //Danh sách dữ liệu hiện thị trên bảng
  dataTable: {
    type: Array,
    require: true,
    default: () => [],
  },
  //Danh sách các tiêu đề cột
  columns: {
    type: Array,
    require: true,
  },
  //columnIdName
  propertiesIdName: {
    type: String,
    require: true,
    default: "",
  },
  //tất cả dữ liệu khi được checked
  allDataSelected: {
    type: Array,
    require: false,
    default: () => [],
  },
  skeleton: {
    type: Boolean,
    default: false,
  },
  totalPage: {
    type: Number,
    default: 1,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  searchData: {
    type: String,
    default: "",
  },
  TotalRecord: {
    type: Number,
    default: 0,
  },
});
/**
 * Author: Anh Quân (24/06/2023)
 * Description: computed danh sách các cột định dạng size
 */
const columnsStyle = computed(() => {
  const newColumns = props.columns.map((column) => {
    if (column.type === "id") {
      column.width = "200px";
      column.align = "left";
    }
    if (column.type === "code") {
      column.width = "100px";
      column.align = "left";
    }
    if (column.type === "name") {
      column.width = "120px";
      column.align = "left";
    }
    if (column.type === "foodGroup") {
      column.width = "80px";
      column.align = "left";
    }
    if (column.type === "price") {
      column.width = "80px";
      column.align = "right";
    }
    if (column.type === "action") {
      column.align = "center";
      column.width = "50px";
    }
    return column;
  });
  return newColumns;
});
const columnsTable = ref(columnsStyle.value);
/**
 * Author: Anh Quân (12/07/2023)
 * Description: watch theo dõi columnsStyle để columnsTable
 * thay đổi
 */
watch(
  () => columnsStyle.value,
  () => {
    columnsTable.value = columnsStyle.value;
  },
  { deep: true }
);
/**
 * Author: Anh Quân (20/06/2023)
 * Description: Hàm tăng giảm kích thước cột trong table
 */
function startResize(e, columnKey) {
  const parrentElementResize = e.target.parentElement;
  const theadTr = parrentElementResize.parentElement;
  const element = parrentElementResize.getBoundingClientRect();
  try {
    window.addEventListener("mousemove", mouseMove);
  } catch (error) {
    console.log(error);
  }
  //khi di chuyển chuột
  function mouseMove(e) {
    //lấy vị trí bắt đầu element
    const leftPositionElement = element.left;
    //chiều ngang mới = vị trí chuột hiện tại trừ đi vị trí  element
    const newWidth = e.clientX - leftPositionElement + "px";
    const columnResize = columnsTable.value.find(
      (col) => col.key === columnKey
    );
    if (columnResize) {
      columnResize.width = newWidth;
      // console.log(columnResize);
    }
    // parrentElementResize.style.width = newWidth;
    theadTr.style.cursor = "e-resize";
    window.addEventListener("mouseup", clearMouseMove);
  }
  // khi bỏ giữ chuột
  function clearMouseMove() {
    theadTr.style.cursor = "auto";
    window.removeEventListener("mousemove", mouseMove);
  }
}
</script>
<style>
@import url(./table.scss);
</style>