# Vue.js 用ストアライブラリ「rstore」開発の背景と動機

## 背景: Pinia の台頭と新ストア開発の決断

Vue 3 時代の公式状態管理ライブラリは Pinia であり、事実上の標準（デファクト）となっています。一方で、rstore は Vue コアチームの Guillaume Chau（Akryum）氏が中心となり、Directus の支援を受けて開発された新しい「データストア」です。
Akryum 氏は 2025 年 3 月 12 日に X で rstore を初公開し、「Directus のバックアップ（支援）により開発してきた」と明言しています。

Vue.js Amsterdam 2025 のタイミングでもリリースが周知されました。

GitHub リポジトリや公式サイトでも Backed by Directus の表記が確認できます。

## Pinia では満たせなかったニーズ

Pinia は軽量で柔軟ですが、データ取得やキャッシュ構造を提供しない低レベル API にとどまるため、取得・同期待ち受けのコードは各アプリで自前実装になりがちです。

rstore のドキュメントでも、Pinia との違いとして「構造化された取得・キャッシュ機能を提供しない」ことが明確に述べられています。
コミュニティでも、rstore がデータモデル中心かつローカルファースト志向である点が議論されています。
Meteor の Minimongo に「少し似ている」との指摘に対し、Akryum 氏自身が「ローカルファーストでもあるので少し似ている」と応答しています。

## rstore の目的と特徴: 状態管理より“データ管理”

Akryum 氏は「rstore は pinia/vuex と同等の代替物ではない。置き換えとして考えるべきではなく、正規化キャッシュを用いたデータ取得に完全特化している」と明言しています。rstore は状態管理ライブラリというより、\*\*フロントエンド上のデータ層（クライアントサイド ORM 的）\*\*を提供する設計です。主な特徴は次のとおりです。

- 正規化されたリアクティブキャッシュ: すべての UI が常に最新になることを狙った正規化キャッシュを中核に据えています。
- ローカルファースト設計: フィルタやソートなどの読み取りはクライアント側で計算し、必要に応じてサーバと同期します。Reddit でも Akryum 氏が local-first の考え方を具体例とともに説明しています。
- プラグインによるデータ取得の抽象化: REST/GraphQL/WebSocket/ローカルストレージ等、任意のデータソースから取得する処理をプラグインで差し替え可能。
- モデル（スキーマ）駆動: アプリのデータ型ごとに Model を定義して扱います。
- コンポーネントとクエリの共置: 必要なコンポーネント内にクエリ/ミューテーションを\*\*共置（co-locate）\*\*できる API。
- Pinia 等との共存:「同一アプリ内で Pinia と共存しても問題なく、Pinia ストアから rstore のクエリを呼ぶことも可能」と Akryum 氏が述べています。

> 補足: rstore 公式の比較セクションでは、Pinia Colada / TanStack Query / Apollo との設計思想の違い（ローカルファースト vs サーバファースト、正規化キャッシュ、モデル構造 など）が整理されています。

## Directus 社のユースケースと支援

Directus は SQL DB を即座に REST/GraphQL API 化し、拡張性の高いバックエンドを提供します。rstore はこのエコシステムと親和性が高く、公式に「Backed by Directus」の記載と、Nuxt 連携モジュールが用意されています。特に Nuxt + Directus モジュール は、Directus の管理者トークンでコレクションを自動インスペクトし、対応する rstore の Model／型定義／プラグインコードを自動生成します。この仕組みにより、Directus でスキーマを定義すれば、Nuxt 側では `store.コレクション名.queryMany()` 等が即利用できます。

さらに rstore の設計上、リアルタイム更新やコラボレーションも視野に入っています。
ドキュメントには\*\*「ミューテーション履歴を同期エンジンで再生可能」\*\*と記載があります。
Reddit でも Akryum 氏が Yjs との公式統合が将来的にあり得るとコメントしています。

## おわりに

まとめると、rstore 開発の経緯と動機は次の通りです。

- Pinia では不足する高レベルなデータ管理ニーズ（正規化キャッシュ、一貫したデータ同期、ローカルファースト/オフライン、リアルタイム）に応えるため、設計・開発された。
- Directus の明確なユースケースと支援が推進力となり、公式に Backed by Directus として公開。Nuxt + Directus 連携でモデル自動生成までカバー。
- rstore は状態管理の置き換えではなく、データ取得・正規化キャッシュ・同期に特化したローカルファーストなデータストアであり、既存の Pinia/Vuex と補完関係にある。

## 参考リンク

- rstore 公式サイト: https://rstore.dev/
- GitHub: https://github.com/directus/rstore
- 初出ポスト（Akryum, 2025-03-12）: https://x.com/Akryum/status/1899784475807973730
- Vue.js Amsterdam 2025 に関するポスト（Alexandre Chopin）: https://x.com/thewikeo/status/1901672518764708031
- Reddit スレッド（Akryum 本人コメント多数）: https://www.reddit.com/r/vuejs/comments/1jaf680/introducing_rstore_the_reactive_data_store_for/
