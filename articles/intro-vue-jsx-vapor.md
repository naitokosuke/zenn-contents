---
title: "vue-jsx-vapor を知る"
emoji: "🚀"
type: "tech"
topics: ["vuejs", "jsx", "vapor"]
published: false
---

[Vue Advent Calendar 2025](https://qiita.com/advent-calendar/2025/vue) 25 日目(シーズン 2)の記事です。

https://qiita.com/advent-calendar/2025/vue

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

今回は、Vue の JSX を Vapor Mode でコンパイルするためのツール [**vue-jsx-vapor**](https://github.com/vuejs/vue-jsx-vapor) を紹介します。
2025 年 12 月 25 日に v3.1.0 がリリースされ、Virtual DOM 生成機能も追加されました。

https://github.com/vuejs/vue-jsx-vapor

## Vue Vapor Mode とは

Vue Vapor Mode は、Virtual DOM を使用しない新しいレンダリングモードです。
2024 年 12 月 23 日に Vue 3.6.0-beta.1 がリリースされ、Vapor Mode が利用可能になりました。

https://github.com/vuejs/core/releases/tag/v3.6.0-beta.1

### 主な特徴

- Virtual DOM の生成と差分計算をスキップし、リアクティブ処理を高速化
- Solid.js や Svelte 5 と同等のパフォーマンスをベンチマークで実証
- ランタイムサイズは Virtual DOM モードと比較して 53% 削減
- Vapor のみのアプリはバンドルサイズ約 6KB（Virtual DOM 版の約 50KB から 88% 削減）
- 100% オプトイン、既存の Vue API のサブセットをサポート

### 使い方

SFC で Vapor Mode を有効にするには、`<script setup vapor>` と記述します。

```vue
<script setup vapor>
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

`createVaporApp` で作成したアプリは Virtual DOM ランタイムコードを読み込まず、バンドルサイズを約 88% 削減できます。

`vaporInteropPlugin` を使うと Vapor コンポーネントと VDOM コンポーネントを相互にネストして使用できます。

<!-- textlint-disable ja-technical-writing/ja-no-mixed-period -->

:::message
Vapor Mode はまだ不安定な状態です。
推奨用途は、既存アプリでのパフォーマンス重視のサブページ実装、または小規模な新規アプリ全体を Vapor で構築することです。
Suspense は Vapor のみモードでは未サポートです（VDOM の Suspense 内で Vapor コンポーネントを使用することは可能）。
:::

<!-- textlint-enable ja-technical-writing/ja-no-mixed-period -->

## Alien Signals

Vue 3.6 には [Alien Signals](https://github.com/stackblitz/alien-signals) という軽量なリアクティビティライブラリが統合されています。

https://github.com/stackblitz/alien-signals

### パフォーマンス改善

Vue 3.4 比で以下のパフォーマンス改善が報告されています（[PR #12349](https://github.com/vuejs/core/pull/12349)）。

- メモリ使用量 13% 削減（2.3MB → 2.0MB）
- computed 生成が 1.28 倍高速
- 1000 個の computed を持つ ref への書き込みが 1.71 倍高速
- 1000 個の ref を 1 つの computed で読み取る処理が 3.41〜3.63 倍高速
- effect 生成（1 ref 追跡）が 1.32 倍高速
- effect 生成（100 refs 追跡）が 1.62 倍高速
- 1000 refs を変更する単一 effect が 3.47 倍高速

### ベンチマーク比較

[js-reactivity-benchmark](https://github.com/transitive-bullshit/js-reactivity-benchmark) でのベンチマーク結果です（2025 年 1 月 10 日、M3 MacBook Pro、Node.js v22.10.0）。

![js-reactivity-benchmark の結果](/images/intro-vue-jsx-vapor/js-reactivity-benchmark.png)

| ライブラリ      | スコア (ms) |
| --------------- | ----------- |
| alien-signals   | 約 70       |
| @reactively     | 約 90       |
| Svelte v5       | 約 90       |
| SolidJS         | 約 200      |
| @vue/reactivity | 約 300      |

alien-signals は @vue/reactivity 比で約 4 倍高速です。

### 技術的な背景

Alien Signals は Vue 3.4 のリアクティビティシステムをベースに研究目的で書き直されたものです。
Array/Set/Map を使用しない制約により、最小限のメモリ使用量を実現しています。
Vue 3 の伝播アルゴリズム、Preact の双方向リンクリスト、Svelte の effect スケジューリング、Reactively のグラフカラーリングなど、複数のライブラリのアイデアを統合しています。

## vue-jsx-vapor とは

vue-jsx-vapor は、Vue の JSX を Vapor Mode でコンパイルするためのツールです。

https://github.com/vuejs/vue-jsx-vapor

https://jsx-vapor.netlify.app

### 主な特徴

- Rust（Oxc）でコンパイラを実装し、Babel 比で 20 倍の性能向上
- 全ての Vue 組み込みディレクティブをサポート
- Vue のほとんどのマクロをサポート（JSX フレンドリー）
- Volar プラグインによる型安全性（[TS Macro VSCode 拡張](https://marketplace.visualstudio.com/items?itemName=pineappletv.ts-macro)経由）
- ESLint プラグインによるディレクティブとマクロの自動フォーマット

### 対応ビルドツール

以下のビルドツールに対応しています。

- Vite
- Rollup
- Webpack
- esbuild

### v3.1.0 の変更点

2025 年 12 月 25 日にリリースされた v3.1.0 では、Virtual DOM 生成機能が追加されました。
Vapor 形式に加えて、標準的な Virtual DOM ベースのアプローチも選択できるようになりました。

## JSX と Vue

JSX は JavaScript XML の略で、JavaScript の構文拡張です。
元々は Facebook が React 用に作成しましたが、JSX と React は別物であり、独立して使用できます。

### Vue での JSX の書き方

Vue JSX と React JSX のトランスフォームは異なります。
Vue では `class` や `for` などの HTML 属性をそのまま使用でき、`className` や `htmlFor` は不要です。

```jsx
// v-show はそのまま使える
<div v-show={visible}>表示</div>;

// v-if は三項演算子で
{
  isVisible ? <p>表示</p> : null;
}

// v-for は map で
{
  items.map((item) => <li key={item.id}>{item.text}</li>);
}
```

vue-jsx-vapor では全ての Vue 組み込みディレクティブをサポートしているため、SFC のテンプレートに近い書き方ができます。

### Virtual DOM 版との違い

従来の Vue JSX（@vitejs/plugin-vue-jsx）は @vue/babel-plugin-jsx のラッパーで、esbuild と Babel を使用しています。

vue-jsx-vapor は Rust（Oxc）で書き直され、Babel 比 20 倍高速です。
さらに Vapor Mode と Virtual DOM 両方の生成をサポートしています。

## defineVaporComponent

Vapor Mode でコンポーネントを定義するには `defineVaporComponent` を使用します。

<!-- textlint-disable ja-technical-writing/ja-no-mixed-period -->

:::message
`defineVaporComponent` は props を分割代入する場合のみ必須です。
macros 特性を有効にしなければ `defineComponent` と同様に利用できます。
:::

<!-- textlint-enable ja-technical-writing/ja-no-mixed-period -->

[PR #13831](https://github.com/vuejs/core/pull/13831) で型定義が改善され（2025 年 12 月 8 日マージ済み）、以下がサポートされました。

- 関数コンポーネントのジェネリック props、slots、expose
- オプションスタイルコンポーネントの完全な型サポート
- `new (props?: P)` パターンで JSX との相互運用がしやすくなった
- `VaporComponentInstance`、`FunctionalVaporComponent`、`ObjectVaporComponent` 型のエクスポート

## まとめ

vue-jsx-vapor を紹介しました。

Vue 3.6 で導入された Vapor Mode と Alien Signals により、Vue のパフォーマンスは約 4 倍向上しています。
vue-jsx-vapor を使えば、JSX で Vapor Mode の恩恵を受けられます。

まだベータ版ですが、パフォーマンスが重要なアプリケーションでは試してみる価値があるでしょう。

## 参考リンク

- [Vue 3.6.0-beta.1 Release Notes](https://github.com/vuejs/core/releases/tag/v3.6.0-beta.1)
- [vue-jsx-vapor GitHub](https://github.com/vuejs/vue-jsx-vapor)
- [vue-jsx-vapor 公式ドキュメント](https://jsx-vapor.netlify.app)
- [vue-jsx-vapor Playground](https://repl.zmjs.dev/vuejs/vue-jsx-vapor)
- [Alien Signals GitHub](https://github.com/stackblitz/alien-signals)
- [Vue 公式 - Render Functions & JSX](https://vuejs.org/guide/extras/render-function)

## 最後に

最後まで読んでいただきありがとうございました！

## ドラフトメモ

### ブレスト

- Vue Vapor とは何か
- Vue 3.6 beta について
- Vue Vapor(Vue 3.6 beta)のロードマップ
- vue-jsx-vapor 3.1.0 リリースの内容
- 改めて JSX って何
- Vue の JSX のシンタックス(Vue のディレクティブ)
- Vue JSX(Virtual DOM) との違い
- Vue JSX(Virtual DOM) では Vite Plugin を使用しているけど Babel Plugin のラッパー？
- DefineVaporComponent の注意点(https://github.com/vuejs/vue-jsx-vapor/issues/18)
- 今後どうなっていくか(https://x.com/zhiyuanzmj/status/2004109574841029117?s=20)

### 調査メモ

#### Vue Vapor とは

- Virtual DOM を使用しないレンダリングモード
- Vue SFC の新しいコンパイルモード
- Virtual DOM の生成と差分計算をスキップし、リアクティブ処理を高速化
- Solid.js や Svelte 5 と同等のパフォーマンスをベンチマークで実証（[Vue 3.6.0-beta.1 Release Notes](https://github.com/vuejs/core/releases/tag/v3.6.0-beta.1)）
- 100% オプトイン、既存の Vue API のサブセットをサポート
- ランタイムサイズは Virtual DOM モードと比較して 53% 削減（[Vue School - Rizumu Ayaka's Talk](https://vueschool.io/articles/news/building-vues-high-performance-future-vapor-mode-insights-from-rizumu-ayakas-vue-js-nation-2025-talk/)）
- Vapor のみのアプリはバンドルサイズ約 6KB（Virtual DOM 版の約 50KB から 88% 削減）（[DEV Community](https://dev.to/icarusgk/all-we-know-about-vue-3-vapor-mode-3nfa)）

#### Vue 3.6 beta

- 2024 年 12 月 23 日に v3.6.0-beta.1 がリリース（[GitHub Release](https://github.com/vuejs/core/releases/tag/v3.6.0-beta.1)）
- Vapor Mode の機能が完成し、Virtual DOM モードの安定機能と同等の機能を持つ
- まだ不安定な状態とみなされている
- 推奨用途：既存アプリでのパフォーマンス重視のサブページ実装、または小規模な新規アプリ全体を Vapor で構築
- `<script setup>` を使用した SFC のみで動作
- `<script setup vapor>` で opt-in
- `createVaporApp` で作成したアプリは Virtual DOM ランタイムコードを読み込まず、バンドルサイズを大幅削減
- Alien Signals の統合により、依存関係追跡のオーバーヘッド削減、メモリ使用量削減、リアクティブデータ追跡のパフォーマンス向上
- `vaporInteropPlugin` を使うと Vapor コンポーネントと VDOM コンポーネントを相互にネストして使用可能（[Vue School](https://vueschool.io/articles/news/vn-talk-evan-you-preview-of-vue-3-6-vapor-mode/)）
- Suspense は Vapor のみモードでは未サポート（VDOM の Suspense 内で Vapor コンポーネントを使用することは可能）

#### Alien Signals について

Alien Signals は Vue 3.6 に統合された軽量なリアクティビティライブラリ（[GitHub](https://github.com/stackblitz/alien-signals)）

Vue 3.4 比でのパフォーマンス改善（[PR #12349](https://github.com/vuejs/core/pull/12349)）:

- メモリ使用量 13% 削減（2.3MB → 2.0MB）
- computed 生成が 1.28 倍高速
- 1000 個の computed を持つ ref への書き込みが 1.71 倍高速
- 1000 個の ref を 1 つの computed で読み取る処理が 3.41〜3.63 倍高速
- effect 生成（1 ref 追跡）が 1.32 倍高速
- effect 生成（100 refs 追跡）が 1.62 倍高速
- 1000 refs を変更する単一 effect が 3.47 倍高速

#### ベンチマーク比較

[js-reactivity-benchmark](https://github.com/transitive-bullshit/js-reactivity-benchmark)、2025 年 1 月 10 日、M3 MacBook Pro、Node.js v22.10.0 での結果。

| ライブラリ      | スコア (ms) |
| --------------- | ----------- |
| alien-signals   | 約 70       |
| @reactively     | 約 90       |
| Svelte v5       | 約 90       |
| SolidJS         | 約 200      |
| @vue/reactivity | 約 300      |

※ alien-signals は @vue/reactivity 比で約 4 倍高速。

#### 技術的特徴

- Vue 3.4 のリアクティビティシステムをベースに研究目的で書き直し
- Array/Set/Map を使用しない制約により、最小限のメモリ使用量を実現
- Vue 3 の伝播アルゴリズム、Preact の双方向リンクリスト、Svelte の effect スケジューリング、Reactively のグラフカラーリングを統合

#### vue-jsx-vapor について

Vue の JSX を Vapor Mode でコンパイルするためのツール（[GitHub](https://github.com/vuejs/vue-jsx-vapor)、[公式ドキュメント](https://jsx-vapor.netlify.app)）

**主な特徴**:

- Rust (Oxc) でコンパイラを実装、**Babel 比で 20 倍の性能向上**（[Oxc Benchmarks](https://oxc.rs/docs/guide/benchmarks)では Oxc は Babel 比 20〜50 倍高速と報告）
- 全ての Vue 組み込みディレクティブをサポート
- Vue のほとんどのマクロをサポート（JSX フレンドリー）
- Volar プラグインによる型安全性（[TS Macro VSCode 拡張](https://marketplace.visualstudio.com/items?itemName=pineappletv.ts-macro)経由）
- ESLint プラグインによるディレクティブとマクロの自動フォーマット
- 言語構成は Rust 74.4%、TypeScript 21.4%、JavaScript 4.2%

**対応ビルドツール**:

- Vite
- Rollup
- Webpack
- esbuild

#### vue-jsx-vapor 3.1.0 リリース内容

- 2025 年 12 月 25 日リリース（[GitHub Releases](https://github.com/vuejs/vue-jsx-vapor/releases)）
- Virtual DOM 生成機能の追加（Vapor 形式に加えて標準的な Virtual DOM ベースのアプローチも選択可能に）
- v3.1.1 が同日にパッチリリース

#### JSX とは

- JavaScript XML の略
- JavaScript の構文拡張で、JS ファイル内に HTML ライクなマークアップを書ける
- 元々は Facebook が React 用に作成
- Babel が JSX を React.createElement() 呼び出しにコンパイル
- JSX と React は別物（一緒に使われることが多いが独立して使用可能）
- XSS 攻撃を防ぐ（埋め込み値をレンダリング前にエスケープ）

#### Vue の JSX シンタックス（ディレクティブ）

- Vue JSX と React JSX のトランスフォームは異なる（React のものは Vue で使用不可）
- `class` や `for` などの HTML 属性をそのまま使用可能（`className`、`htmlFor` 不要）
- 通常のテンプレート構文とは異なる方法でディレクティブを扱う
- `v-show` は `v-show={value}` でそのまま使用可能
- `v-if` → 三項演算子 `{isVisible ? <p>表示</p> : null}` または `{isVisible && <p>表示</p>}`
- `v-for` → `array.map()` `{items.map(item => <li>{item.text}</li>)}`
- カスタムディレクティブは `v-name={value}` 構文
- vue-jsx-vapor では全ての Vue 組み込みディレクティブをサポート

#### Vue JSX (Virtual DOM) との違い

- @vitejs/plugin-vue-jsx は @vue/babel-plugin-jsx のラッパー
- esbuild と Babel を使用し、高速 HMR を実現
- オプションは @vue/babel-plugin-jsx に転送される
- vue-jsx-vapor は Rust (Oxc) で書き直され、Babel 比 20 倍高速
- vue-jsx-vapor は Vapor Mode と Virtual DOM 両方の生成をサポート

#### DefineVaporComponent の注意点

- 従来の `defineComponent` との構文が大きく異なる
- 関数形式に変わり、setup や return の書き方が従来と異なる
- 移行時の認知負荷が高い
- Vapor は「関数コンポーネントを主推」する設計
- `defineVaporComponent` は props 分割代入時のみ必須（省略可能）
- macros 特性を有効にしなければ `defineComponent` と同様に利用可能
- [PR #13831](https://github.com/vuejs/core/pull/13831) で型定義が改善（2025 年 12 月 8 日マージ済み）
  - 関数コンポーネントのジェネリック props、slots、expose のサポート
  - オプションスタイルコンポーネントの完全な型サポート
  - `new (props?: P)` パターンで JSX との相互運用がしやすくなった
  - `VaporComponentInstance`、`FunctionalVaporComponent`、`ObjectVaporComponent` 型のエクスポート

#### 参考リンク

**Vue 3.6 / Vapor Mode**:

- [Vue 3.6.0-beta.1 Release Notes](https://github.com/vuejs/core/releases/tag/v3.6.0-beta.1)
- [Vue School - Evan You's Vue.js Nation 2025 Talk](https://vueschool.io/articles/news/vn-talk-evan-you-preview-of-vue-3-6-vapor-mode/)
- [Vue School - Rizumu Ayaka's Vue.js Nation 2025 Talk](https://vueschool.io/articles/news/building-vues-high-performance-future-vapor-mode-insights-from-rizumu-ayakas-vue-js-nation-2025-talk/)
- [Vue Mastery - What's next for Vue in 2025?](https://www.vuemastery.com/blog/whats-next-for-vue-in-2025/)
- [Vue Mastery - The Future of Vue: Vapor Mode](https://www.vuemastery.com/blog/the-future-of-vue-vapor-mode/)

**Alien Signals**:

- [GitHub - stackblitz/alien-signals](https://github.com/stackblitz/alien-signals)
- [PR #12349 - alien-signals integration](https://github.com/vuejs/core/pull/12349)
- [js-reactivity-benchmark](https://github.com/transitive-bullshit/js-reactivity-benchmark)

**vue-jsx-vapor**:

- [GitHub - vuejs/vue-jsx-vapor](https://github.com/vuejs/vue-jsx-vapor)
- [公式ドキュメント](https://jsx-vapor.netlify.app)
- [Playground](https://repl.zmjs.dev/vuejs/vue-jsx-vapor)
- [PR #13831 - defineVaporComponent types](https://github.com/vuejs/core/pull/13831)

**Vue JSX (Virtual DOM)**:

- [Vue 公式 - Render Functions & JSX](https://vuejs.org/guide/extras/render-function)
- [@vitejs/plugin-vue-jsx](https://www.npmjs.com/package/@vitejs/plugin-vue-jsx)

**Oxc (コンパイラ)**:

- [Oxc 公式サイト](https://oxc.rs/)
- [Oxc Benchmarks](https://oxc.rs/docs/guide/benchmarks)
