import ShuffledText from "./ShuffledText"

interface Props {
	area: string
	className?: string
}



function WeatherCard(props: Props) {

	return (

		<div>
			<div className="w-full bg-primary/20 py-1">
				<ShuffledText text={props.area} endDelay={20} className="uppercase text-4xl text-center"/>
			</div>

			<ShuffledText text="rainy" endDelay={40} className="mt-4 uppercase text-4xl"/>

		</div>
	)
}

export default WeatherCard