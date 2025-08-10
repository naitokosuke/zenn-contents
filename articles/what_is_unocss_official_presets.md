---
title: "もっとくわしく UnoCSS ～公式プリセット篇～"
emoji: "🎴"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["UnoCSS", "CSS"]
publication_name: "comm_vue_nuxt"
published: true
---

## 🫡 はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。
今回は ~~CSS フレームワーク~~ **Atomic CSS エンジン**である UnoCSS について紹介したいと思います。

https://zenn.dev/comm_vue_nuxt/articles/what_is_unocss

こちらの記事では、UnoCSS の成り立ちや特徴を紹介しました
今回は UnoCSS の公式プリセットについて紹介したいと思います。

公式プリセットを活用することで UnoCSS をパワーを最大限に生かすことができます。
公式プリセット(UnoCSS の特徴)を知って、UnoCSS を好きになっていただきたいです。

また、前回記事で作者の Anthony Fu さんからコメントをいただきました！！！

[https://zenn.dev/comm_vue_nuxt/articles/what_is_unocss#comment-ba63c20e23e285](https://zenn.dev/comm_vue_nuxt/articles/what_is_unocss#comment-ba63c20e23e285)

![antfu さんが前回記事にコメントをくださりました](/images/what_is_unocss_official_presets/image3.png)

質問があれば思い切って質問してみてはいかがでしょうか 💁

## 📑 ドキュメント

:::message
この記事を書いている時点の UnoCSS バージョン: v0.62.1
https://github.com/unocss/unocss/releases/tag/v0.62.1
:::

https://unocss.dev/

https://github.com/unocss/unocss

## 🛝 公式 Playground

https://unocss.dev/play/

公式 Playground が提供されています。
こちらを活用して、UnoCSS を体験してみてください。

また、この記事内でサンプルコード付きの公式 Playground へのリンクを用意しています。
(e.g. [公式 Playground](https://unocss.dev/play/?version=0.62.1&html=DwEwlgbgUABDAOBaArLGBzATmEb0EMkAPRAFj0MQE9EAONAZwFsAuLHRAYwHsAbBxACY0TEG2wgufAQGY0vdOI49%2BZNAAtEAMwCuvXmk698DBgF4ARAG0AZAD5wEALosARt0wgApphi2HkC6Y3DoAdt6SCn72ji7sINEBziwAVjoMAC5gWjScXqEZPomxLGCFTAJ5BT4WUHZooJAwRibmFu6ePoiYXiAWdsAM8PihMIVEGWREvDBgXPiY7qGIvNzo3IjoZeo6rgMA9EMjB471cI0Qzcamlh3emIgeI%2Bhe-YPDo%2BOTpNOz84vcZardaICA6LwHI6hE6QM4wC5XVq3Dz3ahefTcADubyhYy8EymMzmGUxXiY3BScy0wXQkI%2BMIgcIRLRu7RRXSwXnyOI%2BeIJPyJiBJZIpc3wEG4nHwIG4dOOwH2pwajkRrLuXUx6jKrwGuK%2BhL%2BwO4AjCktMcuhCqV5xVLLa6oerl44J5Iz531%2Bc28EDAPGWoR0ExSDAtDKZtuu9vZDwAxAAGBNx2hx12ffEewXe32AxDqbhMLyuHqY0NW2HKpp25GdB7wHSYeC8HXvN36gWGtbG0Ha4OlxXlm2VyPV1HwMChADWqfdBrmRoEPoYOnwvEQmR04A2PG8faVZcZUCAA&config=JYWwDg9gTgLgBAbwFBzgEwKYDNgDsMDCEuOA5gDQpxhQYDOGMAgjDFMAEYCuMwWAnpVQ16jAJIBjYnSHVaDGAFVcESgF84WKBBBwA5FxUS6dPUiQYAHpFjpsAQy4AbeJhz4iJYKQAUyYfKMdABccADaVAGiSio%2BAJSyUQosbJw8fPzxiXLRktJ%2BkahwdBL2ThihAEwAdAAM2agSaLihegAWrGAhAPTd9CDVdG3detlqCVQAuupxSEA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4IgLgTghgdgzgMwPYQLYAkyoDYgFwJTZwCmAvkA) 👈)
ぜひ実際にコードを動かして UnoCSS を体験しながら記事を読んでください 👍

## 1️⃣ UnoCSS とは

![UnoCSS 公式ドキュメントトップページ のスクショ](/images/what_is_unocss_official_presets/image2.png)

> **Instant On-demand Atomic CSS Engine**

> Customizable · Powerful · Fast · Joyful

UnoCSS は、**オンデマンド**で動作する **Atomic CSS エンジン**です。
Tailwind CSS, Windi CSS の影響を受け、より**迅速**で**柔軟**なスタイル定義を可能にするために設計されました。

## 🛠️ プリセット

プリセットは UnoCSS の心臓です。

UnoCSS のプリセットはあらかじめ定義された一連の**スタイルやルールのセット**です。
プリセットを使うことで共通のスタイルや機能を手軽にプロジェクトに追加でき、設定する手間が省けます。

プリセットは公式で提供されているものもありますし、自分でカスタムプリセットを作成することも可能です。
コミュニティプリセットもあります。

プリセットを利用するには `uno.config.ts` に記述します。

```ts:uno.config.ts
import { defineConfig, presetAttributify, presetUno } from "unocss";

export default defineConfig({
  presets: [
    presetAttributify({ /* プリセットのオプション */}),
    presetUno(),
    // ...
  ],
});
```

独自のプリセットを定義することもできます。

```ts:my-preset.ts
import { Preset } from "unocss";

export const myPreset: Preset = {
  name: "my-preset",
  rules: [
    [/^m-([.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^p-([.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
  ],
  // ...
};
```

```ts:uno.config.ts
import { defineConfig } from "unocss";
import { myPreset } from "./my-preset";

export default defineConfig({
  presets: [
    myPreset,
  ],
});
```

## 📌 公式プリセット

https://unocss.dev/presets/#presets

2024 年 8 月時点では、公式プリセットとして以下が提供されています。

| プリセット名                                                           | 説明                                                                    |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [`@unocss/preset-uno`](https://unocss.dev/presets/uno)                 | デフォルトプリセット                                                    |
| [`@unocss/preset-mini`](https://unocss.dev/presets/mini)               | 最小かつ必要不可欠なルールとバリアント                                  |
| [`@unocss/preset-wind`](https://unocss.dev/presets/wind)               | Tailwind CSS, Windi CSS のコンパクトなプリセット                        |
| [`@unocss/preset-attributify`](https://unocss.dev/presets/attributify) | 属性化モード                                                            |
| [`@unocss/preset-tagify`](https://unocss.dev/presets/tagify)           | タグ化モード                                                            |
| [`@unocss/preset-icons`](https://unocss.dev/presets/icons)             | 純粋な CSS によるアイコン Powered by [Iconify](https://iconify.design/) |
| [`@unocss/preset-web-fonts`](https://unocss.dev/presets/web-fonts)     | Web フォント                                                            |
| [`@unocss/preset-typography`](https://unocss.dev/presets/typography)   | タイポグラフィプリセット                                                |
| [`@unocss/preset-rem-to-px`](https://unocss.dev/presets/rem-to-px)     | `rem` を `px` に変換                                                    |

![公式 Playground で公式プリセットを利用したグリッドレイアウトのスクショ](/images/what_is_unocss_official_presets/image4.png)

[公式 Playground](https://unocss.dev/play/?version=0.62.1&html=DwEwlgbgUABDAOBaArLGBzATmEb0EMkAPRAFj0MQE9EAONAZwFsAuLHRAYwHsAbBxACY0TEG2wgufAQGY0vdOI49%2BZNAAtEAMwCuvXmk698DBgF4ARAG0AZAD5wEALosARt0wgApphi2HkC6Y3DoAdt6SCn72ji7sINEBziwAVjoMAC5gWjScXqEZPomxLGCFTAJ5BT4WUHZooJAwRibmFu6ePoiYXiAWdsAM8PihMIVEGWREvDBgXPiY7qGIvNzo3IjoZeo6rgMA9EMjB471cI0Qzcamlh3emIgeI%2Bhe-YPDo%2BOTpNOz84vcZardaICA6LwHI6hE6QM4wC5XVq3Dz3ahefTcADubyhYy8EymMzmGUxXiY3BScy0wXQkI%2BMIgcIRLRu7RRXSwXnyOI%2BeIJPyJiBJZIpc3wEG4nHwIG4dOOwH2pwajkRrLuXUx6jKrwGuK%2BhL%2BwO4AjCktMcuhCqV5xVLLa6oerl44J5Iz531%2Bc28EDAPGWoR0ExSDAtDKZtuu9vZDwAxAAGBNx2hx12ffEewXe32AxDqbhMLyuHqY0NW2HKpp25GdB7wHSYeC8HXvN36gWGtbG0Ha4OlxXlm2VyPV1HwMChADWqfdBrmRoEPoYOnwvEQmR04A2PG8faVZcZUCAA&config=JYWwDg9gTgLgBAbwFBzgEwKYDNgDsMDCEuOA5gDQpxhQYDOGMAgjDFMAEYCuMwWAnpVQ16jAJIBjYnSHVaDGAFVcESgF84WKBBBwA5FxUS6dPUiQYAHpFjpsAQy4AbeJhz4iJYKQAUyYfKMdABccADaVAGiSio%2BAJSyUQosbJw8fPzxiXLRktJ%2BkahwdBL2ThihAEwAdAAM2agSaLihegAWrGAhAPTd9CDVdG3detlqCVQAuupxSEA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4IgLgTghgdgzgMwPYQLYAkyoDYgFwJTZwCmAvkA)

<br />

公式プリセットを順番に見ていきましょう。

### ☝️ preset-uno

UnoCSS のデフォルトプリセットです。
`@unocss/preset-wind`, `@unocss/prest-mini` を継承しています。

```ts:uno.config.ts
import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
  ],
});
```

このプリセットは、

- Tailwind CSS
- Windi CSS
- Bootstrap
- Tachyons

などの人気ユーティリティファーストフレームワークの共通のスーパーセットを提供しようとしています。

```css
/* Tachyons */
.ma4 {
  margin: 1rem;
}

/* Tailwind CSS */
.ml-3 {
  margin-left: 0.75rem;
}

/* Bootstrap */
.ms-2 {
  margin-inline-start: 0.5rem;
}

/* Windi CSS */
.mt-10px {
  margin-top: 10px;
}
```

ユーティリティの詳細は各フレームワークの公式ドキュメントを参照するのがよいでしょう。

https://tailwindcss.com/

https://windicss.org/

<br />

:::message
UnoCSS では `presets` オプションを明記しない限り、デフォルトプリセットが適用されます。
無効にするには空の配列を指定します。

```ts:uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  presets: [],
});
```

:::

### 💨 preset-wind

`@unocss/preset-wind` は、UnoCSS で Tailwind CSS, Windi CSS のユーティリティを利用できるプリセットです。

```ts:uno.config.ts
import { defineConfig, presetWind } from "unocss";

export default defineConfig({
  presets: [
    presetWind(),
  ],
});
```

:::message alert
このプリセットの第一目標は Tailwind CSS, Windi CSS との互換性の提供です。
ただし、完全な互換性までは保証されていません。
各ユーティリティの詳しい使い方は各フレームワークの公式ドキュメントを参照するのがよいです。
:::

### 🐤 preset-mini

UnoCSS のためのベーシックなプリセットです。

```ts:uno.config.ts
import { defineConfig, presetMini } from "unocss";

export default defineConfig({
  presets: [
    presetMini(),
  ],
});
```

`@unocss/prest-mini` は `@unocss/preset-wind` のサブセットです。
必要不可欠なユーティリティは含まれていますが、Tailwind CSS で導入された "opinionated" なものや複雑なものは除外されています。
(`container`, `animation`, `gradient`, など)

Tailwind CSS や Windi CSS のおなじみのユーティリティをベースにして、独自のカスタムプリセットを作成するための良い出発点になるでしょう。

#### 🌚 ダークモード

このプリセットでは、`dark:` バリアントを使用したクラスベースのダークモードを生成します。

```html
<div class="dark:bg-red:10" />
```

からは、

```css
.dark .dark\:bg-red\:10 {
  background-color: rgb(248 113 113 / 0.1);
}
```

が生成されます。

メディアクエリベースのダークモードを使用するのであれば、`@dark:` バリアントを使用します。

```html
<div class="@dark:bg-red:10" />
```

```css
@media (prefers-color-scheme: dark) {
  .\@dark\:bg-red\:10 {
    background-color: rgb(248 113 113 / 0.1);
  }
}
```

またはプリセットオプションで設定できます。

```ts:uno.config.ts
import { defineConfig, presetMini } from "unocss";

export default defineConfig({
  presets: [
    presetMini({
      dark: "media",
    }),
  ],
});
```

#### 🗄️ CSS @layer

[CSS のレイヤー](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) `@layer` は、`layer-xx:` バリアントでサポートされています。

```html
<div class="layer-foo:p4" />
<div class="layer-bar:m4" />
```

からは、

```css
@layer foo {
  .layer-foo\:p4 {
    padding: 1rem;
  }
}
@layer bar {
  .layer-bar\:m4 {
    margin: 1rem;
  }
}
```

が生成されます。

### 🍱 preset-icons

以下の規約に従うことで、純粋な CSS でアイコンを使用できます。

- `<prefix><collection>-<icon>`
- `<prefix><collection>:<icon>`

[公式 Playground](https://unocss.dev/play/?version=0.62.1&html=DwEwlgbgBAxgNgQwM5ILwCIBmcCmAPKAcwQAcBaARgAYoArAVyQBcxMBPMmHAOyZwCcoYPgFsknHn0Eiw3MgAsySGPxw90APgBQUKKEixEKDGDIlFCbjHkB7fkrAiSuMk3mzNwAPTgI23frQ8Mho6KYi4GQIiPwiUHx4TGR2loQ4ZAAsVFSePpD%2Ber6GISZkcDaENuIQ9Djx%2BEkAzHhwub4FwABG9ExMNtzFxmGcCPyd-Ur0AyCjANYAXKYwo%2BNyIjb9ud29-R2%2BOrqDoaZMAO4467SmhPyy3LKEZJgIXGSnwopIMnAPZDhsOCQUFsEAEi1c50upmer3eblcOFG4hsmDItBsbHQBw03naWlx%2BSAA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmANHGFKgM6owCSAxgVWRdbQKpYRwC%2Bc6KBBBwARAFduDKlVEBuAFALUAD0iwUGAIbiANvDSYc%2BQsCIAKBArjlKNGFQBccANrWbt9jC4RzAShJ3GzZ7RmZLII8qBi1dVEcAZgA6AAZAjw8GZCxnUQALGBgwJwB6EuoQJKo8ktF0j14A9wBdQMbFIA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4XyA)

```html
<div class="i-ph-anchor-simple-thin"></div>
<div class="i-mdi-alarm text-orange-400"></div>
<div class="i-logos-vue text-3xl"></div>
<button class="i-carbon-sun dark:i-carbon-moon"></button>
<div
  class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy"
></div>
```

![公式 Playground での preset-icons の使用例](/images/what_is_unocss_official_presets/image1.png)

#### 🧑‍💻 インストール

[Iconify](https://iconify.design/) はアイコンのデータソースとして用います。
アイコンセットを使用するには、`@iconify-json/*` パターンに従って、
該当するアイコンセットを `devDependencies` にインストールする必要があります。
(例: `@iconify-json/mdi`, `@iconify-json/tabler`)

アイコンセットとパッケージ名は以下で確認できます。

https://github.com/iconify/icon-sets/blob/master/collections.md

:::message
`@iconify-json` を一括でインストールすることもできます。(約 130 MB)

```bash
pnpm add -D @iconify/json
```

:::

利用可能な全てのコレクションは [Icônes](https://icones.js.org/) や [Iconify](https://icon-sets.iconify.design/) で参照できます。

<br />

**2024.08.19 追記**

コメントで `autoInstall` オプションについて教えていただきました。

```ts:uno.config.ts
import { defineConfig, presetIcons } from "unocss";

export default defineConfig({
  presets: [
    presetIcons({
      autoInstall: true,
    }),
  ],
});
```

とすることで、必要なアイコンセットを UnoCSS が自動的にインストールしてくれます。
手動でパッケージをインストールする必要がなくなり、開発がスムーズに進められるようになります。

:::message alert
このオプションは Node.js 環境でのみ動作します。
ブラウザ環境ではこのオプションは無視されます。
:::

#### ➕ 追加プロパティ

アイコンのデフォルトの動作を制御するために、追加の CSS プロパティを指定できます。

```ts:uno.config.ts
import { defineConfig, presetIcons } from "unocss";

export default defineConfig({
  presets: [
    presetIcons({
      extraProperties: {
        "display": "inline-block",
        "vertical-align": "middle",
        // ...
      },
    }),
  ],
});
```

#### ✍️ モードの上書き

[公式 Playground](https://unocss.dev/play/?version=0.62.1&html=DwEwlgbgBAxgNgQwM5ILwCIDuBaAZgVzjilzgFMAPKMAFzIFslsYyA7OgJygCt8kawuAJ7M2nKAHMEAB2wVsAZgAMUOhRrYALBWL0wrbAAtsSGBzJt0APgBQUKKEixEKDGGwRTAexBlsYGC9WJAAuXDBybBohaT84MAlDDWlWaXprYAB6cAhbe0doeGQ0dHdPQN9-QOCwiL9o2Ox4xOTU%2BgB%2BemQAa1VKDXMQRSUlDOzIWyycqyA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmANHGFKgM6owCSAxgVWRdbQKpYRwC%2Bc6KBBBwARAFduDKlVEBuAFALUAD0iwUGAIbiANvDSYc%2BQsCIAKBArjlKNGFQBccANrWbt9jC4RzAShJ3GzZ7RmZLII8qBi1dVGcAZgA6AAZAjw8GZCxnUQALGBgwJwB6EuoQJKo8ktF0j14A9wBdQMbFIA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4XyA)

デフォルトではこのプリセットはアイコンの特性に基づいて、それぞれのアイコンに対してレンダリングモードを自動的に選択します。
ただし、場合によっては各アイコンに対してレンダリングモードを明示的に設定したいこともあるでしょう。

- `?bg` は `background-image` を意味し、アイコンを背景画像としてレンダリングします。
- `?mask` は `mask` を意味し、アイコンをマスク画像としてレンダリングします。

```html
<div
  class="w-full flex items-center justify-center gap-x-30 text-4xl min-h-screen"
>
  <div class="i-vscode-icons:file-type-light-pnpm"></div>
  <div class="i-vscode-icons:file-type-light-pnpm?mask text-red-300"></div>
</div>
```

#### ⚙️ アイコンコレクションとリゾルバの設定

##### 🌐 ブラウザ

`iconify` のコレクションをロードするには、`@iconify/json` ではなく、`@iconify-json/[the-collection-you-want]` を使うべきです。
`json` ファイルは巨大だからです。

##### 🎀 バンドラー

バンドラーを使用するのであれば、コレクションを動的インポートとして提供できます。
コレクションは非同期チャンクとしてバンドルされ、必要なときに読み込まれます。

```ts:uno.config.ts
import { defineConfig, presetIcons } from "unocss";
import presetIcons from "@unocss/preset-icons/browser";

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        carbon: () => import("@iconify-json/carbon/icons.json").then(i => i.default),
        mdi: () => import("@iconify-json/mdi/icons.json").then(i => i.default),
        logos: () => import("@iconify-json/logos/icons.json").then(i => i.default),
      },
    }),
  ],
});
```

##### 🚛 CDN

CDN から取得する場合は、`cdn` オプションを指定できます。
CDN プロバイダーとしては、[`esm.sh`](https://esm.sh/) が推奨されています。

```ts:uno.config.ts
import { defineConfig, presetIcons } from "unocss";

export default defineConfig({
  presets: [
    presetIcons({
      cdn: "https://esm.sh/",
    }),
  ],
});
```

##### 🧰 カスタムコレクション

[公式 Playground](https://unocss.dev/play/?version=0.62.1&html=DwEwlgbgBAxgNgQwM5ILwCIBmcCmAPKAcwQAcBaARgAYoArAVyQBcxMBPMmHAOyZwCcoYPgFsknHn0Eiw3MgAsySGPxw90APgBQUKMCQkE3WIhQYwnRkwD2IgFwww-eDih88TMgFY8cKCMoqTWAAegMjbVDwCG0gA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmANHGFKgM6owCSAxgVWRdbQKpYRwC%2Bc6KBBBwARAFduDKlVEBuAFALUAD0iwUGAIbiANvDSYc%2BQsCIAKBArjlKNGFQBccANrWbt9jC4RzAShJ3GzZ7RmZLII8mXV1UBhhgZmcrD1S4BnEqGGFkyLT04CgGWOdRAB4qADciOErgVAB3ACEIFQBeAHIABjgegEYAJn6hjoA%2BMoZC4tR09o6ANi6O9IBPTsXlqE6AViWBYBjOokpULDGygHpJotjxi6qiUdFA-JteF9eGLSgAIwJnfxwNqjOCgdQwcyiAACwCYWGA6BWAFoAFZUAhXb5-LAXWHMAB0aIIoj8%2BJgAAtTuZgECQcB8YYdPoAnk%2BJFeH53ABdBQcxRAA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4XyA)

[`CustomIconLoader`](https://github.com/iconify/iconify/blob/main/packages/utils/src/loader/types.ts#L24) や [`InlineCollection`](https://github.com/iconify/iconify/blob/main/packages/utils/src/loader/types.ts#L104) を利用して、独自のカスタムコレクションを提供することもできます。

```ts:uno.config.ts
import { defineConfig, presetIcons } from "unocss";

export default defineConfig({
  presetIcons({
    collections: {
      custom: {
        circle: "<svg viewBox='0 0 120 120'><circle cx='60' cy='60' r='50'></circle></svg>",
        /* ... */
      },
      carbon: () => import("@iconify-json/carbon/icons.json").then(i => i.default as any),
      /* ... */
    },
  });
});
```

##### 🌳 Node.js

`Node.js` ではインストール済みのアイコンデータセットを自動的に探します。
`iconify` コレクションを登録する必要はありません。

### 🍀 preset-attributify

このプリセットで属性化モードを利用できます。
ユーティリティをクラスではなく HTML 属性を用いることが可能になります。

```ts:uno.config.ts
import { defineConfig, presetAttributify } from "unocss";

export default defineConfig({
  presets: [
    presetAttributify({ /* プリセットオプション */ }),
  ],
});
```

[公式 Playground](https://unocss.dev/play/?version=0.62.1&html=DwIwrgLhD2B2BQACRIDmBeARCANmApgLQAsADKYgBbQBu%2BATgFy4GECs5iAJgIb0DWzPEQ4VeAxtTpMWRAGzlMSRBHwAPCFgDOAW0QB3SgEtVS5ADM4mzDrjREOI6koQziAA5YAnoQBMiNRI3EGh6LgYsf3poMFhwrhRhP0V4AD5lACFIGARgAHpwKDh00HpEPJLCnJRQ8PosAD9EenwuTEQdP0RUgDUeYRx8LS1EAEEoeiNC-Hyq4vhgLiMaGrCGDq7o2PiVdQhCVX6STl7%2BgkHhsYmpyBm8pZp0oA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmANHGFKgM6owCCMMUwARgK4zDoCeZF1tAKpYIcAL5x0UCCDgAiNiIDGVKnIDcAKE2oAHpFgoMAQzYAbeGkw58hYEQAUCTXHKUaMKgC44AbReubgIwwhAOAJQkAa78HgxMrBxc3BFRrgC6UWLhWkA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4XyA)

ユーティリティクラスを用いてボタンを作成しようとすると、以下のようになることがあります。

```html
<button
  class="bg-blue-400 hover:bg-blue-500 text-sm text-white font-mono font-light py-2 px-4 rounded border-2 border-blue-200 dark:bg-blue-500 dark:hover:bg-blue-600"
>
  Button
</button>
```

長くなればなるほど可読性も低下し、メンテナンスも困難になります。
属性化モードを利用すれば、

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
`text-sm` と `text-white` のように重複したプレフィックスを除いてグループ化(`text="sm white"`)できます。

また、`flex`, `grid`, `border` のようにプレフィックスと全く同じ名前のユーティリティについては `~` が使えます。

```html
<button class="border border-red">Button</button>
```

```html
<button border="~ red">Button</button>
```

値のない属性も使用できます。

```html
<div class="m-2 rounded text-teal-400">Valueless Attribute</div>
```

```html
<div m-2 rounded text-teal-400>Valueless Attribute</div>
```

:::message alert
属性化モードの使用にあたって注意点がいくつかあります。

- クラス名と HTML 属性名の衝突
- JSX での属性名の扱い

<br />

1. クラス名と HTML 属性名の衝突

https://unocss.dev/presets/attributify#properties-conflicts

既存の属性名と衝突するだけでなく、今後追加される HTML の属性と衝突する恐れもあります。
プレフィックスの使用で回避できます。

```ts:uno.config.ts
import { defineConfig, presetAttributify } from "unocss";

export default defineConfig({
  presets: [
    // ...
    presetAttributify({
      prefix: "uno-",
      prefixedOnly: true,
    }),
    // ...
  ],
});
```

<br />

2. JSX での属性名の扱い

JSX では属性の存在をブール値 `true` として扱うため、`<div foo>` と記述すると、自動的に `<div foo={true}>` に変換されることがあります。
この変換により、UnoCSS が生成する CSS が対応する HTML 要素に適用されなくなる可能性があります。
これは UnoCSS が属性の存在だけでなく、属性の値もチェックするためです。

[@unocss/transformer-attributify-jsx](https://unocss.dev/transformers/attributify-jsx) の利用して回避できます。

```ts:uno.config.ts
import { defineConfig, presetAttributify, transformerAttributifyJsx } from "unocss";

export default defineConfig({
  // ...
  presets: [
    // ...
    presetAttributify(),
  ],
  transformers: [
    transformerAttributifyJsx(),
  ],
});
```

:::

### 🏷️ preset-tagify

このプリセットでタグ化モードを利用できます。
このプリセットは特定の要素に対して単一の UnoCSS ルールを適用する場合に便利です。

```ts:uno.config.ts
import { defineConfig, presetTagify } from "unocss";

export default defineConfig({
  presets: [
    presetTagify({ /* プリセットオプション */ }),
  ],
});
```

タグ化モードを使えば、

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

と書くことができます。

プレフィックスを付与することもできます。

```ts:uno.config.ts
export default defineConfig({
  presets: [
    presetTagify({
      prefix: "uno-",
    }),
  ],
});
```

### 🔠 preset-web-fonts

`@unocss/preset-web-fonts` プリセットを使うことで、フォント名を指定するだけで簡単に Web フォントを利用できます。

```ts:config.uno.ts
import { defineConfig, presetWebFonts, presetUno } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Roboto",
        mono: ["Fira Code", "Fira Mono:400,700"],
      },
    }),
  ],
})
```

2024 年 8 月現在、フォントのプロバイダは

- `google`: [Google Fonts](https://fonts.google.com/)
- `bunny`: [Bunny Fonts](https://fonts.bunny.net/)
- `fontshare`: [Fontshare](https://www.fontshare.com/)

のみです。

また、`none` を指定することで、フォントをシステムフォントとして扱うことができます。

### 🖌️ preset-typography

`@unocss/preset-typography` プリセットにより、標準の HTML 要素にタイポグラフィスタイルを簡単に適用するための「散文("prose")」クラスが提供されています。
これらの「散文」を使用することで、例えば段落や見出し、リスト、リンクなどの要素に対して、統一されたタイポグラフィのスタイルを適用できます。

```ts:uno.config.ts
import { defineConfig, presetUno, presetTypography } from "unocss";

export default defineConfig({
  presets: [
    presetUno(), // 必須
    presetTypography(),
  ],
});
```

```html
<article text-base prose prose-truegray xl="text-xl">
  {{ markdown }}
  <p class="not-prose">Some text</p>
</article>
```

要素に `not-prose` を適用することでタイポグラフィスタイルを取り消すことができます。

:::message alert
`not-prose` はクラスとしてのみ使用でき、属性としては使用できません。
これは `not` が CSS セレクタでのみ使用でき、UnoCSS ではスキャンできないからです。
:::

<br />

マークダウンの例

[公式 Playground](https://unocss.dev/play/?version=0.62.1&html=DwEwlgbgBAxgNgQwM5ILwCIBmcCmAPKbfAWhgHs4oBzBAB2IE9iAmAVigCsBXJAFzExMYOAHa8cAJyhhxAWySlR4qbLAjiAC2JIYEnKPQA%2BAFBQooSLEQoMshBIDWIMgHcRR02fMaAjIcD9DIAlDIATDIDXDMAA9L4mXua0hoBjDIC1DICdDMHJacAIUBp6mBgAxEaAVwyAzwyA9QyRCImp6bWR8Z5mwPGAzQyAPwyAkwwAXObkIDiG5CJIFDgAdHBkVAAU6AASOHBTUADqZBJwIACE6ACUANyR-YMNMV4tVsho6CJkvMR2js5uRgAGd7xvUIBJDID%2B8oAxBkAFgyAQAZgCchmQRmNJtM5otlmQ1hstrtDscyANDOZiFAUkFQoAZBkAyvqAfQZAJEMgCsGQAiDIBAf7Onki4Ag5ws0Hg11s9icrhEUCePLcjCWUxcHliwGiQTCkWiTTiNTSGWCWRyeUKJQqVUVdUyEUaEraXV64Mxg2Go1wsNmCxFSPWmx2%2ByOEQh5n152atCuNlu90e3Je7kMH3u33%2BwLBEItMKmNoRKwdqOdGKxOLxBJJFJp9I9jIizJMTMgJiAA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmANHGFKgM6owCqWEZF1tAKgJ6RFQCGYACw5wAvnHRQIIOACIArowDGVKjIDcAKA2oAHpFgoMvOQBt4aTDnyFgRABQINccpRowqALjgBtJ85es9Ix2AJRkAPThcICj%2BoAQGX7OLG6c3HyCHA4J-jQmqIow0AByvCCoXjIgvFAA1sgQAO5YMmRa-v6RcMpUAKI6MKhYyHCA9gxwuADK43CA3QyANwyA9QyA-QyASQyAtQyAPwyAgAwTU4DF2oAAUYBrDIC3DIDDDPPLgCQKgBYMgOoMgGYMgIDGgCYMgFUMh4AdDIDlDPOAEwxZzi6vX6gy8jjabRkiggaBkYIBEOhJmg5QAxAAOABCAFZcAAxABszQRzhEJBJsl4HgEEAAbqgoHDEBTARBkVA0XiACwAZjx2O6xIh-jJFJkVNpwCowH6yCZ4OF-iRKNkqIAjFzMeiAIJE8mK0T6iGitoiMJ%2BAC65LNaiAA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4XyA)

![公式 Playground で preset-typography を使用したスクショ](/images/what_is_unocss_official_presets/image5.png)

<br />

```ts:uno.config.ts
import { defineConfig, presetUno, presetTypography } from "unocss";

export default defineConfig({
  presets: [
    presetUno(), // 必須
    presetTypography({
      selectorName: "markdown",

      // cssExtend は CSS セレクタをキー、CSS 宣言ブロックを値として持つオブジェクト
      cssExtend: {
        "code": {
          color: "#8B5CF6",
        },
        "a:hover": {
          color: "#F43F5E",
        },
        "a:visited": {
          color: "#14B8A6",
        },
      },
    }),
  ],
});
```

```html
<div class="flex flex-col gap-y-25 justify-center items-center min-h-screen">
  <div class="markdown">
    <h1>タイトル</h1>
    <p>テキストテキスト<a href="#">リンク</a>テキストテキスト</p>
    <p>コード: <code>console.log("Hello World!");</code></p>
    <p class="not-markdown">
      `not` を使うと、<code>console.log("Hello World!");</code> <-
      スタイルが当たらない！
    </p>
  </div>
  <div class="markdown markdown-yellow">
    <h1>タイトル</h1>
    <p>テキストテキスト<a href="#">リンク</a>テキストテキスト</p>
    <p>コード: <code>console.log("Hello World!");</code></p>
    <p class="not-markdown">
      `not` を使うと、<code>console.log("Hello World!");</code> <-
      スタイルが当たらない！
    </p>
  </div>
</div>
```

### 💇 preset-rem-to-px

`@unocss/preset-rem-to-px` プリセットを用いることで `rem` を `px` へ変換できます。
(デフォルトでは `1rem = 16px`)

```ts:uno.config.ts
import { defineConfig } from "unocss";
import presetRemToPx from "@unocss/preset-rem-to-px";

export default defineConfig({
  rules:[
    [/^m-([.\d]+)$/, ([, num]) => ({ margin: `${num}rem` })],
  ],
  presets: [presetRemToPx()],
});
```

```html
<div class="m-2">rem to px</div>
```

からは

```css
.m-2 {
  margin: 2rem;
}
```

が生成されますが、`@unocss/preset-rem-to-px` を使えば、

```css
.m-2 {
  margin: 32px;
}
```

となります。

## 💭 まとめ

UnoCSS はフレームワークではなくエンジンであると謳っていますが、強力な公式プリセットがたくさん提供されています。
公式プリセットを使うことで、すぐに開発を開始できるだけでなく、UnoCSS のパワーをもっと引き出すことができます。

| プリセット名                                                           | 説明                                                                    |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [`@unocss/preset-uno`](https://unocss.dev/presets/uno)                 | デフォルトプリセット                                                    |
| [`@unocss/preset-mini`](https://unocss.dev/presets/mini)               | 最小かつ必要不可欠なルールとバリアント                                  |
| [`@unocss/preset-wind`](https://unocss.dev/presets/wind)               | Tailwind CSS, Windi CSS のコンパクトなプリセット                        |
| [`@unocss/preset-attributify`](https://unocss.dev/presets/attributify) | 属性化モード                                                            |
| [`@unocss/preset-tagify`](https://unocss.dev/presets/tagify)           | タグ化モード                                                            |
| [`@unocss/preset-icons`](https://unocss.dev/presets/icons)             | 純粋な CSS によるアイコン Powered by [Iconify](https://iconify.design/) |
| [`@unocss/preset-web-fonts`](https://unocss.dev/presets/web-fonts)     | Web フォント                                                            |
| [`@unocss/preset-typography`](https://unocss.dev/presets/typography)   | タイポグラフィプリセット                                                |
| [`@unocss/preset-rem-to-px`](https://unocss.dev/presets/rem-to-px)     | `rem` を `px` に変換                                                    |

[`@unocss/preset-wind`](https://unocss.dev/presets/wind) は、Tailwind CSS や Windi CSS に慣れ親しんでいるユーザーにとってうってつけのプリセットです。
Tailwind CSS の魅力をそのままに、軽量でシンプルな使い勝手を提供します。
学習コストも小さく、今までの知識を活かしながらすぐに UnoCSS を使い始めることができるでしょう。

ぼくの推し公式プリセットは [`@unocss/preset-attributify`](https://unocss.dev/presets/attributify) です 😎
[`@unocss/preset-attributify`](https://unocss.dev/presets/attributify) を用いれば、HTML 属性としてスタイルを指定できます。
コードがより直感的で読みやすくなるのが個人的に好きです。

## 💚 最後に

この記事の執筆にあたって [GANGAN さん](https://x.com/gangan_nikki)にレビューしていただき、たくさんのアドバイスをもらいました。
本当にありがとうございます。

https://github.com/shinGangan/comm_vue_nuxt/issues/62

<br />

今回の記事が UnoCSS を利用する際の参考になれば幸いです。
UnoCSS の魅力をもっと知りたい方は公式サイトやコミュニティリソースを活用して、積極的に情報を収集してみてください。

公式プリセットだけでなくコミュニティが作成したプリセットも多く存在します。

https://unocss.dev/presets/community

これらのプリセットは特定のニーズやユースケースに特化していることが多いです。
コミュニティプリセットを見ることでいろんなアイデアをゲットできるだけでなく、より深く UnoCSS を知ることができるでしょう。

今後 UnoCSS ユーザがもっと増えて、日本語情報が増えることを強く願っています。
一緒にコミュニティを盛り上げていきましょう 💪

最後まで読んでいただきありがとうございました！
