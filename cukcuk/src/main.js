import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia';
import MISAButton from '../src/components/button/MISAButton.vue'
import MISADialog from '../src/components/dialog/MISADialog.vue'
import MISACombobox from '../src/components/comboBox/MISAComboBox.vue'
import MISAIcon from '../src/components/icon/MISAIcon.vue'
import FilterRule from '../src/components/filter-value-rule/FilterRule.vue'
import MISAInput from '../src/components/input/MISAInput.vue'
import MISACol from '../src/components/grid/MISACol.vue'
import MISARow from '../src/components/grid/MISARow.vue'
import App from './App.vue'
import router from "./router/router.js";
import { tooltipDerective } from './custom-derective.js';
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
    components,
    directives,
})
const app = createApp(App);
app.use(vuetify)
app.use(createPinia());
app.directive('tooltip', tooltipDerective);
app.component('MISAButton', MISAButton);
app.component('MISADialog', MISADialog);
app.component('MISACombobox', MISACombobox);
app.component('MISAIcon', MISAIcon);
app.component('FilterRule', FilterRule);
app.component('MISAInput', MISAInput);
app.component('MISACol', MISACol);
app.component('MISARow', MISARow);
app.use(router);
app.mount('#app')