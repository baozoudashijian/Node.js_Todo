const os = require('os')
const path = require('path')
const fs = require('fs')

const homeDir = os.homedir()
let DBOfTodo = path.join(homeDir, '.todo')

module.exports = {
    read() {
        return new Promise((resolve, reject) => {
            fs.readFile(DBOfTodo, { flag: 'a+' }, (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    },
    write(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(DBOfTodo, data, (err) => {
                if (err) {
                    reject(err)
                }
                resolve('Task created successfully')
            })
        })
    },
    toJson(str) {
        return JSON.parse(str)
    },
    toStr(json) {
    
        return JSON.stringify(json)
    }
}