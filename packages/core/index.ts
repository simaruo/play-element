import { createInstaller } from "@play-element/utils";
import components from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "@play-element/theme/index.css";

library.add(fas);
const installer = createInstaller(components);

export * from "../components";
export default installer;
