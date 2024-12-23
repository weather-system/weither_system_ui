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
import '@fortawesome/fontawesome-free/css/all.css'

import 'vue-loading-overlay/dist/css/index.css'

import { createApp } from 'vue'
import { LoadingPlugin } from 'vue-loading-overlay'
import axios from 'axios'
import * as Sentry from "@sentry/vue";
import App from './App.vue'
import router from './router'
import { API_BASE_URL } from './lib/env'
import store from './store'

const app = createApp(App)

axios.defaults.baseURL = API_BASE_URL
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'


if (import.meta.env.VITE_ALLOW_SENTRY == 'yes') {
  Sentry.init({
    app,
    dsn: "https://ed077f027eb0e63690e2a933959d59e5@o4508515506847744.ingest.us.sentry.io/4508515581689856",
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.replayIntegration(),
    ],
    // Tracing
    tracesSampleRate: 0.1, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ["localhost", /^https:\/\/dlh-cimahi-frontend\.onrender\.com\//, /^https:\/\/dlh-cimahi-backend\.onrender\.com\//],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 0.1, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}

app.use(LoadingPlugin)
app.use(router)
app.use(store)

app.mount('#app')
