---
title: "【非公式】Vue Fes Japan 2024 前にﾁｮｯﾄ予習【勝手に】"
emoji: "💚"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["vue"]
publication_name: "comm_vue_nuxt"
published: true
---

## はじめに

ナイトウ([@engineer_naito](https://twitter.com/engineer_naito))と申します。

今年も Vue Fes Japan がやってきます！！

https://vuefes.jp/2024/

みなさんチケットのご購入など参加準備はお済みですか？
ぼくは今年もボランティアとして Vue Fes Japan に参加します！
スタッフ作業に奔走する予定ですが、「どうせ参加するなら予習しよう！」と思ってセッション内容のキーワードについて調べました。

全く知らない -> ﾁｮｯﾄ知ってる
という状態で Vue Fes Japan 2024 に参加しましょう！！

:::message alert
ボランティアスタッフという立場ではありますが、本記事は勝手に書いています。
Vue Fes Japan 組織とは無関係であり、非公式記事です。
:::

## Vue Fes Japan とは

> 2018 年に誕生したこのカンファレンスは、文字通り Fes ＝お祭りのように Vue.js を共に盛り上げ、共に学び、そしてなによりも共に楽しむために誕生しました。

公式サイトでのトップメッセージからの引用です。

> 前回の Vue Fes Japan 2023 は 5 年ぶりのオフライン開催となり、600 名近くの方にご参加いただきました。長らく中止やオンライン開催を余儀なくされていただけに、Vue.js コミュニティの熱意を感じ取ることができたカンファレンスとなりました。

Vue Fes Japan 2023 も多数の方が参加していました。
昨年もボランティア参加したぼくはとても感動し、「コミュニティ」を意識し始めた原体験となりました。

会場の熱気や感動を感じれるアフタームービーが公開されています。
見てください！
https://youtu.be/rWIal-epFXQ?si=bCOZ_Z7qX_vLuDCS

<br />
<br />

今年の Vue Fes Japan は 2024 年 10 月 19 日(土)に[大手町プレイスホール＆カンファレンス](https://otemachi-place-hc.jp/index.html)で開催されます。
https://note.com/moe6811/n/nf43e73473bcf?magazine_key=mb35849fee631

## Vue Fes Japan 2024 登壇者

https://vuefes.jp/2024/#speakers

![](/images/chot_prep_vue_fes_jp_2024/vuefesjp2024_speakers.jpg)

今年も多くの方が登壇されます！

- Vue 作者 Evan You さん
- Vue, Vite, Nuxt コアチーム Anthony Fu さん
- oxc 作者 Boshen Chen さん
- Vue コアチーム Kevin Deng さん
- Nitro, UnJS 作者、Nuxt コアチーム Pooya Parsa さん
- Nuxt チーム Alexander Lichter さん
- Vue コアチーム Eduardo San Martin Morote さん
- UnJS コアチーム Nozomu Ikuta さん

著名 OSS コントリビューターの方の発表を聞けるとても貴重な機会です。
Vue そのものだけでなく Vite, UnJS など周辺エコシステムなどの最新動向も感じることができます。

- ビジュアルアーティストの田中 陽さん
- Svelte コアチームの山下 裕一朗さん

Vue コミュニティ外でも活躍されている方たちの発表もとても楽しみです。

## Vue Fes Japan 2024 を楽しむための手引き

Vue Fes Japan 2024 では Vue だけでなく、周辺エコシステムなどについても発表、言及されます。
発表だけでなくクロストークセッションもあります。
公式サイトからツール名やキーワードを抽出したので、ぜひ予習にお役立てください。

### Vuetify

Vue 用 UI ライブラリ(UI コンポーネントコレクション)。
Google の Material Design の仕様に基づいて作成されています。

https://vuetifyjs.com/ja/

### Quarsar

Vue.js をベースとしたフレームワーク。
モバイル、デスクトップ、ウェブアプリケーションを一つのコードベースで開発できることが特徴です。

https://quasar.dev/

:::message
発音
`/ˈkweɪ.zɑɹ/`
クウェイザー
:::

### Nitro

> Next Generation Server Toolkit

https://nitro.unjs.io/

Nuxt(Vue.js) だけでなく、

- SolidStart(SolidJS)
- Analog(Angular)

などのメタフレームワークでも採用されています。

cf. [Who is using Nitro?](https://github.com/unjs/nitro/discussions/1015)

### Vite

> 次世代フロントエンドツール

https://ja.vitejs.dev/

- 高速な開発サーバー
- 高速な HMR
- ES モジュールベース
- 最小限のバンドルサイズ
- プラグインエコシステム
- フレームワークに依存しない

以下 Zenn 記事もオススメです。
https://zenn.dev/comm_vue_nuxt/articles/what-is-vite

:::message
発音
`/vit/`
ビトゥ、ヴィトゥ、ビートゥ、ヴィートゥ

日本では「ビート」のような発音で浸透している印象です。
:::

### Oxc

> A collection of JavaScript tools written in Rust

高速な JS/TS ツールチェインです。

- パーサー
- リンター
- リゾルバー
- トランスフォーマー
- ミニファイアー
- フォーマッター
- etc...

:::message alert
2024 年 9 月 23 日時点でのぼくの知識では、リソルバーやミニファイアーがどういったものかは詳しくはわかりませんでした。
全く知らずにイベントに参加するより、キーワードを知っておく方がまだマシという思いです。
:::

[v-tokyo #21](https://vuejs-meetup.connpass.com/event/321431/) での LT スライドもオススメです。

https://speakerdeck.com/re_taro/oxc-haci-shi-dai-nojsturutieinkai-fa-ji-pan-ninaride-ruka

:::message
発音
o x c
`/oʊ ɛks siː/`
オーエックスシー
:::

### UnJS

JavaScript ライブラリ群。
_Unified_ _Javascript_ _Tools_。
JavaScript の開発をより効率的かつ柔軟に行うために設計された、一連のオープンソースライブラリおよびツールを提供しているプロジェクト。

https://unjs.io/

全パッケージ数は 2024 年 9 月 23 日時点で 63 です。

https://unjs.io/packages

また、先に紹介した Nitro も UnJS のパッケージの一つです。
UnJS ライブラリ、ツールもその他の UnJS ツールに依存しており、また依存されています。

https://unjs.io/relations?u%5B%5D=nitropack&showDependencies=true

以下 Zenn 記事もオススメです。

https://zenn.dev/comm_vue_nuxt/articles/introducing-unjs

### メディアインスタレーション

> インスタレーション とは、1970 年代以降一般化した、絵画・彫刻・映像・写真などと並ぶ現代美術における表現手法・ジャンルの一つ。ある特定の室内や屋外などにオブジェや装置を置いて、作家の意向に沿って空間を構成し変化・異化させ、場所や空間全体を作品として体験させる芸術。

https://artsandculture.google.com/entity/m012z_m?hl=ja

### Svelte

> サイバネティクスで強化された web アプリ

https://svelte.jp/

フロントエンドフレームワークです。

```svelte:Hello.svelte
<script>
	let name = 'world';
</script>

<h1>Hello {name}!</h1>
```

Hello World! の例からも Vue と似ている印象を受けます。
書き方は似ていますが Svelte では仮想 DOM を使用していないという点で大きく異なっています。

https://svelte.dev/blog/virtual-dom-is-pure-overhead

### Vapor モード

Vue の新しいコンパイル戦略。
ざっくり言うと脱仮想 DOM を目指すもの。

以下の Zenn 記事が オススメです。

https://zenn.dev/comm_vue_nuxt/articles/3b264a4bf70662

より深く詳しく知りたい方は、以下がオススメです。

https://ubugeeei.github.io/reading-vuejs-core-vapor/

### Biome

> Web 開発のためのたった 1 つのツールチェーン

https://biomejs.dev/ja

高速なフォーマッターと高性能リンターを兼ね備えています。

以下 Zenn 記事もオススメです。

https://zenn.dev/ako/articles/b8a686843f6b83

### Rollup

JavaScript モジュールバンドラー。

https://rollupjs.org/

### Rolldown

Rust 製 JavaScript モジュールバンドラー。
Vite 向けの設計で Rollup 互換があり、かつ高速。

https://rolldown.rs/

### Rust 製 JavaScript / TypeScript ツールなど

以下の Zenn 記事が オススメです。

https://zenn.dev/nakaakist/articles/86457bf2908379

以下、[Vue Fes Japan 2024 イベント「次世代フロントエンドクロストーク」](https://vuefes.jp/2024/#crosstalk) 紹介にて記載のあったツールです。

#### Turbo

- Rust 製 JavaScript ビルドシステム: Turborepo
- Rust 製 バンドラー: Turbopack

https://turbo.build/

#### Rspack

webpack 互換の Rust 製バンドラー。

https://rspack.dev/

#### SWC

Rust ベースの、拡張可能な次世代開発ツール。
Next.js, Parcel, Deno などで使われています。
コンパイル・トランスパイル、バンドルができます。

https://swc.rs/

### Protocol Buffers

Google が作成したデータをシリアライズするための方法。
protobuf。

https://protobuf.dev/

protobuf は gRPC と密接な関係にあります。

:::message
gRPC はいわゆる「クライアント - サーバー」型の通信プロトコルの一種。

https://grpc.io/
:::

gRPC では通信では通信を行うインターフェースを `.proto` ファイルで定義します。

```proto: person.proto
syntax = "proto3";

message Person {
  string name = 1;
  int32 id = 2;
  string email = 3;
}
```

<br />

JSON との比較を整理すると以下のようになります。

| 特徴         | protobuf       | JSON               |
| ------------ | -------------- | ------------------ |
| フォーマット | バイナリ形式   | テキスト形式       |
| データサイズ | 小さい         | 大きい             |
| 言語依存性   | 言語依存しない | 言語に多少依存する |

### microCMS

> microCMS は API ベースの日本製ヘッドレス CMS です。

https://microcms.io/

ヘッドレス CMS はヘッド（表示面）がなく、API によってコンテンツを配信するのが特徴。
サイト全体ではなくコンテンツ単位で管理、ノーコードでスピーディーに編集可能。

### キーワード英単語、英熟語、概念

#### demystify

神秘性を取り除く -> 謎を解き明かす

#### yak shaving

> 本来のより大きな問題を解決する為に必要となる副次的な問題を解決する為の、一見して無用な行為。
> 縮れていて長くて太くて固いヤクの毛を刈ってウールとしての製品とする為には多くの準備的な活動が必要となることから。

https://ja.wiktionary.org/wiki/yak_shaving

### まとめ

Vue Fes Japan 2024 に向けての予習として、登壇者や注目すべき技術、ツールについて紹介しました。
それぞれの技術やキーワードについて事前に知識を得ておくことで、イベント当日のセッションをより深く理解でき、楽しむことができるでしょう。

全く知らないよりは絶対にマシだと思います！
せっかく参加するなら楽しみたいですよね。

### 最後に

Vue Fes Japan は単なるカンファレンスではなく、コミュニティの熱意や連帯感を感じられる「祭り」のようなイベントです。
公式ページ、Vue.js 日本ユーザーグループの公式 Twitter(現 X)、note をぜひチェックしてください！

https://vuefes.jp/2024/

https://x.com/vuefes

https://note.com/vuejs_jp/

参加者の皆さんが楽しむのはもちろん、ぼくもボランティアスタッフとして全力で楽しみます！
それでは、Vue Fes Japan 2024 でお会いしましょう！

<br />
<br />

https://x.com/youyuxi/status/1837078808018702406
