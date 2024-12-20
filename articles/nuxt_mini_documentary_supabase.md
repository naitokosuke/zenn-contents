---
title: "『Behind The Code: Nuxt.js mini-documentary』を見て"
emoji: "🦔"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["Nuxt", "Supabase"]
published: false
---

## はじめに

ナイトウ([@engineer_naito](https://twitter.com/engineer_naito))と申します。

最近 YouTube にハマっています。
Supabase さんが Nuxt チームのドキュメンタリー動画をアップされました。

https://youtu.be/uvG11I-ftfo?si=vFK86CndmuMPOG01

例によってこの動画を見て学んだことを記事にします。

## what is Supabase?

このドキュメンタリーを作成された Supabase さんですが、同名のサービス Supabase を手がけていらっしゃいます。

https://supabase.com/

![Supabase Top Page Hero Area](/images/nuxt_mini_documentary_supabase/Supabase_top_page.png)

> Supabase is an open source Firebase alternative.
> Start your project with a Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, Storage, and Vector embeddings.

Postgres データベースであったり認証機能であったり、Web アプリ開発をする上で必要な機能をいい感じに提供しています。
ぼくもまだ Supabase の機能を網羅的に利用したことはないのですがめちゃ便利です。

Supabase のいいところのひとつに広報活動がとても盛んであるということがあります。
YouTube で Supabase を使ったアプリ開発動画をたくさんアップされています。

Twitter(現: X)でも精力的に活動されています。

https://twitter.com/dshukertjrjp/media

https://twitter.com/dshukertjrjp/status/1691736796554834172

タイラーさんを見たことがある人がほとんどではないでしょうか。
(「スーパベース」、たしかにこの発音が一番しっくり来ます。)

Supabase さんの YouTube ではあまり Nuxt のコンテンツの印象はありませんでしたが、今回のこのドキュメンタリーは一体、、、？

## まずはこの動画見てほしい

英語に興味なくても一回は動画を見てもらいたいです。
とにかくおしゃれです。
[NuxtLabs](https://nuxtlabs.com/) 本社？のオフィス内もとてもおしゃれですが、なんといってもフランス、ボルドーの街並みに Nuxt のロゴ、かっこよすぎる、、、

![NuxtLabs HQ sign in Bordeaux's cityscape](/images/nuxt_mini_documentary_supabase/NuxtLabs_HQ_in_Bordeaux.png)

そして Nuxt の作者の腕立て伏せをしている姿を見ることができます。

まずは見てください！

## インタビュイー

- Sébastien Chopin さん([GitHub](https://github.com/Atinux), [X](https://x.com/Atinux))
  Nuxt の作者、[NuxtLabs](https://nuxtlabs.com/) CEO

- Baptiste Leproux さん([GitHub](https://github.com/larbish), [X](https://x.com/_larbish))
  Product lead of [Nuxt Studio](https://nuxt.studio/)(at [NuxtLabs](https://nuxtlabs.com/))

そして Evan You さんも登場します。
Nuxt が出来たときのことについて思い出して語っています。

## Nuxt ができるまで

まずは Nuxt ができるまでのことについて Sébastien Chopin さんが語っています。
2014 年のある日、ホステルに宿泊していたときになんだか寝付けないことがあり、たまたま出会った Vue.js のドキュメントを朝まで読み耽ったそうです。
そして Vue.js に惚れ込みました。

それから 2 年後、Sébastien Chopin さんは EC サイトの開発に取り組んでいました。
その頃はまだサーバサイドレンダリングが Vue ではサポートされておらず、別のフレームワークを利用して手動でサーバサイドレンダリングを実現していました。

Vue2 が 2016 年 10 月 1 日にリリースされてサーバサイドレンダリングがサポートされると、開発していた EC サイトを Vue で書き直します。
2016 年 10 月 25 日に Vercel(当時は ZEIT) から Next.js がリリースされました。

これに影響を受けた Sébastien Chopin さんは Next.js for Vue.js、Nuxt の開発を決意します。

Nuxt のプロトタイプが出来たのは 2016 年 11 月 8 日でした。
https://github.com/nuxt/nuxt/releases/tag/v0.2.0
