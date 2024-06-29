import { useEffect, useState } from "react"
import ShuffleService from "../../utils/ShuffleService"



interface Props {
	text: string
	className?: string
}



function ShuffledText(props: Props) {



	const originalText = props.text

	const [text, setText] = useState<string>("")



	useEffect(() => {
		(async () => {



			// 第一段階: 空文字列からchippedTextまで少しずつ変化
			// 例: "" -> "OE" -> "ORGE" "ORANGE"

			// ランダムな数値たちを生成
			const randomNumbers = ShuffleService.makeRandomNumbers(originalText.length)

			// ランダムに0で置き換えたchippedTextを生成
			const chippedText = ShuffleService.makeChippedText(originalText, randomNumbers)

			// 第一段階を実行
			for (let i = 1; i < chippedText.length / 2; i++) {

				let shortText = ""

				// 最初の方の文字列と最後の方の文字列を連結
				shortText = chippedText.slice(0, i) + chippedText.slice(chippedText.length - i)

				setText(shortText)
				await ShuffleService.sleep()
			}

			// 改めてchippedTextを表示して、第一段階を完了
			setText(chippedText)


		})()
	}, [])



	return (

		<p className={props.className}>{text}</p>
	)
}

export default ShuffledText