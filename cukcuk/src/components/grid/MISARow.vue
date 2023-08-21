<template>
    <div
        :class="['naquan-flex']"
        :style="{
            display: props.type,
            justifyContent: props.justify,
            alignItems: props.align,
            columnGap: props.colGap,
            marginLeft: '-' + props.gutter + 'px',
            marginRight: '-' + props.gutter + 'px',
        }"
    >
        <slot></slot>
    </div>
</template>
<script setup>
const props = defineProps({
    align: String,
    justify: String,
    colGap: String,
    gutter: String,
    type: {
        type: String,
        default: () => 'flex',
    },
});
</script>
<style>
.naquan-flex {
    display: flex;
}
</style>
