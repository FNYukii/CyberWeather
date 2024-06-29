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

			<div className="text-center text-5xl">


				<ShuffledText text={dateText} renderFlag={renderFlag} className="uppercase whitespace-pre" />
				<ShuffledText text={timeText} renderFlag={renderFlag} endDelay={16} className="mt-4" />

				<button onClick={() => reload()} className="mt-16 bg-clickable w-[200px] h-[60px]   text-3xl text-white   hover:brightness-125 active:brightness-75 transition">
					<ShuffledText text="RELOAD" endDelay={16} />
				</button>
			</div>
		</div>
	)
}

export default TopScreen