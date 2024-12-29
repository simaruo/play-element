<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { omit } from "lodash-es";
import { computed } from "vue";

import type { IconProps } from "./types";

defineOptions({
  name: "PlIcon",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<IconProps>(), {});
const filterProps = computed(() => omit(props, ["type", "color"]));
const computedStype = computed(() => {
  color: props.color ?? void 0;
});
</script>

<template>
  <i
    class="er-icon"
    :class="{ [`er-icon--${type}`]: type }"
    :style="computedStype"
    v-bind="$attrs"
  >
    <FontAwesomeIcon v-bind="filterProps" />
  </i>
</template>

<style scoped>
@import "./style.css";
</style>
