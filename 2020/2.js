module.exports = () => {
    const input = require('./2.json')

    // Part 1
    const passwords = input.map(i => {
        const [policy, password] = i.split(':').map(s => s.trim())
        const [frequency, char] = policy.split(' ')
        const [min, max] = frequency.split('-').map(Number)

        return { password, char, min, max }
    })

    const numValid = passwords.reduce((prev, { password, char, min, max }) => {
        const count = password
            .split('')
            .reduce((prev, curr) => prev + +(curr === char), 0)
        return prev + +(min <= count && count <= max)
    }, 0)

    console.log('Valid Passwords:', numValid)

    // Part 2
    const numValid2 = passwords.reduce(
        (prev, { password, char, min, max }) =>
            prev +
            +(
                [password[min - 1], password[max - 1]].filter(c => c === char)
                    .length === 1
            ),
        0
    )

    console.log('Valid Passwords:', numValid2)
}
