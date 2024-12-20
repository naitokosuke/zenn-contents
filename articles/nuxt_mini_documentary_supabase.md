---
title: "『Behind The Code: Nuxt.js mini-documentary』を見て"
emoji: "🎬"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["Nuxt", "Supabase"]
publication_name: "comm_vue_nuxt"
published: true
published_at: 2024-12-20 18:00
---

[Nuxt / UnJS Advent Calendar 2024](https://qiita.com/advent-calendar/2024/nuxt-and-unjs) 6 日目の記事です。

:::message
2024/12/20 に登録しました。
:::

## はじめに

ナイトウ([@engineer_naito](https://twitter.com/engineer_naito))と申します。

最近 YouTube にハマっています。
Supabase さんが Nuxt チームのドキュメンタリー動画をアップしました。

https://youtu.be/uvG11I-ftfo?si=vFK86CndmuMPOG01

Sébastien Chopin さんのツイートはこのドキュメンタリー撮影のことだったんですね。

https://twitter.com/Atinux/status/1862137276979196224

この動画の内容や見て感じたことを記事にします。

## what is Supabase?

このドキュメンタリーを作成された Supabase さんですが、同名のサービス Supabase を手がけていらっしゃいます。

https://supabase.com/

![Supabase Top Page Hero Area](/images/nuxt_mini_documentary_supabase/_supabase_top_page.png)

> Supabase is an open source Firebase alternative.
> Start your project with a Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, Storage, and Vector embeddings.

Postgres データベースや認証機能など Web アプリ開発をする上で必要な機能をいい感じに提供しています。
ぼくもまだ Supabase の機能を網羅的に利用したことはないのですがとても便利で素晴らしいサービスです。

Supabase のいいところのひとつに広報活動がとても盛んであるということがあります。
YouTube で Supabase を使ったアプリ開発動画もたくさんアップされています。

Twitter(現: X)でも勢力的に活動されています。

https://twitter.com/dshukertjrjp/status/1691736796554834172

タイラーさんを見たことがある人も多いのではないでしょうか。
(「スーパベース」、たしかにこの発音が一番しっくり来ます。)

Supabase さんの YouTube ではあまり Nuxt のコンテンツの印象はありませんでしたが、今回のこのドキュメンタリーは一体、、、？

## まずはこの動画を見てほしい

まずはとにかく一回は動画を見てもらいたいです。
とにかくおしゃれです。
見ていてテンションが上がります。
[NuxtLabs](https://nuxtlabs.com/) 本社？のオフィス内もとてもおしゃれですが、なんといってもフランス、ボルドーの街並みに Nuxt のロゴ、かっこよすぎる、、、

![NuxtLabs HQ sign in Bordeaux's cityscape](/images/nuxt_mini_documentary_supabase/_nuxtlabs_hq_in_bordeaux.png)

そして Nuxt の作者の腕立て伏せをしている姿を見ることができます。

見てください！

## インタビュイー

- Sébastien Chopin さん([GitHub](https://github.com/Atinux), [X](https://twitter.com/Atinux))
  Nuxt の作者、[NuxtLabs](https://nuxtlabs.com/) CEO

- Baptiste Leproux さん([GitHub](https://github.com/larbish), [X](https://twitter.com/_larbish))
  Product lead of [Nuxt Studio](https://nuxt.studio/)(at [NuxtLabs](https://nuxtlabs.com/))

そして Evan You さんも登場されます。

## Nuxt ができるまで

まずは Nuxt ができるまでのことについて Sébastien Chopin さんが語っています。

2014 年のある日、宿泊していたホステルで寝付けず、たまたま出会った Vue.js のドキュメントを朝まで読み耽ったそうです。
そして Vue.js に惚れ込んだそうです。

それから 2 年後、Sébastien Chopin さんは EC サイトの開発に取り組んでいました。
その頃はまだサーバサイドレンダリングが Vue ではサポートされておらず、別のフレームワークを利用して手動でサーバサイドレンダリングを実現していました。

Vue2 が 2016 年 10 月 1 日にリリースされてサーバサイドレンダリングがサポートされると、開発していた EC サイトを Vue で書き直します。

2016 年 10 月 25 日に Vercel(当時は ZEIT) から Next.js がリリースされました。
これに影響を受けた Sébastien Chopin さんは Next.js for Vue.js、Nuxt の開発を決意します。

Nuxt のプロトタイプが出来たのは 2016 年 11 月 8 日でした。
https://github.com/nuxt/nuxt/releases/tag/v0.2.0

Evan You さんは Vue2 で追加されたサーバサイドレンダリングのためのデモ Vue HackerNews([vuejs/vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)) を公開します。
https://v2.vuejs.org/v2/examples/hackernews.html?redirect=true

このデモの公開から数日で Sébastien Chopin さんは Nuxt の最初のバージョンを作った(公開した？)そうです。
Evan You さんもそのスピードにとても驚いたようです

## ドキュメンタリー『Vue.js: The Documentary』 by HoneyPot について

Evan You さんは HoneyPot による 2020 年ドキュメンタリー『Vue.js: The Documentary』のことについても語ります。

https://youtu.be/OrxmtDw4pVI?si=gGOWGhoMXh4GqeKz

2024 年 12 月現在で 150 万回以上再生されていて、Vue の知名度の向上にも貢献しています。
(HoneyPot チャンネルで一番伸びている動画です！)
![Honeypot's Youtube popular videos and the most popular one is "Vue.js: The Documentary"!](/images/nuxt_mini_documentary_supabase/honeypot_popular_videos.png)

この動画は Vue3 リリースの半年ほど前に公開されました。

## Vue3 から 4 年、Vue と Vite の繁栄

Vue3 だけでなく、Vite の登場も 2020 年です。
Vite は現在 Vue, Nuxt だけでなく多くのツールを支える標準的ツールになりました。
VoidZero も設立され、今後ますます Vue, Nuxt は Vite の恩恵を受けることになるでしょう。

## Nuxt プラグインシステム "Nuxt Modules"

Nuxt は現在 200 万以上の Web サイトで用いられているようです。
(Sébastien Chopin さんが according to ~ と言っているのですが聞き取れませんでした、、、)

多くの利用者が誰でも機能を追加できるようなプラグインシステム Nuxt Modules を作りました。
現在、250 のモジュールが存在し、200 人以上のメンテナー、1600 人以上のコントリビューターがいます。

https://nuxt.com/modules

## Supabase Nuxt モジュール

Nuxt Modules の一つに Supabase モジュールがあります。

https://nuxt.com/modules/supabase

Sébastien Chopin さんがいつ Supabase と出会ったかは覚えていないとのことですが、初めてツイートしたのは 2021 年 1 月と覚えていました。

https://twitter.com/Atinux/status/1349436471737004038

他にもいくつかの Open Source Firebase alternatives を挙げていますが、Supabase が一番 "sexy" と感じたようです。
これにより Sébastien Chopin さんの周りにも Supabase が浸透していきます。

Supabase の素晴らしさを伝えた人のうちの一人が Baptiste Leproux さんです。
ちょうどその頃、お二人で腕立て伏せ対決を行なっていました(？)
そこで腕立て伏せのカウントアプリを Baptiste Leproux さんが作ります。
Supabase を利用した Nuxt アプリです。

https://pushupers.app/

> © 2021-2024 NuxtLabs. All rights reserved.

この経験がきっかけで [Nuxt Supabase](https://nuxt.com/modules/supabase) を作ったそうです。

https://twitter.com/_larbish/status/1687044609522778112

3 年半経った今でもお二人は腕立て伏せを継続しているようです。

## Supabase は Nuxt アプリの 理想のバックエンドかもしれない

Nuxt がフロントエンドを担当し、バックエンドは Supabase が担う。
確かに素晴らしい相性だと思います。
Supabase はバックエンド開発の複雑なあれこれを簡単にしてくれます。

バックエンド開発ではデータベース、認証、ストレージ機能など複数のサービスを組み合わせることや、 AWS のように少し複雑なサービスを利用することになる場合があります。
一方 Supabase ではそれらの多くの機能をまとめて簡単に利用することができます。

爆速でプロトタイプを作って、プロダクションまでスケールすることも容易です。

## コミュニティへの感謝

Supabase Nuxt を作った Baptiste Leproux さんですが、もともとは agency(受託開発企業？)で働いており、Angular を使っていました。
Nuxt モジュールのメンテナーは経験したことがないことで、Supabase Nuxt のようなモジュールを作ることは Baptiste Leproux さんにとって目標の一つでした。

コミュニティの一員になることはとても素晴らしいことだと Baptiste Leproux さんは語ります。
お互いに助け合い、アイデアを提案、PR を作成して素晴らしいモジュールを作り上げることができます。
たくさんの人に自分の作ったものが利用されることはとても嬉しいことで、使われる人が増えれば増えるほどより良いものになると語っています。

Sébastien Chopin さんはこれからもコミュニティからのフィードバックを聞き、これからも Vue, Nuxt で Web アプリの限界を高めていくと語っています。

Evan You さんは Vue3.6 についても言及しており、リアクティビティシステムに対する大きなパフォーマンス改善や Nuxt が利用している Suspense についても安定化を目指しているようです。
UnJS エコシステムについても楽しみにしていて、Pooya Parsa さんが新しいバージョンのコアパッケージに取り組んでいることにも注目しています。

そして 3 人はコミュニティに対する感謝を述べて動画が終わります。

## 最後に

普段コアチームメンバーの方の話を聞く機会がないのでとても新鮮な気持ちでした。
腕立て伏せのエピソードは知らない人がほとんどだったのではないでしょうか。

素晴らしい方たちです。
コアチームメンバーの方の人となりを知って、感謝の気持ちだけでなくぼくも頑張らなければいけないという気持ちになりました。
素敵なドキュメンタリーを作ってくれた Supabase さんと、3 人に感謝の気持ちでいっぱいです。

最後まで読んでいただきありがとうございました！
