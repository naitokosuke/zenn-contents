---
title: "Vue Vine を知る"
emoji: "🍇"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["vue"]
published: false
---

[Vue Advent Calendar 2025](https://qiita.com/advent-calendar/2025/vue) 14 日目の記事です。

https://qiita.com/advent-calendar/2025/vue

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

今回は [**Vue Vine**](https://vue-vine.dev/) を紹介します。

<!-- textlint-disable ja-technical-writing/ja-no-successive-word -->

SFC で小さなコンポーネントを書くときに面倒だなと思ったことはありませんか？
親コンポーネントでしか使わないのにわざわざ別ファイルに切り出して props を定義して import して、、、
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

しかし SFC はその名の通り、1 ファイル 1 コンポーネントです。別ファイルを作成して切り出す必要があります。

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
          {{ activity.text }} - <time :datetime="activity.date">{{ activity.date }}</time>
        </li>
      </ul>
    </section>
  `;
}
```

ファイルを分けることなくテンプレートの見通しを改善できました。

## Props

https://vue-vine.dev/specification/props.html

ここまでのコード例を見て props の渡し方に気づいた方もいるでしょう。

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

validator も追加できます。

```ts
const title = vineProp<string>((value) => value.startsWith("#"));
```

https://vue-vine.dev/specification/props.html#vineprop

## マクロ

Vue Vine には props 以外にもマクロが用意されています。
ここでは特に使用頻度の高いものを紹介します。

### `vineEmits()`

イベントの発行を定義します。`defineEmits` に相当するマクロです。

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

### `vineModel()`

`v-model` を使った双方向バインディングを定義します。

```ts
function MyInput() {
  const model = vineModel<string>();

  return vine`
    <input v-model="model" />
  `;
}
```

### `vineStyle()`

SFC の `<style>` ブロックに相当するマクロです。

```ts
function StyledButton() {
  vineStyle.scoped(`
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

`vineStyle.scoped()` でスコープ付きスタイル、`vineStyle()` でグローバルスタイルを定義できます。

:::message
公式ドキュメントでは次のように述べられています。

> Due to the fact that style code can be very long to write, we as library authors actually don't recommend using this macro, but recommend you to use atomic CSS solutions like UnoCSS, TailwindCSS, or import external stylesheets.
> (スタイルのコードは長くなりがちなので、ライブラリ作者としてはこのマクロの使用は推奨しておらず、[UnoCSS](https://unocss.dev/) や [Tailwind CSS](https://tailwindcss.com/) などの Atomic CSS ソリューションか外部スタイルシートのインポートを推奨しています。)

:::

### その他のマクロ

この他にも `vineExpose`、`vineSlots`、`vineOptions` などのマクロがあります。
詳しくは[公式ドキュメント](https://vue-vine.dev/specification/macros.html)を参照してください。

マクロは `.vine.ts` ファイル内のコンポーネント関数でのみ使用できます。
別の `.ts` ファイルに切り出すことはできないので注意してください。

## なぜ JSX ではなくテンプレートなのか

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->

ここまで Vue Vine のコードを見てきてこう思った方もいるかもしれません。
「JSX でよくない？」

<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->

<!-- textlint-disable ja-technical-writing/ja-no-mixed-period -->

:::details vue-jsx-vapor での実装例

https://github.com/vuejs/vue-jsx-vapor

```tsx:User.tsx
export const User = ({ userId }: { userId: string }) => {
  const { profile, stats, activities } = useUser(userId);

  return (
    <div>
      <Header name={profile.name} avatar={profile.avatar} bio={profile.bio} />
      <Stats posts={stats.posts} followers={stats.followers} following={stats.following} />
      <Activity activities={activities} />
    </div>
  );
};

const Header = ({ name, avatar, bio }: { name: string; avatar: string; bio: string }) => {
  return (
    <header>
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{bio}</p>
    </header>
  );
};

const Stats = ({ posts, followers, following }: { posts: number; followers: number; following: number }) => {
  return (
    <dl>
      <dt>Posts</dt>
      <dd>{posts}</dd>
      <dt>Followers</dt>
      <dd>{followers}</dd>
      <dt>Following</dt>
      <dd>{following}</dd>
    </dl>
  );
};

const Activity = ({ activities }: { activities: { id: number; text: string; date: string }[] }) => {
  return (
    <section>
      <h3>Recent Activity</h3>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.text} - <time>{activity.date}</time>
          </li>
        ))}
      </ul>
    </section>
  );
};
```

:::

<!-- textlint-enable ja-technical-writing/ja-no-mixed-period -->

1 ファイルに複数のコンポーネントを書くという目的は JSX で達成できます。
ではなぜ Vue Vine が選択肢になるのでしょうか？

### テンプレートのコンパイル時最適化

Vue Vine の公式ドキュメントでは次のように述べられています。

> The main problem with JSX is that it's too flexible, and it's hard to provide enough compile-time information for Vue to optimize, and template is native supported by Vue with a lot of compile-time optimizations.
> (JSX の主な問題は柔軟すぎることで、Vue が最適化するためのコンパイル時情報を提供することが難しい。一方、テンプレートは Vue にネイティブサポートされており、多くのコンパイル時最適化が施されている。)

JSX は JavaScript の式なので何でも書けます。
その柔軟性ゆえにコンパイラが「この部分は静的」「この部分は動的」と判断しにくくなります。

一方テンプレートは構文が制限されている分コンパイラが最適化しやすい。
Vue のテンプレートコンパイラは静的な部分をホイスティングしたり動的な部分だけを追跡したりといった最適化を行います。

Vue Vine はテンプレートを使うのでこれらの最適化の恩恵を受けられます。
「関数スタイルで書きたいがテンプレートの最適化も捨てたくない」という方には Vue Vine が選択肢になるでしょう。

## まとめ

Vue Vine を紹介しました。

Vue Vine は 1 ファイルに複数のコンポーネントを関数として定義できるツールです。
SFC で小さなコンポーネントを別ファイルに切り出すのが面倒だと感じていた方には良い選択肢になるでしょう。

## 最後に

Vue Vine は[エコシステム連携](https://vue-vine.dev/introduction/ecosystem.html)も充実しています。
ESLint 設定や TypeScript チェッカー(`vue-vine-tsc`)、Slidev プラグインなどが提供されています。

プラグインを使用して Slidev で Vue Vine を使用できることまでは試すことができました。
今回の記事の Vine コンポーネントを実際にスライドで表示しています。

https://github.com/naitokosuke/try-vue-vine-slidev

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->

ぼくは普段 [Slidev](https://sli.dev/) を使ってスライドを作っているので Vue Vine の [Slidev プラグイン](https://vue-vine.dev/introduction/ecosystem.html#slidev-plugin)を使ってみようと思います。

<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->

最後まで読んでいただきありがとうございました！
