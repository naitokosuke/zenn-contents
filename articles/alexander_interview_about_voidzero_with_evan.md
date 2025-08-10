---
title: "『All about VoidZero - The Interview with Evan You』を見てわかったこと思ったこと"
emoji: "0️⃣"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["VoidZero", "Vite", "Oxc", "Rolldown", "Vue"]
publication_name: "comm_vue_nuxt"
published: true
published_at: 2024-12-19 00:00
---

[Vue Advent Calendar 2024](https://qiita.com/advent-calendar/2024/vue) 19 日目の記事です。

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

[Alexander Lichter](https://twitter.com/TheAlexLichter) さんの YouTube [『All about VoidZero - The Interview with Evan You』](https://youtu.be/33ex2A04b7g?si=ERcpbXL6chiqzXYk)を見ました。

https://youtu.be/33ex2A04b7g?si=ERcpbXL6chiqzXYk

前から [VoidZero](https://voidzero.dev/) については興味がありましたが、なかなかキャッチアップできていませんでした。
このインタビュー動画はとてもありがたかったです。

インタビューは英語で行われています。
英語学習も兼ねて、この動画で学んだことを記事にします。

VoidZero の公式ブログ、 ViteConf 2024 のキーノート、公式 X の投稿もぜひ確認してください。

https://youtu.be/mWK3Y_1kmaM?si=s_79VtT0elDMZLA3

https://voidzero.dev/posts/announcing-voidzero-inc

## 感じたこと & わかったこと

- JavaScript 以外のオープンソース技術についても言及
- Rome との違いや Evan You さんが思う Rome の反省点も

- VoidZero という命名の経緯
- VoidZero を設立した経緯
- VoidZero のミッション
- オープンソースと資金調達、収益化の両立方法
- 採用するだけでなく、OSS コントリビューターをスポンサーしていく

- "cargo for JavaScript" を目指す(？)
- cargo ってどんだけすごいの？

- Vue との直接的な関係はない
- Vite がよくなれば当然 Vue にもよい影響
- VoidZero が目指す unified toolchain の恩恵を Vue が最も受ける

- rolldown/vite のアルファ版またはベータ版は 2024 年末か 2025 年早々を目指している

## Who is Alexander Lichter?

https://www.youtube.com/@TheAlexLichter

Nuxt, UnJS メンバーの Alexander Lichter さんですが、Youtube もされています。

![Alexander Lichter's Youtube channel with thumbnails](/images/alexander_interview_about_voidzero_with_evan/alex-youtube.png)

主に Vue, Nuxt に関する Tips や解説動画を投稿されています。
現時点で、Alexander Lichter さんは VoidZero とは直接関係はないようです。
[『All about VoidZero - The Interview with Evan You』](https://youtu.be/33ex2A04b7g?si=ERcpbXL6chiqzXYk)は、[Vue Fes Japan 2024](https://vuefes.jp/2024/) の当日に別の場所でインタビュー、撮影が行われていたようです。
(Vue Fes Japan 2024 当日に、スタッフ無線でお二人がどこかで何かをされているようなことを聞いていたので謎が解けました。)

## What is VoidZero?

VoidZero は Vue, Vite 作者 Evan You さんが立ち上げた会社です。

https://voidzero.dev/

> **The Mission**
> We are building a unified high-performance toolchain for JavaScript: including parser, transformer, resolver, linter, formatter, minifier, bundler, test runner, and meta framework support. Our mission is to make the next generation of JavaScript developers more productive than ever before.

プロジェクトとして Vite, Vitest, Rolldown, Oxc を手がけています。
これらのプロジェクトを通じて、開発者の生産性向上とエコシステムの統一を目指しています。

2024 年 10 月 1 日に 460 万ドル(約 7 億 800 万円 2024 年 12 月 15 日時点)の資金調達を行なったことが発表されました。

https://twitter.com/voidzerodev/status/1841100762203492595

昨年末に Evan You さんが何かを匂わせていましたが、ようやく明かされました。

https://twitter.com/youyuxi/status/1741101029784277413

## JavaScript における `void(0)` とは

そもそも `void(0)` とはなんでしょうか。

`void` 演算子は指定した式を評価し、その結果を無視して `undefined` を返します。
HTML の a タグの href 属性に `javascript:void(0)` を指定することで、リンクのデフォルトの画面遷移を防ぐことができました。
これを利用してクリック時に独自の JavaScript 処理を実行することが可能です。
(最近では `event.preventDefault()` を利用することが一般的だと思われます。)

"undefined" よりも "void(0)" の方が文字数が短いなどの理由からミニファイにも利用されているようです。

## インタビュー内容

このインタビュー動画では主に以下のような質問をされています。

- VoidZero のアイデアを思いついたきっかけは？
- VoidZero の資金調達の経緯は？
- VoidZero という会社名の由来は？
- VoidZero チームのメンバーは？
- なぜ VC 企業からの資金調達を選んだのか？
- 他の unified toolchain プロジェクトとの違いと教訓は？
- Bun のようなランタイムとの互換性はあるのか？
- VoidZero に近い既存のプロジェクトはあるか？
- VoidZero に不可欠な、まだ知られていないプロジェクトは？
- VoidZero の収益化モデルは？
- VoidZero は Vue.js にどのような影響を与えるのか？
- VoidZero の設立は Vue.js と Vite への注力にどのような影響を与えるのか？
- UnJS との関係は？
- Pooya Parsa さんの `.config` ディレクトリ提案のサポートは？
- SWC、esbuild などの他のツールからの移行パスはあるのか？
- Next.js が Vite をサポートする可能性は？
- oxlint はスタイルルールをサポートするのか？
- Vite のライセンスが変更された理由は？
- Vite と Rolldown の最初のバージョンはいつリリースされるのか？
- VoidZero の採用計画は？

それぞれ回答をまとめてみました。

## VoidZero のアイデアを思いついたきっかけは？

Vite が多くの Web フレームワークやツール間で共有されるインフラレイヤーとなりつつあります。
これは JavaScript エコシステムにおける大きな変化であり、今までにないレベルの収束を意味していました。
この収束をさらに深め、JavaScript エコシステム全体に共通のインフラを提供することでより多くのメリットが生まれると考えました。

そして、現在の VoidZero の従業員である開発者たちと将来の JavaScript ツールについて話し合い、このアイデアは具体化していきました。
Vite の普及という背景と相まって、JavaScript エコシステム全体の toolchain を統一するという壮大な目標へと繋がっていったのです。

## VoidZero の資金調達の経緯は？

unified toolchain という壮大なビジョンを実現するには、Vue.js のような寄付やスポンサーシップベースの資金調達モデルでは限界があることを認識していました。
チームをフルタイムで雇用するため、ベンチャーキャピタルからの資金調達を決断しました。

## VoidZero という会社名の由来は？

当初 VoidZero は一時的に "Vite Labs" と呼ばれていたそうです。。
しかし、"Vite Labs" という名前の仮想通貨企業がすでに存在することが判明し、別の名前を探すことになりました。
そして "VoidZero" へ名前を変更したそうです。

:::details 仮想通貨企業 Vite Labs
https://www.vite.org/
https://twitter.com/vitelabs
:::

Alexander Lichter さんも言っていましたが、"Vite Labs" という名前では Vite の印象が強く、Vite を中心としているような印象を受けます。
たしかに "VoidZero" からは Vite の印象は受けず、JavaScript だな〜という気になりますね(？)

## VoidZero チームのメンバーは？

VoidZero チームは、Vite、Vitest、Oxc、Rolldown といった各プロジェクトの主要なコントリビューターで構成されています。

![VoidZero members](/images/alexander_interview_about_voidzero_with_evan/voidzero-members.png)

- Evan You さん([GitHub](https://github.com/yyx990803), [X](https://twitter.com/youyuxi))

- Boshen Chen さん([GitHub](https://github.com/boshen), [X](https://twitter.com/boshen_c))
- DENG Qing さん([GitHub](https://github.com/dunqing), [X](https://twitter.com/dunqingg))
- Overlook Motel さん([GitHub](https://github.com/overlookmotel), [X](https://twitter.com/overlook_motel))

- HE Yunfei さん([GitHub](https://github.com/hyf0), [X](https://twitter.com/_hyf0))
- HE Xiangjun さん([GitHub](https://github.com/iwanabethatguy))
- LI Kui さん([GitHub](https://github.com/underfin))

- Vladimir Sheremet さん([GitHub](https://github.com/sheremet-va))
- Hiroshi Ogawa さん([GitHub](https://github.com/hi-ogawa), [X](https://twitter.com/hiroshi_18181))
- Shun Yokoyama さん([GitHub](https://github.com/sapphi-red), [X](https://twitter.com/sapphi_red))

社外アドバイザーとして [NAPI-RS](https://napi.rs/) の作者である Broooooklyn さん([GitHub](https://github.com/Brooooooklyn), [X](https://twitter.com/Brooooook_lyn))がいます。

## なぜ VC 企業からの資金調達を選んだのか？

オープンソースプロジェクトが VC 企業からの資金調達を受けることについて、白黒はっきりした問題ではないと Evan You さんは述べています。
オープンソースでありながら VC 企業の資金を活用して成功した企業は存在します。
資金調達の条件やパワーバランスは企業によって大きく異なります。
多くの失敗事例ではプロジェクトが PE ファンドに完全に支配されてしまっています。

VoidZero はシードステージではすべての投資家を合わせても株式の 18 % 未満しか保有しておらず、Evan You さんがコントロール権を維持しています。
投資家は取締役会の議席を持っておらず、VoidZero はオープンソースの取り組みのビジョンを完全にコントロールしています。
VoidZero の長期的なビジョンを理解し、そのペースと戦略を信頼してくれる投資家のみと提携しているとのことです。

## 他の unified toolchain プロジェクトとの違いと教訓は？

Evan You 氏は Rome の例を挙げ、unified toolchain というアイデア自体は間違っていないものの実行方法が重要であると指摘しています。
(プロジェクトに携わった特定の個人を批判するつもりはないという前置きを Evan You さんは述べています。)
Rome は JavaScript で実装を開始しましたが、途中で Rust で書き直すことを決定しました。
採用実績、実装済みの機能も 0 からのスタートです。
結果として多くの時間と労力をかけて遠回りしてしまいました。

また、フォーマッターは他のツールと切り離されやすく、収益化の観点からも最適なエントリーポイントではないと分析したようです。
VoidZero はすでに多くのユーザーを抱える Vite を基盤としているため、Rome のような問題に直面することはないと考えているようです。

## Bun のようなランタイムとの互換性はあるのか？

VoidZero はランタイムに依存しない toolchain を目指しています。
一方、Bun や Deno はランタイムを中心とした開発体験を提供することで Node.js からのユーザー獲得を目指しています。
そのため、Bun の toolchain は Bun ランタイムと密接に結びついています。

Oxc は Rust プロジェクトで利用できるクレートの完全なリストであり、Node.js パッケージとしても提供されています。
特定のものを選択して利用することも、toolchain 全体を統合することも可能です。

Bun が VoidZero の toolchain を活用する可能性は低いかもしれませんが、他のランタイムであれば連携の可能性は十分にあると考えているようです。

## VoidZero に近い既存のプロジェクトはあるか？

Evan You 氏は VoidZero と完全に同等のプロジェクトは既存にはないと述べています。
目指す toolchain の観点で言えば Rust の Cargo が近いとのことです。
"Cargo for JavaScript" という表現については Alexander Lichter さんの口から出て来た表現ですが、Evan You さんも共感しているようでした。

## VoidZero に不可欠な、まだ知られていないプロジェクトは？

まだ公表されていないサービスについてはこのインタビューでも公表されませんでした。
ユーザーの端末で実行されるものはオープンソースかつ無料で使用できることを基本方針としているとのことです。
有料のサービスはホスティングサービスとして提供される予定です。

## VoidZero の収益化モデルは？

VoidZero は企業向けのサービスに焦点を当てて収益化を目指しています。
具体的なサービス内容は競合や戦略上の理由からまだ明らかにされていませんが、オープンソースプロジェクトのライセンスを変更して課金することはないと明言しています。
収益化モデルの例として、

- [Laravel](https://laravel.com/) - [Laravel Cloud](https://cloud.laravel.com/)
- [Nx](https://nx.dev/) - [Nx Cloud](https://nx.dev/nx-cloud)
- [Bit](https://bit.dev/) - [BitCloud](https://bit.cloud/)

のような、オープンソースのフレームワーク/ツールと有料のクラウドサービスを組み合わせたビジネスモデルが挙げられます。
VoidZero も JavaScript 開発のあらゆる側面をカバーする包括的な toolchain を構築することで、同様のサービスを提供する可能性があります。
趣味開発者は VoidZero の有料サービスを利用する必要はないと考えられます。

## VoidZero は Vue.js にどのような影響を与えるのか？

Vue.js はビジネス的に VoidZero とは独立したプロジェクトです。
しかし、Vue.js のデフォルトのビルドツールは Vite です。
VoidZero が Vite を強化することで、間接的に Vue.js ユーザーにもメリットがもたらされます。

VoidZero の取り組みはすべての開発者の開発体験を向上させることを目指していますが、Vue.js は特に重要な位置付け(first-class citizen)にあります。
新しいツールが Vue.js プラグインと互換性があること、新しいバージョンがリリースされたときに Vue.js がスムーズに動作することを保証する予定です。
また、Vue.js コンパイラの一部で Oxc のパーサーやトランスフォーマーを活用する可能性もあります。

## VoidZero の設立は Vue.js と Vite への注力にどのような影響を与えるのか？

会社設立により Vue.js に割ける時間は減りますが、Vue.js が放棄されることはないとのことです。
Vue.js は安定しており、多くのニーズを満たしています。
小さな改善、既存 API の改善、長年の問題の解決、内部的な書き直しによる高速化などに焦点を当てています。

また、Vite に関してはもすでにほとんどがチーム主導で開発されており、Evan You 氏自身は直接コードを書くことは少なくなっています。
優秀なコントリビュータを見つけ、彼らがより大きな役割を担えるよう支援することを重視しており、会社レベルでも同様のアプローチをとる予定です。

## UnJS との関係は？

UnJS はランタイムレベルのライブラリを提供することに重点を置いています。
一方、VoidZero はビルド、変換、インフラツールといった言語レベルのサポートを提供することに重点を置いています。
直接的な関係はありませんが、将来的に [jiti](https://unjs.io/packages/jiti) が Oxc や Rolldown を活用する可能性はあるとのことです。

:::details what is jiti?
コマンドラインなどで TypeScript ファイルをそのまま実行できます。

https://unjs.io/packages/jiti
:::

## Pooya Parsa さんの `.config` ディレクトリ提案のサポートは？

VoidZero がカバーするすべての設定は、単一のファイルで設定できるようになる予定です。
`.config` ディレクトリのサポートは VoidZero のスコープに含まれるか定かではないとのことです。

[Pooya Parsa さん](https://twitter.com/_pi0_)は UnJS, Nitro の作者であり、Nuxt コアチームメンバーです。

https://github.com/pi0/config-dir

## SWC、esbuild などの他のツールからの移行パスはあるのか？

Rolldown はスコープの点で esbuild に非常に似ています。
API は Rollup をモデルにしていますが機能セットは esbuild に非常に近いです。
esbuild から Rolldown への移行は容易であると Evan You さんは考えており、実際に移行を進めている例もあります。
Oxc のトランスフォーマーは Babel のトランスフォーマーをモデルにしているため、SWC から Oxc への移行も比較的容易とのことです。
また、SWC にはバンドラーがなく、Oxc のバンドラーである Rolldown を使用することもできるそうです。

## Next.js が Vite をサポートする可能性は？

> Alexander Lichter:
> Let's see. Okay. Cheeky question. When When Next.js will support Vite?
>
> Evan You:
> Probably never.

Next.js は Turbopack と密接に統合されているため Vite をサポートする可能性は低いでしょう。
Next.js を Vite 上で動作させるプロトタイプは作成されていたようですが、Vite への移行は困難だと判明したようです。
Vercel も Turbopack に多くを投資してきていることもあり、Vercel も Vite のサポートには熱心ではないようです。

## oxlint は Stylistic ルールをサポートするのか？

oxlint の現在のスコープは意図的に限定されています。
VoidZero では現在、リンターの優先度は高くないと考えているそうです。
将来的には toolchain を可能な限り完全なものにすることを目指しており、Stylistic ルールのサポートも需要に応じて検討されるとのことです。

## Vite のライセンスが変更された理由は？

Vite の著作権を Evan You 氏個人から VoidZero 社に譲渡しました。
会社が Vite の開発をスポンサーするための法的根拠を明確にするためとのことです。

## Vite と Rolldown の最初のバージョンはいつリリースされるのか？

pkg.pr.new を通じて、Vite と Rolldown の継続的なリリースがすでに提供されています。

https://github.com/rolldown/vite

現時点ではいくつかの問題が残っていますが、年末か来年初めにはプロジェクトで実際にテストできるアルファ版またはベータ版がリリースされる予定とのことです。

## VoidZero の採用計画は？

VoidZero は現在、特定のポジションの募集は行っていません。
しかし、低レベルの開発経験があり、unified toolchain というビジョンに共感できる人材(Rust の経験があればなおよし)からの応募は歓迎しているとのことです。
(20 件以上の応募が実際あったようです。)

オープンソースへの貢献経験は重要な要素ですが、クローズドソースのプロジェクトで関連する経験を持つ人材も検討対象となります。
会社の規模が拡大し、より多くのポジションが生まれた際に Vite や Vitest チームからの採用や、スポンサーシップの増加も検討されるとのことです。

## 最後に

JavaScript エコシステム全体を 1 つの統合された toolchain で支えるという壮大なビジョンが見えました。
Vue.js については VoidZero と直接は関係なく、今後も Evan You さんを中心にコミュニティによって開発が進められると再確認できて安心しています。

VoidZero がオープンソースの価値を大切にしながらも、現実的な資金調達と収益化モデルを取り入れていることも分かりました。
これからの JavaScript エコシステムがどのように進化していくのかとても楽しみです。
まだ公表されていないサービスの情報や rolldown/vite のアルファ版、ベータ版も楽しみです。

また、Evan You さんが Python ツール [uv](https://docs.astral.sh/uv/) についても言及していたのが驚きでした。
[uv](https://docs.astral.sh/uv/) は "Cargo for Python" を目指しています。
こちらも今後が楽しみです。

Alexander Lichter さんのインタビュー動画のおかげで VoidZero についてキャッチアップできました。
この動画は 1 時間と長いですが、字幕もありますのでぜひチェックしてみてください。
ぼくもこれからも Alexander Lichter さんの動画で引き続き Vue, Nuxt をはじめ、フロントエンドの学習を続けていきたいです。

最後まで読んでいただきありがとうございました！

<br />
<br />
<br />

https://twitter.com/naitokosuke/status/1847868262815846711
