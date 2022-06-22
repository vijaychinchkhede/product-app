import { createApp } from 'vue';
import App from './App.vue';

import router from './router';


import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
//import "vue3-pagination/dist/vue3-pagination.css";
import "font-awesome/css/font-awesome.min.css";
import '../node_modules/nprogress/nprogress.css';

const app = createApp(App);
app.use(VueSweetalert2);
app.use(router);

app.config.devtools = true;
app.mount('#app');

// Before you create app
// app.config.devtools = process.env.NODE_ENV === 'development';