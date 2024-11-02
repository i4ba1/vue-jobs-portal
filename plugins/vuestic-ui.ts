// plugins/vuestic-ui.ts
import { createVuestic } from 'vuestic-ui';
import 'vuestic-ui/css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(createVuestic({
    config: {
      colors: {
        variables: {
          primary: '#23A6F0',
          secondary: '#6C757D',
          success: '#40CD7D',
          info: '#2C82E0',
          danger: '#E42222',
          warning: '#FFB547',
        }
      },
      components: {
        VaCheckbox: {
          color: 'primary',
          size: 'medium',
          hideDetails: true
        },
        VaInput: {
          color: 'primary',
          hideDetails: true
        },
        VaButton: {
          color: 'primary'
        }
      }
    }
  }));
});