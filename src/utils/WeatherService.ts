import dayjs from "dayjs"
import WeatherInfo from "../entities/WeatherInfo"



class WeatherService {



	static async readTokyoWeather(): Promise<{temp: number, humi: number} | null> {

		try {

			// APIを呼び出す。今回は無料&登録不要の天気API「Open Meteo」を利用
			const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia%2FTokyo&forecast_days=1')
			
			// 受け取ったJSON文字列をJavaScriptオブジェクトに変換
			const data = await response.json()

			// 現在のhourを取得
			const hour = dayjs().hour()

			// データの中から必要な値を抽出
			const temp = data.hourly.temperature_2m[hour - 1]
			const humi = data.hourly.relative_humidity_2m[hour - 1]

			// オブジェクトにまとめる
			const object = {temp: temp, humi: humi}

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



		// Tokyoの天気を読み取ってみる
		const tokyoWeather = await this.readTokyoWeather()
		if (tokyoWeather === null) return null

		

		// weatherInfoオブジェクトを生成
		const weatherInfo: WeatherInfo = {
			dateText: dayAndDayOfWeek,
			timeText: time,
			osakaWeatherCode: 0,
			osakaTemp: 20.0,
			osakaHumi: 87.8,
			nagoyaWeatherCode: 2,
			nagoyaTemp: 27.2,
			nagoyaHumi: 61.3,
			tokyoWeatherCode: 51,
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