---
title: "UnoCSS とは: その魅力と誕生秘話"
emoji: "🎴"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["UnoCSS", "CSS", "CSSinJS"]
publication_name: "comm_vue_nuxt"
published: false
---

## はじめに

ナイトウ([@engineer_naito](https://twitter.com/engineer_naito))と申します。
今回は ~~CSS フレームワーク~~ **Atomic CSS エンジン**である UnoCSS について紹介したいと思います。

## 想定読者

Tailwind CSS などの CSS フレームワークを利用したことのある開発者であればスラスラ読めると思いますが、初学者の方であっても問題なく読めると思います。
(なぜならばぼく自身が CSS フレームワークを使ったモダンフロントエンド開発の経験がないからです 🙋‍♂️)

## UnoCSS と日本

UnoCSS は軽量かつ柔軟な **Atomic CSS エンジン**であり、現在最も注目を集めている CSS ツールの一つです。

https://risingstars.js.org/2022/ja#section-css-in-js

![2022 JavaScript Rising Stars CSS in JS 部門1位](/images/what_is_unocss/image1.png)

https://risingstars.js.org/2023/ja#section-css-in-js

https://2023.stateofcss.com/ja-JP/css-frameworks/

![State of CSS CSS フレームワーク部門満足度ランキング2位](/images/what_is_unocss/image2.png)

人気調査サイトの結果によると、ここ 2, 3 年で確かに人気や知名度が上昇しています。
しかし、日本ではどうでしょうか？
Zenn で「UnoCSS」と検索してみます。

![Zenn での UnoCSS 検索結果 2024.08.05 時点](/images/what_is_unocss/image4.png)

4 記事、4 スクラップです 😇
(2024.08.05 時点)

:::details 一方 Tailwind CSS の Zenn 記事

![Zenn での Tailwind CSS 検索結果 2024.08.05 時点](/images/what_is_unocss/image6.png)

769 記事
33 冊
152 スクラップ
🙄

:::

UnoCSS は世界的には人気を集めていますが、日本ではまだ情報が足りてないように感じられました。

設計思想に共感したり、特徴を気に入ってくれたりして、UnoCSS を好きになる方が増えることを願います。
CSS フレームワークの選択肢の一つになってほしいです。

## 背景

Atomic CSS (エンジン)とはなんでしょうか。
UnoCSS はどのようにして生まれたのでしょうか。
Atomic CSS の考えを知り、UnoCSS の誕生の経緯や理由を知ることで、UnoCSS の設計思想や特徴を深く理解することができます。

### Anhony Fu 氏

UnoCSS の作者は Anthony Fu 氏です。

https://antfu.me/

> Hey, I am Anthony Fu, a fanatical open sourceror.

Anthony Fu 氏は OSS に多大なる貢献をしている開発者であり、

:::details Anthony Fu 氏が手掛ける OSS

- [Vitest](https://github.com/vitest-dev/vitest)
- [Slidev](https://github.com/slidevjs/slidev)
- [VueUse](https://github.com/vueuse/vueuse)
- [Elk](https://github.com/elk-zone/elk)
- [Type Challenges](https://github.com/type-challenges/type-challenges)

:::

[Vue](https://github.com/vuejs/core), [Nuxt](https://github.com/nuxt/nuxt), [Vite](https://github.com/vitejs/vite) のコアチームメンバーでもあります。

UnoCSS の誕生した経緯が作者 Anthony Fu 氏のブログ記事 [Reimagine Atomic CSS](https://antfu.me/posts/reimagine-atomic-css) に記されています。

### Atomic CSS

Atomic CSS は Functional CSS, Utility First CSS とも呼ばれます。

John Polacek 氏の記事 [Let’s Define Exactly What Atomic CSS is](https://css-tricks.com/lets-define-exactly-atomic-css/) によれば、

> Atomic CSS is the approach to CSS architecture that favors small, single-purpose classes with names based on visual function.

Atomic CSS とは、**視覚的な機能に基づいて命名された単一の目的を持つ小さなクラス**を支持する(好む) CSS アーキテクチャのアプローチである、ということです。

- [Tailwind CSS](https://tailwindcss.com/)
- [Windi CSS](https://windicss.org/)
- [Tachyons](https://tachyons.io/)

のような Utility First CSS フレームワークがあります。
おおよそ以下のような CSS のコレクションになっています。

```css
.m-0 {
  margin: 0;
}
.text-red {
  color: red;
}
/* ... */
```

### UnoCSS 誕生の経緯と背景

作者である Anthony Fu 氏は Vite の作者であり、主に Vite を利用して開発を行なっています。
また、Atomic CSS を活用したスピーディな開発を好んでおり、Vite のスターターテンプレート [Vitesse](https://github.com/antfu-collective/vitesse) 開発の UI フレームワークとして、Tailwind CSS を採用していました。

Vite が Webpack などに比べて爆速であるのに対し、Tailwind は数 MB のユーティリティ CSS を生成するため、起動時や Vite の HMR で遅くなってしまっていました。
当初は Atomic CSS を利用する際の代償(trade-off)だと考えていましたが、WindiCSS に出会い、考えが変わります。

https://windicss.org/

Windi CSS は Tailwind CSS の代替としてフルスクラッチで作成されました。
Windi CSS の一番の特徴はオンデマンドな点です。
実際に用いたもののみ CSS が生成されるということです。
この特徴は Vite の思想にも合致していたため Tailwind CSS よりもずっと早くなると考えます。
Vite プラグインを開発したところ、Tailwind CSS に比べて 20~100 倍の速度が出るようになったとのことです。

https://x.com/antfu7/status/1361398324587163648

Windi CSS の開発を行っていた Anthony Fu 氏ですが、Tailwind CSS と互換のあるカスタムユーティリティの定義方法に疑問を抱きました。
Tailwind CSS の設計思想はオンデマンドなアプローチに合致しません。
そこで Anthony Fu 氏はオンデマンドなアプローチを念頭に置き、一から設計し直すことができるならどんな結果が得られるのかと考え始めました。
その考えをもとにいくつかの実験を行い、生まれたのが Atomic CSS エンジン **UnoCSS** です。

https://x.com/antfu7/status/1445368569550688256

### まとめ

UnoCSS は、Anthony Fu 氏が Tailwind CSS のパフォーマンス問題とカスタマイズの難しさを解決するために開発した、**オンデマンド**で動作する **Atomic CSS エンジン**です。
Windi CSS の影響を受け、より**迅速**で**柔軟**なスタイル定義を可能にするために設計されました。

Atomic CSS は、**視覚的な機能に基づいて命名された単一の目的を持つ小さなクラス**を支持するアプローチであり、
**効率的**なスタイル管理と**再利用性**を重視しています。

このように、UnoCSS は既存の CSS フレームワークの課題を解決し、開発者にとってより使いやすく、高速な開発体験を提供するために誕生しました。

## UnoCSS の特徴

UnoCSS の誕生背景を説明しました。
Tailwind CSS, Windi CSS にどのような課題があり、それを解決するために Anthony Fu 氏が UnoCSS を作成したことが理解できましたでしょうか？

そうして生まれた UnoCSS の特徴を紹介していきます。

![UnoCSS interactive docs のスクショ](/images/what_is_unocss/image3.png)

> Instant On-demand Atomic CSS Engine

### Fully Customizable

コアユーティリティなし
全ての機能はプリセットによって提供される

### Instant

パースなし、AST なし、スキャンなし
WindiCSS や Tailwind CSS JIT より 5 倍以上高速

### Lightweight

依存関係ゼロでブラウザフレンドリー :約 6KB（最小化＋ brotli 圧縮）

### Rich Integrations

Vite, Webpack, PostCSS, CLI, VS Code,EsLint などのファーストクラスサポート

### Shortcuts

ユーティリティの動的グループ化とエイリアス

### Attributify Mode

属性内のグループユーティリティ

### Pure CSS Icons

アイコンを単なるクラスとして使用

### Variant Groups

グループユーティリティの共通プレフィックスの短縮系

### CSS Directives

`@apply` ディレクティブによる CSS の再利用

### Compilation Mode

ビルド時に複数クラスを 1 つに統合

### Inspector

インタラクティブなデバッグとインスペクト

### CDN Runtime Build

CDN インポート(1 行)による UnoCSS の利用

## UnoCSS 特徴まとめ

1. **完全カスタマイズ可能で軽量**:
   UnoCSS は依存関係がなく、最小化＋ brotli 圧縮で約 6KB という非常に軽量な設計です。
   全ての機能はプリセットで提供され、コアユーティリティがないため、開発者は自分のプロジェクトに最適な設定を柔軟に構築できます。

2. **瞬時に反映されるパフォーマンス**:
   パースや AST、スキャンが不要で、WindiCSS や Tailwind CSS JIT よりも 5 倍以上の速度で動作します。
   これにより、リアルタイムの開発体験が向上し、効率的なスタイリングが可能です。

3. **豊富な統合と使いやすさ**:
   Vite、Webpack、PostCSS、CLI、VS Code、ESLint などのツールとシームレスに統合でき、開発環境を選ばずに利用できます。
   また、`@apply`ディレクティブやショートカット機能、属性モードなどにより、直感的かつ効率的にスタイルを適用できるよう設計されています。

## UnoCSS の基本的な使用方法

さて、UnoCSS の基本的な使い方を見ていきましょう。

インストール(vite の場合)

```bash
pnpm add -D unocss
```

:::message
各フレームワーク、ツールでのインストール方法は公式ドキュメントに記載があります。

https://unocss.dev/integrations/#integrations

具体的なコード例

https://github.com/unocss/unocss/tree/main/examples
:::

### 独自ユーティリティの定義と使用

設定ファイルに「ルール」として記述できます。

```ts:uno.config.ts
// uno.config.ts
import { defineConfig } from "unocss"

export default defineConfig({
  rules: [
    ["m-1", { margin: "1px" }],
  ],
})
```

```html
<div class="m-1">Hello</div>
```

```css
.m-1 {
  margin: 1px;
}
```

より柔軟(動的)なルールを設定するには正規表現と関数を用います。

```ts:uno.config.ts
export default defineConfig({
  rules: [
    [/^m-([.\d]+)$/, ([, num]) => ({ margin: `${num}px` })],
  ],
})
```

```html
<div class="m-1">Hello</div>
<div class="m-7.5">World</div>
```

```css
.m-1 {
  margin: 1px;
}
.m-7.5 {
  margin: 7.5px;
}
```

## プリセット

いくつかのルールを「プリセット」として抽出してそれを共有できます。

```ts:my-preset.ts
import { type Preset } from "unocss";

export const myPreset: Preset = {
  name: "my-preset",
  rules: [
    [/^m-([.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^p-([.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
  ],
  variants: [/* ... */],
  shortcuts: [/* ... */],
  // ...
}
```

```ts:uno.config.ts
import { defineConfig } from "unocss"
import { myPreset } from "./my-preset"

export default defineConfig({
  presets: [
    myPreset,
  ],
})
```

## 公式プリセット

UnoCSS のコアユーティリティなしの「柔軟性」、「拡張性」を説明しました。
Tailwind CSS などのユーティリティファースト CSS フレームワークに馴染みのある方々はルールやプリセットの定義を億劫に感じるかもしれません。

安心してください。
そんな方々のために、UnoCSS では公式のプリセットが用意されています。
[`@unocss/preset-uno`](https://unocss.dev/presets/uno) は

- Tailwind CSS
- Windi CSS
- Bootstrap
- Tachyons

などのユーティリティファースト CSS フレームワークを含む共通のスーパーセットを提供しようと試みています。
慣れ親しんだクラス名やスタイルをそのまま使い続けることができるため、学習コストも最小限に抑えられるのではないでしょうか。

```bash
pnpm add -D @unocss/preset-uno
```

```css
.ma4 {
  margin: 1rem; // Tachyons
}
.ml-3 {
  margin-left: 0.75rem; // Tailwind CSS
}
.ms-2 {
  margin-inline-start: 0.5rem; // Bootstrap
}
.mt-10px {
  margin-top: 10px; // Windi CSS
}
```

## 属性化モード

https://unocss.dev/presets/attributify#attributify-mode

Tailwind CSS を使用していると以下のようなボタンを実装することがあるでしょう。

```html
<button
  class="bg-blue-400 hover:bg-blue-500 text-sm text-white font-mono font-light py-2 px-4 rounded border-2 border-blue-200 dark:bg-blue-500 dark:hover:bg-blue-600"
>
  Button
</button>
```

「属性化」(attributify)モードでは、以下のようになります。

```html
<button
  bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
  text="sm white"
  font="mono light"
  p="y-2 x-4"
  border="2 rounded blue-200"
>
  Button
</button>
```

ユーティリティを属性として指定できるだけでなく、`text-sm text-white` を `text="sm white"` のようにダブったプレフィックスをまとめることができます。
(因数分解みたいですね 👀)

加えて、値なしの属性も使用できます。

```html
<div m-2 rounded text-teal-400 />
```

:::details ⚠️ 属性名の衝突

属性モードの名前が要素やコンポーネントのプロパティとの競合を避けるために (UnoCSS の「属性化」モードであることを明示するために)、プレフィックスを追加することができます。

```html
<a text="red">This conflicts with links' `text` prop</a>
<!-- to -->
<a uno-text="red">Text color to red</a>
```

```ts
presetAttributify({
  prefix: "uno-",
  prefixedOnly: true, // プレフィックスを強制できます
});
```

:::

## インスペクタ

![UnoCSS インスペクタを実際に使用したスクショ](/images/what_is_unocss/image5.png)

Vite サーバでは UnoCSS インスペクタを利用できます。
[`localhost:5173/__unocss`](localhost:5173/__unocss)

インスペクタにより、生成された CSS ルールや各ファイルに適用されたクラスを確認できます。
また、現在の設定に基づいてユーティリティをテストするための REPL も提供されています。

:::message
REPL (Read-Eval-Print Loop) とは、入力・評価・出力のループのことを指します。
インタプリタにおいて、ユーザーとインタプリタが対話的にコード片を実行できるものです。

https://ja.wikipedia.org/wiki/REPL
:::

## まとめ

UnoCSS は、

- 柔軟性
- 軽量性
- 高速なパフォーマンス

により、現代の開発ニーズに対応する強力な Atomic CSS エンジンです。
UnoCSS は開発者にとっての新しい選択肢として注目されています。

この記事では、UnoCSS の基本的な特徴や使用方法について紹介しましたが一部のみです。
UnoCSS はさらに多くの機能やカスタマイズオプションを提供しています。
この記事を読んでくださった方の中で公式ドキュメントを読んでくれる方がいればめちゃ嬉しいです。

## 最後に

UnoCSS はまだ日本国内では広く知られていないかもしれません。
しかし、その優れた設計思想や特徴を理解し、導入を検討する価値は十分にあります。
この記事で少しでも UnoCSS について知ってくれたり、選択肢の一つに加えてもらえれば幸いです。

さらに詳しい情報や具体的な使い方については、今後以下のような記事を執筆予定です。

- **完全解説**: 公式ドキュメントの翻訳をベースにした詳細な解説記事
- **人気フレームワークとの比較記事**: Tailwind CSS や Windi CSS などの他の CSS フレームワークとの比較記事

これらの記事もぜひご期待ください。
UnoCSS の魅力をもっと知りたい方は公式サイトやコミュニティリソースを活用して、積極的に情報を収集してみてください。
