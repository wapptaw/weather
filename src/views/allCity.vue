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
          @swipeleft="swipeLeft"
          @swiperight="swipeRight"
          @tap="optionHiden"
          :swipe-options="{direction: 'horizontal'}">
            <home :cityname="city" :class="{'disappear-left': dl, 'disappear-right': dr}" @transitionend.native="transEndA"></home>
            <home :cityname="city_trans" :class="{'appear-left-start': als, 'appear-right-start': ars, 'appear-move': am}" v-if="trans" @transitionend.native="transEndB"></home>
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
                para: 1,
                trans: false,
                dl: false,
                als: false,
                am: false,
                ars: false,
                dr: false,
                onoff: true,
                primaryStyle: '',
                transitionStyle: '',
            }
        },
        created() {
            window.addEventListener('scroll', this.scroll)
        },
        computed: {
            city() {
                if(this.citys) {
                    return this.citys[this.count];
                }
            },
            city_trans() {
                if(this.citys && this.citys.length > 1) {
                    return this.citys[this.count + this.para]
                }
            },
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
            scroll() {
                this.show = false;
                const scrollH = window.pageYOffset;
                if(scrollH >= 100) {
                    this.slide = true;
                } else {
                    this.slide = false;
                }
            },
            swipeLeft() {
                if(this.onoff && this.count < this.citys.length-1) {
                    this.onoff = false;
                    this.trans = true;
                    this.als = true;
                    this.para = 1;
                    setTimeout(() => {
                        this.als = false;
                        this.am = true;
                        this.dl = true;
                    }, 50);
                }
            },
            swipeRight() {
                if(this.onoff && this.count > 0) {
                    this.onoff = false;
                    this.trans = true;
                    this.ars = true;
                    this.para = -1;
                    setTimeout(() => {
                        this.ars = false;
                        this.am = true;
                        this.dr = true;
                    },50)
                }
            },
            transEndA() {
                this.count += this.para;
                this.dl = false;
                this.dr = false;
            },
            transEndB() {
                this.am = false;
                this.trans = false;
                this.onoff = true;
            }
        },
        components: {
            home
        },
        store       
    }
</script>