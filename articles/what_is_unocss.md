---
title: "UnoCSS【atomic CSS engine】"
emoji: "🎃"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["UnoCSS", "CSS"]
publication_name: "comm_vue_nuxt"
published: false
---

# はじめに

ナイトウ([@engineer_naito](https://twitter.com/engineer_naito))と申します。

今回は最近注目を集めている ~~CSS フレームワーク~~ Atomic CSS エンジンである、UnoCSS について書いていきます。
UnoCSS は軽量かつ柔軟で、開発者にとってとても扱いやすいツールです。

流行している Tailwind CSS との比較についても言及し、UnoCSS の特徴について説明します。

:::message alert
おことわり

ぼくは UnoCSS を業務で利用したことはありません。
使ってみようと勉強している段階なので、具体的な TIPS はこの記事にはあまり含まれていません。
公式ドキュメントの翻訳ベースの内容になっています。
:::

# ドキュメント

https://unocss.dev/

https://github.com/unocss/unocss

# UnoCSS の特徴

> Instant On-demand Atomic CSS Engine

キャッチコピーのように訳すとすれば、

_オンデマンドな爆速アトミック CSS エンジン_

といったところでしょうか。

> - Customizable
> - Powerful
> - Fast
> - Joyful

技術的の説明で、"Joyful" があるのはとても珍しい気がします。いいですね。
ぼくは UnoCSS 作者の [Anthony Fu 氏](https://antfu.me/) のファンなんですが、彼の手がける OSS はどれも "Joyful" です。
もちろん UnoCSS もめちゃ "Joyful" です。

この記事は長いです。
後でも言及しますが、疲れる前に 

- [公式Playground](https://unocss.dev/play/)
- [interactive docs](https://unocss.dev/interactive/)

で "Joyful" を体験してください。

# UnoCSS がアツい！

https://risingstars.js.org/2022/ja#section-css-in-js

![2022 JavaScript Rising Stars CSS in JS 部門1位](/images/what_is_unocss/image1.png)

https://risingstars.js.org/2023/ja#section-css-in-js

https://2023.stateofcss.com/ja-JP/css-frameworks/

![State of CSS CSS フレームワーク部門満足度ランキング2位](/images/what_is_unocss/image2.png)

# What is UnoCSS?

https://unocss.dev/guide/#what-is-unocss

> UnoCSS is the instant atomic CSS engine, that is designed to be flexible and extensible.
>
> The core is un-opinionated and all the CSS utilities are provided via presets.

UnoCSS は即時的 Atomic CSS エンジンで、柔軟かつ拡張可能であるように設計されています。
コアの部分は特定のものや考えにとらわれず、すべての CSS ユーティリティはプリセットを通じて提供されます。

例えば、カスタム CSS ユーティリティを config ファイルに定義することができます。

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
以下のコンポーネントでは、

```html
<div class="m-1">Hello</div>
```

`m-1` が検知され、紐づく CSS が生成されます。

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

Atomic CSS とは、視覚的な機能に基づいて命名された単一の目的を持つ小さなクラスを支持する CSS アーキテクチャのアプローチである。

Atomic CSS は関数型 CSS(Functional CSS) や CSS ユーティリティ(CSS utilities)とも呼ばれています。
基本的に Atomic CSS フレームワークは以下のような CSS の集まりであると言えるでしょう。

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

## 設定ファイル

UnoCSS の設定はそれ専用のファイルに記述することが強く推奨されています。
デフォルトではプロジェクトのルートディレクトリ直下にある

- `uno.config.{js,ts,mjs,mts}`
- `unocss.config.{js,ts,mjs,mts}`

を見るようになっています。
(もちろんこちらで指定することもできます。)

`vite.config.ts` に記述するのに比べて、専用("dedicated")の設定ファイル内に記述する方が IDE や ESLint プラグインとの統合によりうまく機能します。
HMR についても有効です。

本記事では UnoCSS についての設定は `uno.config.ts` を用いる(指す)ことにします。

## プリセット

プリセットは UnoCSS の心臓です。
プリセットのおかげでカスタムフレームワークをすぐに作成できてしまいます。

定義した CSS ユーティリティはプリセットとして共有することができます。
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

このうち [@unocss/preset-uno](https://unocss.dev/presets/uno) はデフォルトのプリセットとなっています。

[@unocss/preset-wind](https://unocss.dev/presets/wind) は TailWind CSS / Windi CSS のコンパクトなプリセットです。

:::message alert
このプリセットにより TailWind CSS と Windi CSS との互換性の提供を目指していますが、完全な互換性は保証されていません。
具体的な利用方法についてはそれぞれの公式ドキュメントを参照してくださいとのことです。
:::

このプリセットの内容は [`interactive docs`](https://unocss.dev/interactive/) または直接[ソースコード](https://github.com/unocss/unocss/tree/main/packages/preset-wind)を確認してください。

:::message
2024 年 7 月現在、[@unocss/preset-uno](https://unocss.dev/presets/uno) は [@unocss/preset-wind](https://unocss.dev/presets/wind) と同一のプリセットになっています。
:::

コミュニティプリセットも多くあります。

https://unocss.dev/presets/community

探すのも楽しいので気になる方はぜひご自身で探してみてください。

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

UnoCSS の背景をより理解するために、UnoCSS 作者である [Antony Fu 氏](https://antfu.me/)のブログを読むことが推奨されています。
https://antfu.me/posts/reimagine-atomic-css

# UnoCSS とその他の違い

UnoCSS は Windi CSS チームメンバーの一人が作りました。
Windi CSS から多くのインスピレーションを受けています。
Windi CSS が 2023 年 3 月時点で活発なメンテも行われておらず、UnoCSS は Windi CSS の _"spiritual successor"_ (_「精神的続編」_) とされています。

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
  - UnoCSS は、すべての機能がオプションで提供されており、独自の規約やデザインシステム、プリセットを簡単に作成できる

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

## Tailwind CSS から UnoCSS への移行

Tailwind CSS で大幅にカスタマイズされたプロジェクトを UnoCSS に移行することは、困難を伴うかもしれません。
これは、UnoCSS が Tailwind CSS のプラグインや設定をサポートしていないためです。
しかし、UnoCSS の高いパフォーマンスと拡張性は、移行の難しさや必要な苦労に見合った価値があるでしょう。

# 特徴的な機能

UnoCSS の特徴的な機能は主に 2 種類に分かれます。

- 公式プリセット
- 設定

## 公式プリセット

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

`@unocss/preset-typography` プリセットにより、標準の HTML 要素にタイポグラフィスタイルを簡単に適用するための "prose" クラス が提供されています。
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

`none` を`provider`オプションに指定することで、フォントをシステムフォントとして扱うことができます。

### Rem to px

`@unocss/preset-rem-to-px` プリセットを用いることで `rem` を `px` へ変換することができます。
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

となります。

## Config

https://unocss.dev/config/

> Configurations are what make UnoCSS powerful.

### Shortcuts

複数のルールを組み合わせて短縮することができます。
これは Windi CSS に着想を得ています。

単一のルールに対してエイリアスを定義することもできます。

```ts
shortcuts: {
  // 複数のユーティリティをまとめる
  'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
  'btn-green': 'text-white bg-green-500 hover:bg-green-700',

// 単一のユーティリティのエイリアス
  'red': 'text-red-100',
}
```

ルールと同様に正規表現(`RegExp`)と関数を活用することで動的なショートカットも実現できます。

```ts
shortcuts: [
  // 静的ショートカット
  {
    btn: "py-2 px-4 font-semibold rounded-lg shadow-md",
    red: "text-red-100",
    s,
  },
  // 動的ショートカット
  [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
];
```

### Theme

UnoCSS では Tailwind CSS, Windi CSS ではおなじみのテーマ化システムをサポートしています。
設定に `theme` プロパティを記述すればデフォルトのテーマに深く統合されます。

```ts
theme: {
  // ...
  colors: {
    'veryCool': '#0000ff', // class="text-very-cool"
    'brand': {
      'primary': 'hsl(var(--hue, 217) 78% 51%)', //class="bg-brand-primary"
    },
  },
}
```

ルール、バリアント、ショートカット内でもテーマを用いることができます。

```ts
rules: [
  [
    /^text-(.*)$/,
    ([, c], { theme }) => {
      if (theme.colors[c]) return { color: theme.colors[c] };
    },
  ],
];
```

```ts
variants: [
  {
    name: "variant-name",
    match(matcher, { theme }) {
      // ...
    },
  },
];
```

```ts
shortcuts: [
  [
    /^badge-(.*)$/,
    ([, c], { theme }) => {
      if (Object.keys(theme.colors).includes(c))
        return `bg-${c}4:10 text-${c}5 rounded`;
    },
  ],
];
```

ブレークポイントも設定できます。
しかし、異なる単位の混在には UnoCSS は対応していません。
ブレークポイントの記述の際には単位の統一が必要です。

:::message
ブレークポイントの場合はデフォルトのテーマを上書きしてしまうことに注意が必要です。
:::

```ts
theme: {
  // ...
  breakpoints: {
    sm: '320px',
    // md: '40rem',
    md: `${40 * 16}px`,
    lg: '960px',
  },
}
```

### Variants

バリアントを用いることで既存のルールにバリエーションを適用することができます。
(Tailwind CSS の `hover:` バリアントのように)

```ts
variants: [
  // hover:
  (matcher) => {
    if (!matcher.startsWith('hover:'))
      return matcher
    return {
      // slice `hover:` prefix and passed to the next variants and rules
      matcher: matcher.slice(6),
      selector: s => `${s}:hover`,
    }
  },
],
rules: [
  [/^m-(\d)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
]
```

:::details `hover:m-2` の場合の流れ

1. `hover:m-2` が抽出される
2. `hover:m-2` が判定のために全てのバリアントに送られる
3. `hover:m-2` がマッチし、`m-2` を返す
4. `m-2` がさらに次のバリアントの判定のために用いられる
5. 他にマッチしなければ `m-2` がルールの判定に渡される
6. 最初のルールにマッチし、`.m-2 { margin: 0.5rem; }` が生成される
7. 最終的に以下の CSS となる

```css
.hover\:m-2:hover {
  margin: 0.5rem;
}
```

ユーザがホバーしたときにだけ `m-2` を適用することが実現できます。
:::

バリアントシステムのより高度な使い方を知るには、デフォルトのプリセットの実装を確認するのがよいでしょう。

https://github.com/unocss/unocss/tree/main/packages/preset-mini/src/_variants

### Extractors

ソースコード中のユーティリティを抽出するために "extractor" が使われます。

デフォルトでは [extractorSplit](https://github.com/unocss/unocss/blob/main/packages/core/src/extractors/split.ts) が適用されています。
この "extractor" がソースコードをトークンに分割しエンジンに渡しています。

[MDC(Markdown Components)](https://content.nuxt.com/usage/markdown) シンタックスのための "extractor" があります。

https://unocss.dev/extractors/mdc

`.md`, `.mdc`, `.markdown` ファイルに適用され、インライン props クラスを抽出します。

例えば、

```md
# Title{.text-2xl.font-bold}

Hello [World]{.text-blue-500}

![image](/image.png){.w-32.h-32}
```

からは `text-2xl`, `font-bold`, `text-blue-500`, `w-32`, `h-32` クラスが抽出されます。

### Transformers

規約のサポートのために、ソースコード変形のための統一されたインターフェースを提供します。

複数のクラスをを 1 つのクラスにコンパイルする "Transformers" があります。

https://unocss.dev/transformers/compile-class

例えば、

```html
<div class=":uno: text-center sm:text-left">
  <div class=":uno: text-sm font-bold hover:text-red"></div>
</div>
```

は、

```html
<div class="uno-qlmcrp">
  <div class="uno-0qw2gr"></div>
</div>
```

```css
.uno-qlmcrp {
  text-align: center;
}
.uno-0qw2gr {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
}
.uno-0qw2gr:hover {
  --un-text-opacity: 1;
  color: rgb(248 113 113 / var(--un-text-opacity));
}
@media (min-width: 640px) {
  .uno-qlmcrp {
    text-align: left;
  }
}
```

のようにコンパイルされます。

### Preflights

生の CSS を "preflight" として設定から注入することができます。
`theme` を用いて CSS をカスタマイズできます。

```ts
preflights: [
  {
    getCSS: ({ theme }) => `
      * {
        color: ${theme.colors.gray?.[700] ?? "#333"};
        padding: 0;
        margin: 0;
      }
    `,
  },
];
```

### Layers

CSS の順序は優先順位に影響します。
エンジンはルールの順序を保持しますが、ユーティリティのいくつかをグループ化して、その順序を明示的に制御したい場合もあります。

Tailwind CSS は 3 つの固定レイヤー(`base`, `components`, `utilities`)を持っています。
対して UnoCSS は、自由 にレイヤーを定義することができます。
レイヤーを定義したい場合はルールの 3 番目の要素としてメタデータを指定できます。
省略すれば `default` となります。

```ts
rules: [
  [/^m-(\d)$/, ([, d]) => ({ margin: `${d / 4}rem` }), { layer: "utilities" }],
  ["btn", { padding: "4px" }],
];
```

というルールからは以下の CSS が生成されます。

```css
/* default レイヤー */
.btn {
  padding: 4px;
}

/* utilities レイヤー */
.m-2 {
  margin: 0.5rem;
}
```

そして以下のように記述することでレイヤーの順序を制御することができます。

```ts
layers: {
  'components': -1,
  'default': 1,
  'utilities': 2,
  'my-layer': 3,
}
```

順序を指定しない場合はレイヤー名の辞書順になります。

### Autocomplete

https://unocss.dev/config/autocomplete

https://unocss.dev/tools/autocomplete

VS Code 拡張機能の自動補完をカスタマイズすることができます。
(静的なルールでは何も設定しなくても自動補完が効きます。)

```ts
rules: [
  [
    /^custom-autocomplete-m-(\d)$/,
    ([, d]) => ({ margin: `${d / 4}rem` }),
    { autocomplete: 'custom-autocomplete-m-<num>' },
  ],
]
```

自動補完は [Playground](https://unocss.dev/play/) でも確認することができます。

`autocomplete` 設定を用いることでより具体的なテンプレートや短縮記法を定義することもできます。

```ts
autocomplete: {
  templates: [
    // theme inferring
    'bg-$color/<opacity>',
    // short hands
    'text-<font-size>',
    // logic OR groups
    '(b|border)-(solid|dashed|dotted|double|hidden|none)',
    // constants
    'w-half',
  ],
  shorthands: {
    // equal to `opacity: "(0|10|20|30|40|50|60|70|90|100)"`
    'opacity': Array.from({ length: 11 }, (_, i) => i * 10),
    'font-size': '(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)',
    // override built-in short hands
    'num': '(0|1|2|3|4|5|6|7|8|9)',
  },
  extractors: [
      // ...extractors
  ],
}
```
