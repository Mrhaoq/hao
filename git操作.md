# Git 常用操作指南

> 本文档整理日常开发中最常用的 Git 操作，结合本项目实际场景（分支对比、提交管理、撤回、转移改动、快捷命令 alias 等），便于自查与快速上手。
> 示例命令在 PowerShell 下使用 `;` 分隔多条命令（不要用 `&&`）。
> 建议优先阅读：**十一、工作流速查**、**十三、快捷命令**、**附：日常速查卡**。

---

## 一、基础状态检查

### 1. 查看当前状态
```bash
git status                  # 查看工作区 / 暂存区状态
git branch --show-current   # 查看当前所在分支
git branch -a               # 查看所有分支（含远程）
git log --oneline -10       # 查看最近 10 条提交
git log --oneline --graph -20  # 图形化查看提交历史（含分支线）
```

### 2. 查看改动内容
```bash
git diff                      # 查看工作区未暂存的改动
git diff --staged             # 查看已暂存、未提交的改动
git diff <file>               # 查看某个文件的改动
git diff <commitA> <commitB>  # 对比两个提交
git show <commit>             # 查看某次提交的完整改动
git show --stat <commit>      # 只看某次提交改了哪些文件
```

---

## 二、分支操作

### 1. 切换与创建分支
```bash
git checkout <branch>              # 切换到已有分支
git checkout -b <new-branch>       # 基于当前 HEAD 新建并切换分支
git switch <branch>                # 切换分支（新语法，推荐）
git switch -c <new-branch>         # 新建并切换分支
```

### 2. 基于指定分支创建
```bash
git checkout -b feature/x origin/main   # 基于远程 main 新建分支
git checkout -b feature/x <commit>      # 基于某个提交新建分支
```

### 3. 删除分支
```bash
git branch -d <branch>     # 安全删除（已合并才能删）
git branch -D <branch>     # 强制删除
git push origin --delete <branch>  # 删除远程分支
```

---

## 三、分支对比（重点）

### 1. 找共同祖先
```bash
git merge-base HEAD origin/main      # 当前分支与 main 的共同祖先
git merge-base <branchA> <branchB>   # 任意两分支的共同祖先
```

### 2. 三点 diff（自共同祖先以来的差异，最常用）
```bash
# 当前分支相对 main 新增了什么（合入前必看）
git diff origin/main...HEAD

# 只看文件清单
git diff --stat origin/main...HEAD

# main 相对当前分支新增了什么（看是否有冲突来源）
git diff HEAD...origin/main
```

> **三点 `...`**：`git diff A...B` = 从 A、B 共同祖先 到 B 的差异，适合「B 比 A 多做了什么」。

### 3. 两点 diff（直接差异）
```bash
git diff origin/main HEAD      # 两个分支当前树的直接差异
git diff origin/main..HEAD     # 同上（两点等价于直接对比树）
```

> **两点 `..`**：直接对比两端树的内容，不关心共同祖先。

### 4. 对比提交清单
```bash
# 当前分支领先 main 的提交
git log --oneline origin/main..HEAD

# main 领先当前分支的提交
git log --oneline HEAD..origin/main

# 自共同祖先起两边的提交
git log --oneline <merge-base>..HEAD
git log --oneline <merge-base>..origin/main
```

### 5. 实战：检查分支能否安全合入
```bash
git fetch origin main
git diff --stat origin/main...HEAD          # 我这边改了啥
git diff --stat HEAD...origin/main          # 对方改了啥（空=无冲突来源）
git log --oneline origin/main..HEAD         # 我领先的提交
```

---

## 四、暂存与提交

### 1. 暂存
```bash
git add <file>            # 暂存指定文件
git add .                 # 暂存所有改动（含新增）
git add -u                # 暂存已跟踪文件的修改（不含新增）
git add -p                # 交互式选择要暂存的代码块（强烈推荐）
git restore --staged <file>  # 取消暂存（保留改动）
```

### 2. 提交
```bash
git commit -m "feat: xxx"                # 单行提交信息
git commit -m "标题" -m "详细描述"        # 标题 + 正文
git commit -am "feat: xxx"               # 暂存已跟踪文件并提交（跳过 add）
git commit --amend                       # 修订最近一次提交（未 push 时用）
git commit --amend --no-edit             # 修订提交但不改提交信息
```

> **推荐提交信息前缀**（Conventional Commits）：
> - `feat:` 新功能
> - `fix:` 修复 bug
> - `refactor:` 重构
> - `chore:` 杂项（构建、配置、移除等）
> - `docs:` 文档
> - `style:` 格式调整
> - `test:` 测试

---

## 五、撤回操作（重点）

