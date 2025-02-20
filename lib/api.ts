import axios from 'axios';

const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

// City search API client
const geoDB = axios.create({
  baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo',
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
});

// Weather API client
const VISUALCROSSING_API_KEY = process.env.NEXT_PUBLIC_VISUALCROSSING_API_KEY;

// Weather API client
const visualCrossing = axios.create({
  baseURL: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
});

function getWeatherDescription(condition: string): string {
  const conditions = new Map([
    ['clear', 'clear'],
    ['sunny', 'clear'],
    ['partly-cloudy-day', 'clouds'],
    ['partly-cloudy-night', 'clouds'],
    ['cloudy', 'clouds'],
    ['rain', 'rain'],
    ['snow', 'snow'],
    ['thunder-rain', 'thunderstorm'],
    ['thunder-showers-day', 'thunderstorm'],
    ['thunder-showers-night', 'thunderstorm'],
    ['showers-day', 'rain'],
    ['showers-night', 'rain']
  ]);
  
  return conditions.get(condition.toLowerCase()) || 'unknown';
}

export interface City {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface WeatherData {
  temperature: number;
  weather: string;
  humidity: number;
  windSpeed: number;
  date: string;
}

export async function searchCities(query: string): Promise<City[]> {
  if (!query) return [];
  
  try {
    const response = await geoDB.get('/cities', {
      params: {
        namePrefix: query,
        limit: 10,
        sort: '-population'
      }
    });

    return response.data.data.map((city: any) => ({
      id: city.id,
      name: city.city,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude
    }));
  } catch (error) {
    console.error('Error searching cities:', error);
    return [];
  }
}

export async function getHistoricalWeather(
  lat: number,
  lon: number,
  date: Date
): Promise<WeatherData | null> {
  try {
    const formattedDate = date.toISOString().split('T')[0];
    
    // Visual Crossing Timeline API format: /{location}/{date}?key={key}
    const response = await visualCrossing.get(
      `/${lat},${lon}/${formattedDate}`, {
        params: {
          key: VISUALCROSSING_API_KEY,
          unitGroup: 'metric',
          include: 'days',
          contentType: 'json',
          elements: 'datetime,temp,humidity,windspeed,conditions'
        }
      }
    );

    const day = response.data.days[0];
    const weather = getWeatherDescription(day.conditions.split(',')[0].trim());

    return {
      temperature: day.temp,
      weather,
      humidity: day.humidity,
      windSpeed: day.windspeed,
      date: new Date(day.datetime).toISOString()
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}