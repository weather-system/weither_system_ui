import '@/assets/plugins/jvectormap/jquery-jvectormap-2.0.3.css'
import '@/assets/css/dataTables.bootstrap4.min.css'
import '@/assets/plugins/bootstrap/css/bootstrap.min.css'
import '@/assets/plugins/bootstrap-tagsinput/css/bootstrap-tagsinput.css'
import '@/assets/css/feather.css'
import '@/assets/css/select2.min.css'
import '@/assets/plugins/fontawesome/css/fontawesome.min.css'
import '@/assets/plugins/fontawesome/css/all.min.css'
import '@/assets/plugins/bootstrap/css/bootstrap.min.css'
import '@/assets/css/admin.css'

import '@/assets/js/jquery-3.6.0.min.js'
import '@/assets/js/select2.min.js'
import '@/assets/plugins/apexchart/apexcharts.min.js'
import '@/assets/plugins/apexchart/chart-data.js'
import '@/assets/plugins/bootstrap/js/bootstrap.bundle.min.js'
import '@/assets/js/feather.min.js'
import '@/assets/js/jquery.dataTables.min.js'
import '@/assets/js/dataTables.bootstrap4.min.js'
import '@/assets/plugins/slimscroll/jquery.slimscroll.min.js'
import '@/assets/plugins/slimscroll/jquery.slimscroll.min.js'
import '@/assets/plugins/jvectormap/jquery-jvectormap-2.0.3.min.js'
import '@/assets/plugins/jvectormap/jquery-jvectormap-world-mill.js'
import '@/assets/plugins/jvectormap/jquery-jvectormap-ru-mill.js'
import '@/assets/plugins/jvectormap/jquery-jvectormap-us-aea.js'
import '@/assets/plugins/jvectormap/jquery-jvectormap-uk_countries-mill.js'
import '@/assets/plugins/jvectormap/jquery-jvectormap-in-mill.js'
import '@/assets/js/jvectormap.js'
import '@/assets/plugins/sweetalert/sweetalert2.all.min.js'
import '@/assets/plugins/sweetalert/sweetalerts.min.js'
import '@/assets/js/admin.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
