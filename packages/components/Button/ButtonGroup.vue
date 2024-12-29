<script setup lang="ts">
import { provide, toRef, reactive } from "vue";
import { BUTTON_GROUP_CONTEXT_KEY } from "./constant";

import type { ButtonGroupProps } from "./types";

defineOptions({
    name: 'PlButtonGroup'
})
const props = withDefaults(defineProps<ButtonGroupProps>(), {})

provide(BUTTON_GROUP_CONTEXT_KEY, reactive({
    size: toRef(props, 'size'),
    type: toRef(props, 'type'),
    disabled: toRef(props, 'disabled'),

}))
</script>

<template>

    <div class="er-button-group">
        <slot></slot>
    </div>
</template>

<style scoped>
@import "./style.css";
</style>
