const { create, cat, remove, mark, edit } = require('./index')

const { Command } = require('commander');
const program = new Command();


// 使用说明
program
    .name('todo')
    .description('To Do gives you focus, from work to play.')
    .version('0.0.1');

// 创建任务
program.command('create')
    .description('Create a new task')
    .argument('<string>', 'Task name')
    .action((str) => {
        create(str)
    });

// 查看所有任务
program.command('cat')
    .description('Cat all tasks')
    .action(() => {
        cat()
    });

// 删除任务
program.command('remove')
    .description('Remove a task')
    .argument('<number>', 'Task index')
    .action((i) => {
        remove(i)
    });


// 修改任务状态
program.command('mark')
    .description('Remove a task')
    // .argument('<string>', 'Mark task status [complete] or [uncomplete]')
    .action((status) => {
        mark()
    });

// 编辑任务名称
program.command('edit')
    .description('edit a task')
    .action((index) => {
        edit()
    });

program.parse();