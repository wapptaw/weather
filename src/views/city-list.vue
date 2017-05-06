<template>
    <div class="city-list">
        <div class="top">
            <div @click="back">&lt</div>
            <h2>城市列表</h2>
        </div>
        <ul class="list">
            <li v-for="(city, index) of citys">{{ city.city }} {{ city.prov }}<span @click="deleteCity(index)">X</span></li>
        </ul>
        <div class="add">
            <router-link to="/search">+</router-link>    
        </div> 
    </div>
</template>

<script>
import store from '../vuex/store.js';
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            citys: 'citys'
        })
    },
    methods: {
        deleteCity(index) {
            this.$store.commit('deleteCity', index);
        },
        back() {
            this.$router.go(-1);
        }
    },
    store
}
</script>