import dayjs from "dayjs"
import WeatherInfo from "../entities/WeatherInfo"



class WeatherService {



	static async readCityWeather(city: "osaka" | "nagoya" | "tokyo"): Promise<{weatherCode: number, temp: number, humi: number} | null> {

		// 各都市用のAPIのURL
		const osakaUrl = "https://api.open-meteo.com/v1/forecast?latitude=34.6937&longitude=135.5022&hourly=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia%2FTokyo&forecast_days=1"
		const nagoyaUrl = "https://api.open-meteo.com/v1/forecast?latitude=35.1815&longitude=136.9064&hourly=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia%2FTokyo&forecast_days=1"
		const tokyoUrl = "https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia%2FTokyo&forecast_days=1"


		// 使用するURLを決める
		let url = ""

		if (city === "osaka") {
			url = osakaUrl
		}
		if (city === "nagoya") {
			url = nagoyaUrl
		}
		if (city === "tokyo") {
			url = tokyoUrl
		}

		
		// 読み取りを行う
		try {

			// APIを呼び出す。今回は無料&登録不要の天気API「Open Meteo」を利用
			const response = await fetch(url)
			
			// 受け取ったJSON文字列をJavaScriptオブジェクトに変換
			const data = await response.json()

			// 現在のhourを取得
			const hour = dayjs().hour()

			// データの中から必要な値を抽出
			const weatherCode = data.hourly.weather_code[hour - 1]
			const temp = data.hourly.temperature_2m[hour - 1]
			const humi = data.hourly.relative_humidity_2m[hour - 1]

			// オブジェクトにまとめる
			const object = {weatherCode: weatherCode, temp: temp, humi: humi}

			return object

		} catch (error) {
			
			console.log(`FAIL! Error to call API. ${error}`)
			return null
		}
	}



	static async readWeatherInfo(): Promise<WeatherInfo | null> {

		// 現在の日時を取得
		const dayAndDayOfWeek = dayjs().format("YYYY-MM-DD    dddd")
		const time = dayjs().format("HH:mm")


		// 各都市の天気を読み取る
		const osakaWeather = await this.readCityWeather("osaka")
		if (osakaWeather === null) return null

		const nagoyaWeather = await this.readCityWeather("nagoya")
		if (nagoyaWeather === null) return null

		const tokyoWeather = await this.readCityWeather("tokyo")
		if (tokyoWeather === null) return null

		
		// weatherInfoオブジェクトを生成
		const weatherInfo: WeatherInfo = {
			dateText: dayAndDayOfWeek,
			timeText: time,
			osakaWeatherCode: osakaWeather.weatherCode,
			osakaTemp: osakaWeather.temp,
			osakaHumi: osakaWeather.humi,
			nagoyaWeatherCode: nagoyaWeather.weatherCode,
			nagoyaTemp: nagoyaWeather.temp,
			nagoyaHumi: nagoyaWeather.humi,
			tokyoWeatherCode: tokyoWeather.weatherCode,
			tokyoTemp: tokyoWeather.temp,
			tokyoHumi: tokyoWeather.humi,
		}

		return weatherInfo
	}



	static weatherLabelFromCode(code: number): string {

		let label = "undefined"

		if ([0, 1].includes(code)) {
			label = "sunny"
		}

		if ([2, 3].includes(code)) {
			label = "cloudy"
		}

		if ([51, 52, 53, 56, 57, 61, 63, 65, 66, 67].includes(code)) {
			label = "rainy"
		}

		return label
	}



}

export default WeatherService