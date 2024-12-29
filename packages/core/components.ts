import { PlButton, PlIcon } from "@play-element/components";
import type { Plugin } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas)

export default [PlButton, PlIcon] as Plugin[];
