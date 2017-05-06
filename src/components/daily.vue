<template>
    <div class="daily">
        <ul>
            <li v-for="(daily, index) of daily_forecast">
                <span class="date">{{ date[index] }} {{ daily.date | simple_date }}</span>
                <span class="txt_d">{{ daily.cond.txt_d }}</span>
                <span class="tmp">{{ daily.tmp.min }}℃ ~ {{ daily.tmp.max }}℃</span>
            </li>
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
                data: '',
                date: ['今天', '明天', '后天']
            }
        },
        props: ['cityname'],
        computed: {
            daily_forecast() {
                return this.data.daily_forecast;
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
            simple_date(value) {
                if(value) {
                    const reg = /\d{2}-\d{2}$/;
                    const simple_date = reg.exec(value)[0];
                    if(simple_date.charAt(0) === '0') {
                        return simple_date.slice(1);
                    }else {
                        return simple_date;
                    }
                }
            }
        },
        store
    }
</script>