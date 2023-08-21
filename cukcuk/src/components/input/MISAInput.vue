<template>
  <div class="quan-input">
    <div class="icon-filter" v-if="filter">*..
    <div class="dropdown-filter">
        <ul>
            <li>
                
            </li>
        </ul>
    </div>
    </div>
    <div class="icon-filter" v-if="compare"> >=
    <div class="dropdown-filter">
        <ul>
            <li>
                
            </li>
        </ul>
    </div>
    </div>
    <input
      class="input-text-base"
      ref="input"
      :class="[
        'input-text-base',
        { 'nquan-success': props.isSuccess },
        { readonly: props.readonly },
        { validate: props.validate },
        { 'naquan-error': errorIcon },
      ]"
      :type="type"
      :name="name"
      :placeholder="props.placeholder"
      :readonly="props.readonly"
      :value="value"
      @input="handleChangeInput"
      @blur="$emit('blur', $event.target.value)"
      :title="tooltip"
    />
    <div class="icon-error" v-if="errorIcon"></div>
  </div>
</template>
<style lang="scss">
@import url(./input.scss);
</style>
<script setup>
import { onMounted, ref } from 'vue';

const emit = defineEmits(['update:value', 'input-validation', 'blur']);
const props = defineProps({
    name: { String, default: () => 'name' }, //name input
    isSuccess: { Boolean, default: () => null },
    validate: { Boolean, default: () => false }, //có validate
    placeholder: { String, default: () => '' }, //placeholder
    type: { String, default: () => 'text' }, //loại input
    value: { String, default: () => '' }, //value input
    readonly: { Boolean, default: false }, // chỉ đọc
    focus: Boolean, //focus input
    errorIcon : { type: Boolean, default: false },
    require: { type: Boolean, default: false },
    tooltip: { type: String, default: '' },
    filter: { type: Boolean, default: false },
    compare: { type: Boolean, default: false },
});
const input = ref(null);
const handleChangeInput = (e) => {
    emit('update:value', e.target.value);
    emit('input-validation', e.target.value);
};
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
    input.value.focus();
};
defineExpose({ autoFocus });
</script>