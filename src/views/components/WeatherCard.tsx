import Shuffle from "./Shuffle"



interface Props {
	area: string

	weather: string
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

			<Shuffle endDelay={32} className="mt-4 text-4xl">{props.weather}</Shuffle>

		</div>
	)
}

export default WeatherCard