module.exports = () => {
    const input = require('./3.json')

    // const input = [
    //     ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'],
    //     ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83']
    // ] // Output: 159

    // const input = [
    //     ['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51'],
    //     ['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7']
    // ] // Output: 135

    // Part 1
    const intersections = []
    const grid = {}
    let x = 0
    let y = 0
    input[0].forEach(val => {
        const direction = val[0]
        const distance = +val.slice(1)
        let target
        switch (direction) {
            case 'U':
                target = y + distance
                for (; y < target; y++) {
                    if (!grid[x]) grid[x] = {}
                    grid[x][y] = '1'
                }
                break
            case 'D':
                target = y - distance
                for (; y > target; y--) {
                    if (!grid[x]) grid[x] = {}
                    grid[x][y] = '1'
                }
                break
            case 'L':
                target = x - distance
                for (; x > target; x--) {
                    if (!grid[x]) grid[x] = {}
                    grid[x][y] = '1'
                }
                break
            case 'R':
                target = x + distance
                for (; x < target; x++) {
                    if (!grid[x]) grid[x] = {}
                    grid[x][y] = '1'
                }
                break
        }
    })

    let shortest = 0
    x = 0
    y = 0
    input[1].forEach(val => {
        const direction = val[0]
        const distance = +val.slice(1)
        let target
        switch (direction) {
            case 'U':
                target = y + distance
                for (; y < target; y++) {
                    if (grid[x] && grid[x][y] === '1') {
                        const d = Math.abs(+x) + Math.abs(+y)
                        console.log(
                            `Intersection at (${x}, ${y})\nDistance: ${d}`
                        )
                        intersections.push({ x, y, d })
                        if (shortest === 0 || d < shortest) {
                            console.log('New Shortest Distance:', d)
                            shortest = d
                        }
                    }
                }
                break
            case 'D':
                target = y - distance
                for (; y > target; y--) {
                    if (grid[x] && grid[x][y] === '1') {
                        const d = Math.abs(+x) + Math.abs(+y)
                        console.log(
                            `Intersection at (${x}, ${y})\nDistance: ${d}`
                        )
                        intersections.push({ x, y, d })
                        if (shortest === 0 || d < shortest) {
                            console.log('New Shortest Distance:', d)
                            shortest = d
                        }
                    }
                }
                break
            case 'L':
                target = x - distance
                for (; x > target; x--) {
                    if (grid[x] && grid[x][y] === '1') {
                        const d = Math.abs(+x) + Math.abs(+y)
                        console.log(
                            `Intersection at (${x}, ${y})\nDistance: ${d}`
                        )
                        intersections.push({ x, y, d })
                        if (shortest === 0 || d < shortest) {
                            console.log('New Shortest Distance:', d)
                            shortest = d
                        }
                    }
                }
                break
            case 'R':
                target = x + distance
                for (; x < target; x++) {
                    if (grid[x] && grid[x][y] === '1') {
                        const d = Math.abs(+x) + Math.abs(+y)
                        console.log(
                            `Intersection at (${x}, ${y})\nDistance: ${d}`
                        )
                        intersections.push({ x, y, d })
                        if (shortest === 0 || d < shortest) {
                            console.log('New Shortest Distance:', d)
                            shortest = d
                        }
                    }
                }
                break
        }
    })

    console.log('Shortest Distance:', shortest)

    // Part 2
    intersections.shift()

    const steps = intersections.map(i => {
        const step = {}
        step.s1 = 0
        step.s2 = 0
        // Wire 1 Steps
        let x = 0
        let y = 0
        let keepGoing = true
        input[0].forEach(val => {
            if (!keepGoing) return
            const direction = val[0]
            const distance = +val.slice(1)
            let target
            switch (direction) {
                case 'U':
                    target = y + distance
                    for (; y < target; y++) {
                        if (x === i.x && y === i.y) return (keepGoing = false)
                        step.s1 += 1
                    }
                    break
                case 'D':
                    target = y - distance
                    for (; y > target; y--) {
                        if (x === i.x && y === i.y) return (keepGoing = false)
                        step.s1 += 1
                    }
                    break
                case 'L':
                    target = x - distance
                    for (; x > target; x--) {
                        if (x === i.x && y === i.y) return (keepGoing = false)
                        step.s1 += 1
                    }
                    break
                case 'R':
                    target = x + distance
                    for (; x < target; x++) {
                        if (x === i.x && y === i.y) return (keepGoing = false)
                        step.s1 += 1
                    }
                    break
            }
        })
        // Wire 2 Steps
        x = 0
        y = 0
        keepGoing = true
        input[1].forEach(val => {
            if (!keepGoing) return
            const direction = val[0]
            const distance = +val.slice(1)
            let target
            switch (direction) {
                case 'U':
                    target = y + distance
                    for (; y < target; y++) {
                        if (x === i.x && y === i.y) return (keepGoing = false)
                        step.s2 += 1
                    }
                    break
                case 'D':
                    target = y - distance
                    for (; y > target; y--) {
                        if (x === i.x && y === i.y) return (keepGoing = false)
                        step.s2 += 1
                    }
                    break
                case 'L':
                    target = x - distance
                    for (; x > target; x--) {
                        if (x === i.x && y === i.y) return (keepGoing = false)
                        step.s2 += 1
                    }
                    break
                case 'R':
                    target = x + distance
                    for (; x < target; x++) {
                        if (x === i.x && y === i.y) return (keepGoing = false)
                        step.s2 += 1
                    }
                    break
            }
        })
        step.sTotal = step.s1 + step.s2

        return step
    })

    const minSteps = Math.min.apply(
        null,
        steps.map(s => s.sTotal)
    )

    console.log('Minimum Steps:', minSteps)
}
