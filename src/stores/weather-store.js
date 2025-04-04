import { defineStore } from "pinia";
import axios from 'axios';



export const useWeather = defineStore("wheather", () => {


const obtenerTiempo = async () => {
    const response = await axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/torrevieja?unitGroup=metric&key=JGNTJ2SSE73846J8ABBBAHX8G&contentType=json');
    const data = response.data;
    console.log(data);
    console.log(data.currentConditions.temp);
    return { temp: data.currentConditions.temp, condition: data.currentConditions.icon, direccion: data.resolvedAddress       };
};



return {
    obtenerTiempo
};
})
