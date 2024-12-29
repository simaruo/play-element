<script setup lang="ts">
import { ref, computed } from "vue";
import {throttle} from "lodash-es"

import { PlIcon } from 'play-element'

import type { ButtonProps, ButtonEmits , ButtonInstance} from "./types";


defineOptions({
  name: "PlButton",
});

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
  useThrottle: true,
  throttleDuration: 500
});
const iconStyle = computed(() => ({
  marginRight: slots.default ? "6px" : "0px",
}));

const slots = defineSlots();
const _ref = ref<HTMLButtonElement>();
const emits = defineEmits<ButtonEmits>()

const handleclickAdapter = (e: MouseEvent) => {
  if (props.useThrottle) {
    handleBtnClickThrottle(e)
  } else {
    handleBtnClick(e)
  }
}

const handleBtnClick = (e: MouseEvent) => emits('click', e)

/**
 * @description throttle 
 */
 const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration)

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
    :disabed="disabled || loading ? true : void 0"
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
    <PlIcon
      :icon="icon"
      size="1x"
      :style="iconStyle"
      v-if="icon && !loading"
    />
    <slot></slot>
  </component>
</template>

<style scoped>
    @import './style.css'
</style>