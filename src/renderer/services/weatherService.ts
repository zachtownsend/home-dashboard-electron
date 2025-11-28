const API_KEY = '58c0f9734eaf874c141916c48e61aa6e';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;

interface WeatherResponse {
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

export const getWeather = async (lat: number, lon: number) => {
  const response = await fetch(`${API_URL}&lat=${lat}&lon=${lon}`);
  const data = (await response.json()) as WeatherResponse;
  return data;
};

export const getClothingRecommendation = (temp: number, weather: string) => {
  let recommendation = '';

  // Base layer recommendations
  if (temp < 10) {
    recommendation += 'Base layer: Thermal underwear/base layer\n';
  }

  // Main clothing recommendations
  if (temp < 5) {
    recommendation +=
      'Heavy winter coat, warm pants, winter boots, warm hat, scarf, and mittens.';
  } else if (temp < 15) {
    recommendation += 'Light jacket or sweater, long pants, closed shoes.';
  } else if (temp < 20) {
    recommendation += 'Long-sleeve shirt, light pants or leggings.';
  } else {
    recommendation += 'T-shirt and shorts or light dress.';
  }

  // Weather-specific additions
  if (weather.toLowerCase().includes('rain')) {
    recommendation += "\nDon't forget a raincoat and waterproof boots!";
  } else if (weather.toLowerCase().includes('snow')) {
    recommendation +=
      '\nMake sure to wear waterproof snow boots and snow pants!';
  }

  return recommendation;
};
