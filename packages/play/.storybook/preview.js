/** @type { import('@storybook/vue3').Preview } */
import 'play-element/dist/index.css';
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
