import { useEffect, useState } from "react"
import WeatherCard from "../components/WeatherCard"
import Shuffle from "../components/Shuffle"
import WeatherInfo from "../../entities/WeatherInfo"
import WeatherService from "../../utils/WeatherService"
import ReactLoading from "react-loading"



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

		<div className="w-screen lg:h-screen   py-24 lg:py-36   flex justify-center items-center">



			{!isLoaded &&
				<ReactLoading
					type="spin"
					color="#A6DDFC"
					height="28px"
					width="28px"
					className="mx-auto"
				/>
			}

			{isLoaded && weatherInfo === null &&
				<p className="text-3xl">Error!</p>
			}



			{isLoaded && weatherInfo !== null &&

				<div className="w-full px-4   lg:w-[1024px] lg:px-0">

					<div className="text-center text-3xl sm:text-5xl">

						<Shuffle className="whitespace-pre">{weatherInfo.dateText}</Shuffle>
						<Shuffle className="mt-4" extraFrames={16}>{weatherInfo.timeText}</Shuffle>
					</div>



					<div className="mt-16   grid grid-cols-1 lg:grid-cols-3   gap-y-12">

						<WeatherCard area="osaka" weatherCode={weatherInfo.osakaWeatherCode} temp={weatherInfo.osakaTemp} humi={weatherInfo.osakaHumi} className="max-w-96 mx-auto" />
						<WeatherCard area="nagoya" weatherCode={weatherInfo.nagoyaWeatherCode} temp={weatherInfo.nagoyaTemp} humi={weatherInfo.nagoyaHumi} className="max-w-96 mx-auto" />
						<WeatherCard area="tokyo" weatherCode={weatherInfo.tokyoWeatherCode} temp={weatherInfo.tokyoTemp} humi={weatherInfo.tokyoHumi} className="max-w-96 mx-auto" />
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