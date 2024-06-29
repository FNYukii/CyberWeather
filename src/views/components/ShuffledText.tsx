import { useEffect, useState } from "react"
import StringService from "../../utils/StringService"



interface Props {
	text: string
	className?: string
}



function ShuffledText(props: Props) {



	const lastText = props.text
	const [text, setText] = useState<string>("")



	function sleep(time: number = 40) {
		return new Promise((r) => setTimeout(r, time))
	}



	useEffect(() => {
		(async () => {

			for (let i = 0; i < 30; i++) {

				setText(StringService.randomNumeric(lastText.length))
				await sleep()
			}

			setText(lastText)

		})()
	}, [])



	return (

		<p className={props.className}>{text}</p>
	)
}

export default ShuffledText