import Shuffle from "./Shuffle"



interface Props {
	area: string
	className?: string
}



function WeatherCard(props: Props) {

	return (

		<div>
			<div className="w-full bg-primary/20 py-1">
				<Shuffle endDelay={20} className="uppercase text-4xl text-center">{props.area}</Shuffle>
			</div>

			<Shuffle endDelay={24} className="mt-4 uppercase text-4xl">rainy</Shuffle>

		</div>
	)
}

export default WeatherCard