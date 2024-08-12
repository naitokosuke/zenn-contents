---
title: "UnoCSS 完全解説【2024年】"
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
今回は UnoCSS の詳細を紹介したいと思います。

:::message alert
おことわり

公式ドキュメントの翻訳ベースの内容になっています。
この記事の内容はすべて公式ドキュメントに書いてあるということです。
:::

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

## UnoCSS とは

![UnoCSS 公式ドキュメントトップページ のスクショ](/images/what_is_unocss_detail/image1.png)

> **Instant On-demand Atomic CSS Engine**

> Customizable · Powerful · Fast · Joyful

UnoCSS は、**オンデマンド**で動作する **Atomic CSS エンジン**です。
Tailwind CSS, Windi CSS の影響を受け、より**迅速**で**柔軟**なスタイル定義を可能にするために設計されました。

## UnoCSS の例

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

![UnoCSS 公式Playground での例のスクショ](/images/what_is_unocss_detail/image2.png)

上記からは

```css
.m-10 {
  margin: 10px;
}
```

という CSS が生成されます。

## UnoCSS の特徴(Configuration)

UnoCSS の大きな特徴の一つは、必要な機能やスタイルを設定ファイルによって柔軟に選択できる点です。
(不要な機能を使わないということでもあります。)

プロジェクトごとに最適なスタイルやユーティリティを選択でき、不要な CSS が生成されることを防ぎます。
必要なプリセットやプラグインを指定することで、プロジェクトに合わせたカスタム CSS 環境を簡単に構築することができます。

設定ファイルは専用のファイル `uno.config.ts` を用いることが推奨されています。
ここからは、設定ファイルによって提供される UnoCSS の特徴を紹介していきます。

### ルール

#### 静的ルール

ルールによってユーティリティクラスと生成される CSS のペアを定義できます。

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

#### 動的ルール

正規表現と関数を用いて動的にユーティリティを定義することができます。

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

#### ルールの順序

UnoCSS は生成された CSS 内で定義されたルールの順序を尊重します。
後に定義されたものがより高い優先度を持ちます。

動的に定義されるルールについてはアルファベット順に生成されます。

[[公式 Playground]](https://unocss.dev/play/?html=DwEwlgbgBAxgNgQwM5ILwCIAuBTAHpgWgCdsQod8CBzE7AO3L0ICM4BXbKdAPgAls4cAPbAA9OAjcAUEA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUGEJaYDmcAvnOlBCHAEQCuWEAxgM6u0DcAUN6gB6RYKDAEN6AG3hpMOfIWBEAFAm5w4YKKlaoYrAFwBtALoAaNXCiTtRi%2BsMB6AHowBMALRKAdAGoAlAAkDqZwSoYhzBAS0MZ%2BcAC8AHyhquppcJHRUPpwAAYBCJnQpLnm6aR%2BZhbG3BU8QA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4IgLgTghgdgzgMwPYQLYAkyoDYgFwJTZwCmAvkA)

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

#### ルールのマージ

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

### プリセット

UnoCSS は Atomic CSS エンジンであり、コアユーティリティを提供していません。
上記の例のように、自らルールを設定することができます。

そして、ルールをいくつか定義していくうちに、それらをプリセットとして切り出すことができます。
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
import { Preset } from "unocss"

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
import { defineConfig } from "unocss"
import { myPreset } from "./my-preset"

export default defineConfig({
  presets: [
    myPreset,
  ],
});
```

また、コンストラクタをエクスポートすることでオプションを受け取ることもできます。

```ts:my-preset.ts
import { definePreset, type Preset } from "unocss";

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

### ショートカット

複数のルールを組み合わせてひとつの短縮系にすることができます。

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

### テーマ

UnoCSS では Tailwind CSS, Windi CSS でおなじみのテーマ化システムをサポートしています。

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

:::message
ブレークポイントの設定はマージではなく上書きされます。
:::

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
:::
