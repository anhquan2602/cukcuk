import { defineStore } from 'pinia';
import Enum from '../common/enum.js';
export const useModalForm = defineStore('modalform', {
    state: () => ({
        isShow: false,
        action: '',
        method: Enum.EditMode.None,
        object: {},
    }),
    getters: {
        show() {
            return this.isShow;
        },
        actionType() {
            return this.action;
        },
    },
    actions: {
        toggleModal() {
            this.isShow = !this.isShow;
        },
        close() {
            this.isShow = false;
            this.object = {};
            this.method = Enum.EditMode.None;
        },
        open() {
            this.isShow = true;
        },
        setAction(type) {
            this.action = type;
        },
        setObjectForm(data) {
            this.object = data;
        },
        resetNewForm() {
            this.isShow = true;
            this.object = {};
        },
        setMethod(method) {
            this.method = method;
        },
    },
});
