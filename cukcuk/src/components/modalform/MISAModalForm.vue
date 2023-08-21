<template>
    <div class="overley-modal">
        <div @click.stop="" class="naquan-modal-form">
            <div class="naquan-modal-form__header">
                <div class="modal-form-title">
                    {{ `${action} ${props.object}` }}
                    Thêm mới
                </div>
                <button @click="closeModal" class="modal-form-button"></button>
            </div>
            <div class="naquan-modal-form__body">
                <slot></slot>
            </div>
            <div class="naquan-modal-form__footer">
                <slot name="action"></slot>
            </div>
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useModalForm } from '../../stores/modalform';

const props = defineProps({
    //Danh sách dữ liệu hiện thị trên bảng
    object: {
        type: String,
        require: true,
        default: () => '',
    },
});
const emit = defineEmits(['close-modal']);
const modalForm = useModalForm();
const { action } = storeToRefs(modalForm);

/**
 * Author: Anh Quân (27/06/2023)
 * Description: hàm emit báo cho cha đóng modal
 */
function closeModal() {
    emit('close-modal');
    // modalForm.close();
}
</script>
<style lang="scss">
@import url(./modal.scss);
</style>