module.exports = () => {
    const input = require('./1.json')

    // Part 1
    for (let x = 0; x < input.length - 1; x++)
        for (let y = x + 1; y < input.length; y++) {
            const a = +input[x]
            const b = +input[y]
            const sum = a + b

            if (sum != 2020) continue

            console.log(a, '+', b, '=', sum)
            console.log(a, '*', b, '=', a * b)
        }

    // Part 2
    for (let x = 0; x < input.length - 2; x++)
        for (let y = x + 1; y < input.length - 1; y++)
            for (let z = y + 1; z < input.length; z++) {
                const a = +input[x]
                const b = +input[y]
                const c = +input[z]
                const sum = a + b + c

                if (sum != 2020) continue

                console.log(a, '+', b, '+', c, '=', sum)
                console.log(a, '*', b, '*', c, '=', a * b * c)
            }
}
