import dayjs from "dayjs"
import ShuffleService from "./ShuffleService"
import WeatherInfo from "../entities/WeatherInfo"



class WeatherService {


	static async readTokyoTemp(): Promise<number | null> {

		try {

			// APIを呼び出す。今回は無料&登録不要の天気API「Open Meteo」を利用
			const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=temperature_2m&timezone=Asia%2FTokyo&forecast_days=1')
			
			// 受け取ったJSON文字列をJavaScriptオブジェクトに変換
			const data = await response.json()

			// データの中から必要な値を抽出
			const hour = dayjs().hour()
			const temp = data.hourly.temperature_2m[hour - 1]

			return temp

		} catch (error) {
			
			console.log(`FAIL! Error to call API. ${error}`)
			return null
		}
	}



	static async readWeatherInfo(): Promise<WeatherInfo | null> {

		// APIっぽく少し時間をかける
		await ShuffleService.sleep(400)

		// 現在の日時を取得
		const dayAndDayOfWeek = dayjs().format("YYYY-MM-DD    dddd")
		const time = dayjs().format("HH:mm")



		// Tokyoの天気を読み取ってみる
		const tokyoTemp = await this.readTokyoTemp()
		if (tokyoTemp === null) return null



		// weatherInfoオブジェクトを生成
		const weatherInfo: WeatherInfo = {
			dateText: dayAndDayOfWeek,
			timeText: time,
			osakaWeather: "rainy",
			osakaTemp: 20.0,
			osakaHumi: 87.8,
			nagoyaWeather: "cloudy",
			nagoyaTemp: 27.2,
			nagoyaHumi: 61.3,
			tokyoWeather: "sunny",
			tokyoTemp: tokyoTemp,
			tokyoHumi: 42.0,
		}

		return weatherInfo
	}



}

export default WeatherService