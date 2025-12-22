---
title: "コンポーザブルからコンポーネントを返してみる【Vue】"
emoji: "🌝"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["vue", "jsx"]
published: false
---

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

『[【習作】Vue でラジオボタンを実装してみる](https://zenn.dev/naitokosuke/articles/vue-radio-etude)』を公開したところ [chibivue land Discord サーバー](https://discord.gg/aVHvmbmSRy)にて、[miyaoka](https://x.com/miyaoka) さんから、コンポーザブルからコンポーネントを返すようにできると教えていただきました。
「そんなことできるの！？」と驚きましたがたしかにできました。
この記事では、Vue のコンポーザブルからコンポーネントを返すパターンについてやっていきます。

https://zenn.dev/naitokosuke/articles/vue-radio-etude

前回の記事では `useRadio` コンポーザブルを作成し、`options`, `name`, `legend`, `selected` をまとめて返すところまで実装しました。

```vue:App.vue
<script setup lang="ts">
import Radio, { useRadio } from "./Radio.vue";

const { options, name, legend, selected } = useRadio({
  options: ["apple", "orange", "grape"],
  name: "fruit",
  legend: "Fruits",
});
</script>

<template>
  <Radio v-model="selected" :options :name :legend />
  <p v-if="selected">Selected: {{ selected }}</p>
  <p v-else>Nothing selected</p>
</template>
```

凝集度が高く、`useRadio()` 時にコンポーネントにセットするための props も初期化できてとても良さそうです。
しかし、まだコンポーネントの使う側がどの props をセットすればよいのか知る必要がありますしそもそもセットすることも手間のように感じられます。

「`use()` した時に props がセットされたコンポーネントも返ってきたらな〜、こうやって ⬇️ 書けたらな〜」

```vue:App.vue
<script setup lang="ts">
import { useRadio } from "./Radio";

const { selected, RadioComponent: Radio } = useRadio({
  options: ["apple", "orange", "grape"],
  name: "fruit",
  legend: "Fruits",
});
</script>

<template>
  <Radio />
  <p v-if="selected">Selected: {{ selected }}</p>
  <p v-else>Nothing selected</p>
</template>
```

これが Vue 3 Composition API だとできちゃいます。

`<Radio />` と書くだけで済むようになりました。
状態のバインディングは composable 内部で完結しています。

このパターンは React の世界では "render hooks"と呼ばれているようです。

https://qiita.com/uhyo/items/cb6983f52ac37e59f37e

https://engineering.linecorp.com/ja/blog/line-securities-frontend-3

:::message

> ずっとこのパターンを推奨しているのですが、あまり流行る気配がありません。

とあるように React の世界でも誰しもが知っているような一般的なパターンではないようです。

:::

React の言葉で言うと、「カスタムフックから JSX 式を返す設計パターンのこと」ですが、Vue では「**コンポーザブルからコンポーネントを返す設計パターン**」になります。
今回はこの設計パターンとその実装方法について書きます。

## コンポーザブルのファイルで完結させる(`render()`, `h()`)

コンポーザブル内でコンポーネントを記述しましょう。

```ts:useRadio.ts
import { ref, h, useId, defineComponent, type Ref } from "vue";

export function useRadio<
  const Options extends readonly [string, string, ...string[]],
>({ options, name, legend, initial }: {
  options: Options;
  name: string;
  legend?: string;
  initial?: Options[number];
}) {
  const selected = ref<Options[number] | undefined>(initial);
  const idPrefix = useId();

  const RadioComponent = defineComponent({
    name: "Radio",
    render() {
      return h("fieldset", {}, [
        ...(legend ? [h("legend", {}, legend)] : []),
        ...options.flatMap((option) => [
          h("input", {
            type: "radio",
            id: `${idPrefix}-${option}`,
            name,
            value: option,
            checked: selected.value === option,
            onChange: () => { selected.value = option; },
          }),
          h("label", { for: `${idPrefix}-${option}` }, option),
        ]),
      ]);
    },
  });

  return { selected, RadioComponent };
}
```

ポイントを解説します。

### `defineComponent` と `render()`

`defineComponent` を使って `render` メソッドを持つコンポーネントを定義します。

```ts
const RadioComponent = defineComponent({
  name: "Radio",
  render() {
    return h("fieldset", {}, [...]);
  },
});
```

### `h()` 関数

`h()` は Vue の render 関数で、仮想 DOM ノードを生成します。

https://ja.vuejs.org/api/render-function#h

```ts
h("div", { class: "foo" }, "Hello");
// => <div class="foo">Hello</div>
```

第 1 引数がタグ名、第 2 引数が属性、第 3 引数が子要素です。

### `defineComponent` の関数構文

Vue 3.3 以降では、`defineComponent` に関数を渡す構文が使えます。

https://vuejs.org/api/general#function-signature

```ts:useRadio.ts
import { ref, h, useId, defineComponent, type Ref } from "vue";

export function useRadio<
  const Options extends readonly [string, string, ...string[]],
>({ options, name, legend, initial }: {
  options: Options;
  name: string;
  legend?: string;
  initial?: Options[number];
}) {
  const selected = ref<Options[number] | undefined>(initial);
  const idPrefix = useId();

  const RadioComponent = defineComponent(() => () =>
    h("fieldset", {}, [
      ...(legend ? [h("legend", {}, legend)] : []),
      ...options.flatMap((option) => [
        h("input", {
          type: "radio",
          id: `${idPrefix}-${option}`,
          name,
          value: option,
          checked: selected.value === option,
          onChange: () => { selected.value = option; },
        }),
        h("label", { for: `${idPrefix}-${option}` }, option),
      ]),
    ]),
    { name: "Radio" }
  );

  return { selected, RadioComponent };
}
```

第 1 引数が setup 関数(render 関数を返す関数)です。第 2 引数で `name` などのオプションを定義できます。
オプション構文より簡潔に書けるため、以降はこちらの関数構文を使用します。

## SFC を分離してコンポーザブルでラップする

コンポーザブルからコンポーネントを返すパターンについて実装できました。
でも `h()` だけで書くのはやはりつらいです。

<!-- textlint-disable ja-technical-writing/no-doubled-joshi -->

1 つのファイルにまとめることにこだわらずに SFC を活用しつつコンポーザブルからコンポーネントを返すパターンを実装してみます。

<!-- textlint-enable ja-technical-writing/no-doubled-joshi -->

```vue:Radio.vue
<script setup lang="ts" generic="Option extends string">
import { useId } from "vue";

const model = defineModel<Option | undefined>({ required: true });

defineProps<{
  options: readonly [Option, Option, ...Option[]];
  name: string;
  legend?: string;
}>();

const idPrefix = useId();
</script>

<template>
  <fieldset>
    <legend v-if="legend">{{ legend }}</legend>

    <template v-for="option in options" :key="option">
      <input
        type="radio"
        :id="`${idPrefix}-${option}`"
        :name
        :value="option"
        v-model="model"
      />
      <label :for="`${idPrefix}-${option}`">{{ option }}</label>
    </template>
  </fieldset>
</template>
```

```ts:useRadio.ts
import { ref, h, defineComponent } from "vue";
import Radio from "./Radio.vue";

export function useRadio<
  const Options extends readonly [string, string, ...string[]],
>({ options, name, legend, initial }: {
  options: Options;
  name: string;
  legend?: string;
  initial?: Options[number];
}) {
  const selected = ref<string | undefined>(initial);

  const RadioComponent = defineComponent(() => () =>
    h(Radio, {
      options,
      name,
      legend,
      modelValue: selected.value,
      "onUpdate:modelValue": (value: string | undefined) => {
        selected.value = value;
      },
    }),
    { name: "Radio" }
  );

  return { selected, RadioComponent };
}
```

### ポイント

`h()` の第 1 引数には、タグ名だけでなくコンポーネントも渡せます。

```ts
h(RadioVue, { ...props });
```

`v-model` は `modelValue` props と `onUpdate:modelValue` イベントに展開されます。
composable 内で `selected` との双方向バインディングを設定することで、呼び出し側は `<Radio />` と書くだけで済みます。

## やっぱり 1 ファイルにまとめる(`<script>` と `<script setup>` の組み合わせ)

[前回の記事](https://zenn.dev/naitokosuke/articles/vue-radio-etude)と同様に、`<script>` と `<script setup>` を併用して 1 ファイルにまとめることもできます。
SFC 内で自分自身を import することで、コンポーザブルからラップしたコンポーネントを返せます。

```vue:Radio.vue
<script lang="ts">
import { ref, h, defineComponent } from "vue";
import Radio from "./Radio.vue"; // 自分自身を import

export function useRadio<
  const Options extends readonly [string, string, ...string[]],
>({ options, name, legend, initial }: {
  options: Options;
  name: string;
  legend?: string;
  initial?: Options[number];
}) {
  const selected = ref<Options[number] | undefined>(initial);

  const RadioComponent = defineComponent(() => () =>
    h(Radio, {
      options,
      name,
      legend,
      modelValue: selected.value,
      "onUpdate:modelValue": (value: Options[number] | undefined) => {
        selected.value = value;
      },
    }),
    { name: "Radio" }
  );

  return { selected, RadioComponent };
}
</script>

<script setup lang="ts" generic="Option extends string">
import { useId } from "vue";

const model = defineModel<Option | undefined>({ required: true });

defineProps<{
  options: readonly [Option, Option, ...Option[]];
  name: string;
  legend?: string;
}>();

const idPrefix = useId();
</script>

<template>
  <fieldset>
    <legend v-if="legend">{{ legend }}</legend>

    <template v-for="option in options" :key="option">
      <input
        type="radio"
        :id="`${idPrefix}-${option}`"
        :name
        :value="option"
        v-model="model"
      />
      <label :for="`${idPrefix}-${option}`">{{ option }}</label>
    </template>
  </fieldset>
</template>
```

## JSX を使用する

ここまで Vue らしいアプローチで実装してきましたが、Vue でも JSX を使用できます。

https://ja.vuejs.org/guide/extras/render-function#jsx-tsx

JSX を使って、React の render hooks パターンに近い形で書いてみましょう。

Vue で JSX を使うには `@vitejs/plugin-vue-jsx` を導入します。

https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx

<!-- textlint-disable ja-technical-writing/ja-no-mixed-period -->

:::details vite.config.ts

```ts:vite.config.ts
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue(), vueJsx()],
});
```

:::

<!-- textlint-enable ja-technical-writing/ja-no-mixed-period -->

:::details tsconfig.json の設定(型推論)
Vue 3.4 以降で JSX の型推論を有効にするには、tsconfig.json に以下を追加します。

```json:tsconfig.json
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "vue"
  }
}
```

:::

```tsx:Radio.tsx
import { ref, useId, type Ref } from "vue";

export function useRadio<
  const Options extends readonly [string, string, ...string[]],
>({ options, name, legend, initial }: {
  options: Options;
  name: string;
  legend?: string;
  initial?: Options[number];
}) {
  const selected = ref<Options[number] | undefined>(initial);
  const idPrefix = useId();

  const RadioComponent = () => (
    <fieldset>
      {legend && <legend>{legend}</legend>}
      {options.map((option) => (
        <>
          <input
            type="radio"
            id={`${idPrefix}-${option}`}
            name={name}
            value={option}
            checked={selected.value === option}
            onChange={() => { selected.value = option; }}
          />
          <label for={`${idPrefix}-${option}`}>{option}</label>
        </>
      ))}
    </fieldset>
  );

  return { selected, RadioComponent };
}
```

JSX は `h()` のシンタックスシュガーなので、基本的な動作は同じです。
HTML ライクな構文で書けるため、`h()` のネストよりも可読性が高くなります。

## vue-jsx-vapor で scoped CSS を使う

JSX の弱点として「scoped CSS が使えない」がありますが、`vue-jsx-vapor` を使うと解決できます。

https://github.com/vuejs/vue-jsx-vapor

`vue-jsx-vapor` は Vue JSX の Vapor Mode 実装で、`defineStyle` マクロを使うと JSX でも scoped CSS が書けます。

```ts:vite.config.ts
import vueJsxVapor from "vue-jsx-vapor/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    vueJsxVapor({
      macros: true,
    }),
  ],
});
```

```tsx:Radio.tsx
import { ref, useId, type Ref } from "vue";
import { defineStyle } from "vue-jsx-vapor/macros";

export function useRadio<
  const Options extends readonly [string, string, ...string[]],
>({
  options,
  name,
  legend,
  initial,
}: {
  options: Options;
  name: string;
  legend?: string;
  initial?: Options[number];
}) {
  const selected = ref<Options[number] | undefined>(initial);
  const idPrefix = useId();

  const RadioComponent = () => {
    // 関数内で defineStyle を呼ぶとデフォルトで scoped になる
    defineStyle(`
      .radio-group {
        border: 1px solid #ccc;
        padding: 1rem;
      }
      .radio-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    `);

    return (
      <fieldset class="radio-group">
        {legend && <legend>{legend}</legend>}
        {options.map((option) => (
          <div class="radio-item">
            <input
              type="radio"
              id={`${idPrefix}-${option}`}
              name={name}
              value={option}
              checked={selected.value === option}
              onChange={() => {
                selected.value = option;
              }}
            />
            <label for={`${idPrefix}-${option}`}>{option}</label>
          </div>
        ))}
      </fieldset>
    );
  };

  return {
    selected: selected as Ref<Options[number] | undefined>,
    RadioComponent,
  };
}
```

### defineStyle の特徴

`defineStyle` は定義する場所によって scoped のデフォルト値が変わります。

- ファイルトップレベルで定義すると `scoped: false`(グローバル)
- 関数内で定義すると `scoped: true`(スコープ付き)

また、JavaScript 変数をスタイルにバインドできます。

```tsx
function Comp({ color = "red" }) {
  defineStyle(`
    .foo {
      color: ${color};
    }
  `);
  return <div class="foo">content</div>;
}
```

CSS Modules として使うこともできます。

```tsx
const styles = defineStyle(`
  .foo { color: blue; }
`);
return <div class={styles.foo} />;
```

### メリット・デメリット

#### メリット

- JSX で scoped CSS が使える
- CSS 変数と JS 変数のバインディング
- CSS Modules のサポート
- SCSS, Less, Stylus などのプリプロセッサ対応

#### デメリット

- Vapor Mode 前提の実験的な機能
- 追加のビルド設定が必要

## まとめ

この記事では「コンポーザブルからコンポーネントを返す」パターンを 4 つの方法で実装しました。

| 方法             | ファイル       | scoped CSS | 可読性 |
| ---------------- | -------------- | ---------- | ------ |
| h() と render    | `.ts` のみ     | ❌         | △      |
| SFC + composable | `.vue` + `.ts` | ✅         | ◎      |
| JSX              | `.tsx` のみ    | ❌         | ○      |
| vue-jsx-vapor    | `.tsx` のみ    | ✅         | ○      |

どの方法を選ぶかはプロジェクトの要件や好みによります。

- SFC のテンプレート構文が好きなら「SFC + composable」
- ファイルを分けたくないなら「JSX」または「vue-jsx-vapor」
- scoped CSS が必要なら「SFC + composable」または「vue-jsx-vapor」

個人的には「SFC + composable」のバランスが最も良いと感じています。
Vue の強みであるテンプレート構文と scoped CSS を活かしつつ、render hooks パターンの恩恵も受けられます。

## 最後に

最後まで読んでいただきありがとうございました！
