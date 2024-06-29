import dayjs from "dayjs"
import { useEffect, useState } from "react"
import StringService from "../../utils/StringService"



function TopScreen() {



	const [dayText, setDayText] = useState<string>("090909")


	function sleep(time: number = 40) {
		return new Promise((r) => setTimeout(r, time))
	}



	useEffect(() => {
		(async () => {

			for (let i = 0; i < 30; i++) {

				setDayText(StringService.randomNumeric())
				await sleep()
			}

			setDayText(dayjs().format("YYYY-MM-DD"))

		})()
	}, [])
	


	return (

		<div className="w-screen h-screen   flex justify-center items-center   text-primary">

			<div className="flex flex-col items-center   gap-2">

				<p className="text-5xl">{dayText} WEDNESDAY</p>
				<p className="text-5xl">12:45</p>

				<button className="mt-16 bg-clickable w-[200px] h-[60px]   text-3xl text-white   hover:brightness-125 transition">RELOAD</button>
			</div>
		</div>
	)
}

export default TopScreen