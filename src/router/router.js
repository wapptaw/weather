import Vue from 'vue';
import VueRouter from 'vue-router';
import allCity from '../views/allCity.vue';
import cityList from '../views/city-list.vue';
import searchCity from '../views/searchCity.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: allCity
        },
        {
            path: '/citylist',
            component: cityList
        },
        {
            path: '/search',
            component: searchCity
        }
    ]
})