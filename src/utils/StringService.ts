class StringService {


	
	static randomString(length: number, letters: string): string {

		var randomString = ""

		for (let i = 0; i < length; i++) {

			const randomNum = Math.floor(Math.random() * letters.length)
			randomString += letters[randomNum]
		}

		return randomString
	}



	static randomAlphanumeric(length: number = 10): string {

		let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
		return this.randomString(length, letters)
	}

	static randomNumeric(length: number = 10): string {

		let letters = "0123456789"
		return this.randomString(length, letters)
	}
}

export default StringService