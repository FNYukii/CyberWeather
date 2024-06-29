class ShuffleService {


	// 以下、全ての段階で利用
	static sleep(time: number = 40) {
		return new Promise((r) => setTimeout(r, time))
	}



	// 以下、第一段階で利用
	static makeRandomNumbers(length: number): number[] {

		let randomNumbers: number[] = []

		for (let i = 0; i < length / 2; i++) {

			const rand = Math.floor(Math.random() * length)
			randomNumbers.push(rand)
		}

		randomNumbers = Array.from(new Set(randomNumbers))

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