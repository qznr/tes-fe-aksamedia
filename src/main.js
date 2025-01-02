import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { useTheme } from './composables/theme';
import { onUnmounted } from 'vue';

const app = createApp(App)

app.use(router)

const { applyTheme } = useTheme();
applyTheme(); // Apply initial theme

app.mount('#app')