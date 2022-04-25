const os = require('os')
const path = require('path')
const fs = require('fs')

const homeDir = os.homedir()
let fileOfTodo = path.join(homeDir, '.todo')

module.exports = {
    read() {
        return new Promise((resolve, reject) => {
            fs.readFile(fileOfTodo, { flag: 'a+' }, (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    },
    write(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileOfTodo, data, (err) => {
                if (err) {
                    reject(err)
                }
                resolve('Task created successfully')
            })
        })
    }
}