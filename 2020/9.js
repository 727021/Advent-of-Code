const { readFileSync } = require('fs')
const { join } = require('path')

const input = readFileSync(join(__dirname, '9.txt'))
    .toString()
    .replace(/\r/g, '')
    .split('\n')
    .map(Number)

// Part 1
const isValid = i => {
    const num = input[i]
    const preamble = input.slice(i - 25, i)

    for (let x = 0; x < 24; x++)
        for (let y = x + 1; y < 25; y++)
            if (preamble[x] + preamble[y] === num) return true

    return false
}

let invalid
for (let i = 25; i < input.length; i++) {
    if (!isValid(i)) {
        invalid = input[i]
        break
    }
}

console.log('First Invalid Number:', invalid)

// Part 2
const range = (() => {
    let length = 2
    while (true) {
        for (let i = 0; i < input.length - length; i++) {
            const r = input.slice(i, i + length)
            const sum = r.reduce((prev, next) => prev + next, 0)
            if (sum === invalid) return r
        }
        length++
    }
})()

const min = Math.min.apply(null, range)
const max = Math.max.apply(null, range)

console.log('Encryption Weakness:', min + max)
