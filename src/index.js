#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const { Octokit } = require("@octokit/rest");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
// const { description } = require('commander');
const path=require('path');

const adapter = new FileSync(path.join( __dirname, 'db.json'))
const db = low(adapter)
db.defaults({ userinfo: {}, token: "", snippets: [], 'folder': '' })
    .write()

program
    .command('login <token>')
    .description('login with github token')
    .action(function(token) {
        // console.log('login with "%s"', token);
        const octokit = new Octokit({
            auth: token
        });
        octokit.request("/user").then(({ data }) => {
            console.log(chalk.yellow(data.login), chalk.blue('logined'))

            db.set('token', token).set('userinfo', data)
                .write()
        }).catch(err => {
            if (err.message == 'Bad credentials') {
                console.log(chalk.red('login failed, your token is wrong'))
            }
        });

    })

program
    .command('globalfolder <folder>')
    .description('set your vscode snippets folder')
    .action(function(folder) {
        // console.log('login with "%s"', token);
        db.set('folder', folder)
            .write()
        console.log(chalk.yellow('Setting global folder success'))

    })

program
    .command('sync <id>')
    .description('sync your gists to vscode snippets,if id is empty,mg will sync all your gists')
    .action(function(id) {
        if (!db.get('token').value()) {
            console.log(chalk.red('You should login first'))
            return 
        }
        const octokit = new Octokit({
            auth: db.get('token').value()
        });
        var gisthelper = require('./gisthelper')
        if (id) {
            octokit.gists.get({
                gist_id: id,
            }).then(({ data }) => {
                // console.log(data)
                // console.log(data.files)
                var content = gisthelper.convert(data.files)
                    // console.log(content)
                if (program.global) {
                    gisthelper.save( data.description +id+ ".code-snippets", content, db.get('folder').value())
                } else {
                    gisthelper.save(data.description+id+ + ".code-snippets", content, process.cwd())
                }
            });

        }

        // console.log('execsss "%s"', id);
    })

program
    .command('show')
    .description('show your gists')
    .action(function() {
        if (!db.get('token').value()) {
            console.log(chalk.red('You should login first'))
            return
        }
        const octokit = new Octokit({
            auth: db.get('token').value()
        });
        octokit.gists.list().then(({ data }) => {
            data.forEach(item => {
                console.log(chalk.yellow(item.description), chalk.gray(item.id), chalk.gray(item.updated_at), chalk.gray(item.public ? '' : "secret"))
                Object.keys(item.files).forEach(key => {
                    console.log(chalk.yellowBright('-'), chalk.blue(item.files[key].filename), chalk.gray(item.files[key].size))
                })
            })
        })
    })
    
program.version(require("./package.json").version, '-v').option('-g, --global', "localed your snippets ", false).parse(process.argv);
