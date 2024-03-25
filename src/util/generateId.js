const generateID = () => {

    const range = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!%&"

    const splitRange = range.split("")

    let arrMixed = []

    splitRange.forEach((element) => {
        const index = Math.floor(Math.random() * splitRange.length - 1)
        arrMixed.push(splitRange[index])
    })

    let result = arrMixed.join("").toString()

    return result
}

module.exports = generateID