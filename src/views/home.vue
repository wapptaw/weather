<template>
    <div class="city">
        <now :cityname="cityname"></now>
        <hourly :cityname="cityname"></hourly>
        <daily :cityname="cityname"></daily>
        <life :cityname="cityname"></life>
    </div>
</template>

<script>
    import { allWeather } from '../api.js';
    import now from '../components/now.vue';
    import hourly from '../components/hourly.vue';
    import daily from '../components/daily.vue';
    import life from '../components/life.vue';

    export default {
        data() {
            return {
                test: '',
            }
        },
        props: ['cityname'],
        components: {
            now,
            hourly,
            daily, 
            life
        }
    }
</script>