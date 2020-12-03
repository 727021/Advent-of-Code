module.exports = () => {
    // 1 - add a + b -> c
    // 2 - multiply a * b -> c
    // 99 - halt

    const programInput = require('./2.json')
    const original = [...programInput]

    // Part 1
    const handleOpcode = (program, position) => {
        const opcode = program[position]
        switch (opcode) {
            case 1:
            case 2:
                const a = program[program[position + 1]]
                const b = program[program[position + 2]]
                const c = program[position + 3]
                program[c] = opcode === 1 ? a + b : a * b
                return position + 4
            case 99:
                return null
            default:
                throw `Invalid opcode '${opcode}' at position '${position}'`
        }
    }

    programInput[1] = 12
    programInput[2] = 2

    let ip = 0
    do {
        ip = handleOpcode(programInput, ip)
    } while (ip !== null)

    console.log('Position 0:', programInput[0])

    // Part 2
    const execProgram = (program, noun, verb) => {
        program[1] = noun
        program[2] = verb
        let ip = 0
        while (ip !== null) ip = handleOpcode(program, ip)
        return program[0]
    }

    ;(() => {
        for (let noun = 0; noun <= 99; noun++) {
            for (let verb = 0; verb <= 99; verb++) {
                if (execProgram([...original], noun, verb) === 19690720)
                    return console.log('Program Input:', 100 * noun + verb)
            }
        }
    })()
}
