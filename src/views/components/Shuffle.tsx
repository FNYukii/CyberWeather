import { useEffect, useState } from "react"
import ShuffleService from "../../utils/ShuffleService"



interface Props {
	children: string
	className?: string
	extraFrames?: number
}



function Shuffle(props: Props) {



	const originalText = props.children
	const endDelay = props.extraFrames ?? 0

	const [text, setText] = useState<string>("")



	useEffect(() => {
		(async () => {



			// テキストが空なら演出を行わない
			if (originalText === "") return



			// 第一段階: 空文字列からchippedTextまで少しずつ変化
			// 例: "" -> "OE" -> "OR0E" "OR0N0E"

			// 0置き換えしたい文字を指すインデックスたち
			let chipIndexes: number[] = []

			// フラグ変数
			let isChipsMark = false

			// ハイフンや空白以外が0置き換えされそうなら、やりなおし
			do {

				isChipsMark = false

				// 0置き換えする文字を指すインデックスをランダムに生成
				chipIndexes = ShuffleService.makeRandomNumbers(originalText.length, originalText.length / 2)

				// 記号が0置き換え対象になっていたら、フラグ変数を有効にしてやりなおし
				// eslint-disable-next-line
				chipIndexes.forEach(chipIndex => {

					if (["-", ":", " ", "."].includes(originalText[chipIndex])) {
						isChipsMark = true
					}
				})

			} while (isChipsMark)



			// ランダムに0置き換えされたchippedTextを生成
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

			for (let i = 0; i < 12 + endDelay; i++) {

				let newText = ""

				// 新しい文字列を生成
				for (let j = 0; j < chippedText.length; j++) {

					// 0置き換え対象でない文字位置なら、本来の文字を追加
					if (!chipIndexes.includes(j)) {
						newText += originalText[j]
					}

					// 0置き換え対象の文字位置なら、1以外のランダムな数値を追加
					if (chipIndexes.includes(j)) {

						const letters = "023456789"
						const rand = Math.floor(Math.random() * letters.length)
						const randomNumeric = letters[rand]

						newText += randomNumeric
					}
				}

				// 生成した文字列を表示
				setText(newText)
				await ShuffleService.sleep()
			}



			// 第三段階: 完成系を表示
			setText(originalText)


		})()
		// eslint-disable-next-line
	}, [originalText])



	return (

		<p className={props.className}>{text}</p>
	)
}

export default Shuffle