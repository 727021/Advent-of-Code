const readline = require('readline-sync')

const input = require('./5.json')

// Parts 1 and 2

const opcodes = {
    1: {
        name: 'add',
        size: 4,
        params: 3,
        exec(prog, modes, params) {
            let [a, b, c] = params
            if (modes[0] === parameterMode.POSITION) a = prog[a]
            if (modes[1] === parameterMode.POSITION) b = prog[b]
            prog[c] = a + b
            return this.size
        }
    },
    2: {
        name: 'multiply',
        size: 4,
        params: 3,
        exec(prog, modes, params) {
            let [a, b, c] = params
            if (modes[0] === parameterMode.POSITION) a = prog[a]
            if (modes[1] === parameterMode.POSITION) b = prog[b]
            prog[c] = a * b
            return this.size
        }
    },
    3: {
        name: 'move',
        size: 2,
        params: 1,
        exec(prog, modes, params) {
            let [a] = params
            const prompt = readline.questionInt('Input: ')
            prog[a] = prompt
            return this.size
        }
    },
    4: {
        name: 'output',
        size: 2,
        params: 1,
        exec(prog, modes, params) {
            let [a] = params
            if (modes[0] === parameterMode.POSITION) a = prog[a]
            console.log('Output:', a)
            return this.size
        }
    },
    5: {
        name: 'jump-if-true',
        size: 3,
        params: 2,
        exec(prog, modes, params) {
            let [a, b] = params
            if (modes[0] === parameterMode.POSITION) a = prog[a]
            if (modes[1] === parameterMode.POSITION) b = prog[b]
            if (a != 0) {
                ip = b
                return 0
            }
            return this.size
        }
    },
    6: {
        name: 'jump-if-false',
        size: 3,
        params: 2,
        exec(prog, modes, params) {
            let [a, b] = params
            if (modes[0] === parameterMode.POSITION) a = prog[a]
            if (modes[1] === parameterMode.POSITION) b = prog[b]
            if (a == 0) {
                ip = b
                return 0
            }
            return this.size
        }
    },
    7: {
        name: 'less-than',
        size: 4,
        params: 3,
        exec(prog, modes, params) {
            let [a, b, c] = params
            if (modes[0] === parameterMode.POSITION) a = prog[a]
            if (modes[1] === parameterMode.POSITION) b = prog[b]
            prog[c] = a < b ? 1 : 0
            return this.size
        }
    },
    8: {
        name: 'equals',
        size: 4,
        params: 3,
        exec(prog, modes, params) {
            let [a, b, c] = params
            if (modes[0] === parameterMode.POSITION) a = prog[a]
            if (modes[1] === parameterMode.POSITION) b = prog[b]
            prog[c] = a == b ? 1 : 0
            return this.size
        }
    },
    99: {
        name: 'halt',
        size: 1,
        params: 0,
        exec(prog, modes, params) {
            return null
        }
    }
}

const parameterMode = {
    POSITION: 0,
    IMMEDIATE: 1
}

/**
 * Interprets an intcode instruction containing parameter modes (first x digits) and an opcode (last 2 digits).
 * @param {Number} instruction The intcode instruction to interpret.
 * @returns {Object} An object containing an opcode and an array of parameter modes. Missing modes are set to 0.
 */
const readInstruction = instruction => {
    const opcode = instruction % 100
    instruction = instruction + ''
    const modes = instruction
        .slice(0, instruction.length - 2)
        .split('')
        .reverse()
        .map(Number)

    // Make sure there's always a mode for every parameter
    while (modes.length < opcodes[opcode].size - 1) modes.push(0)

    return { opcode, modes }
}

const program = [...input]
let ip = 0
while (true) {
    const { opcode, modes } = readInstruction(program[ip])
    const fun = opcodes[opcode]
    const params = fun.params ? program.slice(ip + 1, ip + fun.params + 1) : []

    const result = fun.exec(program, modes, params)
    if (result === null) break
    ip += result
}
