<template>
    <div class="life">
        <div v-for="(life, key) of lifeindex" class="life_item">
            <h3>{{ key | lifename}}</h3>
            <p>{{ life.brf }}</p>
        </div>
    </div>
</template>

<script>
    import { allWeather } from '../api.js';
    import store from '../vuex/store.js';
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                data: ''
            }
        },
        props: ['cityname'],
        computed: {
            lifeindex() {
                return this.data.suggestion;
            },
            ...mapState({
                weatherData: 'weatherData'
            })
        },
        created() {
            if(!this.weatherData[this.cityname.id]){
                allWeather(this.cityname.id).then(response => {
                    this.data = response.HeWeather5[0];
                    this.$store.commit('saveWeather', response.HeWeather5[0]);
                }).catch(error => {
                    console.log(error);
                })
            }else {
                this.data = this.weatherData[this.cityname.id];
            }
        },
        filters: {
            lifename(key) {
                switch(key) {
                    case 'air':
                        return '晾晒指数';
                        break;
                    case 'comf':
                        return '舒适度指数';
                        break;
                    case 'cw':
                        return '洗车指数';
                        break;
                    case 'drsg':
                        return '穿衣指数';
                        break;
                    case 'flu':
                        return '感冒指数';
                        break;
                    case 'sport':
                        return '运动指数';
                        break;
                    case 'trav':
                        return '旅游指数';
                        break;
                    case 'uv':
                        return '紫外线指数';
                        break;
                    default:
                        return '未知指数'
                }
            }
        },
        store
    }
</script>