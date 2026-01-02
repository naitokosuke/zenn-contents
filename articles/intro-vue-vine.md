---
title: "Vue Vine を知る"
emoji: "🍇"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["vuejs"]
published: false
---

[Vue Advent Calendar 2025](https://qiita.com/advent-calendar/2025/vue) 14 日目の記事です。

https://qiita.com/advent-calendar/2025/vue

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

今回は [**Vue Vine**](https://vue-vine.dev/) を紹介します。

<!-- textlint-disable ja-technical-writing/ja-no-successive-word -->

SFC で小さなコンポーネントを書くときに面倒だなと思ったことはありませんか？
親コンポーネントでしか使わないのにわざわざ別ファイルに切り出して props を定義して import、、、
ファイル間を行き来するのは地味にストレスです。

<!-- textlint-enable ja-technical-writing/ja-no-successive-word -->

「同じファイルにサッとコンポーネントを追加できたらな〜」と思ったことがある方もいるのではないでしょうか。
Vue Vine は、1 ファイルに複数のコンポーネントを書けるようにする新しい選択肢です。

https://vue-vine.dev/

## Vue Vine とは？

> Another style to write Vue.

Vue Vine は Vue コンポーネントを書くための新しいスタイルを提供するツールです。
1 ファイルに複数のコンポーネントを関数として定義できます。

https://github.com/vue-vine/vue-vine

### 作者

Vue Vine は [ShenQingchuan(沈青川)](https://github.com/ShenQingchuan) さんが開発しています。
Vite や Rollup の中国語ドキュメントのメンテナンスにも携わっている方です。

![ShenQingchuan さんの GitHub プロフィール](/images/intro-vue-vine/shenqingchuan.png)

## コード例

具体的なコードで見てみましょう。
ユーザー情報を表示するコンポーネントを作っているとします。
最初はいつも通りに SFC で書いていきます。

```vue:User.vue
<script setup lang="ts">
const { userId } = defineProps<{ userId: string }>();
const { profile, stats, activities } = useUser(userId);
</script>

<template>
  <article>
    <header>
      <img :src="profile.avatar" :alt="profile.name" />
      <h2>{{ profile.name }}</h2>
      <p>{{ profile.bio }}</p>
    </header>

    <dl>
      <dt>Posts</dt>
      <dd>{{ stats.posts }}</dd>

      <dt>Followers</dt>
      <dd>{{ stats.followers }}</dd>

      <dt>Following</dt>
      <dd>{{ stats.following }}</dd>
    </dl>

    <section>
      <h3>Recent Activity</h3>
      <ul>
        <li v-for="activity in activities" :key="activity.id">
          {{ activity.text }} - <time :datetime="activity.date">{{ activity.date }}</time>
        </li>
      </ul>
    </section>
  </article>
</template>
```

テンプレートが長くなってきました。
ヘッダー、スタッツ、アクティビティと 3 つのパーツがあり、これからさらに機能を追加していくと見通しが悪くなりそうです。

### コンポーネントに分割したい

こういうとき、セクションごとにコンポーネントへ分割したくなります。
Vue Vine の公式ドキュメントでも、このモチベーションについて述べられています。

> Developers usually write a long component first and then split out the reusable parts from it.
> (開発者は通常、長いコンポーネントを書いてから再利用可能な部分を切り出します。)

分割すればテンプレートがすっきりします。

```vue
<template>
  <div>
    <Header :name="profile.name" :avatar="profile.avatar" :bio="profile.bio" />
    <Stats
      :posts="stats.posts"
      :followers="stats.followers"
      :following="stats.following"
    />
    <Activity :activities />
  </div>
</template>
```

しかし SFC では別ファイルを作成する必要があります。

```
user/
├── index.vue
├── header.vue
├── stats.vue
└── activity.vue
```

`user/index.vue` でしか使わないのに 4 ファイルに分かれてしまいます。

### Vue Vine なら 1 ファイルにまとめられる

Vue Vine を使えば、同じファイル内にコンポーネントを定義できます。

```ts:User.vine.ts
export function User({ userId }: { userId: string }) {
  const { profile, stats, activities } = useUser(userId);

  return vine`
    <div>
      <Header :name="profile.name" :avatar="profile.avatar" :bio="profile.bio" />
      <Stats :posts="stats.posts" :followers="stats.followers" :following="stats.following" />
      <Activity :activities />
    </div>
  `;
}

function Header({ name, avatar, bio }: { name: string; avatar: string; bio: string }) {
  return vine`
    <header>
      <img :src="avatar" :alt="name" />
      <h2>{{ name }}</h2>
      <p>{{ bio }}</p>
    </header>
  `;
}

function Stats({ posts, followers, following }: { posts: number; followers: number; following: number }) {
  return vine`
    <dl>
      <dt>Posts</dt>
      <dd>{{ posts }}</dd>

      <dt>Followers</dt>
      <dd>{{ followers }}</dd>

      <dt>Following</dt>
      <dd>{{ following }}</dd>
    </dl>
  `;
}

function Activity({ activities }: { activities: { id: number; text: string; date: string }[] }) {
  return vine`
    <section>
      <h3>Recent Activity</h3>
      <ul>
        <li v-for="activity in activities" :key="activity.id">
          {{ activity.text }} - <time>{{ activity.date }}</time>
        </li>
      </ul>
    </section>
  `;
}
```

ファイルを分けることなくテンプレートの見通しを改善できました。

## Props

ここまでのコード例を見て props の渡し方に気づいた方もいるかもしれません。

```ts
function Header({
  name,
  avatar,
  bio,
}: {
  name: string;
  avatar: string;
  bio: string;
}) {
  // ...
}
```

Vue Vine では、関数の第一引数で props を受け取ります。
Vue 3.5 で導入された [Reactive Props Destructure](https://ja.vuejs.org/guide/components/props#reactive-props-destructure) と同様に、分割代入でリアクティブな props を取得できます。

### TypeScript ファーストな設計

Vue Vine の特徴的な点は、**ランタイムの型チェックを廃止している**ことです。

従来の Vue では `defineProps` で `String` や `Number` といった型コンストラクタを指定できました。
しかし Vue Vine はこれをサポートしていません。

> we're already all-in TypeScript
> (私たちはすでに TypeScript に全面的に依存しています)

公式ドキュメントではこのように述べられています。
型チェックはランタイムではなく、TypeScript と IDE 側で行うべきという考え方です。

実際、ランタイムの型チェックは警告を出すだけでプログラムを止めるわけではありません。
TypeScript を使っているなら、開発時に型エラーを検出できます。
Vue Vine はこの現実を受け入れ、よりシンプルな設計を選択しています。

### `vineProp()` マクロ

分割代入以外に、`vineProp` マクロを使って props を定義する方法もあります。

```ts
function MyComponent() {
  // 必須の props
  const title = vineProp<string>();

  // オプションの props
  const subtitle = vineProp.optional<string>();

  // デフォルト値付きの props
  const count = vineProp.withDefault(0);

  return vine`
    <div>
      <h1>{{ title }}</h1>
      <p v-if="subtitle">{{ subtitle }}</p>
      <span>{{ count }}</span>
    </div>
  `;
}
```

バリデーターを追加することもできます。

```ts
const title = vineProp<string>((value) => value.startsWith("#"));
```

分割代入と `vineProp`、どちらを使うかはチームの好みで選んでください。
分割代入はシンプルで直感的、`vineProp` は個別の props に対してより細かい制御ができます。

## マクロ

Vue Vine には props 以外にも便利なマクロが用意されています。
Vue の Composition API に慣れている方なら、すぐに使い方がわかるはずです。

### vineEmits

イベントの発行を定義します。

```ts
function MyButton() {
  const emit = vineEmits<{
    click: [event: MouseEvent];
    change: [value: string];
  }>();

  return vine`
    <button @click="emit('click', $event)">Click me</button>
  `;
}
```

配列形式でも定義できます。

```ts
const emit = vineEmits(["click", "change"]);
```

### vineExpose

親コンポーネントに公開するプロパティを定義します。

```ts
function MyInput() {
  const inputRef = ref<HTMLInputElement>();

  vineExpose({
    focus: () => inputRef.value?.focus(),
  });

  return vine`
    <input ref="inputRef" />
  `;
}
```

### vineSlots

スロットを定義します。スコープ付きスロットにも対応しています。

```ts
function MyCard() {
  const slots = vineSlots<{
    default(): void;
    header(props: { title: string }): void;
  }>();

  return vine`
    <div class="card">
      <header>
        <slot name="header" title="Card Title" />
      </header>
      <main>
        <slot />
      </main>
    </div>
  `;
}
```

### vineModel

`v-model` を使った双方向バインディングを定義します。

```ts
function MyInput() {
  const model = vineModel<string>();

  return vine`
    <input :value="model" @input="model = $event.target.value" />
  `;
}
```

名前付きの `v-model` も定義できます。

```ts
const count = vineModel<number>("count");
// 親から v-model:count で使用
```

### vineStyle

コンポーネントにスタイルを追加します。

```ts
function StyledButton() {
  vineStyle(`
    .btn {
      padding: 8px 16px;
      border-radius: 4px;
    }
  `);

  return vine`
    <button class="btn">Styled</button>
  `;
}
```

スコープ付きスタイルは `vineStyle.scoped()` を使います。

```ts
vineStyle.scoped(`
  .btn {
    background: blue;
  }
`);
```

外部ファイルをインポートすることもできます。

```ts
vineStyle.import("./button.css");
```

### vineOptions

コンポーネント名や `inheritAttrs` を設定できます。

```ts
function MyComponent() {
  vineOptions({
    name: "CustomName",
    inheritAttrs: false,
  });

  return vine`<div>...</div>`;
}
```

### 注意点

マクロは `.vine.ts` ファイル内のコンポーネント関数でのみ使用できます。
別の `.ts` ファイルに切り出すことはできないので注意してください。

## まとめ

<!-- TODO: 内容の要約 -->

## 最後に

最後まで読んでいただきありがとうございました！

---

<!--
## 執筆メモ（publish 時に削除）

### 記事の流れ（読者に共感してもらうための構成）

1. **はじめに** ✅
   - 「親コンポーネントでしか使わないのにファイルが分散する」という共感ポイント

2. **Vue Vine とは？** ✅
   - 概要、作者紹介

3. **コード例** → 要修正
   - 現状: PrimaryButton/SecondaryButton は弱い（共感されない）
   - 修正案: 「親コンポーネントでしか使わない子コンポーネント群」の例に差し替え
   - 例: TodoItem の中で使う Checkbox、EditButton、DeleteButton
   - または Slidev の Presentation.vine.ts を使う（Highlight、TextWithIcon、Card）

4. **マクロ**
   - 導入: 「実際のコンポーネントでは props を受け取ることが多い」
   - vineProp の3パターン（必須、optional、withDefault）
   - vineStyle.scoped() でスタイルを定義
   - 注意点: マクロはコンポーネント関数内で使用する必要がある（公式ドキュメントに明記あり）
   - tsconfig.json に vue-vine/macros を追加する必要がある

5. **Slidev で使ってみる（新規追加）**
   - どうして Slidev で活用したいと思ったか:
     - Slidev はプレゼン用の小さなコンポーネントを多用する
     - これらは「親コンポーネント（スライド）でしか使わない」コンポーネント
     - → 「はじめに」で述べた問題の実例
   - vue-vine/slidev プラグインの存在を紹介
   - デモプロジェクト try-vue-vine-slidev の内容を紹介
   - 詳細設定は省略、公式ドキュメントへ誘導

6. **SFC との比較**
   - Vue Vine が向いているケース: 親でしか使わない小さなコンポーネント群
   - SFC が向いているケース: 再利用性の高いコンポーネント
   - 共存できる（同じプロジェクトで両方使える）

7. **まとめ**
   - 内容の要約

### TODO
- [ ] コード例セクションをより共感できる例に差し替え
- [ ] マクロセクションを書く
- [ ] Slidev セクションを書く
- [ ] SFC との比較セクションを書く
- [ ] まとめを書く
- [ ] try-vue-vine-slidev プロジェクトも必要に応じて修正

### 参考リソース
- try-vue-vine-slidev: /Users/naitokosuke/src/github.com/naitokosuke/try-vue-vine-slidev
- Vue Vine エコシステム: https://vue-vine.dev/introduction/ecosystem.html
- マクロの注意点: https://vue-vine.dev/specification/macros.html

-->
