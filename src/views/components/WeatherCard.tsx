import Shuffle from "./Shuffle"
import { BsCloud } from "react-icons/bs"
import { BsSun } from "react-icons/bs"
import { BsCloudRain } from "react-icons/bs"
import ShuffleIcon from "./ShuffleIcon"
import Indicator from "./Indicator"
import WeatherService from "../../utils/WeatherService"



interface Props {
	area: string

	weatherCode: number
	temp: number
	humi: number
	className?: string
}



function WeatherCard(props: Props) {


	const weatherLabel = WeatherService.weatherLabelFromCode(props.weatherCode)

	return (

		<div>

			<div className="w-full bg-primary/20 py-1">
				<Shuffle extraFrames={24} className="text-4xl text-center">{props.area}</Shuffle>
			</div>



			<div className="mt-6   flex justify-between items-center   text-3xl">

				<Shuffle extraFrames={32}>{weatherLabel}</Shuffle>

				<ShuffleIcon endDelay={36}>

					{weatherLabel === "sunny" &&
						<BsSun />
					}

					{weatherLabel === "cloudy" &&
						<BsCloud />
					}

					{weatherLabel === "rainy" &&
						<BsCloudRain />
					}
				</ShuffleIcon>
			</div>



			<div className="mt-6   flex justify-between gap-4">

				<div className="flex flex-col justify-around gap-4   w-full">

					<Indicator max={50} value={props.temp} className="meter-cyber   w-full h-2" />
					<Indicator max={100} value={props.humi} className="meter-cyber   w-full h-2" />
				</div>

				<div className="flex flex-col gap-4 items-end   text-2xl">

					<div className="whitespace-nowrap">
						<Shuffle extraFrames={40} className="inline">{`${props.temp}`}</Shuffle>
						<span> °C</span>
					</div>

					<div className="whitespace-nowrap">
						<Shuffle extraFrames={44} className="inline">{`${props.humi}`}</Shuffle>
						<span> %</span>
					</div>
				</div>
			</div>



		</div>
	)
}

export default WeatherCard