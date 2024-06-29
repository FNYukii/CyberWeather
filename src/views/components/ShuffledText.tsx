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
			// 例: "" -> "OE" -> "OR0E" "OR0N0E"

			// ランダムな数値たちを生成
			const chipIndexes = ShuffleService.makeRandomNumbers(originalText.length)

			// ランダムに0で置き換えたchippedTextを生成
			const chippedText = ShuffleService.makeChippedText(originalText, chipIndexes)

			// 第一段階を実行
			for (let i = 1; i < chippedText.length / 2; i++) {

				let shortText = ""

				// 最初の方の文字列と最後の方の文字列を連結
				shortText = chippedText.slice(0, i) + chippedText.slice(chippedText.length - i)

				setText(shortText)
				await ShuffleService.sleep()
			}

			// 文字数が奇数だとまだ中央の文字を表示できていないので、chippedTextを表示
			setText(chippedText)



			// 第二段階: chippedTextの0の部分をしばらくシャッフル
			// 例: "OR0N0E" -> "OR3N7E" -> "OR8N2E" -> "OR3N4E"

			for (let i = 0; i < 20; i++) {


				let newText = ""

				// 新しい文字列を生成
				for (let i = 0; i < chippedText.length; i++) {

					if (!chipIndexes.includes(i)) {

						newText += chippedText[i]
					}

					if (chipIndexes.includes(i)) {

						const rand = Math.floor(Math.random() * 8 + 2) // 0 ~ 9
						newText += `${rand}`
					}
				}

				// 生成した文字列を表示
				setText(newText)
				await ShuffleService.sleep()
			}




			setText(originalText)


		})()
	}, [])



	return (

		<p className={props.className}>{text}</p>
	)
}

export default ShuffledText