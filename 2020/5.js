/**
 * Rows 0-127 (First 7 chars)
 * F - Lower Half
 * B - Upper Half
 *
 * Cols 0-7 (Last 3 chars)
 * L - Lower Half
 * R - Upper Half
 *
 * ID = row * 8 + col
 */

const { readFileSync } = require('fs')
const { join } = require('path')

const input = readFileSync(join(__dirname, '5.txt'))
    .toString()
    .replace(/\r/g, '')
    .split('\n')
    .map(i => i.trim().split(''))

// Part 1

/**
 * Generates a list of numbers [min, max).
 *
 * If max is omitted, generates a list of numbers [0, min).
 * @param {Number} min
 * @param {Number} [max]
 */
const range = (min, max) => {
    if (max === undefined) {
        max = min
        min = 0
    }
    return [
        // Use a generator function, because why not?
        ...(function* () {
            let i = min
            while (i < max) yield i++
        })()
    ]
}

const split = arr => {
    const lower = [...arr]
    const upper = lower.splice(lower.length / 2)

    return [lower, upper]
}

const parsePass = pass => {
    const rowArr = [...pass]
    const colArr = rowArr.splice(7)

    let rows = range(128)
    let cols = range(8)

    let row
    let col

    for (const r of rowArr) {
        if (r === 'F') {
            // Lower
            if (rows.length === 2) row = rows[0]
            else rows = split(rows)[0]
        } else {
            // Upper
            if (rows.length === 2) row = rows[1]
            else rows = split(rows)[1]
        }
    }

    for (const c of colArr) {
        if (c === 'L') {
            // Lower
            if (cols.length === 2) col = cols[0]
            else cols = split(cols)[0]
        } else {
            // Upper
            if (cols.length === 2) col = cols[1]
            else cols = split(cols)[1]
        }
    }

    return row * 8 + col
}

const passIDs = input.map(parsePass)
const highestPass = Math.max.apply(null, passIDs)

console.log('Highest Pass ID:', highestPass)

// Part 2
const lowestPass = Math.min.apply(null, passIDs)

let myPass = lowestPass + 1
for (; myPass < highestPass; myPass++) {
    if (
        !passIDs.includes(myPass) &&
        passIDs.includes(myPass - 1) &&
        passIDs.includes(myPass + 1)
    )
        break
}

console.log('My Seat ID:', myPass)
