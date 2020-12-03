module.exports = () => {
    const min = 206938
    const max = 679128

    // Part 1
    const hasAdjacentDigits = num => {
        num = num + ''
        for (let i = 0; i < num.length - 1; i++)
            if (num[i] === num[i + 1]) return true
        return false
    }

    const noDecreasingDigits = num => {
        num = num + ''
        for (let i = 0; i < num.length - 1; i++)
            if (+num[i] > +num[i + 1]) return false
        return true
    }

    let count = 0
    for (let i = min; i <= max; i++) {
        count += hasAdjacentDigits(i) && noDecreasingDigits(i)
    }

    console.log('Number of Passwords:', count)

    // Part 2
    const hasDoubleDigits = num => {
        num = num + ''
        // First 2 digits
        if (num[0] === num[1] && num[0] !== num[2]) return true
        // Last 2 digits
        if (
            num[num.length - 1] === num[num.length - 2] &&
            num[num.length - 1] !== num[num.length - 3]
        )
            return true
        // All other pairs
        for (let i = 1; i < num.length - 2; i++)
            if (
                num[i] === num[i + 1] &&
                num[i] !== num[i - 1] &&
                num[i] !== num[i + 2]
            )
                return true
        return false
    }

    count = 0
    for (let i = min; i <= max; i++) {
        count += hasDoubleDigits(i) && noDecreasingDigits(i)
    }

    console.log('Number of Passwords:', count)
}
