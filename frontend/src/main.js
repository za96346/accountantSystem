import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import VueSidebarMenu from 'vue-sidebar-menu';
import App from './App.vue';
import router from './route';
import 'ant-design-vue/dist/antd.css';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './vueX/store';

createApp(App)
    .use(VueSidebarMenu)
    .use(Antd)
    .use(router)
    .use(store)
    .mount('#app');
