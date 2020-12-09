const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')
const { Graph } = require('graph')

const input = new Graph()

readFileSync(join(__dirname, '7.txt'))
    .toString()
    .replace(/ bags?/g, '')
    .replace(/\./g, '')
    .replace(/\r/g, '')
    .split('\n')
    .forEach(line => {
        const [root, contains] = line.split('contain').map(i => i.trim())

        if (contains === 'no other') return

        contains
            .split(',')
            .map(i => i.trim())
            .forEach(branch => {
                const [count, ...color] = branch.split(' ')
                input.dir(root, color.join(' '), count)
            })
    })

// Part 1
const level1 = []
for (const v of input._vertices)
    for (const adj in input.adj(v)) if (adj === 'shiny gold') level1.push(v)

const findParents = (last, all) => {
    if (last.length === 0) return all
    const next = []
    for (const v of input._vertices)
        for (const adj in input.adj(v))
            if (last.includes(adj) && !all.includes(v)) next.push(v)

    return findParents(next, [...new Set([...all, ...next])])
}

const allParents = findParents([...level1], [...level1])

console.log('Possible Bags:', allParents.length)

// Part 2
const bagsIn = bag => {
    const adj = input.adj(bag)

    if (!adj || Object.keys(adj).length === 0) return 0

    let sum = 0

    for (const [key, val] of Object.entries(adj))
        sum += +val * (bagsIn(key) + 1)

    return sum
}

const totalBags = bagsIn('shiny gold')

console.log('Total Bags:', totalBags)
