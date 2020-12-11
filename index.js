const { promptCLLoop } = require('readline-sync')
const { yellowBright: yellow, greenBright: green, red, gray } = require('chalk')
const { textSync: figlet } = require('figlet')
const { join } = require('path')
const { readdirSync, readFileSync } = require('fs')

// Load available years/days
const years = () =>
    readdirSync('./')
        .filter(i => /^\d{4}$/.test(i))
        .map(Number)
        .sort((a, b) => a - b)
const days = year =>
    readdirSync(join(__dirname, year))
        .filter(i => /^\d{1,2}\.js$/.test(i))
        .map(i => +i.split('.')[0])
        .map(Number)
        .sort((a, b) => a - b)

let currentYear = null
let prevError = null

// Define console commands
const commands = {
    help: command => {
        if (command === undefined) {
            console.log('Available commands:')
            console.log(' ', yellow('help'), `[${yellow('command')}]`)
            console.log('    List or display help for commands')
            console.log(' ', yellow('year'), `[${yellow('year')}]`)
            console.log('    Display or set the current year')
            console.log(' ', yellow('run'), `[${yellow('day')}]`)
            console.log(
                '    Display available days or run the solution for a day'
            )
            console.log(' ', yellow('error'))
            console.log('    Display error details')
            console.log(' ', yellow('clear'))
            console.log('    Clear the console window')
            console.log(' ', yellow('quit'))
            console.log('    Quit AoC')
        } else {
            switch (command.trim().toLowerCase()) {
                case 'help':
                case '?':
                    console.log(yellow('help'))
                    console.log('  List all available commands')
                    console.log(yellow('help'), `[${yellow('command')}]`)
                    console.log('  Display help for a specific command')
                    console.log(gray('Aliases: help, ?'))
                    break
                case 'year':
                case 'y':
                    console.log(yellow('year'))
                    console.log(
                        '  Display the current year setting and all valid years'
                    )
                    console.log(yellow('year'), `[${yellow('year')}]`)
                    console.log('  Set the current year')
                    console.log(gray('Aliases: year, y'))
                    break
                case 'run':
                case 'r':
                case 'day':
                case 'd':
                    console.log(yellow('run'))
                    console.log('  Display available days for the current year')
                    console.log(yellow('run'), `[${yellow('day')}]`)
                    console.log("  Run the solution for a day's puzzles")
                    console.log(gray('Aliases: run, r, day, d'))
                    break
                case 'error':
                case 'err':
                case 'e':
                    console.log(yellow('error'))
                    console.log(
                        '  Display any errors caused by the last run solution'
                    )
                    console.log(gray('Aliases: error, err, e'))
                    break
                case 'clear':
                case 'cls':
                    console.log(yellow('clear'))
                    console.log('  Clear the console window')
                    console.log(gray('Aliases: clear, cls'))
                    break
                case 'quit':
                case 'q':
                    console.log(yellow('quit'))
                    console.log('  Quit AoC')
                    console.log(gray('Aliases: quit, q, exit'))
                    break
                default:
                    console.log('Invalid command', red(command))
                    console.log('See', yellow('help'), 'for a list of commands')
                    break
            }
        }
    },
    year: y => {
        if (y === undefined) {
            console.log(
                `Year is ${
                    currentYear === null ? 'not set' : `set to ${currentYear}`
                }`
            )
            console.log('Valid Years:')
            console.log(
                `\t${years()
                    .map(y => (y == currentYear ? green(y) : y))
                    .join(', ')}`
            )
        } else if (Number(y) && years().some(i => +i === +y)) {
            currentYear = y.toString()
            console.log(`Set year to ${y}`)
        } else {
            console.log(`Invalid year ${red(y)}`)
        }
    },
    run: day => {
        if (currentYear === null) {
            console.log('Year is not set')
            console.log(
                'Choose a year with',
                yellow('year'),
                `[${yellow('year')}]`
            )
        } else if (day === undefined) {
            console.log(`Available days for ${green(currentYear)}:`)
            console.log(`\t${days(currentYear).join(', ')}`)
        } else if (!Number(day) || +day < 1 || +day > 25) {
            console.log(`Invalid day ${red(day)}`)
        } else if (!days(currentYear).some(d => +d === +day)) {
            console.log(`No solution for ${green(currentYear)}-${green(day)}`)
        } else {
            console.log(
                'Running solution for',
                green('AoC'),
                green(currentYear) + '-' + green(day)
            )
            console.log()
            try {
                eval(`
                    ;(() => {
                        ${readFileSync(
                            join(__dirname, currentYear, `${day}.js`)
                        )
                            .toString()
                            .replace(
                                /require\(\'\.\//g,
                                `require('./${currentYear}/`
                            )
                            .replace(
                                /__dirname/g,
                                `__dirname, '${currentYear}'`
                            )}
                    })()
                        `)
                console.log()
                console.log(gray('Finished'))
                prevError = null
            } catch (err) {
                console.log()
                console.error(red('ERROR:'), err.message)
                console.error('See', yellow('error'), 'for more information')
                prevError = err
                prevError.year = currentYear
                prevError.day = day
            }
        }
    },
    error: () => {
        if (prevError === null) {
            console.log('No error to display')
        } else {
            console.log(
                'Error caused by',
                green('AoC'),
                `${green(prevError.year)}-${green(prevError.day)}:\n`
            )
            console.error(red('ERROR:'), prevError.message)
            console.error(prevError.stack.split('\n').slice(1).join('\n'))
        }
    },
    clear: () => {
        console.clear()
    },
    quit: () => true
}

// Display welcome message
console.clear()
// Use figlet for ASCII art
console.log(green(figlet('Advent of Code')))
console.log()
commands.help()

// Run main loop
promptCLLoop(
    {
        '': () => false,
        help: commands.help,
        '?': commands.help,
        year: commands.year,
        y: commands.year,
        run: commands.run,
        r: commands.run,
        day: commands.run,
        d: commands.run,
        error: commands.error,
        err: commands.error,
        e: commands.error,
        clear: commands.clear,
        cls: commands.clear,
        quit: commands.quit,
        q: commands.quit,
        exit: commands.quit
    },
    {
        prompt: {
            toString: () =>
                `\n${green('AoC')}${
                    currentYear === null ? '' : `/${green(currentYear)}`
                }>`
        },
        limitMessage: `Invalid command ${red('$<lastInput>')}\nSee ${yellow(
            'help'
        )} for a list of commands`
    }
)
