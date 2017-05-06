import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

// 获取全部天气
export const allWeather = async(city) => {
    const response = await Vue.http.get(`https://free-api.heweather.com/v5/weather?city=${city}&key=1cf2771a43d741a7af250f78bafb0c90`, {
        method: 'GET'
    }).catch(error => {
        console.log(error);
    });

    return await response.json().catch(error => {
        console.log(error);
    });
}

// 搜索城市
export const searchCity = async(city) => {
    const response = await Vue.http.get(`https://api.heweather.com/v5/search?city=${city}&key=1cf2771a43d741a7af250f78bafb0c90`, {
        method: 'GET'
    }).catch(error => {
        console.log(error);
    });

    return await response.json().catch(error => {
        console.log(error);
    })
}