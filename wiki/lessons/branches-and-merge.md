# 分支、合併與衝突處理

分支（branch）是一個指向最新提交的名稱。你在某個分支提交後，該分支就會向前移動。合併（merge）會把指定分支的變更整合進目前的分支，所以要先切到接收變更的分支。[Pro Git 分支與合併](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)

## Windows PowerShell · 建立分支並合併

沿用[本機提交練習](local-workflow.md)的 `git-local-practice`，先確認 `git status --short` 沒有輸出。建立並切換到新分支，再提交一個新檔案。[git switch 官方說明](https://git-scm.com/docs/git-switch)

~~~powershell
git switch -c practice/add-checklist
git branch --show-current
Set-Content -LiteralPath checklist.txt -Value '- Learn to make a commit'
git add -- checklist.txt
git commit -m "Add a Git practice checklist"
git switch main
git merge practice/add-checklist
Get-Content -LiteralPath checklist.txt
~~~

`git branch --show-current` 應印出 `practice/add-checklist`。切回 `main` 並合併後，`main` 也能讀到 `checklist.txt`。在這段歷史中，Git 可以直接把 `main` 移到新提交，稱為快轉合併（fast-forward）。

## Windows PowerShell · 解決一次合併衝突

在兩個分支分別修改 `notes.txt` 的同一行，刻意製造 Git 無法自動整合的差異。

~~~powershell
git switch -c practice/change-topic
Set-Content -LiteralPath notes.txt -Value 'Topic: Learning branches'
git add -- notes.txt
git commit -m "Describe branches in the notes"
git switch main
Set-Content -LiteralPath notes.txt -Value 'Topic: Learning merges'
git add -- notes.txt
git commit -m "Describe merges in the notes"
git merge practice/change-topic
git status --short
Get-Content -LiteralPath notes.txt
~~~

在一般的文字合併設定下，`git merge` 會回報衝突，`git status --short` 會顯示 `UU notes.txt`。檔案中的 `<<<<<<<`、`=======` 與 `>>>>>>>` 標示兩邊的內容。分別讀過兩個版本後，決定保留什麼，再移除標記。本例的練習檔只有一行，可以直接改成同時涵蓋兩邊的內容。

~~~powershell
Set-Content -LiteralPath notes.txt -Value 'Topic: Learning branches and merges'
git add -- notes.txt
git commit -m "Resolve notes topic merge conflict"
git status --short
git --no-pager log -4 --oneline --graph
~~~

`git status --short` 應無輸出，歷史應出現一筆合併提交。如果衝突發生後想退出，且還在合併中，可執行 `git merge --abort` 回到合併前的狀態。

教材來源：[S01 第 5–6 頁](../sources/index.md#s01)、[S03 第 11–12 頁](../sources/index.md#s03)、[S04](../sources/index.md#s04)。

下一步：[遠端儲存庫](remotes.md)。
