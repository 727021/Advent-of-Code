const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')

const input = readFileSync(join(__dirname, '11.txt'))
    .toString()
    .replace(/\r/g, '')
    .split('\n')
    .map(i => i.split(''))

/**
 * Rules:
 * - If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied
 * - If a seat is occupied (#) and 4+ adjacent seats are also occupied, the seat becomes empty
 * - Otherwise, a seat's state doesn't change
 * - Floor (.) never changes
 *
 * - Rules are applied to every seat simultaneously
 */

const EMPTY = 'L'
const OCCUPIED = '#'
const FLOOR = '.'

// Part 1
const countAdjacent = (row, col, state) => {
    let toCheck = [
        [row - 1, col - 1],
        [row - 1, col],
        [row - 1, col + 1],
        [row, col - 1],
        [row, col + 1],
        [row + 1, col - 1],
        [row + 1, col],
        [row + 1, col + 1]
    ].filter(
        ([r, c]) => r >= 0 && c >= 0 && r < state.length && c < state[r].length
    )

    let adjacent = 0
    for (const [r, c] of toCheck) if (state[r][c] === OCCUPIED) adjacent += 1

    return adjacent
}

const applyRules = state => {
    const out = state.map(i => [...i])

    for (let row = 0; row < state.length; row++) {
        for (let col = 0; col < state[row].length; col++) {
            const adjacent = countAdjacent(row, col, state)
            if (state[row][col] === EMPTY && adjacent === 0)
                out[row][col] = OCCUPIED
            if (state[row][col] === OCCUPIED && adjacent >= 4)
                out[row][col] = EMPTY
        }
    }

    return out
}

const equals2d = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false
    if (!arr1.every((val, i) => val.length === arr2[i].length)) return false
    for (let row = 0; row < arr1.length; row++)
        for (let col = 0; col < arr1[row].length; col++)
            if (arr1[row][col] !== arr2[row][col]) return false
    return true
}

let lastState = []
let currentState = input.map(i => [...i])

let rounds = 0

while (!equals2d(lastState, currentState)) {
    lastState = currentState.map(i => [...i])
    currentState = applyRules(currentState)
    rounds++
}

const numOccupied = currentState.reduce((prev, curr) => {
    return prev + curr.reduce((p, c) => p + +(c === OCCUPIED), 0)
}, 0)

console.log('Total Occupied Seats:', numOccupied, 'in', rounds, 'rounds')

// Part 2
const countVisible = (row, col, state) => {
    let out = 0

    // TL
    for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
        if (state[r][c] !== FLOOR) {
            if (state[r][c] === OCCUPIED) out++
            break
        }
    }

    // T
    for (let r = row - 1; r >= 0; r--) {
        if (state[r][col] !== FLOOR) {
            if (state[r][col] === OCCUPIED) out++
            break
        }
    }

    // TR
    for (
        let r = row - 1, c = col + 1;
        r >= 0 && c < state[r].length;
        r--, c++
    ) {
        if (state[r][c] !== FLOOR) {
            if (state[r][c] === OCCUPIED) out++
            break
        }
    }

    // L
    for (let c = col - 1; c >= 0; c--) {
        if (state[row][c] !== FLOOR) {
            if (state[row][c] === OCCUPIED) out++
            break
        }
    }

    // R
    for (let c = col + 1; c < state[row].length; c++) {
        if (state[row][c] !== FLOOR) {
            if (state[row][c] === OCCUPIED) out++
            break
        }
    }
    // BL
    for (let r = row + 1, c = col - 1; r < state.length && c >= 0; r++, c--) {
        if (state[r][c] !== FLOOR) {
            if (state[r][c] === OCCUPIED) out++
            break
        }
    }

    // B
    for (let r = row + 1; r < state.length; r++) {
        if (state[r][col] !== FLOOR) {
            if (state[r][col] === OCCUPIED) out++
            break
        }
    }

    // BR
    for (
        let r = row + 1, c = col + 1;
        r < state.length && c < state[r].length;
        r++, c++
    ) {
        if (state[r][c] !== FLOOR) {
            if (state[r][c] === OCCUPIED) out++
            break
        }
    }

    return out
}

const newRules = state => {
    const out = state.map(i => [...i])

    for (let row = 0; row < state.length; row++) {
        for (let col = 0; col < state[row].length; col++) {
            const visible = countVisible(row, col, state)
            if (state[row][col] === EMPTY && visible === 0)
                out[row][col] = OCCUPIED
            if (state[row][col] === OCCUPIED && visible >= 5)
                out[row][col] = EMPTY
        }
    }

    return out
}

lastState = []
currentState = input.map(i => [...i])

rounds = 0

while (!equals2d(lastState, currentState)) {
    lastState = currentState.map(i => [...i])
    currentState = newRules(currentState)
    rounds++
}

const totalOccupied = currentState.reduce((prev, curr) => {
    return prev + curr.reduce((p, c) => p + +(c === OCCUPIED), 0)
}, 0)

console.log('Total Occupied Seats:', totalOccupied, 'in', rounds, 'rounds')
