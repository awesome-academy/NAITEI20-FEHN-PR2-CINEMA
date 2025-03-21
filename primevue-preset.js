import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

const CustomPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#e8f5e9",
      100: "#c8e6c9",
      200: "#a5d6a7",
      300: "#81c784",
      400: "#66bb6a",
      500: "#72be43",
      600: "#43a047",
      700: "#388e3c",
      800: "#2e7d32",
      900: "#1b5e20",
      950: "#0d3c12",
    },
  },
});

export default CustomPreset;
