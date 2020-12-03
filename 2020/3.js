const {
    promises: { readFile, writeFile }
} = require('fs')
const { join } = require('path')

// Convert input to JSON
// ;(async () => {
//     try {
//         const strInput = (await readFile(join(__dirname, '3.txt'))).toString()
//         const input = strInput
//             .split('\n')
//             .map(line => line.replace('\r', '').split(''))
//         await writeFile('./3.json', JSON.stringify(input))
//         console.log('Wrote JSON file.')
//     } catch (error) {
//         console.error(error)
//     }
// })()

const originalInput = require('./3.json')

// Part 1
const input = originalInput.map(i => [...i]) // Deep copy

const repeat = Math.ceil(input.length / input[0].length) * 3

// Repeat input to the right to get a 1:3 width:height ratio
// Could also write code to wrap around, but this is easy
for (const line in input) {
    const original = input[line]
    for (let i = 0; i < repeat; i++) input[line] = input[line].concat(original)
}

let trees = 0

// Count the trees ('#')
for (
    let row = 0, col = 0;
    row < input.length && col < input[row].length;
    row++, col += 3
)
    trees += +(input[row][col] === '#')

console.log('Trees:', trees)

// Part 2
const slopes = [
    // [right, down]
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
]

let totalTrees = 1

for (const [right, down] of slopes) {
    const lines = originalInput.map(i => [...i]) // Deep copy of originalInput

    const r = Math.ceil(lines.length / lines[0].length) * right

    // Repeat to the right because it's easier than wrapping around
    for (const line in lines) {
        const original = lines[line]
        for (let i = 0; i < r; i++) lines[line] = lines[line].concat(original)
    }

    let n = 0

    // Count the trees for this slope
    for (
        let row = 0, col = 0;
        row < lines.length && col < lines[row].length;
        row += down, col += right
    )
        n += +(lines[row][col] === '#')

    // Aggregate trees for all slopes
    totalTrees *= n
}

console.log('Total Trees:', totalTrees)
