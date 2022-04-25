const { read, write } = require('./utils')
const {  createHandler, catHandler, removeHandler } = require('./model')
const inquirer = require('inquirer');

module.exports = {
    create(str) {
        createHandler(str)
    },
    cat() {
        catHandler()
    },
    remove(index) {
        removeHandler(index)
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