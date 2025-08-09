---
title: "【Python】Ruff を使って Python らしいコードを学ぼう【初心者】"
emoji: "🔰"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["Python", "Ruff", "初心者"]
published: true
---

# はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

最近 ChatGPT に頼りっぱなしです。
手でコードが書けないことに気づきました。

一番経験のある言語が Python だったので、Python を自分の手で書けるように勉強をしています。
勉強には競技プログラミングでお馴染みの AtCoder の過去問を選びました。
Novisteps という非公式の過去問学習記録サイトを併せて利用しています。
[Novisteps](https://atcoder-novisteps.vercel.app/)

AtCoder ではブラウザ上にエディタがあるのでそれを利用することもできますが、慣れている VS Code を使います。
linter や formatter などの静的解析ツールなしでのコーディングが辛かったので今回は Ruff も使います。

この Ruff が Python 学習に非常に効果的だと感じのでその理由を書きます。
まずは Ruff について。

# Ruff とは

公式ドキュメント
https://docs.astral.sh/ruff/

GitHub
https://github.com/astral-sh/ruff

> An extremely fast Python linter and code formatter, written in Rust.

とあるように Rust 製の高速な Python 用 linter、formatter です。
Ruff の詳しい説明は公式ドキュメントのほか、Zenn などでもいくつか記事があるので詳しくはそちらを参照してください。

https://zenn.dev/harupy/articles/a14b146d289a6c
https://zenn.dev/enven/articles/python-ruff-with-vscode

## 基本コマンド

### プロジェクト全体の Ruff linter の実行

lint の実行は以下のコマンドで行います。

```bash
$ ruff check
```

### 修正可能なものを自動で修正

lint で見つけたものを自動で修正させることもできます。

```bash
$ ruff check --fix
```

### Ruff format の実行

フォーマットの実行は以下のコマンドです。

```bash
$ ruff format
```

## 設定方法

初期設定でも問題なく利用できますが、好みに応じて設定を変えることもできます。
設定は主に toml ファイル上で行います。

```toml:pyproject.toml
[tool.ruff]
# Set the maximum line length to 79.
line-length = 79

[tool.ruff.lint]
# Add the `line-too-long` rule to the enforced rule set. By default, Ruff omits rules that
# overlap with the use of a formatter, like Black, but we can override this behavior by
# explicitly adding the rule.
extend-select = ["E501"]
```

Python の公式ガイドラインである PEP8 では 1 行あたりの文字数を 80 文字以内にすることを推奨していますが、これも `pyproject.toml` や、`ruff.toml` で設定することができます。

その他にも設定できる事項は多く存在しており、柔軟に対応できます。
https://docs.astral.sh/ruff/configuration/

より詳しい使用可能な設定は以下に載っています。
https://docs.astral.sh/ruff/settings/

# Ruff とともに Python を書く

では Ruff とともに Python を書いていきます。

Linter や Formatter としての働きについては上で説明しました。
あまり馴染みのない方は以下の公式チュートリアルでどのようなことをしているかを確認してください。

https://docs.astral.sh/ruff/tutorial/

Ruff では 800 以上の lint ルールをサポートしています。

https://docs.astral.sh/ruff/rules/

この豊富な種類の lint ルールを利用して、Python らしいコードや効果的なコードを事前知識なしで書いてやりましょう。
linter に自分の書いたコードを指摘させます。
開発を行うのではなく、今回は Atcoder (Novisteps) の過去問を解いていきます。

:::message
解法についてはもっとよいものがあるとは思いますが、今回は Ruff の lint についての記事のつもりなのでなるべく大目に見ていただけると嬉しいです 🙇‍♂️
:::

## not-in-test (E713)

[ABC315A - tcdr](https://atcoder.jp/contests/abc315/tasks/abc315_a) より

> 問題文
> 英小文字からなる文字列
> `S` が与えられます。
> `S` から `a`, `e`, `i`, `o`, `u` をすべて取り除いて得られる文字列を出力してください。
> なお、
> `S` は `a`, `e`, `i`, `o`, `u` 以外の文字を一つ以上含みます。

Python の文字列は iterable (for 文で回せる)なので、for 文で 1 文字ずつ見ていって、`a, e, i, o, u` 以外の文字列を選ぶようにしました。

```python
S = input()

result = ""
for s in S:
    if not s in ("a", "e", "i", "o", "u"):
        result += s
print(result)
```

動きます(AC 判定)ですが、Ruff に怒られてしまいました。

![](/images/python_with_ruff/image1.png)

> Test for membership should be in `not in`

"test for membership" は日本語にすると「所属の確認」とかでしょうか。

エディタ上で[E713](https://docs.astral.sh/ruff/rules/not-in-test/)をクリックして、詳細を見てみます。

![](/images/python_with_ruff/image2.png)

`not {element} in {collection}` よりも `{element} not in {collection}` の方が可読性が高いとのことです。

`$ ruff check --fix` で修正してしまいましょう。

```python
S = input()

result = ""
for s in S:
    if s not in ("a", "e", "i", "o", "u"):
        result += s
print(result)
```

Ruff の lint のおかげでより Python らしいコードを書くことができました。
他にも Ruff の lint ルールに教えてもらったものを紹介していきます。

## repeated-equality-comparison (PLR1714)

[ABC350A - Past ABCs](https://atcoder.jp/contests/abc350/tasks/abc350_a) より

> 問題文
> 長さ 6 の文字列`S` が与えられます。
> `S` の先頭 3 文字は `ABC` であり、末尾 3 文字は数字であることが保証されます。
> `S` が、このコンテスト開始以前に AtCoder 上で開催され終了したコンテストの略称であるかどうか判定してください。
> ただし、文字列`T` が「このコンテスト開始以前に AtCoder 上で開催され終了したコンテストの略称」であるとは、以下の 348 個の文字列のうちいずれかに等しいことと定めます。
> `ABC001`, `ABC002`,…, `ABC314`, `ABC315`, `ABC317`, `ABC318`,…, `ABC348`, `ABC349`
> 特に `ABC316` が含まれないことに注意してください。

> 制約
> `S` は先頭 3 文字が `ABC`、末尾 3 文字が数字である長さ 6 の文字列

この問題では制約のおかげで後ろ 3 文字をチェックすればよさそうです。

```python
S = input()

times = int(S[3:])
if times < 350:
    if times == 0 or times == 316:
        print("No")
    else:
        print("Yes")
else:
    print("No")
```

> Consider merging multiple comparisons: `times in (0, 316)`. Use a `set` if the elements are hashable.

と言われます。
このように複数の比較では tuple や set を用いてまとめて書くことができます。

今回は要素が `number` なので hashable です。
よって set を使います。

```python
S = input()

times = int(S[3:])
if times < 350:
    if times in {0, 316}:
        print("No")
    else:
        print("Yes")
else:
    print("No")
```

:::message

> Magic value used in comparison, consider replacing `350` with a constant variable

とも Ruff に言われます。
マジックナンバーは望ましくありませんが、今回は割り切って無視します。
:::

## manual-list-comprehension (PERF401)

https://docs.astral.sh/ruff/rules/manual-list-comprehension/

ここからは、Ruff 公式ドキュメントにある例を使います。

```python
original = list(range(10000))
filtered = []
for i in original:
    if i % 2:
        filtered.append(i)
```

0~9999 までの整数のリスト `original` のうち、2 で割り切れないものを `filtered` に追加して奇数のみを要素にもつリストを作成します。

> Use a list comprehension to create a transformed list

このような場合にはリスト内包表記を用いましょう。
Python と言えばリスト内包表記ですね。

```python
original = list(range(10000))
filtered = [x for x in original if x % 2]
```

私も知らなかったのですが、既存のリストに追加する場合には `extend` を用いるのがよいそうです。

```python
original = list(range(10000))
filtered.extend(x for x in original if x % 2)
```

## if-else-block-instead-of-if-exp (SIM108)

https://docs.astral.sh/ruff/rules/if-else-block-instead-of-if-exp/

```python
if foo:
    bar = x
else:
    bar = y
```

> Use ternary operator `bar = x if foo else y` instead of `if`-`else`-block

if 文の中で変数に値を代入する場合は三項演算子を用いた方が簡潔に書くことができます。

```python
bar = x if else y
```

三項演算子(の順番)も Python ならではですね。

# Why Ruff ?

Python には Ruff のほかにも

- pycodestyle
- Flake8
- Pylint

など、複数の lint ツールがあります。
その中から今回 Ruff を紹介したのは以下のような理由があります。

- 高速であること
- Rye に標準搭載されていること
- 新しめであること
- formatter も兼ねていること

Python のツールは複数のツールを組み合わせたり、一緒に併用したりすることでより効果を発揮することがあります。
しかし、多くのツールを利用することになりかえって混乱を生じさせてしまうことにもなります。
Ruff は複数のツールを併用することの混乱を回避することも狙っています。
linter や formatter などの複数ツールを Ruff1 個に置き換えることができます。

新しめのツールということもあり、それまでの linter のルールから派生しているものもあります。
そういうわけで多くのルールをサポートしているのではないかと思われます。

:::message
これまでに紹介してきたルールの詳細ページには "Derived from ~" という記述があります。
:::

Ruff 以外の linter ツールでも同じような使い方ができるので、気になったものがあれば試してみてください。
(ぼくは Flake8 を利用していたことがあります。)

# まとめ

Ruff を使って Python らしいコードを学習できます。
Atcoder などの過去問を利用することで、問題を解くためにまずは自分の頭でコードを考え、書いたコードを linter にチェックさせることでより Python らしい書き方も併せて学ぶことができて学習効果が高まるでしょう。

# 最後に

Novisteps のために Ruff を使った Python 環境を用意しましたが、便利でしかも学習目的にも Ruff がいいんじゃないかと思ってこの記事を書きました。

最近 Rust 製のツールがどんどん出てきていますね。
今後が Rust の知識も求められるようになるんでしょうか、、、

最後まで読んでいただきありがとうございました！