### 1. 撤回提交（保留改动）
```bash
git reset --soft HEAD~1     # 撤回最近一次提交，改动保留在暂存区（最常用）
git reset --mixed HEAD~1    # 撤回提交，改动保留在工作区（未暂存），默认行为
git reset HEAD~1            # 等同 --mixed
```

### 2. 撤回提交（丢弃改动，慎用）
```bash
git reset --hard HEAD~1     # 撤回提交并彻底丢弃改动（不可轻易恢复）
```

### 3. 撤回已 push 的提交（安全方式）
```bash
git revert <commit>         # 生成一个反向提交来撤销，不改写历史（推荐用于已 push）
```

### 4. 放弃工作区改动
```bash
git restore <file>          # 放弃某文件的工作区改动
git checkout -- <file>      # 旧语法，同上
git restore .               # 放弃所有工作区改动
```

### 5. 恢复误删的提交
```bash
git reflog                  # 查看所有 HEAD 移动记录
git reset --hard <commit>   # 用 reflog 找到的 hash 恢复
```

### 6. 撤回操作对照表

| 场景 | 命令 | 改动去向 |
|---|---|---|
| 想改提交信息 / 重新提交 | `git reset --soft HEAD~1` | 暂存区 |
| 撤回提交，改动留工作区 | `git reset --mixed HEAD~1` | 工作区（未暂存） |
| 彻底丢弃最近提交 | `git reset --hard HEAD~1` | 丢失 |
| 已 push 的提交要撤销 | `git revert <commit>` | 生成反向提交 |
| 修改最近提交信息 | `git commit --amend` | 原地改写 |

---

## 六、转移改动（cherry-pick / checkout）

### 1. 把某个提交的改动搬到当前分支
```bash
git cherry-pick <commit>              # 搬一个提交
git cherry-pick <c1> <c2>             # 搬多个提交
git cherry-pick <c1>^..<c2>           # 搬一段连续提交
```

### 2. 只搬某个文件的内容（不要整个提交）
```bash
git checkout <commit> -- <file>       # 把指定文件恢复成某提交的版本（会进入暂存区）
git checkout <branch> -- <file>       # 从别的分支取某文件到当前分支
```

> **本项目实战案例**：把混合提交中的部分文件拆到另一分支
> ```bash
> # 目标分支：取某个文件版本并提交
> git checkout feat/目标分支
> git checkout <源提交> -- src/xxx.vue
> git commit -m "feat: 转移某功能"
>
> # 源分支：恢复该文件到引入前版本
> git checkout feat/源分支
> git checkout <源提交的父提交> -- src/xxx.vue
> git commit -m "chore: 移除某功能（转移至目标分支）"
> ```

### 3. cherry-pick 冲突处理
```bash
git cherry-pick <commit>      # 发生冲突
# 手动解决冲突文件后：
git add <file>
git cherry-pick --continue
# 或放弃本次 cherry-pick：
git cherry-pick --abort
```

---

## 七、拉取与推送

### 1. 拉取
```bash
git fetch origin                # 只更新远程引用，不合并（安全，推荐先 fetch 再操作）
git fetch origin main           # 只 fetch main
git pull                        # fetch + merge 当前跟踪分支
git pull --rebase               # fetch + rebase（保持线性历史，推荐）
```

### 2. 推送
```bash
git push                        # 推送当前分支到跟踪的远程分支
git push -u origin <branch>     # 首次推送并建立跟踪关系
git push origin <branch>        # 推送指定分支
```

> **禁止行为**：`git push --force` 到 main/release 等共享分支。
> 需要强推时用 `git push --force-with-lease`（更安全，他人有新提交时会拒绝）。

---

## 八、合并与变基

### 1. 合并
```bash
git merge <branch>              # 把 branch 合入当前分支（产生 merge 提交）
git merge --no-ff <branch>      # 强制保留 merge 提交（默认行为）
git merge --ff-only <branch>    # 仅当可快进时合并
```

### 2. 变基（整理提交历史）
```bash
git rebase <branch>             # 把当前分支的提交挪到 branch 之上
git rebase -i HEAD~3            # 交互式整理最近 3 个提交（合并/改信息/调顺序）
git rebase --abort              # 放弃 rebase
git rebase --continue           # 解决冲突后继续
```

> rebase 会改写历史，**已 push 的分支不要随便 rebase**，否则别人会冲突。

---

## 九、暂存工作区（stash）

适合：临时切分支但又不想提交半成品。
```bash
git stash                       # 暂存当前改动
git stash -u                    # 连未跟踪文件一起暂存
git stash list                  # 查看暂存列表
git stash pop                   # 恢复最近一次暂存并删除
git stash apply                 # 恢复但不删除
git stash drop                  # 删除最近一次暂存
```

