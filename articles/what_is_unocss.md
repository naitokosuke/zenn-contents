---
title: "UnoCSS"
emoji: "🎃"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["UnoCSS", "CSS"]
published: false
---

# はじめに

ナイトウ([@engineer_naito](https://twitter.com/engineer_naito))と申します。

今回は

- 公式ドキュメント
  https://unocss.dev/

- GitHub
  https://github.com/unocss/unocss

# UnoCSS の特徴

> Instant On-demand Atomic CSS Engine

- Customizable
- Powerful
- Fast
- Joyful

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

これにより、プロジェクトで `m-1` という CSS ユーティリティを利用することができます。

UnoCSS はオンデマンドなので、コード内で用いない限り何もしません。
例えば以下のようなコンポーネントでは、

```html
<div class="m-1">Hello</div>
```

`m-1` が検知されて、そして紐づく CSS が生成されます。

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

## プリセット

CSS ユーティリティはプリセットとして共有することもできます。
例えば、企業のデザインシステム用にプリセットを作ってチームに共有することができます。

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
// uno.config.ts
import { defineConfig } from 'unocss'
import { myPreset } from './my-preset'

export default defineConfig({
  presets: [
    myPreset, // 独自のプリセット
  ],
})
```

同様に公式のプリセットも提供されています。
https://unocss.dev/presets/#presets

コミュニティプリセットもあります。
https://unocss.dev/presets/community

## Playground & Interactive Docs

公式 Playground があります。
ブラウザで試してみたり遊んでみたりできます。
https://unocss.dev/play/

対話式ドキュメントもあります。
デフォルトプリセットの検索が捗ります。
https://unocss.dev/interactive/

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
また、Windi CSS が 2023 年 3 月時点ですでにメンテされていないことから、UnoCSS は Windi CSS の _"spiritual successor"(「精神的続編」)_ とされています。

公式ドキュメントには Windi CSS, TailWind CSS それぞれとの比較がされています。

## UnoCSS vs Windi CSS

- **起源と開発経緯**:

  - UnoCSS は Windi CSS チームのメンバーによって始められ、Windi CSS の多くのアイデアを取り入れている。
  - Windi CSS は 2023 年 3 月以降、積極的なメンテナンスが行われていないが、UnoCSS はその「スピリチュアルな後継」として位置づけられている

- **共通の特徴**:

  - オンデマンドでのスタイル生成。
  - Attributify モード、ショートカット、バリアントグループ、コンパイルモードなど、多くの機能を共有

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
