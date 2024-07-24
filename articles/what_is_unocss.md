---
title: "UnoCSS【atomic CSS engine】"
emoji: "🎃"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["UnoCSS", "CSS"]
published: false
---

# はじめに

ナイトウ([@engineer_naito](https://twitter.com/engineer_naito))と申します。

今回は ~~CSS フレームワーク~~ Atomic CSS エンジンである、UnoCSS について書いていきます。
公式ドキュメントの日本語化対応も見据えています。

流行している Tailwind CSS との比較についても触れます。

# ドキュメント

https://unocss.dev/

https://github.com/unocss/unocss

# UnoCSS の特徴

> Instant On-demand Atomic CSS Engine

キャッチコピーのように訳すとすれば、

_オンデマンドな爆速アトミック CSS エンジン_

といったところでしょうか。

特徴としては、

- Customizable
- Powerful
- Fast
- Joyful

が挙げられています

# What is UnoCSS?

https://unocss.dev/guide/#what-is-unocss

> UnoCSS is the instant atomic CSS engine, that is designed to be flexible and extensible.
>
> The core is un-opinionated and all the CSS utilities are provided via presets.

これを日本語に訳すと以下のようになるでしょうか。

> UnoCSS は瞬間(即時)的 Atomic CSS エンジンで、柔軟かつ拡張可能であるように設計されています。
>
> コアの部分は特定のものや考えにとらわれず、すべての CSS ユーティリティはプリセットを通じて提供されます。

カスタム CSS ユーティリティを config ファイルに定義することができます。

```ts:uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  rules: [
    ['m-1', { margin: '1px' }],
  ],
})
```

これにより `m-1` という CSS ユーティリティを利用することができます。

UnoCSS はオンデマンドなので、コード内で用いない限り何もしません。
例えば以下のようなコンポーネントでは、

```html
<div class="m-1">Hello</div>
```

`m-1` が検知され、そして紐づく CSS が生成されます。

```css
.m-1 {
  margin: 1px;
}
```

正規表現(`RegExp`)と関数を使うことで、より柔軟なユーティリティを定義できます。

```diff ts:uno.config.ts
export default defineConfig({
  rules: [
-    ['m-1', { margin: '1px' }],
+    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
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

## What is Atomic CSS?

そもそも Atomic CSS とはなんでしょうか。
[Antony Fu 氏](https://antfu.me/)のブログ[Reimagine Atomic CSS](https://antfu.me/posts/reimagine-atomic-css)で言及されています。
この記事の中で John Polacek 氏の記事が引用されており、

> Atomic CSS is the approach to CSS architecture that favors small, single-purpose classes with names based on visual function.

とあります。日本語に訳すと、

> Atomic CSS とは視覚的な機能に基づいた命名である、小さく単一の目的を持つクラスを支持する CSS アーキテクチャのアプローチである。

となるでしょうか。

Atomic CSS は関数型 CSS(Functional CSS) や CSS ユーティリティ(CSS utilities)とも呼ばれています。
基本的に Atomic CSS フレームワークは以下のような CSS の集まりであると言えます。

```css
.m-0 {
  margin: 0;
}
.text-red {
  color: red;
}
/* ... */
```

Atomic CSS の是非については多くの場所で議論されています。
この記事では割愛します。

## プリセット

作成(定義)した CSS ユーティリティはプリセットとして共有することができます。
例えば、企業のデザインシステム用にプリセットを切り出しておいて、それを共有できます。

```ts:my-preset.ts
import { Preset } from 'unocss'

export const myPreset: Preset = {
  name: 'my-preset',
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
import { defineConfig } from 'unocss'
import { myPreset } from './my-preset'

export default defineConfig({
  presets: [
    myPreset, // 独自のプリセット
  ],
})
```

とにかくすぐに使いたい場合は公式のプリセットを利用することができます。

https://unocss.dev/presets/#presets

コミュニティプリセットもあります。

https://unocss.dev/presets/community

## Playground & Interactive Docs

公式 Playground があります。
ブラウザ上ですぐに試すことができるのはとてもありがたいです。

https://unocss.dev/play/

インタラクティブなドキュメントもあります。

https://unocss.dev/interactive/

何から検索してよいのかわからないときは random: を選択して、まずはどんなのがあるのか見てみるのもよいでしょう。
デフォルトプリセットの検索だけでなく、一般的な CSS プロパティも検索することができます。(MDN へのリンク)
UnoCSS は利用しなくても、このインタラクティブドキュメントを利用して学習するなどもよいのではないでしょうか。

## Integrations

Vite, Webpack といったツールや、Nuxt, Astro といったフレームワークとも統合できます。
VS Code の拡張機能もあります。

https://unocss.dev/integrations/

- [Vite](https://unocss.dev/integrations/vite)
- [Nuxt](https://unocss.dev/integrations/nuxt)
- [Astro](https://unocss.dev/integrations/astro)
- [Svelte(scoped)](https://unocss.dev/integrations/svelte-scoped)
- [Webpack](https://unocss.dev/integrations/webpack)
- [CDN Runtime](https://unocss.dev/integrations/runtime)
- [CLI](https://unocss.dev/integrations/cli)
- [PostCSS](https://unocss.dev/integrations/postcss)
- [ESLint](https://unocss.dev/integrations/eslint)
- [VS Code](https://unocss.dev/integrations/vscode)

# Examples

実際の UnoCSS 使用例が公式 GitHub リポジトリにあります。
https://github.com/unocss/unocss/tree/main/examples

StackBlitz で実際に動かすことのできるものもあります。
https://unocss.dev/guide/#examples

# Why UnoCSS?

UnoCSS の背景をより理解するために、UnoCSS クリエイターである [Antony Fu 氏](https://antfu.me/)のブログを読むことが推奨されています。
https://antfu.me/posts/reimagine-atomic-css

# UnoCSS とその他の違い

UnoCSS は Windi CSS チームメンバーの一人が作りました。
Windi CSS から多くのインスピレーションを受けています。
Windi CSS が 2023 年 3 月時点で活発なメンテも行われておらず、UnoCSS は Windi CSS の _"spiritual successor"(「精神的続編」)_ とされています。

公式ドキュメントには Windi CSS, TailWind CSS それぞれとの比較がされています。

## UnoCSS vs Windi CSS

- **起源と開発経緯**:

  - UnoCSS は Windi CSS チームのメンバーによって始められ、Windi CSS の多くのアイデアを取り入れている。
  - Windi CSS は 2023 年 3 月以降、積極的なメンテナンスが行われていないが、UnoCSS はその「スピリチュアルな後継」として位置づけられている

- **共通の特徴**:

  - オンデマンドでのスタイル生成。
  - 多くの機能を共有
    - Attributify モード
    - ショートカット
    - バリアントグループ
    - コンパイルモード
    - など

- **独自の特徴**:

  - UnoCSS は最大限の拡張性とパフォーマンスを追求して設計されており、純粋な CSS アイコン、値なし Attributify、Tagify、Web フォントなどの新機能を導入

- **カスタマイズ性**:
  - UnoCSS は、すべての機能がオプションで提供されており、独自のコンベンションやデザインシステム、プリセットを簡単に作成できる

## UnoCSS vs Tailwind CSS

- **インスピレーション**:

  - Windi CSS と UnoCSS はどちらも Tailwind CSS から多くのインスピレーションを受けている

- **エンジン**:

  - Tailwind CSS は PostCSS プラグインとして設計されている
  - UnoCSS はビルドツールとの統合を重視した "isomorphic" なエンジンであり、より柔軟に様々な環境で使用可能

- **設計目標**:

  - UnoCSS はフルに拡張可能でカスタマイズ可能な設計を持ち、Tailwind CSS よりも柔軟性が高い("un-opinionated")
  - Tailwind CSS は "opinionated" であり、独自のデザインシステムを構築するのが難しい場合がある

- **機能の追加**:

  - UnoCSS は独自のプリセットやコミュニティによるさまざまなプリセットを使用して、新機能を実験しやすい
  - Tailwind CSS は独自のプラグインシステムや設定に依存していて、特定の機能を追加する際に制限がある

- **サポートと統合**:

  - UnoCSS は CDN ランタイムやインスペクタなどの機能をサポートし、ビルドツールとの深い統合を提供
  - Tailwind CSS は PostCSS プラグインとして提供されている

## TailWind CSS から UnoCSS への移行

Tailwind CSS で大幅にカスタマイズされたプロジェクトを UnoCSS に移行することは、困難を伴うかもしれません。
これは、UnoCSS が Tailwind CSS のプラグインや設定をサポートしていないためです。
しかし、UnoCSS の高いパフォーマンスと拡張性は、移行の難しさや必要な苦労に見合った価値があるでしょう。

## 特徴的な機能(公式プリセット)

特徴的な機能(公式プリセット)を紹介します。

### Attributify モード

https://unocss.dev/presets/attributify

`@unocss/preset-attributify` プリセットを使用すると、ユーティリティをクラスではなく HTML 属性を用いることで実現できます。
例えば、ユーティリティクラスを用いてボタンを作成しようとすると、以下のようになることがあります。

```html
<button
  class="bg-blue-400 hover:bg-blue-500 text-sm text-white font-mono font-light py-2 px-4 rounded border-2 border-blue-200 dark:bg-blue-500 dark:hover:bg-blue-600"
>
  Button
</button>
```

長くなればなるほど可読性も低下し、メンテナンスも困難になります。
一方 Attributify モードでは、

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

と、属性に分割できます。
`text-sm` と `text-white` のように重複したプレフィックスを除いてグループ化(`text="sm white"`)することができます。

また、`flex`, `grid`, `border` のようにプレフィックスと全く同じ名前のユーティリティについては `~` が使えます。

```html
<button class="border border-red">Button</button>
```

```html
<button border="~ red">Button</button>
```

### Tagify モード

https://unocss.dev/presets/tagify

`@unocss/preset-tagify` プリセットは要素に単一の UnoCSS ルールを適用する際に便利です。
このプリセットを使うと例えば、

```html
<span class="text-red"> red text </span>
<div class="flex">flexbox</div>
I'm feeling <span class="i-line-md-emoji-grin"></span> today!
```

は、

```html
<text-red> red text </text-red>
<flex> flexbox </flex>
I'm feeling <i-line-md-emoji-grin /> today!
```

のように記述することができます。

### Typography

https://unocss.dev/presets/typography

`@unocss/preset-typography` プリセットにより、標準の HTML 要素にタイポグラフィスタイルを簡単に適用するための「プローズクラス」が提供されています。
これらのクラスを使用することで、例えば段落や見出し、リスト、リンクなどの要素に対して、統一されたタイポグラフィのスタイルを適用できます。

```html
<article text-base prose prose-truegray xl="text-xl">
  {{ markdown }}
  <p class="not-prose">Some text</p>
</article>
```

要素に `not-prose` を適用することでタイポグラフィスタイルを取り消すことができます。

:::message
`not-prose` はクラスとしてのみ使用でき、属性としては使用できません。
これは `not`が CSS セレクタでのみ使用でき、UnoCSS ではスキャンできないからです。
:::

### Web Fonts

https://unocss.dev/presets/web-fonts

`@unocss/preset-web-fonts` プリセットでは、単にフォント名から Web フォントを利用することができます。

```ts:config.uno.ts
import { defineConfig } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetUno from '@unocss/preset-uno'
import axios from 'axios'
import ProxyAgent from 'proxy-agent'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Roboto',
        mono: ['Fira Code', 'Fira Mono:400,700'],
      },
    }),
  ],
})
```

2024 年 7 月現在、フォントのプロバイダは

- `google`: Google Fonts
- `bunny`: Bunny Fonts
- `fontshare`: Fontshare

のみです。
フォントプロバイダ追加 PR ウェルカムとのことです。

`none` を`provider`オプションに指定することでフォントをシステムフォントとして扱うことができます。

### Rem to px

`@unocss/preset-rem-to-px` プリセットを用いることで rem を px へ変換することができます。
(デフォルトでは `1rem = 16px`)

```html
<div class="m-2"></div>
```

からは

```css
.m-2 {
  margin: 0.5rem;
}
```

が生成されますが、このプリセットを使えば

```css
.m-2 {
  margin: 8px;
}
```
