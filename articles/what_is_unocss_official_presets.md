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

Tailwind CSS, Windi CSS と互換があるので、ユーティリティの詳細はそれぞれの公式ドキュメントを参照できます。

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

#### アイコンコレクションとリゾルバの設定

##### ブラウザ

`iconify` のコレクションをロードするには、`@iconify/json` ではなく、`@iconify-json/[the-collection-you-want]` を使うべきです。
`json` ファイルは巨大だからです。

##### バンドラー

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

##### CDN

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

##### カスタムコレクション

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

##### Node.js

`Node.js` ではインストール済みのアイコンデータセットを自動的に探します。
`iconify` コレクションを登録する必要はありません。

### preset-attributify

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
`text-sm` と `text-white` のように重複したプレフィックスを除いてグループ化(`text="sm white"`)することができます。

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

### preset-tagify

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
<div class="flex"> flexbox </div>
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

### preset-web-fonts

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


