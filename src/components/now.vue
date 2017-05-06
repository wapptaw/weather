<template>
    <div class="now" :style="{ height: height * .75 + 'px' }">
        <div class="txt">{{ nowDataCond.txt }}</div>
        <div class="tmp">{{ nowData.tmp }}</div>
        <div class="qlty">{{ aqiData.qlty }}</div>
        <ul class="more">
            <li><span>风力</span>{{ nowDataWind.dir }} {{ nowDataWind.sc }}级</li>
            <li><span>相对湿度</span>{{ nowData.hum }}</li>
            <li><span>pm2.5</span>{{ aqiData.pm25 }}</li>
            <li><span>体感温度</span>{{ nowData.fl }}℃</li>
            <li><span>气压</span>{{ nowData.pres }}</li>
            <li><span>能见度</span>{{ nowData.vis }}</li>
        </ul>
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
            nowData() {
                if(this.data) {
                    return this.data.now;
                }
                return {};
            },
            aqiData() {
                if(this.data.aqi) {
                    return this.data.aqi.city;
                }
                return {};
            },
            nowDataCond() {
                if(this.data) {
                    return this.data.now.cond;
                }
                return {};
            },
            nowDataWind() {
                if(this.data) {
                    return this.data.now.wind;
                }
                return {};
            },
            ...mapState({
                weatherData: 'weatherData',
                height: 'height'
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
        store
    }
</script>