<template>
    <div class="now" :style="{ height: height * .75 + 'px' }">
        <div class="txt">{{ wnc.txt }}</div>
        <div class="tmp">{{ wn.tmp }}</div>
        <div class="qlty">{{ wac.qlty }}</div>
        <ul class="more">
            <li><span>风力</span>{{ wnw.dir }} {{ wnw.sc }}级</li>
            <li><span>相对湿度</span>{{ wn.hum }}</li>
            <li><span>pm2.5</span>{{ wac.pm25 }}</li>
            <li><span>体感温度</span>{{ wn.fl }}℃</li>
            <li><span>气压</span>{{ wn.pres }}</li>
            <li><span>能见度</span>{{wn.vis }}</li>
        </ul>
    </div>
</template>

<script>
    import store from '../vuex/store.js';
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                weatherAllData: this.weatherAll
            }
        },
        props: ['weatherAll'],
        computed: {
            wn() {
                if(this.weatherAllData) {
                    return this.weatherAllData.now;
                }
                return {};
            },
            wnc() {
                if(this.weatherAllData) {
                    return this.weatherAllData.now.cond;
                }
                return {};
            },
            wac() {
                if(this.weatherAllData.aqi) {
                    return this.weatherAllData.aqi.city;
                }
                return {};
            },
            wnw() {
                if(this.weatherAllData) {
                    return this.wn.wind;
                }
                return {};
            },
            ...mapState({
                weatherData: 'weatherData',
                height: 'height'
            })
        },
        store
    }
</script>