import { useEffect, useState } from "react"



interface Props {
	text: string
	className?: string
}



function ShuffledText(props: Props) {



	const originalText = props.text
	const [text, setText] = useState<string>("")



	function sleep(time: number = 40) {
		return new Promise((r) => setTimeout(r, time))
	}



	function makeRandomNumbers(length: number): number[] {

		let randomNumbers: number[] = []

		for (let i = 0; i < length / 2; i++) {

			const rand = Math.floor(Math.random() * length)
			randomNumbers.push(rand)
		}

		randomNumbers = Array.from(new Set(randomNumbers))

		return randomNumbers
	}



	function makeChippedText(text: string, chipIndexes: number[]): string {
	
		let chippedText = ""

		for (let i = 0; i < text.length; i++) {

			if (chipIndexes.includes(i)) {
				chippedText += "0"

			}
			
			if (!chipIndexes.includes(i)) {
				chippedText += text[i]

			}

		}

		return chippedText
	}



	useEffect(() => {
		(async () => {



			// 第一段階: 空文字列からchippedTextまで少しずつ変化
			// 例: "" -> "OE" -> "ORGE" "ORANGE"

			// ランダムな数値たちを生成
			const randomNumbers = makeRandomNumbers(originalText.length)

			// originalText内の文字をランダムに0で置き換えたchippedTextを生成
			const chippedText = makeChippedText(originalText, randomNumbers)

			// 第一段階を実行
			for (let i = 1; i < chippedText.length / 2; i++) {

				let shortText = ""

				// 最初の方の文字列と最後の方の文字列を連結
				shortText = chippedText.slice(0, i) + chippedText.slice(chippedText.length - i)

				setText(shortText)
				await sleep()
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



class ShuffleService {

}