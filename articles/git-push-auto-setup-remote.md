---
title: "「ブランチ作ってプッシュするたびに --set-upstream 打つのが面倒だな」と感じているなら"
emoji: "😎"
type: "tech"
topics: ["git"]
published: false
---

## はじめに

ナイトウ([@engineer_naito](https://twitter.com/engineer_naito))と申します。

Git で新しいブランチを作成してプッシュするときに、 `git push --set-upstream origin ブランチ名` を打つのが面倒だと感じたことはありませんか？

```sh
# 新しいブランチを作成
$ git switch -c feature/new-feature

# プッシュするときに --set-upstream が必要
$ git push --set-upstream origin feature/new-feature
```

この `--set-upstream` を省略する方法を紹介します。

## Git に言われることをよく読んでみる

実は `--set-upstream` を省略する方法は Git が教えてくれています。

```sh
$ git switch -c feature/new-feature
Switched to a new branch 'feature/new-feature'

$ git push
fatal: The current branch feature/new-feature has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin feature/new-feature

To have this happen automatically for branches without a tracking
upstream, see 'push.autoSetupRemote' in 'git help config'.
```

> To have this happen automatically for branches without a tracking
> upstream, see 'push.autoSetupRemote' in 'git help config'.

`push.autoSetupRemote` という設定を有効にすることで、新しいブランチをプッシュするときに `--set-upstream` を自動的に設定できます。

https://github.com/git/git/blob/master/Documentation/config/push.adoc

> push.autoSetupRemote
> If set to "true" assume --set-upstream on default push when no upstream tracking exists for the current branch; this option takes effect with push.default options 'simple', 'upstream', and 'current'. It is useful if by default you want new branches to be pushed to the default remote (like the behavior of 'push.default=current') and you also want the upstream tracking to be set. Workflows most likely to benefit from this option are 'simple' central workflows where all branches are expected to have the same name on the remote.

## `push.autoSetupRemote` を有効にする

以下のコマンドを実行するだけで設定できます(グローバル設定する場合)。

```sh
$ git config --global push.autoSetupRemote true
```

この設定を適用すると、初回の `git push` で自動的に upstream(追跡ブランチ)が設定されます。

```sh
$ git switch -c feature/new-feature
$ git push
```

この設定を有効にするとより快適に Git を使えるようになります。

## 最後に

最後まで読んでいただきありがとうございました！
