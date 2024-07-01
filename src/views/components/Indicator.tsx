import { useEffect, useState } from "react"
import ShuffleService from "../../utils/ShuffleService"



interface Props {
	value: number
	min?: number
	max?: number

	className?: string
}



function Indicator(props: Props) {



	const [value, setValue] = useState(0)



	useEffect(() => {
		(async() => {

			// 少しずつバーを大きくしていく
			for (let i = 0; i < 20; i++) {

				setValue((prevValue) => prevValue + props.value / 20)

				await ShuffleService.sleep(20)
			}

			// 最後は本来の長さにして完成
			setValue(props.value)

		})()
		// eslint-disable-next-line
	}, [props.value])



	return (
		<meter min={props.min} max={props.max} value={value} className={props.className} />
	)
}

export default Indicator