const os = require('os')
const path = require('path')
const fs = require('fs')
const { Command } = require('commander');
const { resolve } = require('path/posix');

const homeDir = os.homedir()
const program = new Command();

let fileOfTodo = path.join(homeDir, '.todo')

function read() {
    return new Promise((resolve, reject) => {
        fs.readFile(fileOfTodo, {flag: 'a+'}, (err, data) => {
            if(err) {
                reject(err)
            }
            resolve(data)
        })
    })
}

function write(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileOfTodo, data, (err) => {
            if(err) {
                reject(err)
            }
            resolve('Task created successfully')
        })
    })
}



program
  .name('todo')
  .description('To Do gives you focus, from work to play.')
  .version('0.0.1');

  program.command('create')
  .description('Create a new task')
  .argument('<string>', 'Task name')
  .action((str) => {
      read().then((data) => {
          let res
          let fileData = data.toString()
          res = [{content: str, done: false}]
          if(fileData) {
              res = [...JSON.parse(fileData), {content: str, done: false}]
          }

          write(JSON.stringify(res))
    
  });

  program.command('cat')
  .description('Cat all tasks')
  .action(() => {
      read().then((data) => {
          let fileData = data.toString()
          if(fileData) {
            JSON.parse(fileData).map((task, index) => {
                console.log(`${task.done ? '[✔]' : '[✘]'} ${index + 1}.${task.content}`)
            })
          }
      })
    
  });

  program.command('remove')
  .description('Remove a task')
  .argument('<number>', 'Task index')
  .action((i) => {
      read().then((data) => {
          let fileData = data.toString()
          if(fileData) {
            let res = JSON.parse(fileData).filter((task, index) => {
                return index != i - 1
            })
            write(JSON.stringify(res))
          }
      })
    
  });

  program.parse();