---

## 十、标签（tag）

```bash
git tag v1.0.0                  # 轻量标签
git tag -a v1.0.0 -m "发布说明"  # 附注标签（推荐）
git push origin v1.0.0          # 推送单个标签
git push origin --tags          # 推送所有标签
git tag -d v1.0.0               # 删除本地标签
git push origin --delete v1.0.0 # 删除远程标签
```

---

## 十一、本项目常用工作流速查

### 场景 A：开发新功能
```bash
git checkout -b feat/xxx origin/main    # 基于最新 main 建分支
# ... 编码 ...
git add . ; git commit -m "feat: xxx"
git push -u origin feat/xxx
```

### 场景 B：开发途中要检查与 main 的差异
```bash
git fetch origin main
git diff --stat origin/main...HEAD      # 我改了哪些文件
git log --oneline origin/main..HEAD     # 我领先几个提交
```

### 场景 C：提交信息写错了（未 push）
```bash
git commit --amend -m "新的提交信息"
# 或完全撤回重新提交
git reset --soft HEAD~1
git commit -m "新的提交信息"
```

### 场景 D：把改动拆到另一个分支
```bash
git stash                               # 暂存当前改动
git checkout feat/目标分支
git stash pop                           # 取出改动
git add . ; git commit -m "feat: xxx"
```

### 场景 E：紧急修 bug，但当前分支有未提交改动
```bash
git stash                               # 暂存半成品
git checkout hotfix/xxx                 # 切到修复分支
# ... 修复 ...
git commit -am "fix: xxx" ; git push
git checkout -                          # 回到原分支
git stash pop                           # 恢复半成品
```

### 场景 F：误删了提交怎么找回
```bash
git reflog                              # 找到误删前的 commit hash
git reset --hard <hash>                 # 恢复
```

---

## 十二、PowerShell 注意事项

- **不要用 `&&` 串联命令**，PowerShell 不支持。用 `;` 分隔。
- 路径用反斜杠 `\` 或正斜杠 `/` 均可。
- 中文输出若乱码，可执行 `chcp 65001` 切换到 UTF-8 编码。
- 示例：`git status ; git log --oneline -5`

---

## 十三、快捷命令（alias）

一次性配置后，可用短命令替代长命令。写入全局配置：

```bash
# --- 状态与日志 ---
git config --global alias.st "status -sb"                    # git st
git config --global alias.co "checkout"                      # git co <branch>
git config --global alias.br "branch"                        # git br
git config --global alias.ci "commit"                        # git ci -m "msg"
git config --global alias.cm "commit -m"                     # git cm "feat: xxx"
git config --global alias.cam "commit -am"                   # git cam "feat: xxx"
git config --global alias.last "log -1 --stat"                # git last
git config --global alias.lg "log --oneline --graph --decorate -20"  # git lg
git config --global alias.ll "log --oneline -10"              # git ll

# --- 暂存与撤回 ---
git config --global alias.unstage "restore --staged"         # git unstage <file>
git config --global alias.undo "reset --soft HEAD~1"          # git undo（撤回提交，改动留暂存区）
git config --global alias.discard "restore ."                 # git discard（放弃工作区全部改动，慎用）

# --- 拉取与对比 ---
git config --global alias.f "fetch origin"                   # git f
git config --global alias.pullr "pull --rebase"               # git pullr
git config --global alias.ms "merge-base HEAD origin/main"    # git ms（找与 main 的共同祖先）
git config --global alias.dm "diff --stat origin/main...HEAD" # git dm（相对 main 改了哪些文件）
git config --global alias.lm "log --oneline origin/main..HEAD" # git lm（领先 main 的提交）

