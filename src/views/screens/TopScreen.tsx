import dayjs from "dayjs"
import ShuffledText from "../components/ShuffledText"



function TopScreen() {



	const day = dayjs().format("YYYY-MM-DD")
	const dayOfWeek = dayjs().format("dddd")
	const time = dayjs().format("HH:mm")



	return (

		<div className="w-screen h-screen   flex justify-center items-center   text-primary">

			<div className="flex flex-col items-center   gap-2">

				<div className="flex gap-8">
					<ShuffledText text={day} className="text-5xl" />
					<ShuffledText text={dayOfWeek} className="text-5xl uppercase" />
				</div>


				<ShuffledText text={time} className="text-5xl" />

				<button className="mt-16 bg-clickable w-[200px] h-[60px]   text-3xl text-white   hover:brightness-125 transition">RELOAD</button>
			</div>
		</div>
	)
}

export default TopScreen