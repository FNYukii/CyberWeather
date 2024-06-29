function TopScreen() {

	return (

		<div className="w-screen h-screen   flex justify-center items-center   text-primary">

			<div className="flex flex-col items-center   gap-2">
				
				<p className="text-5xl">2024-07-04 WEDNESDAY</p>
				<p className="text-5xl">12:45</p>

				<button className="mt-16 bg-clickable w-[200px] h-[60px]   text-3xl text-white   hover:brightness-125 transition">RELOAD</button>
			</div>
		</div>
	)
}

export default TopScreen