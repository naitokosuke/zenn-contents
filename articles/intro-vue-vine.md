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

SFC で小さなコンポーネントを書くときに面倒だなと思ったことはありませんか？
親コンポーネントでしか使わないのにわざわざ別ファイルに切り出して props を定義して import して...。
ファイル間を行き来するのは地味にストレスです。

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
const { user, stats, activities } = useUser(userId);
</script>

<template>
  <article>
    <header>
      <img :src="user.avatar" :alt="user.name" />
      <h2>{{ user.name }}</h2>
      <p>{{ user.bio }}</p>
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
    <UserHeader :user />
    <UserStats :stats />
    <UserActivity :activities />
  </div>
</template>
```

しかし SFC では別ファイルを作成する必要があります。

```
components/
├── User.vue
├── UserHeader.vue
├── UserStats.vue
└── UserActivity.vue
```

`User` でしか使わないのに 4 ファイルに分かれてしまいます。

### Vue Vine なら 1 ファイルにまとめられる

Vue Vine を使えば、同じファイル内にコンポーネントを定義できます。

```ts:User.vine.ts
function UserHeader() {
  const user = vineProp<{ name: string; avatar: string; bio: string }>();

  return vine`
    <header>
      <img :src="user.avatar" :alt="user.name" />
      <h2>{{ user.name }}</h2>
      <p>{{ user.bio }}</p>
    </header>
  `;
}

function UserStats() {
  const stats = vineProp<{ posts: number; followers: number; following: number }>();

  return vine`
    <dl>
      <dt>Posts</dt>
      <dd>{{ stats.posts }}</dd>

      <dt>Followers</dt>
      <dd>{{ stats.followers }}</dd>

      <dt>Following</dt>
      <dd>{{ stats.following }}</dd>
    </dl>
  `;
}

function UserActivity() {
  const activities = vineProp<{ id: number; text: string; date: string }[]>();

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

export function User() {
  const { userId } = vineProp<{ userId: string }>();
  const { user, stats, activities } = useUser(userId);

  return vine`
    <div>
      <UserHeader :user="user" />
      <UserStats :stats="stats" />
      <UserActivity :activities="activities" />
    </div>
  `;
}
```

ファイルを分けることなくテンプレートの見通しを改善できました。

## マクロ

<!-- TODO: Vue Vine のマクロを紹介 -->
<!-- vineProp, vineEmits, vineExpose, vineSlots, vineStyle, vineModel -->

## SFC との比較

<!-- TODO: SFC との違い -->
<!-- - ユースケース -->

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
