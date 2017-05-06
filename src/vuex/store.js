import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const screenH = window.innerHeight;
const screenW = window.innerWidth;

export default new Vuex.Store({
    state: {
        weatherData: {},
        citys: [
            {city: '北京', prov: '北京', id: 'CN101010100'},
        ],
        height: screenH,
        width: screenW,
    },

    gettres: {
        
    },

    mutations: {
        saveWeather(state, allWeather) {
            state.weatherData[allWeather.basic.id] = allWeather;
        },
        addCity(state, city) {
            const cityname = state.citys.map(val => {
                return val.id;
            })
            if(cityname.includes(city.id) === false) {
                state.citys.push(city);
            }
        },
        deleteCity(state, index) {
            delete state.weatherData[state.citys[index].id];
            state.citys.splice(index, 1);
        }
    }
})