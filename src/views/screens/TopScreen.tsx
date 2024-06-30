import { useEffect, useState } from "react"
import WeatherCard from "../components/WeatherCard"
import Shuffle from "../components/Shuffle"
import WeatherInfo from "../../entities/WeatherInfo"
import WeatherService from "../../utils/WeatherService"



function TopScreen() {


	// 日時と天気の情報をまとめたもの
	const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	async function read() {

		// 一度Stateをリセット
		setIsLoaded(false)
		setWeatherInfo(null)

		// 読み取りを実行
		const weatherInfo = await WeatherService.readWeatherInfo()

		// 新しい値でStateを更新
		setIsLoaded(true)
		setWeatherInfo(weatherInfo)
	}



	useEffect(() => {

		read()
		// eslint-disable-next-line
	}, [])



	return (

		<div className="w-screen h-screen   flex justify-center items-center">



			{!isLoaded &&
				<p className="text-3xl">Loading...</p>
			}

			{isLoaded && weatherInfo === null &&
				<p className="text-3xl">Error!</p>
			}



			{isLoaded && weatherInfo !== null &&

				<div className="w-[1000px]">

					<div className="text-center text-5xl">

						<Shuffle className="whitespace-pre">{weatherInfo.dateText}</Shuffle>
						<Shuffle className="mt-4" extraFrames={16}>{weatherInfo.timeText}</Shuffle>
					</div>



					<div className="mt-16   grid grid-cols-3 gap-16">

						<WeatherCard area="osaka" weather={weatherInfo.osakaWeather} temp={weatherInfo.osakaTemp} humi={weatherInfo.osakaHumi} />
						<WeatherCard area="nagoya" weather={weatherInfo.nagoyaWeather} temp={weatherInfo.nagoyaTemp} humi={weatherInfo.nagoyaHumi} />
						<WeatherCard area="tokyo" weather={weatherInfo.tokyoWeather} temp={weatherInfo.tokyoTemp} humi={weatherInfo.tokyoHumi} />
					</div>



					<button onClick={() => read()} className="mt-16 block mx-auto   bg-cyber-button w-60 py-2   focus:outline-neutral-500 hover:brightness-150 active:brightness-100 transition">
						<Shuffle extraFrames={48} className="text-white text-3xl">RELOAD</Shuffle>
					</button>

				</div>
			}

		</div>
	)
}

export default TopScreen