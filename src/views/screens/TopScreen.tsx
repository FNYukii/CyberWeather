import dayjs from "dayjs"
import ShuffledText from "../components/ShuffledText"
import { useEffect, useState } from "react"



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

		<div className="w-screen h-screen   flex justify-center items-center   text-primary">

			<div>

				<div className="text-center text-5xl">
					<ShuffledText text={dateText} renderFlag={renderFlag} className="uppercase whitespace-pre" />
					<ShuffledText text={timeText} renderFlag={renderFlag} endDelay={16} className="mt-4" />
				</div>



				<button onClick={() => reload()} className="mt-16 block mx-auto   bg-cyber-button w-60 py-2   focus:outline-neutral-500 hover:brightness-150 active:brightness-100 transition">
					<ShuffledText text="RELOAD" renderFlag={renderFlag} endDelay={16} className="text-white text-3xl"/>
				</button>


			</div>


		</div>
	)
}

export default TopScreen