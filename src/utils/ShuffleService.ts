class ShuffleService {


	// 以下、全ての段階で利用
	static sleep(time: number = 40) {
		return new Promise((r) => setTimeout(r, time))
	}



	// 以下、第一段階で利用
	static makeRandomNumbers(length: number, count: number): number[] {

		let randomNumbers: number[] = []

		for (let i = 0; i < count; i++) {

			const rand = Math.floor(Math.random() * length)
			randomNumbers.push(rand)
		}

		// 重複値を排除
		randomNumbers = Array.from(new Set(randomNumbers))

		// 小さい順に並び替え
		randomNumbers.sort((a, b) => a - b)

		return randomNumbers
	}



	static makeChippedText(text: string, chipIndexes: number[]): string {
	
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



}

export default ShuffleService