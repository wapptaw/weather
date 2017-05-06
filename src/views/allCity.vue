<template>
    <div class="weather">
        <div class="top"
             :class="{'top-a': slide}">
            <h2>{{ citys[count].city }}</h2>
            <v-touch @tap="option">|||</v-touch>
        </div>
        <transition name="fade">
            <ul v-if="show" class="option">
                <router-link tag="li" to="/citylist">城市</router-link>
            </ul>
        </transition>
        <v-touch class="city-items" 
          :style="{ height: height + 'px' }"
          @swipeleft="scrollLeft"
          @swiperight="scrollRight"
          @panstart="dragStart"
          @panleft="dragLeft"
          @panright="dragRight"
          @panend="dragEnd"
          @tap="optionHiden"
          :enabled="{swipe: true}"
          :swipe-options="{direction: 'horizontal'}"
          :pan-options="{direction: 'left', threshold: 20}">
            <div :class="{citys: true, swipe: swipe}" :style="{transform: `translate(${shifting}px)`}">
                <home v-for="(city, index) of citys" :cityname="city" :key="city.id" :style="homeStyle(index)"></home>
            </div>
        </v-touch>
    </div>
</template>

<script>
    import home from './home.vue';
    import store from '../vuex/store.js';
    import { mapState } from 'vuex';
    import Vue from 'vue';
    import VueTouch from 'vue-touch';
    Vue.use(VueTouch, {name: 'v-touch'}); 
    
    export default {
        data() {
            return {
                show: false,
                count: 0,
                slide: false,
                shiftingStart: 0,
                shifting: 0,
                swipe: true
            }
        },
        created() {
            window.addEventListener('scroll', this.scroll)
        },
        computed: {
            ...mapState({
                citys: 'citys',
                height: 'height',
                width: 'width',
            })
        },
        methods: {
            option() {
                this.show = true;
            },
            optionHiden() {
                this.show = false;
            },
            homeStyle(index) {
                const translateX = `${this.width * index}px`;
                return {
                    transform: `translateX(${translateX})`
                }
            },
            translate(count) {
                const value = count * this.width;
                this.shifting = -value;
            },
            scrollLeft() {
                if(this.count < this.citys.length-1) {
                    this.count ++;
                    this.translate(this.count);
                }
                this.show = false;
            },
            scrollRight() {
                if(this.count > 0) {
                    this.count --;
                    this.translate(this.count);
                }
                this.show = false;
            },
            dragStart() {
                this.shiftingStart = this.shifting;
                this.swipe = false;
                this.show = false;
            },
            dragLeft(e) {
                if(this.count < this.citys.length-1) {
                    const deltaX = e.deltaX < -this.width ? -this.width : e.deltaX;
                    this.shifting = this.shiftingStart + deltaX;
                    console.log(e.deltaX)
                }
                
                // console.log(this.shiftingStart) 
                // console.log(this.shifting)
                console.log('left')
            },
            dragRight(e) {
                if(this.count > 0) {
                    const deltaX = e.deltaX > this.width ? this.width : e.deltaX;
                    this.shifting = this.shiftingStart + deltaX;
                } 
            },
            dragEnd() {
                this.translate(this.count);
                this.swipe = true;
            },
            scroll() {
                this.show = false;
                const scrollH = window.pageYOffset;
                if(scrollH >= 100) {
                    this.slide = true;
                } else {
                    this.slide = false;
                }
            }
        },
        components: {
            home
        },
        store       
    }
</script>