# --- stash ---
git config --global alias.save "stash push -u -m"            # git save "半成品说明"
git config --global alias.pop "stash pop"                    # git pop
```

### 配置后用法示例
```bash
git st                    # 简洁状态（分支名 + 改动文件）
git lg                    # 图形化最近 20 条提交
git cm "feat: 新增登录页"
git undo                  # 撤回最近一次提交，改动仍在暂存区
git f ; git dm            # 先 fetch，再看相对 main 的文件差异
git lm                    # 我领先 main 几个提交
git save "未完成的搜索功能" ; git co main ; git pop
```

### 查看 / 删除已配置的 alias
```bash
git config --global --get-regexp alias   # 列出全部 alias
git config --global --unset alias.st     # 删除某个 alias
```

> **提示**：alias 只是本地配置，不会进仓库。团队成员需各自执行上述 `git config` 命令。

---

## 十四、补充实用操作

### 1. 远程仓库管理
```bash
git remote -v                          # 查看远程地址
git remote add origin <url>            # 添加远程
git remote set-url origin <新url>      # 修改远程地址
git remote rename origin upstream      # 重命名远程
git remote remove origin               # 删除远程
git branch -vv                         # 查看本地分支与远程跟踪关系
git branch -u origin/main              # 为当前分支设置上游跟踪
```

### 2. 冲突处理完整流程
```bash
git merge feature/x        # 或 rebase / cherry-pick / pull 时发生冲突
git status                 # 看哪些文件有冲突（Unmerged paths）
# 手动编辑冲突文件，去掉 <<<<<<< ======= >>>>>>> 标记
git add <file>             # 标记该文件冲突已解决
git merge --continue       # merge 场景；rebase 用 git rebase --continue
# 若想放弃本次合并：
git merge --abort          # 或 git rebase --abort / git cherry-pick --abort
```

冲突标记示例：
```text
<<<<<<< HEAD
当前分支的内容
=======
对方分支的内容
>>>>>>> feature/x
```

### 3. 清理未跟踪文件
```bash
git clean -n               # 预览将删除哪些未跟踪文件（安全，先看）
git clean -fd              # 删除未跟踪文件和目录
git clean -fdx             # 连被 ignore 的文件也删（如 node_modules，慎用）
```

### 4. 搜索提交历史
```bash
git log --author="张三" --oneline           # 按作者过滤
git log --since="2026-01-01" --until="2026-07-01" --oneline  # 按时间
git log --grep="登录" --oneline             # 按提交信息关键字
git log -S "关键字" --oneline               # 按代码增减内容搜索（pickaxe）
git log -G "正则" --oneline                 # 按 diff 正则搜索
git log --follow -- <file>                  # 跟踪文件重命名后的历史
```

### 5. 交互式整理提交（squash）
```bash
# 把最近 3 个提交压成 1 个（未 push 时用）
git rebase -i HEAD~3
# 编辑器中：第一个留 pick，其余改成 squash（或 s），保存退出后合并提交信息
```

### 6. 只拉取不合并时对比远程
```bash
git fetch origin
git log --oneline HEAD..origin/main     # 远程 main 有哪些我还没有的提交
git log --oneline origin/main..HEAD     # 我本地有哪些远程还没有的提交
```

### 7. 常用一键组合（PowerShell 用 `;`）
```bash
# 快速提交并推送
git add . ; git commit -m "feat: xxx" ; git push

# 同步最新 main 再对比自己的改动
git fetch origin main ; git dm ; git lm

# 切到 main 并拉最新
git switch main ; git pull --rebase

# 新建功能分支并推送
git switch -c feat/xxx origin/main ; git push -u origin HEAD
```

### 8. 查看配置与帮助
```bash
git config --list --show-origin         # 查看所有配置及来源文件
git config user.name                    # 查看当前用户名
git config --global user.name "你的名字"
git config --global user.email "you@example.com"
git help <command>                      # 打开某命令手册，如 git help rebase
git <command> -h                        # 简短帮助
```

---

## 附：日常速查卡

| 想做什么 | 命令 |
|---|---|
| 我现在在哪、改了啥 | `git status` / `git st` |
| 相对 main 改了哪些文件 | `git fetch origin main` → `git dm` |
| 领先 main 几个提交 | `git lm` |
| 暂存并提交 | `git add .` → `git cm "feat: xxx"` |
| 撤回刚提交（未 push） | `git undo` |
| 放弃某文件工作区改动 | `git restore <file>` |
| 临时切分支 | `git save "说明"` → 切分支 → `git pop` |
| 已 push 要撤销 | `git revert <commit>` |
| 合入前安全检查 | `git f` → `git dm` → `git lm` |
| 新建功能分支 | `git switch -c feat/xxx origin/main` |

---

## 附：常见问题

**Q：`git diff A...B` 和 `A..B` 有什么区别？**
- `A...B`（三点）：从 A、B 共同祖先到 B 的差异 → 「B 比 A 多做了什么」
- `A..B`（两点）：A 与 B 当前树的直接差异 → 「A 和 B 现在长什么样不一样」

**Q：reset 和 revert 怎么选？**
- 未 push 的提交：用 `reset`（改写历史，干净）
- 已 push 的提交：用 `revert`（生成反向提交，不改写历史，不影响他人）

**Q：cherry-pick 和 checkout -- file 怎么选？**
- 搬整个提交（含提交信息）：`cherry-pick`
- 只要某个文件的某版本内容：`checkout <commit> -- <file>`

**Q：如何看某行代码是谁改的？**
```bash
git blame <file>                 # 逐行显示最后修改人和提交
git log -p <file>                # 查看某文件的完整改动历史
git log -S "关键字" --oneline    # 查找引入/删除某关键字的提交
```

---
