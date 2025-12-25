---
title: ""
emoji: "🐷"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: []
published: false
---

[Vue Advent Calendar 2025](https://qiita.com/advent-calendar/2025/vue) 25 日目(シーズン 2)の記事です。

https://qiita.com/advent-calendar/2025/vue

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

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
- Solid.js や Svelte 5 と同等のパフォーマンスをベンチマークで実証
- 100% オプトイン、既存の Vue API のサブセットをサポート

#### Vue 3.6 beta

- 2024 年 12 月 23 日に v3.6.0-beta.1 がリリース
- Vapor Mode の機能が完成し、Virtual DOM モードの安定機能と同等の機能を持つ
- まだ不安定な状態とみなされている
- 推奨用途：既存アプリでのパフォーマンス重視のサブページ実装、または小規模な新規アプリ全体を Vapor で構築
- `<script setup>` を使用した SFC のみで動作
- `<script setup vapor>` で opt-in
- `createVaporApp` で作成したアプリは Virtual DOM ランタイムコードを読み込まず、バンドルサイズを大幅削減
- Alien Signals の統合により、依存関係追跡のオーバーヘッド削減、メモリ使用量削減、リアクティブデータ追跡のパフォーマンス向上

#### vue-jsx-vapor 3.1.0 リリース内容

- 2025 年 12 月 25 日リリース
- Virtual DOM 生成機能の統合（Vapor 形式に加えて標準的な Virtual DOM ベースのアプローチも選択可能）
- Rust でコンパイラを書き直し、Babel 比で 20 倍の性能向上
- 全ての Vue 組み込みディレクティブをサポート
- Vue のほとんどのマクロをサポート（JSX フレンドリー）
- Volar プラグインによる型安全性
- ESLint プラグインによるディレクティブとマクロの自動フォーマット

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
- 関数形式に変わり、setup も return も従来と異なる
- 移行時の認知負荷が高い
- Vapor は「関数コンポーネントを主推」する設計
- `defineVaporComponent` は props 分割代入時のみ必須（省略可能）
- macros 特性を有効にしなければ `defineComponent` と同様に利用可能
- 将来的な PR (vuejs/core#13831) で古い書法との互換性向上予定

#### 参考リンク

- https://vueschool.io/articles/news/vn-talk-evan-you-preview-of-vue-3-6-vapor-mode/
- https://github.com/vuejs/core/releases/tag/v3.6.0-beta.1
- https://www.vuemastery.com/blog/whats-next-for-vue-in-2025/
- https://github.com/vuejs/vue-jsx-vapor
- https://jsx-vapor.netlify.app (公式ドキュメント)
- https://repl.zmjs.dev/vuejs/vue-jsx-vapor (Playground)
- https://vuejs.org/guide/extras/render-function (Vue 公式 - Render Functions & JSX)
- https://www.npmjs.com/package/@vitejs/plugin-vue-jsx
