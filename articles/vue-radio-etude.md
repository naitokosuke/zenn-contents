---
title: "【習作】Vue でラジオボタンを実装してみる"
emoji: "📻"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["vue"]
publication_name: "comm_vue_nuxt"
published: true
published_at: 2025-12-17
---

[Vue Advent Calendar 2025](https://qiita.com/advent-calendar/2025/vue) 17 日目の記事です。

https://qiita.com/advent-calendar/2025/vue

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

急にラジオボタンコンポーネントを Vue で実装したくなったので実装してみます。
よろしくお願いします。

<!-- textlint-disable ja-technical-writing/ja-no-mixed-period -->

:::message
この記事は Vue 初級者〜中級者の方を対象としています。

そのままプロダクトにコピペして使えるコンポーネントを提供することを目的としていません。
(`<form>` 要素との連携(バリデーションやサブミット処理など)はこの記事では扱っていません。)
(アクセシビリティ(`aria-*` 属性の追加)についても考慮していません。)
(スタイリング(見た目)についても一切考慮していません。)

コンポーネントを段階的に改善していく過程で Vue の考え方や TIPS を紹介することを目的としています。
そのため incremental な実装となっており冗長な部分もあります。
ご自身のレベル感に応じて適宜読み飛ばしてください。
:::

<!-- textlint-enable ja-technical-writing/ja-no-mixed-period -->

## まずラジオボタンのおさらい

ラジオボタンは複数の選択肢から 1 つだけ選ぶための入力要素です。
(チェックボックスは複数選択可能)

https://developer.mozilla.org/ja/docs/Web/HTML/Element/input/radio

> `<input>` 要素の `radio` 型は、一般にラジオグループ、すなわち関連するオプションの組み合わせを表すラジオボタンの集まりの中に置かれます。グループ内で一度に選択できるラジオボタンは 1 つだけです。

```html
<!-- https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/input/radio#%E8%A9%A6%E3%81%97%E3%81%A6%E3%81%BF%E3%81%BE%E3%81%97%E3%82%87%E3%81%86 -->
<fieldset>
  <legend>Select a maintenance drone:</legend>

  <div>
    <input type="radio" id="huey" name="drone" value="huey" checked />
    <label for="huey">Huey</label>
  </div>

  <div>
    <input type="radio" id="dewey" name="drone" value="dewey" />
    <label for="dewey">Dewey</label>
  </div>

  <div>
    <input type="radio" id="louie" name="drone" value="louie" />
    <label for="louie">Louie</label>
  </div>
</fieldset>
```

### ポイント

- 同じ `name` 属性を持つラジオボタンがグループ
- グループ内で選択できるのは 1 つだけ
- `id` と `for` を紐付ける
- `<fieldset>` と `<legend>` でグループ化

ラジオボタンがおさらいできたところで、Vue でコンポーネントとして実装していきます。

## まずは素朴(naive)なコンポーネントを作ってみる

まずは動くものを作ります。

```vue:Radio.vue
<script setup lang="ts">
const model = defineModel<string | undefined>({ required: true });
</script>

<template>
  <fieldset>
    <legend>Fruits</legend>

    <input type="radio" id="apple" name="fruit" value="apple" v-model="model" />
    <label for="apple">apple</label>

    <input type="radio" id="orange" name="fruit" value="orange" v-model="model" />
    <label for="orange">orange</label>

    <input type="radio" id="grape" name="fruit" value="grape" v-model="model" />
    <label for="grape">grape</label>
  </fieldset>
</template>
```

```vue:App.vue
<script setup lang="ts">
import { ref } from "vue";
import Radio from "./Radio.vue";

const selected = ref<string>();
</script>

<template>
  <Radio v-model="selected" />
  <p v-if="selected">Selected: {{ selected }}</p>
  <p v-else>Nothing selected</p>
</template>
```

ポイントは `defineModel` を使用していることです。
`defineModel` は Vue 3.4 で導入されたマクロで、親コンポーネントとの `v-model` による双方向バインディングを簡潔に書けます。

https://ja.vuejs.org/api/sfc-script-setup#definemodel

`{ required: true }` を指定することで親が `v-model` を渡さなかった場合に警告が出るようになります。

見てわかる通りこのコンポーネントは使いにくいですよね。

- ハードコード
- ボイラープレート

これらを Vue らしく解決してきます。

## 再利用可能にするために `v-for` と `props` を使用する

### `v-for` で繰り返しを解消する

同じ構造の繰り返しは `v-for` で解消できます。

```vue:Radio.vue
<script setup lang="ts">
const model = defineModel<string | undefined>({ required: true });

const options = ["apple", "orange", "grape"];
</script>

<template>
  <fieldset>
    <legend>Fruits</legend>

    <template v-for="option in options" :key="option">
      <input
        type="radio"
        :id="option"
        name="fruit"
        :value="option"
        v-model="model"
      />
      <label :for="option">{{ option }}</label>
    </template>
  </fieldset>
</template>
```

:::details App.vue(変更なし)

```vue:App.vue
<script setup lang="ts">
import { ref } from "vue";
import Radio from "./Radio.vue";

const selected = ref<string>();
</script>

<template>
  <Radio v-model="selected" />
  <p v-if="selected">Selected: {{ selected }}</p>
  <p v-else>Nothing selected</p>
</template>
```

:::

ボイラープレートはなくなりましたが、選択肢がまだコンポーネント内にハードコードされています。

### props で外部から値を受け取る

options, name, legend を props で外から渡すようにします。

```vue:Radio.vue
<script setup lang="ts">
const model = defineModel<string | undefined>({ required: true });

defineProps<{
  options: string[];
  name: string;
  legend?: string;
}>();
</script>

<template>
  <fieldset>
    <legend v-if="legend">{{ legend }}</legend>

    <template v-for="option in options" :key="option">
      <input
        type="radio"
        :id="option"
        :name
        :value="option"
        v-model="model"
      />
      <label :for="option">{{ option }}</label>
    </template>
  </fieldset>
</template>
```

```vue:App.vue
<script setup lang="ts">
import { ref } from "vue";
import Radio from "./Radio.vue";

const selected = ref<string>();
</script>

<template>
  <Radio
    v-model="selected"
    :options="['apple', 'orange', 'grape']"
    name="fruit"
    legend="Fruits"
  />
  <p v-if="selected">Selected: {{ selected }}</p>
  <p v-else>Nothing selected</p>
</template>
```

これで汎用的なコンポーネントになりました。

:::details defineProps の戻り値を変数で受けることについて(私見)

`<script setup>` 内で props の値を使わないのであれば、`defineProps` の戻り値を変数で受ける必要はありません。
`defineProps` を呼ぶだけでテンプレートから直接参照できます。

しかし、`const props = defineProps()` として受けるメリットもあります。
`props.` プレフィックスがあることで「これは親から渡された値だ」と明示でき、コンポーネントが大きくなるとローカル変数との区別がしやすくなります。
また、`props.` と入力することでエディタの補完が効くため、props の一覧をすぐに確認できます。

この記事ではコンポーネントが小さいので変数で受けずに進めます。

:::

## `useId` で `id` の重複を防ぐ

汎用的になったので同じページ内で複数のラジオボタンを使うのも簡単です。

```vue:App.vue
<script setup lang="ts">
import { ref } from "vue";
import Radio from "./Radio.vue";

const selectedFruit1 = ref<string>();
const selectedFruit2 = ref<string>();
</script>

<template>
  <Radio
    v-model="selectedFruit1"
    :options="['apple', 'orange', 'grape']"
    name="fruit1"
    legend="Fruits 1"
  />
  <Radio
    v-model="selectedFruit2"
    :options="['apple', 'orange', 'grape']"
    name="fruit2"
    legend="Fruits 2"
  />
</template>
```

しかし、今の実装には問題があります。
`id` に `option` の値をそのまま使っているため、異なるラジオボタングループで同じ選択肢があると `id` が重複してしまいます。

Vue 3.5 で導入された `useId` を使って一意な ID を生成しましょう。

https://ja.vuejs.org/api/composition-api-helpers#useid

```vue:Radio.vue
<script setup lang="ts">
import { useId } from "vue";

const model = defineModel<string | undefined>({ required: true });

defineProps<{
  options: string[];
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

`useId` はコンポーネントごとに一意な ID を生成してくれます。
これを `option` と組み合わせることで、ページ内で ID が重複することはなくなります。

## `useRadio` コンポーザブルを作る

今の使い方を見てみましょう。

```vue
<script setup lang="ts">
const selected = ref<string>();
</script>

<template>
  <Radio
    v-model="selected"
    :options="['apple', 'orange', 'grape']"
    name="fruit"
    legend="Fruits"
  />
</template>
```

`options` と `selected` を別々に定義しています。
凝集度を高めるために `options`, `name`, `legend`, `selected` をセットで管理するコンポーザブルを作ってみます。

`options` の型は `[string, string, ...string[]]` としています。
これは「少なくとも 2 つ以上の `string` 型要素を持つ配列」を表すタプル型です。
この記事ではラジオボタンを「複数の選択肢から 1 つを選ぶ UI」として扱うようにしましょう。
そのため選択肢が 2 つ以上あることを型で保証しています。

```ts:useRadio.ts
import { ref } from "vue";

export function useRadio({ options, name, legend, initial }: {
  options: [string, string, ...string[]];
  name: string;
  legend?: string;
  initial?: string;
}) {
  return { options, name, legend, selected: ref(initial) };
}
```

```vue:Radio.vue
<script setup lang="ts">
import { useId } from "vue";

const model = defineModel<string | undefined>({ required: true });

defineProps<{
  options: [string, string, ...string[]];
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

```vue:App.vue
<script setup lang="ts">
import Radio from "./Radio.vue";
import { useRadio } from "./useRadio";

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

## Generics で型安全性を高める

今の `useRadio` には型安全性の問題があります。

```ts
const { selected } = useRadio({
  options: ["apple", "orange", "grape"],
  name: "fruit",
  initial: "banana", // エラーにならない！
});
```

`options` に含まれていない `"banana"` を `initial` に渡してもエラーになりません。
`selected` の型も `Ref<string | undefined>` であり、`options` の要素に限定されていません。

TypeScript の Generics と Vue 3.3 の Generic Components を使って型安全性を高めましょう。

https://ja.vuejs.org/api/sfc-script-setup#generics

```ts:useRadio.ts
import { ref } from "vue";

export function useRadio<
  const Options extends readonly [string, string, ...string[]],
>({ options, name, legend, initial }: {
  options: Options;
  name: string;
  legend?: string;
  initial?: Options[number];
}) {
  return { options, name, legend, selected: ref(initial) };
}
```

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

:::details App.vue(変更なし)

```vue:App.vue
<script setup lang="ts">
import Radio from "./Radio.vue";
import { useRadio } from "./useRadio";

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

:::

ポイントは `const Options extends readonly [string, string, ...string[]]` です。
これは const Type Parameters と呼ばれるもので、 TypeScript 5.0 で導入された機能です。
渡された配列をリテラル型(タプル型)として推論してくれます。

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#const-type-parameters

これにより `options: ["apple", "orange", "grape"]` を渡すと、`Options` は `readonly ["apple", "orange", "grape"]` として推論されます。

型制約を `readonly` にしているのは、呼び出し側で `as const` を書く手間を省くためです。
`readonly` を外しても要素のリテラル型は保持されるためコンパイルエラーで誤りを検出できますが手間なので `readonly` にしています。

```ts
const { selected } = useRadio({
  options: ["apple", "orange", "grape"],
  name: "fruit",
  initial: "banana", // エラー！
});
```

`initial` は `"apple" | "orange" | "grape" | undefined` のみ許容されるようになりました。
`selected` の型も `Ref<"apple" | "orange" | "grape" | undefined>` に限定されます。

![デモ](/images/vue-radio-etude/dx.gif)

## SFC に `useRadio` を同居させる

だいぶいい感じのコンポーネントになってきました。
現在のファイル構成を見てみましょう。

```
├── Radio.vue
├── useRadio.ts
└── App.vue
```

`useRadio` は `Radio.vue` と強く結びついています。
このくらいの規模であれば、別ファイルにするよりも同じファイルに置いた方が凝集度も高く保守しやすそうです。

実は SFC では `<script setup>` とは別に通常の `<script>` ブロックを追加できて export ができます。

https://ja.vuejs.org/api/sfc-script-setup#usage-alongside-normal-script

このパターンは [Unplugin Vue Router の Data Loaders](https://uvr.esm.is/data-loaders/) でも使用されています。
マイナーですが強力なテクニックです。

```vue:Radio.vue
<script lang="ts">
import { ref } from "vue";

export function useRadio<
  const Options extends readonly [string, string, ...string[]],
>({ options, name, legend, initial }: {
  options: Options;
  name: string;
  legend?: string;
  initial?: Options[number];
}) {
  return { options, name, legend, selected: ref(initial) };
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

`useRadio.ts` が不要になり、import も `Radio.vue` からまとめて行えるようになりました。

```ts
import Radio, { useRadio } from "./Radio.vue";
```

特定のコンポーネントと密結合なコンポーザブルは、このように同じファイルにまとめることで管理しやすくなります。

## まとめ

この記事ではラジオボタンコンポーネントを段階的に改善しながら、Vue の機能や TypeScript の活用方法を紹介しました。

| セクション                             | 学んだこと                                  |
| -------------------------------------- | ------------------------------------------- |
| まずは素朴なコンポーネントを作ってみる | `defineModel` による双方向バインディング    |
| `v-for` と `props` を使用する          | 繰り返しの解消と props による汎用化         |
| `useId` で `id` の重複を防ぐ           | Vue 3.5 の `useId` で一意な ID を生成       |
| `useRadio` コンポーザブルを作る        | 関連するデータをまとめて凝集度を高める      |
| Generics で型安全性を高める            | const Type Parameters と Generic Components |
| SFC に `useRadio` を同居させる         | `<script>` と `<script setup>` の併用       |

最近の Vue は `defineModel`、`useId`、Generic Components などコンポーネント開発を支援する機能が充実しています。
SFC の柔軟性も高く、 `<script>` と `<script setup>` を組み合わせることで SFC ファイルに composable を同居させるなど、プロジェクトに合わせた設計が可能です。
属性の same-name shorthand など、細かな DX 向上も継続的に行われています。

TypeScript との相性も良く、Generics を活用することで型安全なコンポーネントを自然に書けます。

## さらにやりたいこと

さらに改善できる点として以下が考えられます。

- `options` の重複を型レベルで禁止する
- `<form>` 要素との連携(バリデーションやサブミット処理)
- アクセシビリティの向上(`aria-*` 属性の追加)
- スタイリング(見た目)

この記事ではこれ以上は扱いませんが、興味のある方向けに「`options` の重複を型レベルで禁止する」実装例を折りたたみ内で載せておきます。

<!-- textlint-disable ja-technical-writing/ja-no-mixed-period -->

:::details options の重複を型レベルで禁止する

```vue:Radio.vue
<script lang="ts">
import { ref } from "vue";

type FilterTarget<
  T extends string,
  Array extends readonly string[]
> = Array extends readonly [infer U, ...infer V extends readonly string[]]
  ? U extends T
    ? [U, ...FilterTarget<T, V>]
    : FilterTarget<T, V>
  : [];

type EnsureUniqueStrArr<T extends readonly string[]> = {
  [K in keyof T]: FilterTarget<T[K] & string, T>["length"] extends 1 ? T[K] : never;
};

type UniqueOptions<T extends readonly [string, string, ...string[]]> =
  T & EnsureUniqueStrArr<T>;

export function useRadio<
  const Options extends readonly [string, string, ...string[]],
>({ options, name, legend, initial }: {
  options: UniqueOptions<Options>;
  name: string;
  legend?: string;
  initial?: Options[number];
}) {
  return { options, name, legend, selected: ref(initial) };
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

:::

<!-- textlint-disable ja-technical-writing/ja-no-mixed-period -->

:::message alert
この実装は以下の記事の内容を活用して、AI(Claude Code)に生成させたものです。
ぼくはまだこの記事の内容および生成されたコードを理解できていません。
:::

<!-- textlint-enable ja-technical-writing/ja-no-mixed-period -->

https://zenn.dev/yossuli/articles/eb3e471d954c15

<!-- textlint-enable ja-technical-writing/ja-no-mixed-period -->

## 最後に

最後まで読んでいただきありがとうございました！
