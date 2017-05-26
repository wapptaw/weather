<template>
    <div class="daily">
        <ul>
            <li v-for="(daily, index) of weatherAllData.daily_forecast">
                <span class="date">{{ date[index] }} {{ daily.date | simple_date }}</span>
                <span class="txt_d">{{ daily.cond.txt_d }}</span>
                <span class="tmp">{{ daily.tmp.min }}℃ ~ {{ daily.tmp.max }}℃</span>
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
                date: ['今天', '明天', '后天'],
                weatherAllData: this.weatherAll
            }
        },
        props: ['weatherAll'],
        computed: {
            ...mapState({
                weatherData: 'weatherData'
            })
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