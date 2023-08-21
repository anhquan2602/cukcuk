import { defineStore } from 'pinia';
import Enum from '../common/enum';

export const useDialog = defineStore('dialog', {
    state: () => ({
        isShow: false,
        actionDialog: '', //tên hành động
        title: '', //tiêu đề
        content: '', //nội dung
        type: '', //loại button
        buttonType: '',
        buttonSec: undefined, //nội dung nút phụ
        objectData: {}, // đối tượng nhận được
        icon: '', //loại icon
        method: Enum.EditMode.None,
        errorMessage: '',
        buttonThird: '',
        errorCode: 0,
    }),

    actions: {
        toggleDialog() {
            this.isShow = !this.isShow;
        },
        open(dialog) {
            this.isShow = true;
            this.actionDialog = dialog.action;
            this.content = dialog.content;
            this.title = dialog.title;
            this.buttonType = dialog.buttonType;
            this.type = dialog.type;
            this.buttonSec = dialog.buttonSec;
            this.name = dialog.name;
            this.icon = dialog.icon;
            this.buttonThird = dialog.buttonThird;
            this.errorCode = dialog.errorCode ? dialog.errorCode : 0;
        },
        close() {
            this.isShow = false;
            this.objectData = {};
            this.actionDialog = '';
            this.content = '';
            this.title = '';
            this.buttonType = '';
            this.type = '';
            this.buttonSec = undefined;
            this.name = '';
            this.icon = '';
            this.errorMessage = '';
            this.buttonThird = '';
            this.method = this.method = Enum.EditMode.None;
        },
        setErrorCode(errorCode) {
            this.errorCode = errorCode;
        },
        setObjectData(data) {
            this.objectData = data;
        },
        setMethod(method) {
            this.method = method;
        },
        setErrorMessage(error) {
            this.errorMessage = error;
        },
    },
});