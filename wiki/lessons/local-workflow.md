# 工作目錄、暫存區與提交

存檔後，變更先出現在你正在編輯的工作目錄（working directory）。`git add` 把檔案當下的內容加入暫存區（staging area），讓你準備下一次要提交的內容。`git commit` 將暫存區的內容記入本機儲存庫，形成一筆提交（commit）。[Pro Git 記錄變更](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)

## Windows PowerShell 練習

在可以建立新資料夾的位置操作。練習需要一個全新的 `git-local-practice` 資料夾，並已[設定提交身分](setup.md)。

~~~powershell
New-Item -ItemType Directory git-local-practice
Set-Location git-local-practice
git init -b main
Set-Content -LiteralPath notes.txt -Value 'Topic: Git'
git status --short
~~~

你會看到 `?? notes.txt`，表示這個新檔案尚未追蹤。先暫存，再修改同一檔案並比較。

~~~powershell
git add -- notes.txt
Set-Content -LiteralPath notes.txt -Value 'Topic: My first Git commit'
git status --short
git --no-pager diff -- notes.txt
git --no-pager diff --staged -- notes.txt
~~~

`AM notes.txt` 表示暫存區已有新增的檔案，工作目錄還有後續修改。`git diff` 顯示尚未暫存的修改，`git diff --staged` 顯示即將提交的差異；第一次提交前會以空的版本為比較基準。

~~~powershell
git add -- notes.txt
git commit -m "Add Git practice notes"
git status --short
git --no-pager log -1 --oneline
~~~

`git status --short` 沒有輸出時，這次練習的工作目錄是乾淨的。最後一行應顯示這次提交的訊息。若提交提示 `Author identity unknown`，先回到[安裝與設定](setup.md)完成身分設定，再重跑提交。

教材來源：[S01 第 3–5 頁](../sources/index.md#s01)、[S03 第 4–7 頁](../sources/index.md#s03)、[S04](../sources/index.md#s04)、[S05 第 4–9 頁](../sources/index.md#s05)。

下一步：[分支、合併與衝突處理](branches-and-merge.md)。
