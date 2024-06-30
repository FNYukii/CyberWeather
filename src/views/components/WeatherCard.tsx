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



			<div className="mt-4   flex justify-between items-center">

				<Shuffle endDelay={32} className="text-3xl">{props.weather}</Shuffle>

				<ShuffleIcon endDelay={36} className="text-3xl">

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



		</div>
	)
}

export default WeatherCard