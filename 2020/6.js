const { readFileSync } = require('fs')
const { join } = require('path')

const input = readFileSync(join(__dirname, '6.txt'))
    .toString()
    .replace(/\r/g, '')
    .split('\n\n')
    .map(i => i.split('\n'))

// Part 1
const yesCounts = input.map(group => [...new Set(group.join(''))].length)
const yesSum = yesCounts.reduce((prev, curr) => prev + curr, 0)

console.log('Total "yes" answers:', yesSum)

// Part 2
const everyoneYes = input.map(group => {
    return [...new Set(group.join(''))].reduce((prev, curr) => {
        for (const person of group) if (!person.includes(curr)) return prev
        return prev + 1
    }, 0)
})

const everyoneYesSum = everyoneYes.reduce((prev, curr) => prev + curr, 0)

console.log('Everyone "yes" answers:', everyoneYesSum)
