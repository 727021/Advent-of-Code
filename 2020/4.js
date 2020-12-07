module.exports = () => {
    const { readFileSync } = require('fs')
    const { join } = require('path')

    const raw = readFileSync(join(__dirname, '4.txt'))
        .toString()
        .replace(/\r/g, '')
        .split('\n\n')

    const input = raw.map(passport =>
        passport
            .replace(/\n/g, ' ')
            .split(' ')
            .reduce((prev, curr) => {
                const [key, val] = curr
                    .split(':')
                    .map(s => s.toLowerCase().trim())
                const out = { ...prev }
                out[key] = val
                return out
            }, {})
    )

    // Part 1
    const numValid = input.reduce(
        (prev, curr) =>
            prev +
            +['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(i =>
                curr.hasOwnProperty(i)
            ),
        0
    )

    console.log('Valid Passports:', numValid)

    // Part 2
    const validator = passport => {
        const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

        if (!fields.every(f => passport.hasOwnProperty(f))) return false

        for (const f of fields) if (!validator[f](passport[f])) return false

        return true
    }
    validator.byr = x => +x >= 1920 && +x <= 2002
    validator.iyr = x => +x >= 2010 && +x <= 2020
    validator.eyr = x => +x >= 2020 && +x <= 2030
    validator.hgt = x => {
        const units = x.slice(x.length - 2)
        const num = x.slice(0, x.length - 2)

        if (units === 'cm') {
            if (+num < 150 || +num > 193) return false
        } else if (units === 'in') {
            if (+num < 59 || +num > 76) return false
        } else return false

        return true
    }
    validator.hcl = x => /^#[0-9a-f]{6}$/.test(x)
    validator.ecl = x =>
        ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(x)
    validator.pid = x => /^[0-9]{9}$/.test(x)

    const totalValid = input.reduce((prev, curr) => prev + +validator(curr), 0)

    console.log('Valid Passports:', totalValid)
}
