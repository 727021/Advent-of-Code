const { readFileSync } = require('fs')
const { join } = require('path')

const input = readFileSync(join(__dirname, '8.txt'))
    .toString()
    .replace(/\r/g, '')
    .split('\n')
    .map(line => {
        const [instruction, argument] = line.replace('+', '').split(' ')
        return { instruction, argument: +argument }
    })

// Part 1
const runProgram = program => {
    let accumulator = 0
    let ip = 0
    while (true) {
        if (ip >= program.length)
            return {
                accumulator,
                ip,
                program,
                status: 0
            }

        const { instruction, argument, visited } = program[ip]

        if (visited)
            return {
                accumulator,
                ip,
                program,
                status: 1
            }
        program[ip].visited = true

        switch (instruction) {
            case 'acc':
                accumulator += argument
                ip += 1
                break
            case 'jmp':
                ip += argument
                break
            case 'nop':
                ip += 1
                break
        }
    }
}

const { accumulator } = runProgram(input.map(i => ({ ...i })))

console.log('Accumulator Value:', accumulator)

// Part 2
const changeable = []
input.forEach(({ instruction }, i) => {
    if (instruction !== 'acc') changeable.push(i)
})

for (const i of changeable) {
    const program = input.map(i => ({ ...i }))
    program[i].instruction = program[i].instruction === 'jmp' ? 'nop' : 'jmp'
    const { accumulator, status } = runProgram(program)
    if (status === 1) continue
    console.log('Accumulator Value:', accumulator)
    break
}
