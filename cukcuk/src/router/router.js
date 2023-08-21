import { createRouter, createWebHistory } from 'vue-router';
import MenuFood from '../view/MenuFood.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        name: 'menuFood',
        component: MenuFood,
    }],
});

export default router;