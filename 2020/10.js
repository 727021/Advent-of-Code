const { readFileSync } = require('fs')
const { join } = require('path')

const input = readFileSync(join(__dirname, '10.txt'))
    .toString()
    .replace(/\r/g, '')
    .split('\n')

// Part 1
let adapters = [...input].map(Number)
adapters.push(0, 3 + Math.max(...adapters))

adapters = adapters.sort((a, b) => a - b)

let oneJolt = 0
let threeJolt = 0

for (let i = 1; i < adapters.length; i++) {
    const diff = adapters[i] - adapters[i - 1]
    if (diff === 1) oneJolt++
    else if (diff === 3) threeJolt++
}

console.log('Product of 1- and 3-jolt differences:', oneJolt * threeJolt)

// Part 2
const cache = {}

const countConfigs = n => {
    if (n === adapters.length - 1) return 1
    if (n in cache) return cache[n]
    let out = 0
    for (let i = n + 1; i < adapters.length; i++)
        if (adapters[i] - adapters[n] <= 3) out += countConfigs(i)
    cache[n] = out
    return out
}

console.log('Total Possible Configurations:', countConfigs(0))
