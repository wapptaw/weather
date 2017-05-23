<template>
    <div  class="city">
        <div class="loading" v-if="loading">数据加载中...</div>
        <div v-else>
            <now :weatherAll="data"></now>
            <hourly :weatherAll="data"></hourly>
            <daily :weatherAll="data"></daily>
            <life :weatherAll="data"></life>
        </div>
    </div>
</template>

<script>
    import { allWeather } from '../api.js';
    import store from '../vuex/store.js';
    import { mapState } from 'vuex';
    import now from '../components/now.vue';
    import hourly from '../components/hourly.vue';
    import daily from '../components/daily.vue';
    import life from '../components/life.vue';

    export default {
        data() {
            return {
                data: '',
                loading: true
            }
        },
        props: ['cityname'],
        created() {
            this.getWeatherData();
        },
        watch: {
            cityid() {
                this.getWeatherData();;
            } 
        },
        computed: {
            cityid() {
                if(this.cityname) {
                    return this.cityname.id
                }
            },
            ...mapState({
                weatherData: 'weatherData'
            })
        },
        methods: {
            getWeatherData() {
                this.loading = true;
                if(this.cityname) {
                    if(!this.weatherData[this.cityid]){
                        allWeather(this.cityid).then(response => {
                            this.loading = false;
                            this.data = response.HeWeather5[0];
                            this.$store.commit('saveWeather', response.HeWeather5[0]);
                        }).catch(error => {
                            console.log(error);
                        })
                    }else {
                        this.loading = false;
                        this.data = this.weatherData[this.cityid];
                    }
                }
            }
        },
        components: {
            now,
            hourly,
            daily, 
            life
        },
        store
    }
</script>