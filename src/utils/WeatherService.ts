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
			osakaTemp: 28.0,
			osakaHumi: 55.8,
			nagoyaWeather: "cloudy",
			nagoyaTemp: 27.2,
			nagoyaHumi: 58.3,
			tokyoWeather: "sunny",
			tokyoTemp: 30.1,
			tokyoHumi: 49.0,
		}

		return weatherInfo
	}



}

export default WeatherService