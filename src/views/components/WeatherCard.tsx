import Shuffle from "./Shuffle"
import { BsCloud } from "react-icons/bs"
import { BsSun } from "react-icons/bs"
import { BsCloudRain } from "react-icons/bs"
import ShuffleIcon from "./ShuffleIcon"



interface Props {
	area: string

	weather: "sunny" | "cloudy" | "rainy"
	temp: number
	humi: number
	className?: string
}



function WeatherCard(props: Props) {

	return (

		<div>

			<div className="w-full bg-primary/20 py-1">
				<Shuffle endDelay={24} className="text-4xl text-center">{props.area}</Shuffle>
			</div>



			<div className="mt-6   flex justify-between items-center   text-3xl">

				<Shuffle endDelay={32}>{props.weather}</Shuffle>

				<ShuffleIcon endDelay={36}>

					{props.weather === "sunny" &&
						<BsSun />
					}

					{props.weather === "cloudy" &&
						<BsCloud />
					}

					{props.weather === "rainy" &&
						<BsCloudRain />
					}
				</ShuffleIcon>
			</div>



			<div className="mt-6   text-2xl">

				<div className="flex justify-between items-center gap-4">

					<meter max={50} value={props.temp} className="meter-cyber   w-full h-2" />

					<p className="whitespace-nowrap">
						<Shuffle endDelay={40} className="inline">{`${props.temp}`}</Shuffle>
						<span> °C</span>
					</p>

				</div>

				<div className="mt-4   flex justify-between items-center gap-4">

					<meter max={100} value={props.humi} className="meter-cyber   w-full h-2" />

					<p className="whitespace-nowrap">
						<Shuffle endDelay={44} className="inline">{`${props.humi}`}</Shuffle>
						<span> %</span>
					</p>
				</div>
			</div>



		</div>
	)
}

export default WeatherCard