<template>
    <div class="hourly">
        <ul class="hourly_item">
            <li v-for="(hourly, index) of hourly_forecast" @touchstart="hover(index)" :style="{ height: height * .25 + 'px' }">
                <template v-if="index === record">
                    <div class="hour">
                        <span>{{ hourly.date | hour }}</span>
                        <span>{{ hourly.tmp }}℃</span>
                    </div>
                    <div class="txt">{{ hourly.cond.txt }}</div>
                    <div class="more">
                        <span>相对湿度 {{ hourly.hum }}</span>
                        <span>气压 {{ hourly.pres }}</span>
                        <span>{{ hourly.wind.dir }} {{ hourly.wind.sc }}</span>
                    </div>
                </template>
                <template v-else>
                    <div class="hour_s">{{ hourly.date | hour }}</div>
                    <div class="txt_s">{{ hourly.cond.txt }}</div>
                    <div class="tmp_s">{{ hourly.tmp }}℃</div>
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
    import store from '../vuex/store.js';
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                record: '',
                weatherAllData: this.weatherAll
            }
        },
        props: ['weatherAll'],
        computed: {
            hourly_forecast() {
                return this.weatherAllData.hourly_forecast;
            },
            ...mapState({
                weatherData: 'weatherData',
                height: 'height'
            })
        },
        methods: {
            hover(index) {
                this.record = index;
            }
        },
        filters: {
            hour(val) {
                const reg = /\d{2}:\d{2}$/;
                const simple_hour = reg.exec(val)[0];
                if(simple_hour.charAt(0) === '0') {
                    return simple_hour.slice(1);
                }else {
                    return simple_hour;
                }
            }
        },
        store
    }
</script>