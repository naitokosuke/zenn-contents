---
title: "UnoCSS の公式プリセットを見る"
emoji: "🎴"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["UnoCSS", "CSS", "CSSinJS"]
publication_name: "comm_vue_nuxt"
published: false
---

## はじめに

ナイトウ([@engineer_naito](https://twitter.com/engineer_naito))と申します。
今回は ~~CSS フレームワーク~~ **Atomic CSS エンジン**である UnoCSS について紹介したいと思います。

https://zenn.dev/comm_vue_nuxt/articles/what_is_unocss

こちらの記事では、UnoCSS の成り立ちや経緯を紹介し、UnoCSS の特徴について紹介しました。
今回は UnoCSS の公式プリセットについて紹介したいと思います。

公式プリセットを活用することで UnoCSS をパワーを最大限に生かすことができます。
公式プリセット(UnoCSS の特徴)を知って、UnoCSS を好きになっていただきたいです。

## ドキュメント

:::message
この記事を書いている時点の UnoCSS バージョン: v0.61.6
https://github.com/unocss/unocss/releases/tag/v0.61.6
:::

https://unocss.dev/

https://github.com/unocss/unocss

## 公式 Playground

https://unocss.dev/play/

公式 Playground が提供されています。
こちらを活用して、UnoCSS を体験してみてください。

また、この記事内でサンプルコード付きの公式 Playground へのリンクを用意しています。
ぜひ実際にコードを動かしながら記事を読んでください。

## プリセット

プリセットは UnoCSS の心臓です。

UnoCSS のプリセットはあらかじめ定義された一連のスタイルやルールのセットです。
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

## 公式プリセット

https://unocss.dev/presets/#presets

2024 年 8 月時点では、公式プリセットとして以下が提供されています。

| プリセット名 | 説明 |
|--------------|------|
| [`@unocss/preset-uno`](https://unocss.dev/presets/uno) | デフォルトプリセット |
| [`@unocss/preset-mini`](https://unocss.dev/presets/mini) | 最小かつ必要不可欠なルールとバリアント |
| [`@unocss/preset-wind`](https://unocss.dev/presets/wind) | Tailwind CSS, Windi CSS のコンパクトなプリセット |
| [`@unocss/preset-attributify`](https://unocss.dev/presets/attributify) | 属性化モード |
| [`@unocss/preset-tagify`](https://unocss.dev/presets/tagify) | タグ化モード |
| [`@unocss/preset-icons`](https://unocss.dev/presets/icons) | 純粋な CSS によるアイコン Powered by [Iconify](https://iconify.design/) |
| [`@unocss/preset-web-fonts`](https://unocss.dev/presets/web-fonts) | Web フォント |
| [`@unocss/preset-typography`](https://unocss.dev/presets/typography) | タイポグラフィプリセット |
| [`@unocss/preset-rem-to-px`](https://unocss.dev/presets/rem-to-px) | `rem` を `px` に変換 |


### preset-uno

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
などの人気のあるユーティリティファーストフレームワークの共通のスーパーセットを提供しようとしています。
つまり、以下は全て有効です。

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

Tailwind CSS, Windi CSS と互換があるので、ユーティリティの詳細はそれぞれの公式ドキュメントを参照できます。

https://tailwindcss.com/

https://windicss.org/


### preset-icons

以下の規約に従うことで、純粋な CSS でアイコンを使用できます。

- `<prefix><collection>-<icon>`
- `<prefix><collection>:<icon>`

[公式 Playground](https://unocss.dev/play/?version=0.62.1&html=DwEwlgbgBAxgNgQwM5ILwCIBmcCmAPKAcwQAcBaARgAYoArAVyQBcxMBPMmHAOyZwCcoYPgFsknHn0Eiw3MgAsySGPxw90APgBQUKKEixEKDGDIlFCbjHkB7fkrAiSuMk3mzNwAPTgI23frQ8Mho6KYi4GQIiPwiUHx4TGR2loQ4ZAAsVFSePpD%2Ber6GISZkcDaENuIQ9Djx%2BEkAzHhwub4FwABG9ExMNtzFxmGcCPyd-Ur0AyCjANYAXKYwo%2BNyIjb9ud29-R2%2BOrqDoaZMAO4467SmhPyy3LKEZJgIXGSnwopIMnAPZDhsOCQUFsEAEi1c50upmer3eblcOFG4hsmDItBsbHQBw03naWlx%2BSAA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmANHGFKgM6owCSAxgVWRdbQKpYRwC%2Bc6KBBBwARAFduDKlVEBuAFALUAD0iwUGAIbiANvDSYc%2BQsCIAKBArjlKNGFQBccANrWbt9jC4RzAShJ3GzZ7RmZLII8qBi1dVEcAZgA6AAZAjw8GZCxnUQALGBgwJwB6EuoQJKo8ktF0j14A9wBdQMbFIA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4XyA)

```html
  <div class="i-ph-anchor-simple-thin"></div>
  <div class="i-mdi-alarm text-orange-400"></div>
  <div class="i-logos-vue text-3xl"></div>
  <button class="i-carbon-sun dark:i-carbon-moon"></button>
  <div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy"></div>
```

![公式 Playground での preset-icons の使用例](/images/what_is_unocss_official_presets/image1.png)

#### インストール

[Iconify](https://iconify.design/) はアイコンのデータソースとして用います。
アイコンセットを使用するには、`@iconify-json/*` パターンに従って、
該当するアイコンセットを `devDependencies` にインストールする必要があります。
(例: `@iconify-json/mdi`, `@iconify-json/tabler`)

:::message
`@iconify-json` を一括でインストールすることもできます。(約 130 MB)

```bash
pnpm add -D @iconify/json
```
:::

利用可能な全てのコレクションは [Icônes](https://icones.js.org/) や [Iconify](https://iconify.design/) で参照することができます。

#### 追加プロパティ

アイコンのデフォルトの動作を制御するために、追加のCSSプロパティを指定することができます。

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

#### モードの上書き

[公式 Playground](https://unocss.dev/play/?version=0.62.1&html=DwEwlgbgBAxgNgQwM5ILwCIDuBaAZgVzjilzgFMAPKMAFzIFslsYyA7OgJygCt8kawuAJ7M2nKAHMEAB2wVsAZgAMUOhRrYALBWL0wrbAAtsSGBzJt0APgBQUKKEixEKDGGwRTAexBlsYGC9WJAAuXDBybBohaT84MAlDDWlWaXprYAB6cAhbe0doeGQ0dHdPQN9-QOCwiL9o2Ox4xOTU%2BgB%2BemQAa1VKDXMQRSUlDOzIWyycqyA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmANHGFKgM6owCSAxgVWRdbQKpYRwC%2Bc6KBBBwARAFduDKlVEBuAFALUAD0iwUGAIbiANvDSYc%2BQsCIAKBArjlKNGFQBccANrWbt9jC4RzAShJ3GzZ7RmZLII8qBi1dVGcAZgA6AAZAjw8GZCxnUQALGBgwJwB6EuoQJKo8ktF0j14A9wBdQMbFIA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4XyA)

デフォルトではこのプリセットはアイコンの特性に基づいて、それぞれのアイコンに対してレンダリングモードを自動的に選択します。
ただし、場合によっては各アイコンに対してレンダリングモードを明示的に設定したいこともあるでしょう。

- `?bg` は `background-image` を意味し、アイコンを背景画像としてレンダリングします。
- `?mask` は `mask` を意味し、アイコンをマスク画像としてレンダリングします。

```html
<div class="w-full flex items-center justify-center gap-x-30 text-4xl min-h-screen">
  <div class="i-vscode-icons:file-type-light-pnpm"></div>
  <div class="i-vscode-icons:file-type-light-pnpm?mask text-red-300"></div>
</div>
```

