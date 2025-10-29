---
title: "【感謝】Vue Fes Japan 2025 登壇しました【初】"
emoji: "📑"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["vuefes", "slidev"]
published: false
---

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

<!-- textlint-disable ai-writing/no-ai-hype-expressions -->

Vue Fes Japan 2025 にて『最高の DX - Nuxt Typed Router と Pinia Colada で実現する次世代 Vue/Nuxt 開発』という題で発表させていただきました。

<!-- textlint-enable ai-writing/no-ai-hype-expressions -->

https://naitokosuke.github.io/vue-fes-japan-2025-slide/

いい加減な発表にはしたくないと思い、自分なりに色々考えて発表に臨みました。
そのことについて書きます。

## 〜 CfP

30 分トークで採択いただきましたが LT でも応募しました。
『Vue.js フロントエンドエンジニアになって半年、こんなコードが書けるようになりました。』
こちらについては勝ちに行くための CfP ではなく、本当に自分が喋りたいことをそのまま提出しました。
こちらの発表については実は Funabashi.dev にて発表させていただきました。 15 分枠だったことと Vue.js に特化したイベントではなかったので見せ方や主題を変えて発表しました。
こちらの内容についてもどこかでまた発表したり記事にしたいです。

<!-- textlint-disable ai-writing/no-ai-hype-expressions -->

『最高の DX - Nuxt Typed Router と Pinia Colada で実現する次世代 Vue/Nuxt 開発』については、勝つために、採択されるために用意しました。締切の 20 分前くらいに提出しました。

<!-- textlint-enable ai-writing/no-ai-hype-expressions -->

業務で使用してとても使い心地が良かった 2 つを紹介したいという思いがまずありました。
タイトルについてですが、AI を活用しました。CfP の内容と「絶対 Vue Fes Japan 2025 に採択される、引きのあるいい感じのタイトル〜」みたいなプロンプトを使用した記憶があります。
AI が提出したタイトルは以下でした。

> typed-router と Pinia Colada で実現する次世代 DX - 開発者が本当に集中できる環境

これを直して今回のタイトルになりました。
余談ですが、このタイトルを前日の夜までぼくは覚えていませんでした。スポンサー懇親会で「何て発表ですか？」と聞かれて自分の発表のタイトルを覚えていないことに気づきました。

## 採択〜準備

CfP 提出から 3 週間後くらいに採択の旨のメールが来ました。7 月の中旬でした。
自分の運の良さに改めて驚きました。同じ日にスマホが壊れましたが合格の嬉しさのおかげで耐えることができました。

<!-- textlint-disable ja-technical-writing/ja-no-redundant-expression -->

そのタイミングくらいで他の採択者の方の CfP を目にすることができたのですが、[Yuichi Yogo](https://x.com/yogo_escentier) さんの洗練された CfP を目にして、改めて自分はツイていると思いました。来年は改善したいです。

<!-- textlint-enable ja-technical-writing/ja-no-redundant-expression -->

採択いただいてからまずは改めて公式ドキュメントを読みました。
なんとなくのスケジュールを立てて、9 月中にはスライドを完成させて、10 月に入ったら登壇練習だ！と言う気持ちでいました。
そのスケジュールだとまだ余裕があるので、 7 月中は発表とスライドに深みを出すために周辺知識について勉強することにしました。
あとは Vue Fes Japan 2024 の録画映像が [YouTube](https://youtube.com/@vuejs-jp) にて公開されていたのでモチベのためにほぼ全て見ました。

[Pinia Colada の公式ドキュメント](https://pinia-colada.esm.dev/)に、他のライブラリとの比較が載っていました。

https://pinia-colada.esm.dev/why.html#Comparison-to-other-solutions

ここに [rstore](https://rstore.dev), [swrv](https://github.com/Kong/swrv), [TanStack Query](https://tanstack.com/query/latest/docs/framework/vue/overview) との比較もあったので、7 月〜 8 月にはこれらのライブラリについても勉強しました。

TanStack Query と SWR ということで、React, Next.js での情報が非常にたくさんあったのでそちらも参考にさせていただきました。
特に以下の記事が参考になりました。

https://zenn.dev/cybozu_frontend/articles/a735baacc09c6a

8 月の後半には Next.js で typed routes が stable feature になったので、人生初 Next.js もしました。

[rstore](https://rstore.dev) については発表前に Zenn の記事にするつもりでしたが、ちょうど？破壊的変更をたくさん含んでいるらしいリリースが入り断念しました。
アドカレの時期になるので書きたいですね。

https://x.com/Akryum/status/1966602960512663743

## スライド作成〜

もちろんスライドは Slidev で作成する予定だったのでリポジトリも作成して、プロジェクトを用意しました。

https://sli.dev/

これまでにも Slidev を使用してスライドを作っていましたが、今回は Slidev でスライドを作るにあたって 2 つやりたいこと(目標)を決めました。

- monaco editor で Nuxt Typed Router の型を体験できるようにする
- piña colada をイメージとしたビーチの夕暮れを再現

2 つの目標を実現できたのは間違いなく Claude Code のおかげです。
今回のスライド作成では以下で Claude Code を活用しました。

- style(CSS)の用意
- コンポーネントの用意
- 夕暮れを表現するための背景の用意

また、「monaco editor で Nuxt Typed Router の型を体験できるようにする」ためにスライドとデモアプリの monorepo 構造を取ったのですが、それも Claude Code に行わせました。

8 月中は vibe sliding(vibe coding の slide バージョン)を繰り返していました。
全然うまくいきませんでした。
スマホで Claude Code を遊んでいた時期だったので、毎日の行き帰りに vibe sliding を繰り返していました。

https://x.com/naitokosuke/status/1957029491055698143

全然うまくいかないので、スライドのリポジトリに `___research___/` というディレクトリを作成して、そこに markdown 形式で調べた内容やスライドの構成についてをまとめました。
このディレクトリを参照させることによって Claude Code にコンテキストを与えたのですが、全然うまくいきませんでした。

## vibe sliding が全然うまくいかなかった

vibe sliding によって良スライド生成ガチャを繰り返したのですがどれも全然ダメでした。
ぼくの中で発表のコンセプトや発表を通して伝えたいことが見えていなかった、決まっていなかったことからです。
完成したスライドも技術の説明に重きを置いた内容にはなりましたが、8 月中はそれだけに終始したつまらないものだった記憶があります。
誰にも何も伝わらないという不安でいっぱいになりました。

## 最後に

最後まで読んでいただきありがとうございました！
