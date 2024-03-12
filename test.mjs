import fs from 'fs'
import path, { dirname } from 'path'
import assert from 'assert'
import { spawn } from 'child_process'
import syntaxError from 'syntax-error'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const require = createRequire(__dirname)

let folders = ['.', ...Object.keys(require(path.join(__dirname, './package.json')).directories)]
let files = []
folders.forEach(folder => {
    fs.readdirSync(path.join(__dirname, folder)).forEach(file => {
        if (file.endsWith('.js')) files.push(path.join(__dirname, folder, file))
    })
})
files.forEach(file => {
    if (file === __filename) return
    console.error('Checking', file)
    const content = fs.readFileSync(file, 'utf8')
    const error = syntaxError(content, file, {
        sourceType: 'module',
        allowReturnOutsideFunction: true,
        allowAwaitOutsideFunction: true
    })
    if (error) assert.ok(error.length < 1, file + '\n\n' + error)
    assert.ok(file)
    console.log('by Nishi-bot')
    console.log('Done', file)
})