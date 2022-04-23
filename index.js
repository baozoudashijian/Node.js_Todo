const os = require('os')
const path = require('path')
const fs = require('fs')

const homeDir = os.homedir()

let fileOfTodo = path.join(homeDir, '.todo')

fs.readFile(fileOfTodo, {flag: 'a+'}, (err, data) => {
    if(err) {
        return err
    }
    console.log(data)
})
