---
title: "Vue Bits を知る頃"
emoji: "✨"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["vuejs"]
published: false
---

[Vue Advent Calendar 2025](https://qiita.com/advent-calendar/2025/vue) 1 日目の記事です。

https://qiita.com/advent-calendar/2025/vue

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

今回は、Vue.js 向けの美しいアニメーション付き UI コンポーネントライブラリ [**Vue Bits**](https://vue-bits.dev/) をご紹介します。
公式ドキュメントで一覧を見ているだけでワクワクします。

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->

実際の業務で使用できるものは多くないかもしれませんが、ソースコードを眺めて「ふーん」ってするのも良さそうです。

<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->

ぜひ見てみてください！

公式ドキュメントを見てほしいですが、一応デモリポジトリも貼っておきます。

https://github.com/naitokosuke/try-vue-bits

## Vue Bits とは？

https://vue-bits.dev/

https://github.com/DavidHDev/vue-bits

> **Vue Components For Creative Developers**
>
> Highly customizable animated components that make your Vue projects truly stand out

Vue Bits は、高品質でアニメーション付きのインタラクティブな Vue コンポーネントを集めたオープンソースライブラリです。

![Star History](/images/introduce-vue-bits/star-history.png)

https://githubtracker.com/DavidHDev/vue-bits

<!-- textlint-disable ja-technical-writing/ja-no-mixed-period -->

:::message
[React Bits](https://reactbits.dev/) の公式 Vue 移植版として開発されています。

> This is the official Vue port of React Bits!
> https://github.com/DavidHDev/vue-bits

:::

<!-- textlint-enable ja-technical-writing/ja-no-mixed-period -->

### 主な特徴

まずはとにかく公式ドキュメントで Vue Bits の雰囲気？を見てもらいたいのですが、主な特徴としては以下があります。

- 90 種類以上のコンポーネント(毎週増えていく！？)
- 各コンポーネントは軽量で最小限の依存関係に抑えられている
- props を通じて細かくカスタマイズ可能
- Vue 3、TypeScript、Tailwind CSS で構築されたモダンな技術スタック

<!-- textlint-disable ja-technical-writing/ja-no-mixed-period -->
<!-- textlint-disable ja-technical-writing/sentence-length-->

:::message
本家 [React Bits](https://reactbits.dev/) では JavaScript / TypeScript、Tailwind CSS / Vanilla CSS の切り替えに対応していますが、Vue Bits は TypeScript + Tailwind CSS のみの提供となっています。
[issue](https://github.com/DavidHDev/vue-bits/issues/100) がありますが、作者は「必要であれば AI などで変換できる」というスタンスのようで Close されています 🫠
:::

<!-- textlint-enable ja-technical-writing/sentence-length-->
<!-- textlint-enable ja-technical-writing/ja-no-mixed-period -->

## インストール方法

[Vue Bits](https://vue-bits.dev/) は jsrepo という CLI ツールを使用してコンポーネントをインストールします。
必要なコンポーネントだけを個別にインストールできます。
インストールといっても npm パッケージではなく、コンポーネントのソースコードを直接プロジェクトにコピーします。

各コンポーネントの具体的なセットアップ手順は、[公式ドキュメント](https://vue-bits.dev/)の各コンポーネントページに記載されています。

### jsrepo とは

https://jsrepo.dev/

[jsrepo](https://jsrepo.dev/) は、コンポーネントをプロジェクトに直接コピーするための CLI ツールです。
[shadcn/ui](https://ui.shadcn.com/) の思想と似ているなと感じました。
npm パッケージとしてインストールするのではなく必要なコンポーネントのソースコードをプロジェクトにコピーします。

コンポーネントを自分のものとして扱うことができて自由にカスタマイズできます。

<!-- textlint-disable ja-technical-writing/ja-no-mixed-period -->

:::message alert
2025 年 11 月 27 日時点で、Vue Bits は jsrepo v2.x 系のみ対応しています。
jsrepo v3 では設定ファイルが `jsrepo.json` から `jsrepo.config.ts` へ変更されるなどの[破壊的変更](https://jsrepo.dev/docs/migrate)があり、Vue Bits はまだ対応していません。
コマンド実行時は `npx jsrepo@2.5.2` のようにバージョンを明示的に指定してください。
:::

<!-- textlint-enable ja-technical-writing/ja-no-mixed-period -->

### 前提条件

Vue Bits は 2025 年 11 月 27 日現在、Tailwind CSS に依存しています。
コンポーネントをインストールする前に、プロジェクトに Tailwind CSS をセットアップしてください。

<!-- textlint-disable ja-technical-writing/ja-no-mixed-period -->

:::details Tailwind CSS のセットアップ手順

```bash
ni -D tailwindcss @tailwindcss/vite
```

`vite.config.ts` に Tailwind プラグインを追加します。

```ts: vite.config.ts
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

CSS ファイルに Tailwind をインポートします。

```css: src/styles.css
@import "tailwindcss";
```

:::

<!-- textlint-enable ja-technical-writing/ja-no-mixed-period -->

### コマンド形式

```bash
npx jsrepo@2.5.2 add https://vue-bits.dev/ui/<Category>/<ComponentName>
```

カテゴリは以下の 4 つです。

- TextAnimations
- Animations
- Components
- Backgrounds

### 初回インストール時の手順

[Components/SpotlightCard](https://vue-bits.dev/components/spotlight-card) をインストールする例です。

![Vue Bits Spotlight Card](/images/introduce-vue-bits/spotlight-card.gif)

```bash
npx jsrepo@2.5.2 add https://vue-bits.dev/ui/Components/SpotlightCard
```

初回実行時は jsrepo の初期化を確認されるので、Yes を選択します。

```
◇  You don't have jsrepo initialized in your project. Do you want to continue?
│  Yes
```

インストール先のディレクトリを指定します(e.g.`./src/components`)。

```
◆  Where would you like to add Components?
```

インストールが完了すると、指定したディレクトリにコンポーネントファイルが作成されます。

```
src/
└── components/
    └── Components/
        └── SpotlightCard/
            └── SpotlightCard.vue
```

### 依存関係のあるコンポーネント

一部のコンポーネントは外部ライブラリを必要とします。
インストール時に依存関係のインストールを確認されるので、Yes を選択します。

```
◆  Would you like to install dependencies?
│  ● Yes / ○ No
```

Yes を選択すると、必要なパッケージが自動的にインストールされます。
例えば、以下のコンポーネントは外部ライブラリに依存しています。

- [Animations/GhostCursor](https://vue-bits.dev/animations/ghost-cursor) -> [Three.js](https://threejs.org/)
- [Animations/AnimatedContent](https://vue-bits.dev/animations/animated-content) -> [GSAP](https://gsap.com/)
- [Backgrounds/Iridescence](https://vue-bits.dev/backgrounds/iridescence) -> [OGL](https://oframe.github.io/ogl/)

### Full CLI Setup

上記の手順では、コンポーネントをインストールするたびに初期化確認が表示されます。
プロジェクト全体で jsrepo を設定しておくと、この確認を省略できます。

```bash
npx jsrepo@2.5.2 init https://vue-bits.dev/ui
```

コマンドを実行すると、デフォルトのインストールパスやフォーマッターの設定を確認されます。

```
◆  Please enter a default path to install the blocks
│  ./src/components
```

設定が完了すると `jsrepo.json` が作成されます。

以降は、コンポーネント名を直接指定してインストールできます。

```bash
npx jsrepo@2.5.2 add TextAnimations/ShinyText
```

また、コマンドを引数なしで実行すると、利用可能なコンポーネントの一覧から選択できます。

```bash
npx jsrepo@2.5.2 add
```

```
◆  Select which blocks to add.
│  ◻ Animations/AnimatedContent
│  ◻ Animations/BlobCursor
│  ◻ Animations/ClickSpark
│  ◻ Animations/CountUp
...
```

## まとめ

[Vue Bits](https://vue-bits.dev/) を紹介しました。

jsrepo v3 未対応だったり TypeScript + Tailwind CSS のみだったりと、まだまだ良くなる部分はたくさんありそうです。

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->

業務で使う機会は少ないかもしれませんが、「こういう表現ってどうやって実装するんだろう？」とソースコードを覗いてみるのも良いと思います。
個人サイトやポートフォリオサイトで活用できたり、面白いものを作るためのヒントを得られるでしょう。

<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->

## 参考リンク

- [Vue Bits 公式サイト](https://vue-bits.dev/)
- [GitHub リポジトリ](https://github.com/DavidHDev/vue-bits)

## 最後に

最後まで読んでいただきありがとうございました！
