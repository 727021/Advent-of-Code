module.exports = () => {
    // Input
    const moduleMass = require('./1.json')

    // Part 1
    const getFuel = mass => Math.floor(mass / 3) - 2

    const moduleFuel = moduleMass.map(getFuel)

    const totalFuel = moduleFuel.reduce((prev, curr) => prev + curr, 0)

    console.log('Total Fuel:', totalFuel)

    // Part 2
    const moduleFuel2 = moduleFuel.map(f => [f])

    const clampFuel = fuel => {
        const f = getFuel(fuel)
        return f < 0 ? 0 : f
    }

    for (let f of moduleFuel2) {
        while (clampFuel(f[f.length - 1])) {
            f.push(clampFuel(f[f.length - 1]))
        }
    }

    const allFuel = moduleFuel2.reduce(
        (prev, curr) => prev + curr.reduce((p, c) => p + c, 0),
        0
    )

    console.log('All Fuel:', allFuel)
}
