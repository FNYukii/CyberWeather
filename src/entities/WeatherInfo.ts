type WeatherInfo = {
	dateText: string
	timeText: string

	osakaWeather: "sunny" | "cloudy" | "rainy"
	osakaTemp: number
	osakaHumi: number
	nagoyaWeather: "sunny" | "cloudy" | "rainy"
	nagoyaTemp: number
	nagoyaHumi: number
	tokyoWeather: "sunny" | "cloudy" | "rainy"
	tokyoTemp: number
	tokyoHumi: number
}

export default WeatherInfo