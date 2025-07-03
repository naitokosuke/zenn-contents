---
title: "Claude Code がインストールしていないツールを使いこなしている！？"
emoji: "❔"
type: "tech"
topics: ["claudecode", "ripgrep", "AI"]
published: false
---

## はじめに

ナイトウコウスケ([@naitokosuke](https://twitter.com/naitokosuke))と申します。
Claude Code の vibe coding にひとしきり驚いたところです。
Claude Code に調査タスクをぶん投げると、

```bash
╭─────────────────────────────────────────────────────────────────────────╮
│ Bash command                                                            │
│                                                                         │
│   rg "ナイトウ" --type md                                                │
│   Search for "ナイトウ" in markdown files                                │
│                                                                         │
│ Do you want to proceed?                                                 │
│ ❯ 1. Yes                                                                │
│   2. Yes, and don't ask again for rg commands in                        │
│   /Users/naitoksouke/hoge/fuga                                          │
│   3. No, and tell Claude what to do differently (esc)                   │
╰─────────────────────────────────────────────────────────────────────────╯
```

と出ます。
`rg` なんてコマンドはぼくは知りませんでした。

検索してみると [ripgrep](https://github.com/BurntSushi/ripgrep) という検索ツールを Claude Code は使おうとしているようです。
ぼくは意地悪してやろうと、知らないインストールしていないツールを使ってもよいと「1. Yes」を選択しました。

するとどうでしょう。
Claude Code は困るどころか爆速で調査結果を報告してきたのでした。

悔しくなり大急ぎで、

```bash
which rg
```

```bash
which ripgrep
```

を実行しましたが、ripgrep はもちろんインストールされていません。

Claude Code はどのようにしてインストールされていないコマンドを実行したのでしょうか？

## 結論: Claude Code は ripgrep を vendoring している！

Claude Code のインストールディレクトリ（`~/.claude/local/node_modules/@anthropic-ai/claude-code/vendor/ripgrep`）に、ripgrep がガッツリ同梱されていました。

macOS（arm64/x64）、Linux（arm64/x64）、Windows（x64）向けのバイナリが用意されてました。

## ripgrep とは？

[ripgrep](https://github.com/BurntSushi/ripgrep) は、Rust で書かれた超高速な検索ツールです。`grep` の代替として設計され、以下の特徴があります。

- 爆速
- スマート
- 使いやすい
- Unicode 対応

```bash
rg "TODO"
```

```bash
rg "import" --type js  # JavaScript ファイルのみ
rg "def" --type py     # Python ファイルのみ
```

`grep` や `ag` よりも高速で、特に大規模なコードベースでその真価を発揮します。

## 証拠をチェック

vendoring された ripgrep を覗いてみてください！

```bash
ls ~/.claude/local/node_modules/@anthropic-ai/claude-code/vendor/ripgrep
```

こんな感じで出力されるはずです。

```
arm64-darwin  arm64-linux  x64-darwin  x64-linux  x64-win32
```

Claude Code が ripgrep を vendoring しているようです。

## vendoring って何？

vendoring とは、プロジェクトが必要とする外部ライブラリやツールのバイナリやソースコードを、プロジェクト内に直接同梱することです。
vendoring によるメリットは以下です。

- 環境依存が減る

  - ユーザーが ripgrep をインストールしなくてもすぐに使える

- パフォーマンス保証

  - vendoring することでツールの特定のバージョンを制御できる
  - システムにインストールされた古いバージョンや互換性のないバージョンに悩まされることがない

- スムーズさ

  - インストールの手間を省いてすぐに使用可能

## .claude/settings.json をカスタマイズ

vibe coding をさらに楽しむために、`.claude/settings.json` のカスタマイズも考えてみましょう。

ripgrep は読み取り専用の検索ツールなので、許可しても安全でしょう。
`rg` コマンドを許可リストに追加して確認ダイアログをスキップする設定します。

```json
{
  "permissions": {
    "allow": ["Bash(rg:*)"],
    "deny": []
  }
}
```

これで ripgrep を使った検索コマンドがサクサク実行されるようになります。

## まとめ

Claude Code が ripgrep を vendoring しているとは知りませんでした。
インストールの手間を省いて、爆速コード検索をすぐに使えるなんてとても便利ですね。

## 最後に

最後まで読んでいただきありがとうございました！

