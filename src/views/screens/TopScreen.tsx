import dayjs from "dayjs"
import ShuffledText from "../components/ShuffledText"
import { useEffect, useState } from "react"
import WeatherCard from "../components/WeatherCard"



function TopScreen() {



	const [dateText, setDateText] = useState("")
	const [timeText, setTimeText] = useState("")

	// ShuffledTextを再レンダリングさせるためのState
	const [renderFlag, setRenderFlag] = useState(false)



	function reload() {

		const dayAndDayOfWeek = dayjs().format("YYYY-MM-DD    dddd")
		const time = dayjs().format("HH:mm")

		setDateText(dayAndDayOfWeek)
		setTimeText(time)
		setRenderFlag(!renderFlag)
	}



	useEffect(() => {

		reload()
		// eslint-disable-next-line
	}, [])



	return (

		<div className="w-screen h-screen   flex justify-center items-center">

			<div className="w-[1000px]">

				<div className="text-center text-5xl text-primary">
					<ShuffledText text={dateText} renderFlag={renderFlag} className="uppercase whitespace-pre" />
					<ShuffledText text={timeText} renderFlag={renderFlag} endDelay={16} className="mt-4" />
				</div>



				<div className="mt-12   grid grid-cols-3 gap-12 text-primary">

					<WeatherCard area="osaka"/>
					<WeatherCard area="nagoya"/>
					<WeatherCard area="tokyo"/>
				</div>



				<button onClick={() => reload()} className="mt-16 block mx-auto   bg-cyber-button w-60 py-2   focus:outline-neutral-500 hover:brightness-150 active:brightness-100 transition">
					<ShuffledText text="RELOAD" renderFlag={renderFlag} endDelay={16} className="text-white text-3xl"/>
				</button>


			</div>


		</div>
	)
}

export default TopScreen