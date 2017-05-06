<template>
    <div class="searchCity">
        <div class="top">
            <div @click="back">返回</div>
        </div>
        <div class="search">
            <input type="text" placeholder="输入城市名" v-model="cityname" />
            <input type="button" value="搜索" @click="searchCity(cityname)" />
            <ul class="search-list">
                <li v-for="option of result" @click="addCity(option.basic)">
                    <router-link to='/'><!--有问题-->
                        <span>{{ option.basic.city }}</span>
                        <span>{{ option.basic.prov }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import store from '../vuex/store.js';
    import { searchCity } from '../api.js';

    export default {
        data() {
            return {
                cityname: '',
                result: ''
            }
        },
        methods: {
            searchCity(city) {
                searchCity(city).then(response => {
                    const data = response.HeWeather5;
                    if(data[0].status === 'ok'){
                        this.result = data;
                    }else {
                        this.result = ''
                    }
                })
            },
            addCity(city) {
                this.$store.commit('addCity', city);
            },
            back() {
                this.$router.go(-1);
            }
        },
        store
    }
</script>