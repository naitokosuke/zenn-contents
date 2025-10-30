---
title: "【感謝】Vue Fes Japan 2025 登壇しました【初】"
emoji: "🍹"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["vuefes", "slidev"]
published: true
---

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

<!-- textlint-disable ai-writing/no-ai-hype-expressions -->

Vue Fes Japan 2025 にて『最高の DX - Nuxt Typed Router と Pinia Colada で実現する次世代 Vue/Nuxt 開発』という題で発表させていただきました。

<!-- textlint-enable ai-writing/no-ai-hype-expressions -->

https://naitokosuke.github.io/vue-fes-japan-2025-slide/

いい加減な発表にはしたくないと思い、自分なりに色々考えて発表に臨みました。
そのことについて書きます。

## CfP

30 分トークで採択いただきましたが LT でも応募しました。
『Vue.js フロントエンドエンジニアになって半年、こんなコードが書けるようになりました。』
こちらについては勝ちに行くための CfP ではなく、本当に自分が喋りたいことをそのまま提出しました。
実は Funabashi.dev にて発表させていただきました。 15 分枠だったことと Vue.js に特化したイベントではなかったので見せ方や主題を変えて発表しました。
どこかでまた発表したり記事にしたいです。

<!-- textlint-disable ai-writing/no-ai-hype-expressions -->

『最高の DX - Nuxt Typed Router と Pinia Colada で実現する次世代 Vue/Nuxt 開発』については、勝つために、採択されるために用意しました。締切の 20 分前くらいに提出しました。

<!-- textlint-enable ai-writing/no-ai-hype-expressions -->

業務で使用してとても使い心地が良かった 2 つを紹介したいという思いがまずありました。
タイトルについてですが、AI を活用しました。CfP の内容と「絶対 Vue Fes Japan 2025 に採択される、引きのあるいい感じのタイトル〜」みたいなプロンプトを使用した記憶があります。
AI が提出したタイトルは以下でした。

> typed-router と Pinia Colada で実現する次世代 DX - 開発者が本当に集中できる環境

これを直して今回のタイトルになりました。
余談ですが、このタイトルを前日の夜までぼくは覚えていませんでした。スポンサー懇親会で「何て発表ですか？」と聞かれて自分の発表のタイトルを覚えていないことに気づきました。

## 採択と準備

CfP 提出から 3 週間後くらいに採択の旨のメールが来ました。7 月の中旬でした。
自分の運の良さに改めて驚きました。同じ日にスマホが壊れましたが合格の嬉しさのおかげで耐えることができました。

<!-- textlint-disable ja-technical-writing/ja-no-redundant-expression -->

