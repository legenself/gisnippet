# gist-manage github代码片段 vscode同步器
<br />
<p align="center">
 <a href="https://github.com/legenself/gist-manage">
 <img src="image/usage.png" alt="Logo" height="380">
 </a>
 <h3 align="center">gist-manage</h3>
 <p align="center">
 一个根据gist 快速生成vscode 代码模板的工具
 <br />
 <a href="https://github.com/legenself/gisnippet"><strong>Explore the docs »</strong></a>
 <br />
 <br />
 <!-- <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
 ·
 <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
 ·
 <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>-->
 </p>
</p>


## 开始使用

### 安装方法
```
npm install -g gisnippet
```
### 使用方法
```bash
$ gisnippet -h
# output
Usage: index [options] [command]

Options:
  -v                     output the version number
  -g, --global           localed your snippets  (default: false)
  -h, --help             display help for command

Commands:
  login <token>          login with github token
  globalfolder <folder>  set your vscode snippets folder
  sync <id>              sync your gists to vscode snippets,if id is empty,mg will sync all your gists
  show                   show your gists
  help [command]         display help for command
```

首先需要登录你的github，获取一个可以访问gist的token，并登录

```bash
gisnippet login <yourtoken>
```

然后需要配置你的vscode 代码段路径
一般在这个目录下 C:\Users\yourname\AppData\Roaming\Code\User\snippets

```bash
gisnippet globalfolder <folder>
```

使用show命令查看你当前的代码段
```bash
gisnippet show
```

使用sync id 来同步某个代码段
```bash
gisnippet sync id [-g]
```
加上-g 将安装到vscode全局目录，否则将装在当前文件夹






[contributors-shield]: https://img.shields.io/github/contributors/legenself/gisnippet.svg?style=flat-square
[contributors-url]: https://github.com/legenself/gisnippet/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/legenself/gisnippet.svg?style=flat-square
[forks-url]: https://github.com/legenself/gisnippet/network/members
[stars-shield]: https://img.shields.io/github/stars/legenself/gisnippet.svg?style=flat-square
[stars-url]: https://github.com/legenself/gisnippet/stargazers
[issues-shield]: https://img.shields.io/github/issues/legenself/gisnippet.svg?style=flat-square
[issues-url]: https://github.com/legenself/gisnippet/issues

