---
title: "もっとくわしく UnoCSS ～設定篇～"
emoji: "🎴"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["UnoCSS", "CSS"]
publication_name: "comm_vue_nuxt"
published: true
---

## 🙋 はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。
今回は ~~CSS フレームワーク~~ **Atomic CSS エンジン**である UnoCSS について紹介したいと思います。

https://zenn.dev/comm_vue_nuxt/articles/what_is_unocss

こちらの記事では、UnoCSS の成り立ちや経緯を紹介し、UnoCSS の特徴について紹介しました。
今回は UnoCSS の設定について紹介したいと思います。
設定プロパティを知ることで、UnoCSS の特徴をより深く理解できます。
また、設定プロパティの豊富さから UnoCSS の**柔軟さ**を感じていただきたいです。

また、前回記事で作者の Anthony Fu さんからコメントをいただきました！！！

[https://zenn.dev/comm_vue_nuxt/articles/what_is_unocss#comment-ba63c20e23e285](https://zenn.dev/comm_vue_nuxt/articles/what_is_unocss#comment-ba63c20e23e285)

![antfu さんが前回記事にコメントをくださりました](/images/what_is_unocss_official_presets/image3.png)

質問があれば思い切って質問してみてはいかがでしょうか 💁

## 📗 ドキュメント

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

![UnoCSS 公式ドキュメントトップページ のスクショ](/images/what_is_unocss_config/image1.png)

> **Instant On-demand Atomic CSS Engine**

> Customizable · Powerful · Fast · Joyful

UnoCSS は、**オンデマンド**で動作する **Atomic CSS エンジン**です。
Tailwind CSS, Windi CSS の影響を受け、より**迅速**で**柔軟**なスタイル定義を可能にするために設計されました。

## 🤗 UnoCSS の例

[公式 Playground](https://unocss.dev/play/?html=DwEwlgbgBAxgNgQwM5ILwCIC2BaAjABnQD4AJAUzjgHtgB6cCIgKCA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmcAvnOlBCHAEQCuWEAxgM6u0BQnqAHpLBQYAhvQA28NJhz5CwIgAoEnOHCjjUrAFxwA2rtogAtAEYADLQA0iOCGFQi2HbXNhetMgF1PlzqQCUnEA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4IgLgTghgdgzgMwPYQLYAkyoDYgFwJTZwCmAvkA)

```html
<div m-10>Hello</div>
```

```ts:uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  rules: [["m-10", { margin: "10px" }]],
});
```

上記からは

```css
.m-10 {
  margin: 10px;
}
```

という CSS が生成されます。

![UnoCSS 公式Playground での例のスクショ](/images/what_is_unocss_config/image2.png)

## ✨ UnoCSS の特徴(Configuration)

UnoCSS の大きな特徴の 1 つは、必要な機能やスタイルを設定ファイルによって**柔軟**に選択できる点です。
(**不要な機能を使わない**ということでもあります。)

プロジェクトごとに最適なスタイルやユーティリティを選択でき、不要な CSS が生成されることを防ぎます。
必要なプリセットやプラグインを指定することで、プロジェクトに合わせたカスタム CSS 環境を簡単に構築できます。

設定ファイルは専用のファイル `uno.config.ts` を用いることが推奨されています。

| 設定項目                              | 説明                                                 |
| ------------------------------------- | ---------------------------------------------------- |
| **ルール (Rules)**                    | Atomic CSS ユーティリティを定義                      |
| **ショートカット (Shortcuts)**        | 複数のルールを 1 つのショートハンドに                |
| **テーマ (Theme)**                    | テーマ変数を定義                                     |
| **バリアント (Variants)**             | ルールにカスタムなコンベンションを適用               |
| **エクストラク (Extractors)**         | ユーティリティの使用場所と抽出方法を定義             |
| **プリフライト (Preflights)**         | グローバルな生の CSS を定義                          |
| **レイヤー (Layers)**                 | 各ユーティリティレイヤーの順序を定義                 |
| **プリセット (Presets)**              | 汎用的な事前定義された設定                           |
| **トランスフォーマー (Transformers)** | コンベンションをサポートするためにソースコードを変換 |
| **オートコンプリート (Autocomplete)** | カスタマイズされたオートコンプリート候補を定義       |

<br />

順番に設定項目について見ていきましょう。

### 📏 ルール

#### 🤫 静的ルール

ルールによってユーティリティクラスと生成される CSS のペアを定義できます。

[公式 Playground](https://uno.antfu.me/play/?version=0.62.0&html=DwEwlgbgBAxgNgQwM5ILwCIC2BaAjOgPgAkBTOOAe2AHpwICAoUSWRFDAMwoDsAXbAEYU4IQgHUKAJxEBCGnQJA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmcAvnOlBCHAEQCuWEAxgM6u0DcAUN6gB6RYKDAEN6AG3hpMOfIWBEAFAm5w4USalYAuOAG016g7RABaAIy0ANIjghRUItj20ADADoATAFYoqEFoyAF1rI3V9WnQCGDMAIwgJZBs7KJizAHdURQALGFo9AHY3NxCw9VDuUgBKTiA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4IgLgTghgdgzgMwPYQLYAkyoDYgFwJTZwCmAvkA)

```ts:uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  rules: [
    ["m-1", { margin: "0.25rem" }],
    ["font-bold", { "font-weight": 700 }],
  ],
});
```

```css
.m-1 {
  margin: 0.25rem;
}

.font-bold {
  font-weight: 700;
}
```

:::message
`font-weight` のようにプロパティ名に `-` が入る場合はクォーテーションで囲む必要があります。
:::

#### 🗣️ 動的ルール

正規表現と関数を用いて動的にユーティリティを定義できます。

[公式 Playground](https://uno.antfu.me/play/?version=0.62.0&html=DwEwlgbgBAxgNgQwM5ILwCIC2BaAjABn3QD4AoKKYAIwFcAXOgewDtZEUMAHbAZhIFkAnlABC9Js2AB6WgxZlp4CMSA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmcAvnOlBCHAEQCuWEAxgM6u0DcAUN6gB6RYKDAEN6AG3hpMOfIWBEAFAm5w4USalYAuOAG016gwHoAeiAC0SgDrIA1AEoAJCYA0cJfo-IAuo7gAXgA%2BTyQQUSgibD0AA2cEZDgTOAAWUihUEFiyR183I3V9czBrOydXDwiYZgALINCVODBRZGRsIjiE6rr9AEZfZLSMrJzSPIL1fO5xziA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4IgLgTghgdgzgMwPYQLYAkyoDYgFwJTZwCmAvkA)

```ts:uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  rules: [
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
    [/^p-(\d+)$/, match => ({ padding: `${match[1] / 4}rem` })],
  ],
});
```

```html
<div class="m-100">
  <button class="p-3">My Button</button>
</div>
```

では、以下の CSS が生成されます。

```css
.m-100 {
  margin: 25rem;
}

.p-5 {
  padding: 1.25rem;
}
```

#### ☕️ ルールの順序

UnoCSS は生成された CSS 内で定義されたルールの順序を尊重します。
後に定義されたものがより高い優先度を持ちます。

動的に定義されるルールについてはアルファベット順に生成されます。

[公式 Playground](https://unocss.dev/play/?html=DwEwlgbgBAxgNgQwM5ILwCIAuBTAHpgWgCdsQod8CBzE7AO3L0ICM4BXbKdAPgAls4cAPbAA9OAjcAUEA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmcAvnOlBCHAEQCuWEAxgM6u0DcAUN6gB6RYKDAEN6AG3hpMOfIWBEAFAm5w4YKKlaoYrAFwBtALoAaNXCiTtRi%2BsMB6AHowBMALRKAdAGoAlAAkDqZwSoYhzBAS0MZ%2BcAC8AHyhquppcJHRUPpwAAYBCJnQpLnm6aR%2BZhbG3BU8QA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4IgLgTghgdgzgMwPYQLYAkyoDYgFwJTZwCmAvkA)

```ts:uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  rules:[
    [/^text-(.+)$/, ([, color]) => ({
      color: `${color}`,
    })],
  ]
});
```

```html
<div class="text-red text-green text-blue ">Hello</div>
```

からは以下の順で CSS が生成されます。

```css
.text-blue {
  color: blue;
}

.text-green {
  color: green;
}

.text-red {
  color: red;
}
```

#### 🤝 ルールのマージ

UnoCSS では生成される CSS のサイズを小さくするために、CSS をマージします。

```html
<div class="m-2 hover:m2"></div>
```

```css
.hover\:m2:hover,
.m-2 {
  margin: 0.5rem;
}
```

### 🛠️ プリセット

UnoCSS は Atomic CSS エンジンであり、コアユーティリティを提供していません。
上記の例のように、自らルールを設定できます。

そして、複数のルールをプリセットとして切り出すことができます。
これが UnoCSS の一番の特徴です。

プリセットは特定のユースケースに合わせたスタイルの管理を簡単にするための設定の集合です。
プリセットを使用することで、共通の設定やスタイルをプロジェクト全体で一貫して利用できるようになります。

```ts:uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  rules: [
    [/^m-([.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^p-([.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
  ],
});
```

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

また、オプションを受け取ることもできます。

```ts:my-preset.ts
import { definePreset } from "unocss";
import type { Preset } from "unocss";

interface MyPresetOptions {
  primaryColor?: string;
  secondaryColor?: string;
}

export default definePreset((options?: MyPresetOptions): Preset => {
  return {
    name: "my-preset",
    rules: [
      ["bg-primary", { "background-color": options?.primaryColor || "blue" }],
      ["bg-secondary", { "background-color": options?.secondaryColor || "green" }],
    ],
  };
});
```

```ts:uno.config.ts
import { defineConfig } from "unocss";
import myPreset from "./my-preset";

export default defineConfig({
  presets: [
    myPreset({
      primaryColor: "#42B983",
      secondaryColor: "#35495E",
    }),
  ],
});
```

### 🏃 ショートカット

複数のルールを組み合わせてひとつのショートカットを定義できます。

```ts:uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  shortcuts: {
    // 複数のユーティリティのショートカット
    "btn": "py-2 px-4 font-semibold rounded-lg shadow-md",
    "btn-green": "text-white bg-green-500 hover:bg-green-700",
    // ひとつのユーティリティに対するエイリアスショートカット
    "red": "text-red-100",
  }
});
```

ルールと同様に動的なショートカットも定義できます。

[公式 Playground](https://unocss.dev/play/?html=DwIwrgLhD2B2AEBjANgQwM7oLwCIQQX1gFoBzAJwFNLYd4A%2BAWQE94AhSGWYAenCjj0AUEA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmcAvnOlBCHAEQCuWEAxgM6u0DcAUN6gB6RYKDAEN6AG3hpMOfIWBEAFAm5w4rABbQYzejFYAuOAG016xOYt0ARjCy1jtMAE8AtACY4Yfm4AsFAQwbqyoIMA2EBLIcFSMaMhuEiRaosgQAO5uIMi0ADRWZAXWJgD0AHp2WG5KAHQAVACUACSleXBKJu3MALqNcAC8AHxwAAY2RG7NCMyk-gAM83AwAsHTs24AjIve7l4%2B-rEQ8aiJyaM9xXCX3KSNPEA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4IgLgTghgdgzgMwPYQLYAkyoDYgFwJTZwCmAvkA)

```ts:uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  shortcuts: [
    { btn: "py-2 px-4 font-semibold rounded-lg shadow-md" },
    [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
  ],
});
```

### 💐 テーマ

UnoCSS でも Tailwind CSS, Windi CSS でおなじみのテーマ化システムをサポートしています。

[公式 Playground](https://unocss.dev/play/?html=DwZwDghgdgBAxgGwiEBeARAFwKYA9MC0AbtgE4CeBcA9tQujAHwAS2CC1wA9ONIzKEixEyNFjyEARqWgATAmFIBLALYQKDRgHVqpBLICE3XlEZA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmcAvnOlBCHAEQCuWEAxgM6u0DcAUN6gB6RYKDAEN6AG3hpMOfIWBEAFAm5w4MABaoQqAFyI16uMwgTorA6uPHaAN1RQAngFpTZ2gdoBiAAz-fADFA2gAaOCMbACMoUSxkK0ibODAoUFFnL01WCSU7DKUXF016VHCAJgBGAHYASjhqgA4AUjgAVkrm2rCI5LJQpNIB9SGjKElUSzgAbSTZvoB6AD0YARgXJQA6ACpagBIF4eSlafDmAF1wpC0dVDJ6gF4APkM%2B9WB0OCUb3U3TcygrGmF3qUFQMHoUCwiBMZmgBh%2BqD%2BcMBwPOZCSIyO6kuRlxpFqPCAA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4IgLgTghgdgzgMwPYQLYAkyoDYgFwJTZwCmAvkA)

```ts:uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  theme: {
    colors: {
      "very-cool": "#0000FF",
      brand: {
        primary: "hsl(var(--hue, 217) 78% 51%)",
      },
    },
  },
  rules: [
    [
      /^text-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { color: theme.colors[c] }
      },
    ],
  ],
});
```

ブレークポイントの設定もできます。

[公式 Playground](https://unocss.dev/play/?html=DwZwDghgdgBAxgGwiEBeARAFwKYA9MC0AbtgE4CeBcA9tQjCALYBcO%2BBp2AJjI163kIBzTtlgIhA9gHcAFgEsc6AFAwYAPgAS2BAmrAA9OGjL1y0JFiJkaLIIIAjUtC4EwpeYwgV06gOrUpAhcAISGxlBmQA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmcAvnOlBCHAOQCuWEAxgM6u0BQnqAHpLBQYAhvQA28NJhz5CwIgAoEnOHBgALVCFQAuRCtVxmEMdFZ7lhw7QBuqKAE8AtMZO09tAMQAGX94Bi-rQANAZWAEZQwljIFmFWcGBQoMKOHuqsYgo2qQpOTur0qMFwAEwAjADsAJRwlQAcAKRwAKzljdUh8aqkoQlwkajCANaQ2DDm%2Bv2qrCAeACy%2BYLxd03AgsXQtSyt902JEHgBsO6sJvfEXPaGk1ZxAA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4IgLgTghgdgzgMwPYQLYAkyoDYgFwJTZwCmAvkA)

```ts:uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  theme: {
    breakpoints: {
      sm: "320px",
      md: `${40 * 16}px`,
      lg: "960px",
    },
  },
});
```

:::message alert
ブレークポイントの指定には統一された単位を使用してください。
単位ごとにサイズ順にソートされるためです。
:::

### 🫚 バリアント

バリアントを用いることで既存のルールにバリエーションを適用できます。
(Tailwind CSS の `hover:` バリアントのように)

```ts
import { defineConfig } from "unocss";

export default defineConfig({
  variants: [
    // hover:
    (matcher) => {
      if (!matcher.startsWith("hover:")) return matcher;
      return {
        // プレフィックス `hover:` (6文字)を取り除く
        matcher: matcher.slice(6),
        selector: (s) => `${s}:hover`,
      };
    },
  ],
  rules: [[/^m-(\d)$/, ([, d]) => ({ margin: `${d / 4}rem` })]],
});
```

:::details `hover:m-2` の場合の流れ ⏬️

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

### 🥤 エクストラクタ

ソースコード中のユーティリティを抽出するためにエクストラクタが使われます。

デフォルトでは [extractorSplit](https://github.com/unocss/unocss/blob/main/packages/core/src/extractors/split.ts) が適用されています。

```ts:uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  extractors: [
    // 独自のエクストラクタ
  ],
  // デフォルトのエクストラクタを無効
  extractorDefault: false,
  // デフォルトのエクストラクタを独自のものに上書き
  extractorDefault: myExtractor,
});
```

### 🤖 トランスフォーマー

トランスフォーマーはソースコード変形のための統一されたインターフェースを提供します。

```ts:my-transformer.ts
import { createFilter } from "@rollup/pluginutils";
import { SourceCodeTransformer } from "unocss";

interface MyOptions {
  // カスタムオプションを定義
};

export default function myTransformers(options: MyOptions = {}): SourceCodeTransformer {
  return {
    name: "my-transformer",
    enforce: "pre",
    idFilter(id) {
      return id.match(/\.[tj]sx$/);
    },
    async transform(code, id, { uno }) {
      code.appendRight(0, "/* transformed by my-transformer */");
    },
  };
};
```

```ts:uno.config.ts
import { defineConfig } from "unocss";
import { myTransformers } from "./my-transformers";

export default defineConfig({
  transformers: [myTransformers()],
});
```

では、UnoCSS がビルドプロセス中に `.tsx` または `.jsx` ファイルを処理するときに自動的に変換が実行されます。

例えば、

```tsx
export const App = () => {
  return <div>Hello World</div>;
};
```

は、

```tsx
/* transformed by my-transformer */
export const App = () => {
  return <div>Hello World</div>;
};
```

と変換されます。

例えば、複数のクラスを 1 つのクラスにコンパイルするトランスーフォーマー [`transformer-compile-class`](https://unocss.dev/transformers/compile-class) では、

```html
<div class=":uno: text-center sm:text-left">
  <div class=":uno: text-sm font-bold hover:text-red"></div>
</div>
```

が、

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

### ✈️ プリフライト

生の CSS をプリフライトとして設定から注入できます。
これによりデフォルトスタイルの指定や CSS リセットを行うことができます。

```ts:uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
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
  ],
});
```

### 📚 レイヤー

CSS の順序は優先順位に影響します。
エンジンはルールの順序を保持しますが、ユーティリティをグループ化してその順序を明示的に制御したい場合もあります。

Tailwind CSS は 3 つの固定レイヤー(`base`, `components`, `utilities`)を持っています。
それに対して UnoCSS では、自由にレイヤーを定義できます。

レイヤーを定義したい場合はルールの 3 番目の要素としてメタデータを指定できます。
省略すれば `default` となります。

```ts:uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  rules: [
    [/^m-(\d)$/, ([, d]) => ({ margin: `${d / 4}rem` }), { layer: "utilities" }],
    ["btn", { padding: "4px" }],
  ],
});
```

というルールからは以下の順の CSS が生成されます。

```css
/* layer: default */
.btn {
  padding: 4px;
}

/* layer: utilities */
.m-2 {
  margin: 0.5rem;
}
```

レイヤーの順序も制御できます。
(順序を指定しない場合はレイヤー名の辞書順になります。)

```ts:uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  layers: {
    "components": -1,
    "default": 1,
    "utilities": 2,
    "my-layer": 3,
  },
});
```

カスタム CSS をレイヤー間に挿入したい場合はエントリーモジュールを更新します。

```ts
// "uno:[layer-name].css"
import "uno:components.css";

// "components" と "utilities" 以外のレイヤーがここにフォールバックされます
import "uno.css";

// カスタムCSS
import "./my-custom.css";

// "utilities" レイヤーが最も優先されます
import "uno:utilities.css";
```

#### 🍰 CSS カスケードレイヤー

https://developer.mozilla.org/ja/docs/Web/CSS/@layer

```ts:uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  outputToCssLayers: true,
});
```

とすることで、CSS カスケードレイヤー付きの CSS を生成できます。

レイヤー名を変更することもできます。

```ts:uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  outputToCssLayers: {
    cssLayerName: (layer) => {
      if (layer === "default") {
        return "utilities";
      }
      if (layer === "shortcuts") {
        return "utilities.shortcuts";
      }
      return layer;
    }
  },
});
```

### ✅ オートコンプリート

VS Code 拡張機能の自動補完をカスタマイズできます。
(静的なルールでは何も設定しなくても自動補完が効きます。)

```ts:uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  rules: [
    [
      /^custom-autocomplete-m-(\d+)$/,
      ([, d]) => ({ margin: `${d / 4}rem` }),
      { autocomplete: "custom-autocomplete-m-<num>" },
    ],
  ],
});
```

[公式 Playground](https://unocss.dev/play/?version=0.61.9&html=Q&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmcAvnOlBCHAEQCuWEAxgM6u0DcAUN6gB6RYKDAEN6AG3hpMOfIWBEAFAm5w4USalYAuOAG016g0eNwA9AD1m9VjGoBacfebUwE1DFQOQDpQB1kAGoASgAScwAaU2MlfUiUAF0QuABeAD44FTgQUSgibD0AAzCEZAs4ABZSKFQQIrIQ6LN1JGcWNw8vPVobO0d213Au718AHix6EHTaMmbjRPnF7lIQziA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4IgLgTghgdgzgMwPYQLYAkyoDYgFwJTZwCmANCBCXAA5LwCWAbifocSQL5A)

`autocomplete` 設定を用いることでより具体的なテンプレートや短縮記法を定義することもできます。

```ts:uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  autocomplete: {
    templates: [
      // テーマから推測されるテンプレート
      "bg-$color/<opacity>",
      // 省略形
      "text-<font-size>",
      // 論理 OR グループ
      "(b|border)-(solid|dashed|dotted|double|hidden|none)",
      // 定数
      "w-half",
    ],
    shorthands: {
      // `opacity: "(0|10|20|30|40|50|60|70|90|100)"` と同じ意味
      "opacity": Array.from({ length: 11 }, (_, i) => i * 10),
      "font-size": "(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)",
      // 組み込みの省略形を上書き
      "num": "(0|1|2|3|4|5|6|7|8|9)",
    },
  },
});
```

## 💭 まとめ

UnoCSS は、**オンデマンド型**の Atomic CSS エンジンとして、スタイル定義を革新する強力なツールです。

- **柔軟性**: プロジェクトに合わせたスタイルや機能のカスタマイズが可能
- **効率性**: 必要な部分だけを設定することで、無駄のないスタイル管理が実現
- **ルール設定**:
  - 静的ルール: 決まったスタイルを簡単に設定
  - 動的ルール: 条件に応じたスタイルを柔軟に定義
- **プリセットとテーマ**: 共通のスタイルをプロジェクト全体で一貫して使用可能
- **ショートカットとバリアント**: 再利用性の高いスタイルを手軽に設定
- **カスケードレイヤー管理**: CSS の優先順位を細かく制御できる

様々な設定プロパティを活用することで、パフォーマンスを向上させるだけでなく、スタイル管理も大幅に楽になります。

## 💚 最後に

この記事の執筆にあたって [GANGAN さん](https://x.com/gangan_nikki)にレビューしていただき、たくさんのアドバイスをもらいました。
本当にありがとうございます。

https://github.com/shinGangan/comm_vue_nuxt/issues/62

<br />

この記事を通して、UnoCSS の設定の豊富さと柔軟性についてご理解いただけたでしょうか。
UnoCSS を使うことでよりシンプルで効率的なスタイル定義が可能になります。
この記事が UnoCSS を使いこなす手助けになれば幸いです。

UnoCSS の魅力をもっと知りたい方は公式サイトやコミュニティリソースを活用して、積極的に情報を収集してみてください。

今後 UnoCSS ユーザがもっと増えて、日本語情報が増えることを強く願っています。
一緒にコミュニティを盛り上げていきましょう 💪

最後まで読んでいただきありがとうございました！
