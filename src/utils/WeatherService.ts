import dayjs from "dayjs"
import WeatherInfo from "../entities/WeatherInfo"
import ShuffleService from "./ShuffleService"



class WeatherService {



	static async readCityWeather(city: "osaka" | "nagoya" | "tokyo"): Promise<{ weatherCode: number, temp: number, humi: number } | null> {

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

			console.log("APIからレスポンス受領")

			// 受け取ったJSON文字列をJavaScriptオブジェクトに変換
			const data = await response.json()

			// 現在のhourを取得
			const hour = dayjs().hour()

			// データの中から必要な値を抽出
			const weatherCode = data.hourly.weather_code[hour - 1]
			const temp = data.hourly.temperature_2m[hour - 1]
			const humi = data.hourly.relative_humidity_2m[hour - 1]

			// オブジェクトにまとめる
			const object = { weatherCode: weatherCode, temp: temp, humi: humi }

			return object

		} catch (error) {

			console.log(`FAIL! Error to call API. ${error}`)
			return null
		}
	}



	static async readWeatherInfoFromAPI(): Promise<WeatherInfo | null> {

		// 現在の日時を取得
		const ymd = dayjs().format("YYYY-MM-DD")


		// 各都市の天気を読み取る
		const osakaWeather = await this.readCityWeather("osaka")
		if (osakaWeather === null) return null

		const nagoyaWeather = await this.readCityWeather("nagoya")
		if (nagoyaWeather === null) return null

		const tokyoWeather = await this.readCityWeather("tokyo")
		if (tokyoWeather === null) return null


		// weatherInfoオブジェクトを生成
		const weatherInfo: WeatherInfo = {
			ymd: ymd,
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

		// LocalStorageに保存
		localStorage.setItem("weatherInfoCache", JSON.stringify(weatherInfo))

		return weatherInfo
	}



	static async readWeatherInfoFromCache(): Promise<WeatherInfo | null> {

		await ShuffleService.sleep(800)

		// LocalStorageからweatherInfoのキャッシュを読み取る
		const weatherInfoCacheString = localStorage.getItem("weatherInfoCache")
		if (!weatherInfoCacheString) return null

		// 読み取れたらWeatherInfo型に変換
		const weatherInfoCache: WeatherInfo = JSON.parse(weatherInfoCacheString)
		if (!weatherInfoCache) return null

		// 今日の日付をdateText形式で取得
		const todayYmd = dayjs().format("YYYY-MM-DD")
		
		// 今日の日付とweatherInfoキャッシュの日付を比較
		if (todayYmd === weatherInfoCache.ymd) {

			return weatherInfoCache
		}

		return null
	}



	static weatherLabelFromCode(code: number): "sunny" | "cloudy" | "fog" | "rainy" | "snowy" | "thunder" | "unknown" {

		let label: "sunny" | "cloudy" | "fog" | "rainy" | "snowy" | "thunder" | "unknown" = "unknown"


		switch (code) {

			case 0:
			case 1:
				label = "sunny"
				break

			case 2:
			case 3:
				label = "cloudy"
				break

			case 45:
			case 48:
				label = "fog"
				break

			case 51:
			case 53:
			case 55:
			case 56:
			case 57:
			case 61:
			case 63:
			case 65:
			case 66:
			case 67:
				label = "rainy"
				break

			case 71:
			case 73:
			case 75:
			case 77:
			case 85:
			case 88:
				label = "snowy"
				break

			case 95:
			case 96:
			case 99:
				label = "thunder"
				break

			default:
				label = "unknown"
		}

		return label
	}



}

export default WeatherService