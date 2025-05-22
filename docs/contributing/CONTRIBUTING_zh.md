# 贡献步骤 📜

## 1. Fork 项目 🍴

您可以通过点击此页面右上角的 `Fork` 按钮来获取您自己的 [DNAnalyzer](https://github.com/VerisimilitudeX/DNAnalyzer) 分支（副本）。

![Fork 按钮](https://github-images.s3.amazonaws.com/help/bootcamp/Bootcamp-Fork.png)

## 2. Clone 项目 👥

您必须转到您的仓库分支，并使用以下命令将其克隆（下载）到您的本地计算机：

`$ git clone https://github.com/您的用户名/DNAnalyzer.git`

这会在您的计算机上创建仓库的本地副本。

在GitHub上克隆 `DNAnalyzer` 仓库后，在Linux和Mac上使用更改目录命令进入该文件夹。

```python
# 这会将目录更改为名为 DNAnalyzer 的文件夹
$ cd DNAnalyzer
```

所有其他命令都在此文件夹中执行。

现在，让我们使用以下命令添加对原始 'DNAnalyzer' 仓库的引用：

`$ git remote add upstream https://github.com/VerisimilitudeX/DNAnalyzer.git`

这将添加一个名为 **_upstream_** 的新远程仓库。

使用以下命令检查修改：

```git
 $ git remote -v
 origin https://github.com/您的用户名/DNAnalyzer.git (fetch)
 origin https://github.com/您的用户名/DNAnalyzer.git (push)
 upstream https://github.com/VerisimilitudeX/DNAnalyzer.git (fetch)
 upstream https://github.com/VerisimilitudeX/DNAnalyzer.git (push)
 ```

## 3. 与远程仓库同步 🔄

请记住保持您的本地仓库与远程仓库同步。

```python
# 获取所有远程仓库并删除任何已删除的远程分支
$ git fetch --all --prune
# 切换到 main 分支
$ git checkout main
# 将本地 main 分支重置为与上游仓库的 main 分支匹配
$ git reset --hard upstream/main
# 将更改推送到您的 forked DNAnalyzer 仓库
$ git push origin main
```

## 4. 创建新分支

每当您想做出贡献时，请使用以下命令建立一个新分支，并保持您的 `main` 分支整洁（即与远程分支同步）。

```python
# 这将创建一个名为 <分支名> 的新分支并切换到该分支
$ git checkout -b <分支名>
```

切换到所需分支：

```python
# 从一个文件夹切换到另一个文件夹 (此处指分支)
$ git checkout <分支名>
```

将更改添加到分支。使用：

```python
# 将所有文件添加到分支
$ git add .
```

输入与代码审查员相关的消息：

```python
# 此消息与您更改的所有文件相关联
$ git commit -m "相关消息"
```

现在，使用以下命令将您的出色工作推送到您的远程仓库：

```python
# 将您的工作推送到您的远程仓库
$ git push -u origin <分支名>
```

最后，在您的浏览器中，导航到您的仓库，然后单击 `Contribute`，接着单击 `Open Pull Request`。在那里，请提供一个简洁的标题和描述，说明您所做的宝贵贡献。