そのタイミングくらいで他の採択者の方の CfP を目にすることができたのですが、[Yuichi Yogo](https://x.com/yogo_escentier) さんの洗練された CfP を目にして、改めて自分はツイていると思いました。来年は改善したいです。

<!-- textlint-enable ja-technical-writing/ja-no-redundant-expression -->

採択いただいてからまずは改めて公式ドキュメントを読みました。
なんとなくのスケジュールを立てて、9 月中にはスライドを完成させて、10 月に入ったら登壇練習だ！という気持ちでいました。
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

## スライド作成

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
この時期には東葛.dev で合同同人誌を取りまとめるということもやっていて軽くパンク状態でした。
技術学習はもちろん大事ですが、何を誰にどう伝えたいかということを決めきれないまま時間が過ぎてしまってよくなかったです。
8 月はあんまり良くなかったです。

## コンセプト決め

ぼくに良いきっかけを与えてくれるのはいつもコミュニティです。
大吉祥寺.pm に参加して、そこでようやくコンセプトというかスタンスを決められるようになりました。

https://fortee.jp/dai-kichijojipm-2025/proposal/aa5ec3a4-7b70-46f9-ac30-efc6c356aa5d

https://www.docswell.com/s/hk_it7/Z446WL-community-toukatsu-dev/

の 2 つの発表を見てとても感動しました。
技術的な内容だけでなく、「エモ」も伝えたいという気持ちになりました。

コミュニティに対する感謝の気持ちをコアのコンセプトとすることにしました。
また、[unplugin-vue-router の公式ドキュメント](https://uvr.esm.is/) や作者の [posva](https://x.com/posva) さんの登壇アーカイブなどを見ると、参考にした？影響を受けた？別の技術について言及していたので、それを真似してぼくも Vue Fes Japan 2024 の発表を紹介するようにしました。

Vue Fes Japan 自体が 2 度の中止を乗り越えて、今も続いているというすごさや関わっている人数や企業数も再確認してもらいたいという思いも生まれました。

「感謝」と「つながり」みたいなエモのコンセプトを決めることができ、それで弾みがついたのかスライドの作成も順調に進めることができました。

あとは今年の Vue Fes Japan のゲストやセッション内容などから Vue.js 以外のフレームワークを使用されている方も来られることが予想できたので、その方たちに対しても感想を抱いてほしいなと思ってスライドを作っていました。

## スライドのこだわり

### Nuxt Typed Router の型の体験

[Nuxt Typed Router](https://nuxt-typed-router.vercel.app/) を使用すると、`.nuxt/typed-router/` ディレクトリ下に型ファイルなどが生成されます。
これを Slidev プロジェクトにコピーして monaco editor で使用しました。

![](/images/making-vuefes2025-dx-ntr-pc/ntr-demo.png)

### 極力字をデカく

なるべく後ろの方まで見えるように極力字をを大きくしました。

![](/images/making-vuefes2025-dx-ntr-pc/big-moji.png)
![](/images/making-vuefes2025-dx-ntr-pc/big-moji2.png)

コードブロックの文字についても気持ち大きくしました。

### 夕暮れ

これはテーマのようなものですが、夕暮れを表現するようにしました。
Claude Code がいい感じに実装してくれてよかったです。

### QR コード

Vue Fes Japan が広報や SNS にも力を入れていることを知っていましたし、後でエゴサというかをしたかったのでツイート用の QR コードをデッカく表示しました。

### vibe slide

もちろん vibe slide なんて言葉はありません。
全然うまくいかなったのですが、一部箇所は Claude Code にスライドの内容を作成させました。

![](/images/making-vuefes2025-dx-ntr-pc/vibe-slide.png)

敢えて AI に全て任せたスライドと明示することによって、それ以外のスライドをこだわった感じを出せるんじゃないかと思い、ジョークとして挿入しました。

## スライド完成(？) & 登壇準備

こだわったスライドですが、動作が重くなってしまうという致命的な欠陥を孕んだまま発表を迎えました。
原因特定修正に時間を割くより練習した方が良いと思い、思い当たる実装を剥がしたバージョンのスライドも用意してこちらも公開しました。

https://naitokosuke.github.io/vue-fes-japan-2025-slide-lite

カラオケ行ったりしました。
ハンドマイクの練習をしたのですが、当日は台の上にスタンドマイクが固定されていたので意味はなくなりました。
発表前日の夕方にちょっとしたリハの機会をいただけたのですが、そこで音響スタッフの方に教えていただくことができてとてもありがたかったです。

## 本番 & 反省

緊張していました。とにかく。最前に見たことのあるアイコンのネームカードがあり思わず話しかけてしまいました。
色々雑談してくださったり安心させてくれるようなこと言ってくれてありがとうございました！[ぷーじ](https://x.com/yug1224)さん！

緊張していてあんまり記憶がないんですが、たくさんの方にお越しいただけたことはわかりました。ありがとうございました。
練習していたつもりですが、QR コードを読み込んでいるのを待つ時間であったり、聞いている方たちのリアクションを受け取ったりする時間を全く考慮できていませんでした。
来年はもっといろんなことを想像したいです。

動揺するとペラペラ喋ってしまうタイプなのと、みなさんの温かいリアクションが嬉しくなって本題に入るまでに時間を使い過ぎてしまいました。
結果的に後半のスライドを飛ばしてしまうことになりました。
スライドの動作が思いこともあり、時間をオーバーしてしまい申し訳なかったです。

現在はスライドの重さを解決できました！改めて見てほしいです！

https://naitokosuke.github.io/vue-fes-japan-2025-slide/

## 伝えきれなかったんじゃないかということ

最後の posva さんの最近取り組んでいることについてもっと強調したかったです。

https://x.com/posva/status/1954833342114783538

現在はファイル内で route の型をアサーション、型ガードをする必要があります。
posva さんはこれをページファイル名から型を当てることができるような機能を実装しているようです。
この機能が使用できるようになったらさらに DX が向上するでしょう。
というかどうやっているの？
もっと時間をかけたかったです。

## やり残しやりたかったこと

やりたかったけど諦めることになったことが 2 つあります。

- インタラクティブなスライド(リアルタイムアンケート機能)
- 国際化対応(i18n, internationalization)

リアルタイムで参加していただいている方に反応をもらえるようなスライドを考えていました。
昨年の Daniel Roe さんの発表で Nuxt 3 を使用しているかどうかのアンケート結果をリアルタイムでスライドに反映していたのがとても面白く、真似したかったです。
Slidev では実現できることのはずですが、ぼくの実力が足りず間に合いませんでした。

https://youtu.be/M48iEFch-6s

[toddeTV](https://github.com/toddeTV) さんの発表ではリアルタイムにリアクションを送信できるようになっていたとのことでした、見たかった。

https://talk-2025-10-25-vue-fes-japan.vercel.app/

また、Vue Fes Japan はたくさんの海外参加者の方が来られるイベントです。
裏の発表が 2 つが英語であるということもあって、海外参加者の多くはそちらに行くだろうということで今回は諦めてしまいました。

[Yuichi Yogo](https://x.com/yogo_escentier) さんの発表では 3 ヶ国語対応していて素晴らしかったです。

https://building-audio-apps-with-js.vercel.app

## 感想と学び

たくさんの方に聞いてもらえてとても嬉しかったです。本当にありがとうございました。
[Nuxt Typed Router](https://nuxt-typed-router.vercel.app/) と [Pinia Colada](https://pinia-colada.esm.dev/) について魅力とその実践的な使い方について知ってもらえていたらもっと嬉しいです。

来年は CfP の文面にも時間をかけたいです。
今年は少し大味過ぎていた気がしました。もっと丁寧に書きたいです。
もしまた発表の機会をいただけるのであれば、スライドも問題のない状態にして今回の反省を生かして練習に取り入れて発表に臨みたいです。

## 最後に

<!-- textlint-disable ai-writing/no-ai-hype-expressions -->

Vue Fes Japan 2025 全体を通して最高の経験をさせてもらいました。

<!-- textlint-enable ai-writing/no-ai-hype-expressions -->

スタッフや参加者の方に改めて感謝申し上げます。

最後まで読んでいただきありがとうございました！
