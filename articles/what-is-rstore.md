---
title: "What is rstore?"
emoji: "📦"
type: "tech"
topics: ["vue", "vue3", "rstore"]
published: false
---

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

<!-- 記事のモチベーションを書く -->

## rstore の特徴

rstore は Vue アプリケーション向けのデータストアライブラリです。
データモデルを定義し、クエリやミューテーションを通じて状態を操作できます。

一般的な「ストアライブラリ」や「データフェッチライブラリ」とは異なり、rstore はそのいずれかに単純に分類できるものではありません。
アプリ起動時にサーバーからデータを取得してストアを初期化し、その結果をアプリケーション全体に共有できます。
これにより、サーバー由来の状態をクライアント側のストアと同じように扱えます。
この性質から、両者の間を橋渡しする存在として位置づけられます。

従来の状態管理やデータフェッチ専用のライブラリとは異なり、rstore は次のような独自のアプローチを提供します。

- 正規化されたリアクティブキャッシュによりすべてのコンポーネントが最新の状態を維持
- 必要なコンポーネント内にクエリを配置(コロケーション)
- プラグインを通じて任意のソース(REST、GraphQL など)からデータを取得
- 小さなプロトタイプから大規模なエンタープライズアプリまでスケール
- ローカルファーストとリアルタイム性のために設計されたクエリ API
- フォームの状態と validation を制御するフォーム API
- 完全なオートコンプリート付き TypeScript サポート
- devtools 付きの Nuxt module

### 正規化されたリアクティブキャッシュ

すべてのコンポーネントが最新のデータ変更で常に最新の状態に保たれることを保証します。

- データの重複を排除
- 各データは SSoT (Single Source of Truth) として管理
- データ変更時に関連コンポーネントを自動更新
- 正規化による高速な query/mutation

### ローカルファーストの設計

rstore はローカルファーストアプローチで設計されており、ローカルデータアクセスと計算を優先します。

- ローカルデータへの優先アクセスで高速化
- ネットワーク状態に依存しない安定したパフォーマンス
- フィルタリング・ソートを含むすべての読み取りをクライアント側で処理

### 完全な適応性(プラグインアーキテクチャ)

プラグインを通じて、REST や GraphQL を含むあらゆるソースからデータを取得できるよう設計されています。

- REST、GraphQL、WebSockets など多様なデータソースに対応
- 独自のデータ取得ロジックをプラグインとして実装可能
- データソースに依存しない柔軟な設計

### リアルタイムクエリ API

ローカルデータアクセスを優先し、リアルタイム更新を提供するよう設計されています。

- データ変更の即時反映
- クエリの自動的な変更検知
- 変更箇所のみの再レンダリングでパフォーマンス最適化

## 基本的な使い方

### インストール

```bash
pnpm i @rstore/vue
```

### モデルの作成

```ts:src/rstore/model.ts
import type { ModelList } from "@rstore/vue";
import { defineItemType } from "@rstore/vue";

// Item type
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

// Model
const todoModel = defineItemType<Todo>().model({
  name: "todos",
});

export const models = [todoModel] satisfies ModelList;
```

### API と連携するプラグインの作成

```ts:src/rstore/plugin.js
import { definePlugin } from "@rstore/vue";

export default definePlugin({
  name: "my-rstore-plugin",

  setup({ hook }) {
    // Register rstore hooks here
  },
});
```

### ストアの作成 & 公開

```ts:src/rstore/index.ts
import type { App, InjectionKey } from "vue";
import { inject } from "vue";

import type { VueStore } from "@rstore/vue";
import { createStore } from "@rstore/vue";

import { models } from "./model";
import myPlugin from "./plugin";

const injectionRstoreKey = Symbol("rstore") as InjectionKey<VueStore<typeof models>>;

export async function rstore(app: App) {
  const store = await createStore({
    models,
    plugins: [ myPlugin ],
  });

  app.provide(injectionRstoreKey, store);
}

export function useStore() {
  const store = inject(injectionRstoreKey, null);
  if (store == null ) {
    throw new Error("No store found");
  }
  return store;
}
```

### アプリへストアを追加

```ts:src/main.ts
import { rstore } from "./rstore";

const app = createApp(App);
await rstore(app);
```

### コンポーネント(コンポーザブル)でストアを使用

```ts
import { useStore } from "@/rstore";

const store = useStore();

const { data: todos } = store.todos.queryMany();
```

## 誕生の経緯

<!-- なぜこのライブラリが作られたのかを調べる -->
<!-- Vue/Nuxt における既存デファクトとの関係を整理する -->
<!-- デファクトが存在しない領域に挑む意義を示す -->

## 詳しい比較

### ストアライブラリとの比較(Pinia)

### Data Fetching / Data Caching ライブラリとの比較

<!-- Pinia Colada, Apollo Client, TanStack Query との比較 -->

## まとめ

<!-- rstore の位置づけを整理する -->

## 最後に

<!-- 所感と今後の展望 -->

最後まで読んでいただきありがとうございました！
