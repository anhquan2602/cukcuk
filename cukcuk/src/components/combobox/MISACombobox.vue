<template>
  <div @keydown.stop="handleKeyDown" class="quan-combobox">
    <div @focusout="getIndexSelected" class="combobox">
      <input
        type="text"
        ref="inputElement"
        :class="['input-text-base']"
        :placeholder="placeholder"
        :value="inputSearchCombobox"
        @input="updateComboboxInput"
        :readonly="!props.combobox"
        @blur="$emit('blur', $event.target.value)"
      />
      <div class="icon-dropdown" @click="inputElement.focus()"></div>
      <div class="icon-dropdown-filter" v-if="filter"></div>
      <div class="icon-dropdown-plus" v-if="plus"></div>
    </div>
    <div class="combobox__dropdown">
      <div
        class="combobox__dropdown-item"
        v-if="!props.require"
        ref="emptyItem"
        @click="$emit('update:value', '')"
        :class="[
          valueSelected.value === '' ? 'selected-list' : '',
          { 'keydown-hover': indexHoverDropList === -1 },
        ]"
      >
        - {{ placeholder }} -
      </div>
      <div
        class="combobox__dropdown-item"
        ref="itemDropdown"
        :class="[
          valueSelected.value === option.value ? 'selected-list' : '',
          { 'keydown-hover': indexHoverDropList === index },
        ]"
        @click="
          $emit('update:value', option.value);
          inputElement.blur();
        "
        v-for="(option, index) in optionsSearchCombobox"
        :key="option.value"
      >
        {{ option.option }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watch } from "vue";
import Enum from "../../common/enum.js";
import { removeVietnameseTones } from "../../common/convert-data";
const emit = defineEmits(["update:value", "input-validation", "blur"]);
const props = defineProps({
  placeholder: { type: String, default: () => "" }, //place holder
  options: {
    //danh sách lựa chọn
    type: Array,
    default: () => [
      {
        option: "Nhà hàng Ánh Dương",
        value: "CNTT",
      },
      {
        option: "Nhà hàng Mua bán",
        value: "MK",
      },
      {
        option: "Nhà hàng biển",
        value: "PM",
      },
    ],
  },
  value: { type: String, default: () => "" }, //value để binding
  combobox: { type: Boolean, default: () => false }, //combobox nếu là combobox thì cho phép search
  require: { type: Boolean, default: false },
  errorMessage: { String, default: () => "" }, //text cảnh báo lỗi
  focus: Boolean, //focus input,
  filter: { type: Boolean, default: false },
  plus: { type: Boolean, default: false },
  filterHeader: { type: Boolean, default: false },
});
const itemDropdown = ref(null);
const emptyItem = ref(null);
const indexHoverDropList = ref(props.require ? 0 : -1);
const inputElement = ref(null);
const inputSearchCombobox = ref("");
const optionsSearchCombobox = ref(props.options);

onMounted(() => {
  if (props.focus) {
    autoFocus();
  }
});
/**
 * Author: Anh Quân (13/07/2023)
 * Description: Hàm chủ động focus vào input
 */
const autoFocus = () => {
  inputElement.value.focus();
};
defineExpose({ autoFocus });

/**
 * Author: Anh Quân (06/07/2023)
 * Description: hàm update inputSearch, mỗi khi nhập thì
 * tìm kiếm
 */
const updateComboboxInput = (e) => {
  inputSearchCombobox.value = e.target.value;
  if (e.target.value === "") {
    emit("update:value", "");
    emit("input-validation", e.target.value);
    optionsSearchCombobox.value = props.options;
  } else {
    filterOption();
  }
};
/**
 * Author: Anh Quân (06/07/2023)
 * Description: hàm tìm kiếm option của combobox
 */
const filterOption = () => {
  if (props.combobox) {
    optionsSearchCombobox.value = props.options.filter((option) => {
      return removeVietnameseTones(option.option.toLowerCase()).includes(
        removeVietnameseTones(inputSearchCombobox.value.toLowerCase())
      );
    });
  } else {
    optionsSearchCombobox.value = props.options;
  }
};
/**
 * Author: Anh Quân (04/07/2023)
 * Description: lấy vị trí của option được chọn hiện tại
 */
const getIndexSelected = () => {
  const index = optionsSearchCombobox.value.findIndex(
    (option) => option.value === valueSelected.value.value
  );
  if (index === -1) {
    indexHoverDropList.value = props.require ? 0 : -1;
  } else {
    indexHoverDropList.value = index;
  }
};
watch(
  () => optionsSearchCombobox.value,
  () => {
    getIndexSelected();
  },
  { deep: true }
);
/**
 * Author: Anh Quân (04/07/2023)
 * Description: khi nhấn phím lên xuống thì di chuyển đến các lựa chọn
 * Enter thì chọn
 */
const handleKeyDown = (e) => {
  // console.log(e.keyCode);
  if (e.keyCode === Enum.Keyboard.Down) {
    if (indexHoverDropList.value === optionsSearchCombobox.value.length - 1) {
      indexHoverDropList.value = props.require ? 0 : -1;
      scrollToOption();
    } else {
      indexHoverDropList.value = indexHoverDropList.value + 1;
      scrollToOption();
    }
  }
  if (e.keyCode === Enum.Keyboard.Up) {
    if (indexHoverDropList.value < 0) {
      indexHoverDropList.value = optionsSearchCombobox.value.length - 1;
      scrollToOption(true);
    } else {
      indexHoverDropList.value = indexHoverDropList.value - 1;
      scrollToOption(true);
    }
  }
  if (e.keyCode === Enum.Keyboard.Enter) {
    if (indexHoverDropList.value === (props.require ? 0 : -1)) {
      inputSearchCombobox.value = "";
      emit("update:value", "");
      e.target.blur();
      return;
    }
    if (indexHoverDropList.value > (props.require ? 0 : -1)) {
      inputSearchCombobox.value =
        optionsSearchCombobox.value[indexHoverDropList.value].option;
      emit(
        "update:value",
        optionsSearchCombobox.value[indexHoverDropList.value].value
      );
      e.target.blur();
    }
  }
};
/**
 * Author: Anh Quân (04/07/2023)
 * Description: computed lưu option cho dropdown được chọn
 */
const valueSelected = computed(() => {
  if (props.options.length > 0 && props.value) {
    return props.options.find((option) => option.value === props.value);
  }
  return { value: "", option: "" };
});
/**
 * Author: Anh Quân (06/07/2023)
 * Description: Watch theo dõi mỗi khi chọn thì update vị trí
 * index để dùng bàn phím hover
 * và mỗi khi component mouted xong thì tìm kiếm những option
 */
watch(
  () => valueSelected.value,
  () => {
    // console.log(valueSelected.value.option);
    inputSearchCombobox.value = valueSelected.value.option;
    filterOption();
    getIndexSelected();
    scrollToOption(true);
  },
  { deep: true }
);
onMounted(() => {
  inputSearchCombobox.value = valueSelected.value.option;
});
/**
 * Author: Anh Quân (10/07/2023)
 * Description:Hàm scroll đến vị trí option được chọn
 */
const scrollToOption = (isKeyup) => {
  try {
    if (props.require) {
      return;
    }
    if (indexHoverDropList.value === -1) {
      emptyItem.value.scrollIntoView();
    } else if (itemDropdown.value?.length > 0) {
      if (isKeyup) {
        itemDropdown.value[indexHoverDropList.value].scrollIntoView();
      } else {
        itemDropdown.value[indexHoverDropList.value].scrollIntoView({
          block: "end",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang="scss">
@import url(./combobox.scss);
</style>