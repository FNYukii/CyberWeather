import dayjs from "dayjs"
import ShuffleService from "./ShuffleService"
import WeatherInfo from "../entities/WeatherInfo"



class WeatherService {



	static async readWeatherInfo(): Promise<WeatherInfo | null> {

		// APIっぽく少し時間をかける
		await ShuffleService.sleep(400)

		// 現在の日時を取得
		const dayAndDayOfWeek = dayjs().format("YYYY-MM-DD    dddd")
		const time = dayjs().format("HH:mm")

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
			tokyoTemp: 43.1,
			tokyoHumi: 42.0,
		}

		return weatherInfo
	}



}

export default WeatherService