---
title: "コンポーザブルからコンポーネントを返してみる【Vue】"
emoji: "🎨"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["vue", "jsx"]
published: false
---

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

『[【習作】Vue でラジオボタンを実装してみる](https://zenn.dev/naitokosuke/articles/vue-radio-etude)』を公開したところ [chibivue land Discord サーバー](https://discord.gg/aVHvmbmSRy)にて、[miyaoka](https://x.com/miyaoka) さんから、コンポーザブルからコンポーネントを返すようにできると教えていただきました。ありがとうございます。
「そんなことできるの！？」と驚きましたがたしかにできました。
この記事では、Vue のコンポーザブルからコンポーネントを返すパターンについてやっていきます。

⬇️ こうなったらちょっと嬉しい感じがしませんか？

```vue
<!-- Before -->
<Radio v-model="selected" :options :name :legend />

<!-- After -->
<Radio />
```

## 前回の記事のおさらい

https://zenn.dev/naitokosuke/articles/vue-radio-etude

前回の記事に引き続きラジオボタンを例にします。
(前回の記事は読まなくても全く問題ありません。)
`Radio` コンポーネントと、それを初期化する `useRadio()` コンポーザブルがあります。

`useRadio()` は `options`, `name`, `legend`, `initial` を引数に取ります。
そしてコンポーネントの props と選択状態(`selected`)を返します。

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
しかし、まだコンポーネントの使う側がどの props をセットすればよいのか知る必要があります。
そもそもセットすることも手間のようにすら感じられます。

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

このパターンは React の世界では "render hooks" と呼ばれているようです。

https://qiita.com/uhyo/items/cb6983f52ac37e59f37e

https://engineering.linecorp.com/ja/blog/line-securities-frontend-3

:::message

> ずっとこのパターンを推奨しているのですが、あまり流行る気配がありません。

とあるように React の世界でも誰しもが知っているような一般的なパターンではないようです。

:::

React の言葉で言うと、「カスタムフックから JSX 式を返す設計パターンのこと」ですが、Vue では「**コンポーザブルからコンポーネントを返す設計パターン**」になります。
今回はこの設計パターンとその実装方法について書きます。

:::message

この記事では render hooks パターンの是非(メリット・デメリット、使うべき場面など)については扱いません。
(render hooks パターンに限りませんが、使う際に都度是非を検討したいです。)
Vue での実装方法について焦点を当てています。

:::

## コンポーザブルのファイルで完結させる(`render()`, `h()`)

コンポーザブル内でコンポーネントを記述しましょう。

```ts:useRadio.ts
import { ref, h, useId, defineComponent } from "vue";

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

`defineComponent` を使って `render` メソッドを持つコンポーネントを定義しています。
`h()` は Vue の render 関数で、仮想 DOM ノードを生成します。

https://ja.vuejs.org/api/render-function#h

```ts
h("div", { class: "foo" }, "Hello");
// => <div class="foo">Hello</div>
```

第 1 引数がタグ名、第 2 引数が属性、第 3 引数が子要素です。

Vue 3.3 以降では、`defineComponent` に関数を渡す構文が使えます。

https://vuejs.org/api/general#function-signature

```ts:useRadio.ts
import { ref, h, useId, defineComponent } from "vue";

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

第 1 引数が setup 関数(render 関数を返す関数)です。
第 2 引数で `name` などのオプションを定義できます。
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

`h()` の第 1 引数には、タグ名だけでなくコンポーネントも渡せます。
composable 内で `selected` との双方向バインディングを設定することで、呼び出し側は `<Radio />` と書くだけで済みます。

## やっぱり 1 ファイルにまとめる(`<script>` と `<script setup>` の組み合わせ)

[前回の記事](https://zenn.dev/naitokosuke/articles/vue-radio-etude)と同様に、`<script>` と `<script setup>` を併用して 1 ファイルにまとめることもできます。
SFC 内で自分自身を import することで、コンポーザブルからラップしたコンポーネントを返せます。
(言うなれば) self-import は Vue を使うとたまに(動的コンポーネント(`<component :is="..." />`)を使う場合など)見かけます。

https://github.com/vuejs/core/discussions/10025

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

ここまで Vue らしいアプローチで実装してきました。

実は(？) Vue でも JSX を使用できます。

https://ja.vuejs.org/guide/extras/render-function#jsx-tsx

JSX を使って React の render hooks パターンにより近い形で書いてみることにしましょう。
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
import { defineComponent, ref, useId } from "vue";

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

  const RadioComponent = defineComponent(() => () => (
    <fieldset>
      {legend && <legend>{legend}</legend>}
      {options.map((option) => (
        <>
          <input
            type="radio"
            id={`${idPrefix}-${option}`}
            name={name}
            value={option}
            v-model={selected}
          />
          <label for={`${idPrefix}-${option}`}>{option}</label>
        </>
      ))}
    </fieldset>
  ));

  return { selected, RadioComponent };
}
```

JSX は `h()` のシンタックスシュガーです。
JSX で書いたコードはコンパイル時、`h()` 関数呼び出しへ変換されるため基本的な動作は同じです。

[Vue 公式ドキュメント](https://ja.vuejs.org/guide/extras/render-function.html#jsx-tsx)では、以下のように `h()` と JSX の対応が示されています。

```jsx
// JSX
<div>{ok.value ? <div>yes</div> : <span>no</span>}</div>;

// h() 関数
h("div", [ok.value ? h("div", "yes") : h("span", "no")]);
```

```jsx
// JSX
<ul>
  {items.value.map(({ id, text }) => {
    return <li key={id}>{text}</li>;
  })}
</ul>;

// h() 関数
h(
  "ul",
  items.value.map(({ id, text }) => {
    return h("li", { key: id }, text);
  })
);
```

JSX は HTML に近い構文で記述できるため、`h()` 関数のネストよりも視覚的に理解しやすいというメリットがあります。
どちらも JavaScript の完全な力(条件分岐、ループなど)をそのまま使える点は共通しています。

なお、Vue の JSX 変換は React の JSX 変換とは異なります。
[公式ドキュメント](https://ja.vuejs.org/guide/extras/render-function.html#jsx-tsx)では以下のように説明されています。

> Vue JSX 変換は React の JSX 変換とは異なるので、Vue アプリケーションで React の JSX 変換を使用することはできません。

Vue では `class` や `for` といった HTML 属性をそのまま使用できます(React のように `className` や `htmlFor` に書き換える必要がありません)。

この記事の本筋とは特に関係ありませんが、ついでに JSX で scoped CSS を使う方法も紹介しておきます。

<!-- textlint-disable ja-technical-writing/ja-no-mixed-period -->

:::details vue-jsx-vapor で scoped CSS を使う

JSX の弱点として「scoped CSS が使えない」がありますが、`vue-jsx-vapor` を使うと解決できます。

https://github.com/vuejs/vue-jsx-vapor

https://jsx-vapor.netlify.app/

`vue-jsx-vapor` は Vue 3.6 以上が必要です。

`vue-jsx-vapor` は Vue JSX の Vapor Mode 実装で、`defineStyle()` マクロを使うと JSX でも scoped CSS が書けます。

vite.config.ts

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
import { defineVaporComponent, ref, useId } from "vue";

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

  const RadioComponent = defineVaporComponent(() => {
    defineStyle(`
      fieldset {
        display: grid;

        div {
          display: grid;
          grid-template-columns: auto 1fr;
        }
      }
    `);

    return (
      <fieldset>
        {legend && <legend>{legend}</legend>}
        {options.map((option) => (
          <div>
            <input
              type="radio"
              id={`${idPrefix}-${option}`}
              name={name}
              value={option}
              v-model={selected}
            />
            <label for={`${idPrefix}-${option}`}>{option}</label>
          </div>
        ))}
      </fieldset>
    );
  });

  return { selected, RadioComponent };
}

```

:::

<!-- textlint-enable ja-technical-writing/ja-no-mixed-period -->

## まとめ

この記事では「コンポーザブルからコンポーネントを返す」パターンを様々な方法で実装しました。

- `h()` と `render()` でコンポーザブルから props セット済みのコンポーネントを返す
- SFC + composable で Vue らしく render hooks を実現
- `<script>` と `<script setup>` の併用で Vue らしさを保ちながら 1 ファイルで render hooks パターンを実現
- JSX は React の render hooks パターンに近い形で記述
- (vue-jsx-vapor は JSX の書き味に加えて scoped CSS も使える)

どの方法もコンポーザブルから(props をセットした)コンポーネントを返すという目的は同じです。
render hooks パターンの是非や使いどころについてはまだわかっていません。

<!-- textlint-disable ja-technical-writing/no-doubled-joshi -->

また、React では render hooks パターンに課題があることが知られています。
(返却されたコンポーネントが意図せずアンマウントされるためメモ化が必要になる？)

<!-- textlint-enable ja-technical-writing/no-doubled-joshi -->

https://zenn.dev/fizumi/articles/083db23e25106e

Vue には `useMemo` や `useCallback` がないため、React での課題が Vue では発生しない可能性もあります。

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase --><!-- textlint-disable ja-technical-writing/ja-no-successive-word -->

もしかしたら逆に Vue は render hooks パターンが向いている、、、？
(まだ何もわかっていないので間違っているかもしれません。)

<!-- textlint-enable ja-technical-writing/ja-no-successive-word --><!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->

## 最後に

最後まで読んでいただきありがとうございました！
