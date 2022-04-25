const { toJson, toStr } = require('./utils')
const { read, write } = require('./utils')

function bufferToString() {
    return new Promise((resolve) => {
        read().then((buffer) => {
            return resolve(buffer.toString())
        })
    })

}
// 创建任务
function createHandler(str) {
    let newTask = [{ content: str, done: false }]
    bufferToString().then((res) => {
        res = res ? [...toJson(res), ...newTask] : newTask
        write(toStr(res))
    })
}

// 查看任务
function catHandler() {
    bufferToString().then((res) => {
        res && toJson(res).map((task, index) => {
            console.log(`${task.done ? '[✔]' : '[✘]'} ${index + 1}.${task.content}`)
        })
    })
}

// 移除任务
function removeHandler(i) {
    bufferToString().then((res) => {
        res && (res = toJson(res).filter((task, index) => {
            return index != i - 1
        }))
        write(toStr(res))
    })
}

module.exports = {
    createHandler,
    catHandler,
    removeHandler
}