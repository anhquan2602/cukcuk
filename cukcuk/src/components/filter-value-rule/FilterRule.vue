<template >
    <div @keydown="inputOnKeyDown" tabindex="0" class="filter-rule-container">
        <div @click="setShowListRule" class="m__filter-rule">
            {{ ruleCode }}
        </div>
        <div v-show="isValid" class="list-filter-container">
            <ul class="list-filter-record" id="style-croll">
                <li @click="changeRecord(item, index)" v-for="(item, index) in listRule" :key="index"
                    :class="['list-item', indexHover == index ? 'list__option--hover' : '']">
                    <div class="filter-active">
                        <div :class="[item.value == ruleValue ? 'table-circle-blue-mi' : '']">
                        </div>
                    </div>
                    {{ item.Code }} : {{ item.Name }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: "FilterRule",
    data() {
        return {
            listRule: this.$_MisaResource["VN"].FilterRule,
            ruleCode: "",
            ruleValue: 0,
            isValid: false,
            isFilterChose: true,
            indexHover: 0
        }
    },
    created() {
        this.ruleValue = 1;
        this.ruleCode = "*";
    },
    mounted() {
        /* bắt sự kiện khi click ra ngoài màn hình */
        document.addEventListener("click", this.windowClose);
    },
    methods: {
        changeRecord(item) {
            this.ruleValue = item.value;
            this.ruleCode = item.Code;
            this.isValid = false
        },
        setShowListRule() {
            this.isValid = !this.isValid
        },
        /**
    * Thực hiện đóng  list records khi click ra ngoài
    * @author: nvthuan (10/07/2023)
    */
        windowClose(e) {
            if (!this.$el.contains(e.target)) {
                this.isValid = false;
            }
        },

        /**
        * Hàm tạo hành động trong khi combobox sử dụng keyup
        * @author: nvthuan (05/07/2023)
        */
        inputOnKeyDown(event) {
            try {
                const key = event.keyCode;
                if (key == this.$_MiKeyCode.down) {
                    this.isValid = true;
                    this.indexHover++;
                    if (this.indexHover > 2) {
                    }
                    if (this.indexHover == this.listRule.length) {
                        this.indexHover = 0;
                    }
                } else if (key == this.$_MiKeyCode.up) {
                    this.indexHover--;
                    if (this.indexHover < 0) {
                        this.indexHover = this.listRule.length;
                    }
                    if (this.indexHover < (this.listRule.length - 3)) {

                    }
                }
                else if (key == this.$_MiKeyCode.enter) {
                    if (this.indexHover <= this.listRule.length && this.indexHover >= 0) {
                        this.selectedItem = this.listRule[this.indexHover];
                        this.ruleCode = this.listRule[this.indexHover].Code;
                        this.$emit("updateCombobox", this.selectedItem);
                        this.isValid = false;

                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
    },

}
</script>
<style scoped>
@import url(./filter-rule.css);
</style>