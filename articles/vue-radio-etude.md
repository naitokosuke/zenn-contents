---
title: "【習作】Vue でラジオボタンを実装してみる"
emoji: "🕌"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["vue"]
publication_name: "comm_vue_nuxt"
published: false
---

[Vue Advent Calendar 2025](https://qiita.com/advent-calendar/2025/vue) 17 日目の記事です。

https://qiita.com/advent-calendar/2025/vue

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

急にラジオボタンコンポーネントを Vue で実装したくなったので実装してみます。
よろしくお願いします。

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
  <p>Selected: {{ selected ?? "NONE" }}</p>
</template>
```

ポイントは `defineModel` を使用していることです。
`defineModel` は Vue 3.4 で導入されたマクロで、親コンポーネントとの `v-model` による双方向バインディングを簡潔に書けます。
`{ required: true }` を指定することで親が `v-model` を渡さなかった場合に警告が出流ようになります。

https://ja.vuejs.org/api/sfc-script-setup#definemodel

見てわかる通りこのコンポーネントは使いにくいですよね。

- ハードコード
- ボイラープレート

これらを Vue らしく解決してきます。

## 使いやすくするために `v-for` と `props` を使用する

### `v-for` を使用してボイラープレートをなくす

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
  <p>Selected: {{ selected ?? "NONE" }}</p>
</template>
```

:::

ボイラープレートはなくなりましたが、選択肢がまだコンポーネント内にハードコードされています。

### `props` を活用して汎用的なコンポーネントにする

選択肢、`name`、`legend` を `props` で外から渡すようにします。

```vue:Radio.vue
<script setup lang="ts">
const model = defineModel<string | undefined>({ required: true });

const props = defineProps<{
  options: string[];
  name: string;
  legend?: string;
}>();
</script>

<template>
  <fieldset>
    <legend v-if="props.legend">{{ props.legend }}</legend>

    <template v-for="option in props.options" :key="option">
      <input
        type="radio"
        :id="option"
        :name="props.name"
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
  <p>Selected: {{ selected ?? "NONE" }}</p>
</template>
```

これで汎用的なコンポーネントになりました。

## `useId` で `id` の重複を防ぐ

汎用的になったので同じページ内で複数のラジオボタンを使うのも簡単です。

```vue:App.vue
<script setup lang="ts">
import { ref } from "vue";
import Radio from "./Radio.vue";

const selectedFruit = ref<string>();
const selectedColor = ref<string>();
</script>

<template>
  <Radio
    v-model="selectedFruit"
    :options="['apple', 'orange', 'grape']"
    name="fruit"
    legend="Fruits"
  />
  <Radio
    v-model="selectedColor"
    :options="['red', 'blue', 'green']"
    name="color"
    legend="Colors"
  />
</template>
```

しかし、今の実装には問題があります。
`id` に `option` の値をそのまま使っているため、異なるラジオボタングループで同じ値があると `id` が重複してしまいます。

Vue 3.5 で導入された `useId` を使って一意な ID を生成しましょう。

https://ja.vuejs.org/api/composition-api-helpers#useid

```vue:Radio.vue
<script setup lang="ts">
import { useId } from "vue";

const model = defineModel<string | undefined>({ required: true });

const props = defineProps<{
  options: string[];
  name: string;
  legend?: string;
}>();

const idPrefix = useId();
</script>

<template>
  <fieldset>
    <legend v-if="props.legend">{{ props.legend }}</legend>

    <template v-for="option in props.options" :key="option">
      <input
        type="radio"
        :id="`${idPrefix}-${option}`"
        :name="props.name"
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
凝集度を高めるために `options`、`name`、`legend`、`selected` をセットで管理するコンポーザブルを作ってみます。

`options` の型は `[string, string, ...string[]]` としています。
これは「少なくとも 2 つ以上の `string` 型要素を持つ配列」を表すタプル型です。
ラジオボタンは複数の選択肢から 1 つを選ぶものなので、選択肢が 1 つだけでは意味がありません。

```ts:useRadio.ts
import { ref } from "vue";

type UseRadioOptions = {
  options: [string, string, ...string[]];
  name: string;
  legend?: string;
  initial?: string;
};

export function useRadio({ options, name, legend, initial }: UseRadioOptions) {
  return { options, name, legend, selected: ref(initial) };
}
```

```vue:Radio.vue
<script setup lang="ts">
import { useId } from "vue";

const model = defineModel<string | undefined>({ required: true });

const props = defineProps<{
  options: [string, string, ...string[]];
  name: string;
  legend?: string;
}>();

const idPrefix = useId();
</script>

<template>
  <fieldset>
    <legend v-if="props.legend">{{ props.legend }}</legend>

    <template v-for="option in props.options" :key="option">
      <input
        type="radio"
        :id="`${idPrefix}-${option}`"
        :name="props.name"
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
  <p>Selected: {{ selected ?? "NONE" }}</p>
</template>
```

`:options` は `:options="options"` の省略記法です。
Vue 3.4 で導入された Same-name Shorthand を使用しています。

https://ja.vuejs.org/guide/essentials/template-syntax#same-name-shorthand

`useRadio` は `options` と `selected` をセットで返します。
`initial` を省略すると未選択状態になります。

## 最後に

最後まで読んでいただきありがとうございました！
