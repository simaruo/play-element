<script setup lang="ts">
import { ref, computed, inject } from "vue";
import { throttle } from "lodash-es";
import { BUTTON_GROUP_CONTEXT_KEY } from "./constant";

import PlIcon  from "../Icon/Icon.vue";

import type { ButtonProps, ButtonEmits, ButtonInstance } from "./types";

defineOptions({
  name: "PlButton",
});

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
  useThrottle: true,
  throttleDuration: 500,
});
const iconStyle = computed(() => ({
  marginRight: slots.default ? "6px" : "0px",
}));

const slots = defineSlots();
const ctx  = inject(BUTTON_GROUP_CONTEXT_KEY, void 0)
const _ref = ref<HTMLButtonElement>();
const size = computed(() => ctx?.size ?? props.size ?? void 0)
const type = computed(() => ctx?.type ?? props.type ?? void 0)
const disabled = computed(() => ctx?.disabled ||  props.disabled || false)

const emits = defineEmits<ButtonEmits>();

const handleclickAdapter = (e: MouseEvent) => {
  if (props.useThrottle) {
    handleBtnClickThrottle(e);
  } else {
    handleBtnClick(e);
  }
};

const handleBtnClick = (e: MouseEvent) => emits("click", e);

/**
 * @description throttle
 */
const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration);

defineExpose<ButtonInstance>({
  ref: _ref,
});
</script>

<template>
  <component
    :is="tag"
    ref="_ref"
    class="er-button"
    :autofocus="autofocus"
    :disabled="disabled || loading ? true : void 0"
    :type="tag === 'button' ? nativeType : void 0"
    :class="{
      [`er-button--${type}`]: type,
      [`er-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    @click="handleclickAdapter"
  >
    <template v-if="loading">
      <slot name="loading">
        <PlIcon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>
    <PlIcon :icon="icon" size="1x" :style="iconStyle" v-if="icon && !loading" />
    <slot></slot>
  </component>
</template>

<style scoped>
@import "./style.css";
</style>