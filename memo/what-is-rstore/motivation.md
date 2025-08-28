# Vue.js 用ストアライブラリ「rstore」開発の背景と動機

## 背景: Pinia の台頭と新ストア開発の決断

Vue 3 時代の公式状態管理ライブラリは Pinia であり、事実上の標準（デファクト）となっています。一方で、rstore は Vue コアチームの [Guillaume Chau（Akryum）](https://github.com/akryum) 氏が中心となり、[Directus](https://directus.io/) の支援を受けて開発された新しい「データストア」です。
Akryum 氏は 2025 年 3 月 12 日に X で rstore を初公開し、「Directus のバックアップ（支援）により開発してきた」と明言しています（[ポスト](https://x.com/Akryum/status/1899784475807973730)）。

Vue.js Amsterdam 2025 のタイミングでもリリースが周知され（[Alexandre Chopin のポスト](https://x.com/thewikeo/status/1901672518764708031)）ました。

GitHub リポジトリや公式サイトでも [Backed by Directus](https://rstore.dev/) の表記が確認できます（[directus/rstore](https://github.com/directus/rstore)）。

## Pinia では満たせなかったニーズ

Pinia は軽量で柔軟ですが、データ取得やキャッシュ構造を提供しない低レベル API にとどまるため、取得・同期待ち受けのコードは各アプリで自前実装になりがちです。

rstore のドキュメントでも、Pinia との違いとして「構造化された取得・キャッシュ機能を提供しない」ことが明確に述べられています（[About rstore → Comparisons → Pinia](https://rstore.dev/guide/learn-more#comparisons)）。
コミュニティでも、rstore がデータモデル中心かつローカルファースト志向である点が議論されています。
Meteor の Minimongo に「少し似ている」との指摘に対し、Akryum 氏自身が「ローカルファーストでもあるので少し似ている」と応答しています（[Reddit スレッドの当該返信](https://www.reddit.com/r/vuejs/comments/1jaf680/introducing_rstore_the_reactive_data_store_for/j8u0g3b/)）。

## rstore の目的と特徴: 状態管理より“データ管理”

Akryum 氏は「rstore は pinia/vuex と同等の代替物ではない。置き換えとして考えるべきではなく、正規化キャッシュを用いたデータ取得に完全特化している」と明言しています（[Reddit での本人コメント](https://www.reddit.com/r/vuejs/comments/1jaf680/introducing_rstore_the_reactive_data_store_for/j8x8o4w/)）。rstore は状態管理ライブラリというより、\*\*フロントエンド上のデータ層（クライアントサイド ORM 的）\*\*を提供する設計です。主な特徴は次のとおりです。

- 正規化されたリアクティブキャッシュ: すべての UI が常に最新になることを狙った正規化キャッシュを中核に据えています（[公式サイト](https://rstore.dev/) / [Learn More → Cache](https://rstore.dev/guide/learn-more#cache)）。
- ローカルファースト設計: フィルタやソートなどの読み取りはクライアント側で計算し、必要に応じてサーバと同期します（[Learn More → Local-First](https://rstore.dev/guide/learn-more#local-first)）。Reddit でも Akryum 氏が local-first の考え方を具体例とともに説明しています（[該当コメント](https://www.reddit.com/r/vuejs/comments/1jaf680/introducing_rstore_the_reactive_data_store_for/j90e1ef/)）。
- プラグインによるデータ取得の抽象化: REST/GraphQL/WebSocket/ローカルストレージ等、任意のデータソースから取得する処理をプラグインで差し替え可能（[Learn More → Plugins](https://rstore.dev/guide/learn-more#plugins)）。
- モデル（スキーマ）駆動: アプリのデータ型ごとに Model を定義して扱います（[Guide → Model](https://rstore.dev/guide/model/model)）。
- コンポーネントとクエリの共置: 必要なコンポーネント内にクエリ/ミューテーションを\*\*共置（co-locate）\*\*できる API（[トップページの特徴](https://rstore.dev/)）。
- Pinia 等との共存:「同一アプリ内で Pinia と共存しても問題なく、Pinia ストアから rstore のクエリを呼ぶことも可能」と Akryum 氏が述べています（[Reddit の当該コメント](https://www.reddit.com/r/vuejs/comments/1jaf680/introducing_rstore_the_reactive_data_store_for/j8x2k1h/)）。

> 補足: rstore 公式の比較セクションでは、Pinia Colada / TanStack Query / Apollo との設計思想の違い（ローカルファースト vs サーバファースト、正規化キャッシュ、モデル構造 など）が整理されています（[Comparisons](https://rstore.dev/guide/learn-more#comparisons)）。

## Directus 社のユースケースと支援

Directus は SQL DB を即座に REST/GraphQL API 化し、拡張性の高いバックエンドを提供します（[公式サイト](https://directus.io/)）。rstore はこのエコシステムと親和性が高く、公式に「Backed by Directus」の記載（[GitHub README](https://github.com/directus/rstore) / [公式サイト](https://rstore.dev/)）と、Nuxt 連携モジュールが用意されています。特に [Nuxt + Directus モジュール](https://rstore.dev/plugins/nuxt-directus) は、Directus の管理者トークンでコレクションを自動インスペクトし、対応する rstore の Model／型定義／プラグインコードを自動生成します（同ページのセットアップ手順参照）。この仕組みにより、Directus でスキーマを定義すれば、Nuxt 側では `store.コレクション名.queryMany()` 等が即利用できます（[コード例](https://rstore.dev/plugins/nuxt-directus)）。

さらに rstore の設計上、リアルタイム更新やコラボレーションも視野に入っています。
ドキュメントには\*\*「ミューテーション履歴を同期エンジンで再生可能」\*\*と記載があります（[Learn More → Realtime and collaboration](https://rstore.dev/guide/learn-more#realtime-and-collaboration)）。
Reddit でも Akryum 氏が Yjs との公式統合が将来的にあり得るとコメントしています（[該当コメント](https://www.reddit.com/r/vuejs/comments/1jaf680/introducing_rstore_the_reactive_data_store_for/j8zmcui/)）。

## おわりに

まとめると、rstore 開発の経緯と動機は次の通りです。

- Pinia では不足する高レベルなデータ管理ニーズ（正規化キャッシュ、一貫したデータ同期、ローカルファースト/オフライン、リアルタイム）に応えるため、設計・開発された（[Comparisons](https://rstore.dev/guide/learn-more#comparisons) / [Learn More](https://rstore.dev/guide/learn-more)）。
- Directus の明確なユースケースと支援が推進力となり、公式に Backed by Directus（[GitHub](https://github.com/directus/rstore) / [rstore.dev](https://rstore.dev/)）として公開。Nuxt + Directus 連携でモデル自動生成までカバー（[公式モジュール](https://rstore.dev/plugins/nuxt-directus)）。
- rstore は状態管理の置き換えではなく、データ取得・正規化キャッシュ・同期に特化したローカルファーストなデータストアであり、既存の Pinia/Vuex と補完関係にある（[本人コメント: 置き換えではない](https://www.reddit.com/r/vuejs/comments/1jaf680/introducing_rstore_the_reactive_data_store_for/j8x8o4w/)、[共存可能](https://www.reddit.com/r/vuejs/comments/1jaf680/introducing_rstore_the_reactive_data_store_for/j8x2k1h/)）。

## 参考リンク

- rstore 公式サイト: [https://rstore.dev/](https://rstore.dev/)
- GitHub: [https://github.com/directus/rstore](https://github.com/directus/rstore)（Backed by Directus 表記 / [最新リリース](https://github.com/directus/rstore/releases)）
- 初出ポスト（Akryum, 2025-03-12）: [https://x.com/Akryum/status/1899784475807973730](https://x.com/Akryum/status/1899784475807973730)
- Vue.js Amsterdam 2025 に関するポスト（Alexandre Chopin）: [https://x.com/thewikeo/status/1901672518764708031](https://x.com/thewikeo/status/1901672518764708031)
- Reddit スレッド（Akryum 本人コメント多数）: [https://www.reddit.com/r/vuejs/comments/1jaf680/introducing_rstore_the_reactive_data_store_for/](https://www.reddit.com/r/vuejs/comments/1jaf680/introducing_rstore_the_reactive_data_store_for/)
