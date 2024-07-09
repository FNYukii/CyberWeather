import { useEffect, useState } from "react"
import WeatherCard from "../components/WeatherCard"
import Shuffle from "../components/Shuffle"
import WeatherInfo from "../../entities/WeatherInfo"
import WeatherService from "../../utils/WeatherService"
import dayjs from "dayjs"



function TopScreen() {

	const [dateText, setDateText] = useState("")
	const [timeText, setTimeText] = useState("")


	// 東名阪の天気の情報をまとめたもの
	const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	async function load() {

		// 一度Stateをリセット
		setIsLoaded(false)
		setWeatherInfo(null)

		// 読み取り
		const weatherInfo = await readWeatherInfo()
		const dateText = dayjs().format("YYYY-MM-DD    dddd")
		const timeText = dayjs().format("HH:mm")

		// 新しい値でStateを更新
		setWeatherInfo(weatherInfo)
		setDateText(dateText)
		setTimeText(timeText)
		setIsLoaded(true)
	}



	async function readWeatherInfo() {

		// まずキャッシュから読み取り
		const weatherInfoFromCache = await WeatherService.readWeatherInfoFromCache()
		if (weatherInfoFromCache) return weatherInfoFromCache

		// キャッシュに本日のデータがなければ、APIから読み取り
		const weatherInfoFromAPI = await WeatherService.readWeatherInfoFromAPI()
		return weatherInfoFromAPI
	}



	useEffect(() => {

		load()
		// eslint-disable-next-line
	}, [])



	return (

		<div className="w-screen lg:h-screen   py-24 lg:py-36   flex justify-center items-center">



			{!isLoaded &&
				<Shuffle className="text-3xl">LOADING</Shuffle>
			}

			{isLoaded && weatherInfo === null &&
				<Shuffle className="text-3xl">ERROR!</Shuffle>
			}



			{isLoaded && weatherInfo !== null &&

				<div className="w-full px-4   lg:w-[1024px] lg:px-0">

					<div className="text-center text-3xl sm:text-5xl">

						<Shuffle className="whitespace-pre">{dateText}</Shuffle>
						<Shuffle className="mt-4" extraFrames={16}>{timeText}</Shuffle>
					</div>



					<div className="mt-16   grid grid-cols-1 lg:grid-cols-3   gap-y-12">

						<WeatherCard area="osaka" weatherCode={weatherInfo.osakaWeatherCode} temp={weatherInfo.osakaTemp} humi={weatherInfo.osakaHumi} className="max-w-96 mx-auto" />
						<WeatherCard area="nagoya" weatherCode={weatherInfo.nagoyaWeatherCode} temp={weatherInfo.nagoyaTemp} humi={weatherInfo.nagoyaHumi} className="max-w-96 mx-auto" />
						<WeatherCard area="tokyo" weatherCode={weatherInfo.tokyoWeatherCode} temp={weatherInfo.tokyoTemp} humi={weatherInfo.tokyoHumi} className="max-w-96 mx-auto" />
					</div>



					<button onClick={() => load()} className="mt-16 block mx-auto   bg-cyber-button w-60 py-2   focus:outline-neutral-500 hover:brightness-200 active:brightness-125 transition">
						<Shuffle extraFrames={40} className="text-white text-3xl">RELOAD</Shuffle>
					</button>

				</div>
			}

		</div>
	)
}

export default TopScreen