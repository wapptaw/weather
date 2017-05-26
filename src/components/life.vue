<template>
    <div class="life">
        <div v-for="(life, key) of weatherAllData.suggestion" class="life_item">
            <h3>{{ key | lifename}}</h3>
            <p>{{ life.brf }}</p>
        </div>
    </div>
</template>

<script>
    import store from '../vuex/store.js';
    import { mapState } from 'vuex';

    export default {
        props: ['weatherAll'],
        data() {
            return {
                weatherAllData: this.weatherAll
            }
        },
        computed: {
            ...mapState({
                weatherData: 'weatherData'
            })
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