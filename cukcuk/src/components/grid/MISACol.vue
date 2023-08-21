<template>
    <div
        :class="[`naquan-col-${props.span}`, 'naquan-col']"
        :style="{
            order: props.order,
            display: props.display,
            flexDirection: props.direction,
            flex: props.flex,
            rowGap: props.rowGap + 'px',
            paddingLeft: props.gutter + 'px',
            paddingRight: props.gutter + 'px',
        }"
    >
        <slot></slot>
    </div>
</template>
<script setup>
const props = defineProps({
    span: String,
    order: String,
    flex: [String, Number],
    gutter: String,
    direction: { String, default: () => 'row' },
    rowGap: { String, default: () => '' },
    display: { String, default: () => '' },
});
</script>
<style>
@import url('./MISACol.css');
</style>
