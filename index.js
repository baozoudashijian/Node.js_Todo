const { read, write } = require('./utils')
const inquirer = require('inquirer');

module.exports = {
    create(str) {
        read().then((data) => {
            let res
            let fileData = data.toString()
            res = [{ content: str, done: false }]
            if (fileData) {
                res = [...JSON.parse(fileData), { content: str, done: false }]
            }

            write(JSON.stringify(res))
        })
    },
    cat() {
        read().then((data) => {
            let fileData = data.toString()
            if (fileData) {
                JSON.parse(fileData).map((task, index) => {
                    console.log(`${task.done ? '[✔]' : '[✘]'} ${index + 1}.${task.content}`)
                })
            }
        })
    },
    remove(i) {
        read().then((data) => {
            let fileData = data.toString()
            if (fileData) {
                let res = JSON.parse(fileData).filter((task, index) => {
                    return index != i - 1
                })
                write(JSON.stringify(res))
            }
        })
    },
    mark() {
        let selectOptions = []
        read().then((data) => {
            let fileData = data.toString()
            if (fileData) {
                selectOptions = JSON.parse(fileData).map((task, index) => {
                    return { name: task.content, value: index, checked: task.done ? true : false }
                })

                inquirer
                    .prompt([
                        {
                            type: 'checkbox',
                            message: 'Select tasks',
                            name: 'tasks',
                            choices: [
                                new inquirer.Separator(' ==== The Tasks ==== '),
                                ...selectOptions
                            ]
                        }])
                    .then(({ tasks }) => {
                        let res = JSON.parse(fileData)
                        tasks.map((taskIndex) => {
                            res[taskIndex].done = true
                        })
                        write(JSON.stringify(res))
                    })
            }
        })
    },
    edit() {
        let selectOptions = []
        read().then((data) => {
            let fileData = data.toString()
            if (fileData) {
                selectOptions = JSON.parse(fileData).map((task, index) => {
                    return { name: task.content, value: index }
                })
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'taskIndex',
                            message: 'Whick task you want to change?',
                            choices: [
                                ...selectOptions
                            ],
                        },
                    ])
                    .then(({ taskIndex }) => {
                        console.log(taskIndex)
                        inquirer.
                            prompt([
                                {
                                    type: 'input',
                                    name: 'text',
                                    message: "Enter the name you want to change",
                                }
                            ]).then(({ text }) => {
                                let res = JSON.parse(fileData)
                                res[taskIndex].content = text
                                write(JSON.stringify(res))
                            });
                    });
            }
        })
    }
}