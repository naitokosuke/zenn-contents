---
title: "『All about VoidZero - The Interview with Evan You』を見てわかったこと思ったこと"
emoji: "📘"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: []
published: false
---

## はじめに

ナイトウ([@engineer_naito](https://twitter.com/engineer_naito))と申します。

[Alexander Lichter](https://twitter.com/TheAlexLichter) さんの YouTube [『All about VoidZero - The Interview with Evan You』](https://youtu.be/33ex2A04b7g?si=ERcpbXL6chiqzXYk)を見ました。

https://youtu.be/33ex2A04b7g?si=ERcpbXL6chiqzXYk

前から [VoidZero](https://voidzero.dev/) については興味がありましたが、なかなかキャッチアップできていませんでした。
このインタビュー動画はとてもありがたかったです。

インタビューは英語で行われています。
英語学習も兼ねて、この動画で学んだことを記事にします。

## 感じたこと & わかったこと

- JavaScript 以外のオープンソース技術についても言及
- 他の OSS 技術とは異なる点を言及
- Rome との違いや Evan You さんが思う Rome の反省点も

- VoidZero という名前の由来と命名の経緯
- VoidZero を設立した経緯
- VoidZero のミッション
- オープンソースと資金調達、収益化の両立方法
- 採用するだけでなく、OSS コントリビューターに対して寄付、スポンサーしていく

- "cargo for JavaScript" を目指す！
- cargo ってどんだけすごいの？

- Vue との直接的な関係はない(ビジネスの観点で)
- Vite がよくなれば当然 Vue にもよい影響
- VoidZero が目指す unified toolchain の恩恵を Vue が最も受ける

- rolldown/vite のアルファ版またはベータ版 は 2024 年末か 2025 年早々を目指している

## Who is Alexander Lichter?

https://www.lichter.io/

https://github.com/manniL/

Nuxt, UnJS メンバーの Alexander Lichter さんですが、Youtube もされています。

![Alexander Lichter's Youtube channel with thumbnails](/images/alexander_interview_about_voidzero_with_evan/alex-youtube.png)

主に Vue, Nuxt に関する Tips や解説動画を投稿されています。
現時点で、Alexander Lichter さんは VoidZero とは直接関係はないようです。
[『All about VoidZero - The Interview with Evan You』](https://youtu.be/33ex2A04b7g?si=ERcpbXL6chiqzXYk)は、[Vue Fes Japan 2024](https://vuefes.jp/2024/) の当日に別の場所でインタビュー、撮影が行われていたようです。
(ぼくは当日をスタッフを務めており、たしかにスタッフ無線でお二人がどこかで何かをされているようなことを聞いていました。)

## What is VoidZero?

VoidZero は Vue, Vite 作者 Evan You さんが立ち上げた会社です。

https://voidzero.dev/

> **The Mission**
> We are building a unified high-performance toolchain for JavaScript: including parser, transformer, resolver, linter, formatter, minifier, bundler, test runner, and meta framework support. Our mission is to make the next generation of JavaScript developers more productive than ever before.

2024 年 10 月 1 日に 460 万ドル(約 7 億 800 万円 2024 年 12 月 15 日時点)の資金調達を行なったことが発表されました。

https://twitter.com/voidzerodev/status/1841100762203492595

昨年末に Evan You さんが何かを匂わせていましたが、ようやく明かされました。

https://twitter.com/youyuxi/status/1741101029784277413

## インタビュー内容

- VoidZero のアイデアを思いついたきっかけは？
- VoidZero の資金調達の経緯は？
- VoidZero という会社名の由来は？
- VoidZero チームのメンバーは？
- なぜ VC 企業からの資金調達を選んだのか？他の選択肢は？適切な投資家を見つけるには？
- 他の unified toolchain プロジェクトとの違いと教訓は？
- Bun のようなランタイムとの互換性はあるのか？
- VoidZero に近い既存のプロジェクトはあるか？
- VoidZero に不可欠な、まだ知られていないプロジェクトは？
- VoidZero の収益化モデルは？
- VoidZero は Vue.js にどのような影響を与えるのか？
- VoidZero の設立は Vue.js と Vite への注力にどのような影響を与えるのか？
- UnJS プロジェクトとの関係は？
- Pooya さんの `.config` ディレクトリ提案のサポートは？
- SWC、esbuild などの他のツールからの移行パスはあるのか？
- Next.js が Vite をサポートする可能性は？
- oxc-lint はスタイルルールをサポートするのか？
- Vite のライセンスが変更された理由は？
- Vite と Rolldown の最初のバージョンはいつリリースされるのか？
- VoidZero の採用計画は？

## VoidZero のアイデアを思いついたきっかけは？

Evan You さんは、Vite が多くの Web フレームワークやツール間で共有されるインフラレイヤーとなりつつあることに気づきました。
これは、JavaScript エコシステムにおける大きな変化であり、今までにないレベルの収束を意味していました。
この収束をさらに深め、JavaScript エコシステム全体に共通のインフラを提供することで、より多くのメリットが生まれると考えました。

そして、現在の VoidZero の従業員である開発者たちと将来の JavaScript ツールについて話し合い、このアイデアは具体化していきました。
Vite の普及という背景と相まって、JavaScript エコシステム全体の toolchain を統一するという壮大な目標へと繋がっていったのです。

## VoidZero の資金調達の経緯は？

unified toolchain という壮大なビジョンを実現するには、Vue.js のような寄付やスポンサーシップベースの資金調達モデルでは限界があることを認識していました。
チームをフルタイムで雇用するため、ベンチャーキャピタルからの資金調達を決断しました。

## VoidZero という会社名の由来は？

当初、VoidZero は一時的に "Vite Labs" と呼ばれていたそうです。。
しかし、"Vite Labs" という名前の仮想通貨企業がすでに存在することが判明したため、別の名前を探すことになりました。
そして、JavaScript の式 `void 0` が `undefined` と評価されることにちなんで、"VoidZero" という名前に決定しました。

:::details 仮想通貨企業 Vite Labs
https://www.vite.org/
https://twitter.com/vitelabs
:::

## VoidZero チームのメンバーは？

VoidZero チームは、Vite、Vitest、Oxc、Rolldown といった各プロジェクトの主要なコントリビューターで構成されています。

- Oxc チーム:

  - Boshen Chen さん
  - Overlook Motel さん
  - DENG Qing さん

- Rolldown チーム:

  - HE Yunfei さん
  - HE Xiangjun さん
  - LI Kui さん

- Vite チーム:

  - Shun Yokoyama さん
  - Hiroshi Ogawa さん
  - Vladimir Sheremet さん

社外アドバイザーとして [NAPI-RS](https://napi.rs/) の作者である Broooooklyn さんがいます。

## なぜ VC 企業からの資金調達を選んだのか？他の選択肢は？適切な投資家を見つけるには？

Evan You さんはオープンソースプロジェクトが VC 企業からの資金調達を受けることについて、白黒はっきりとした問題ではないと述べています。
オープンソースでありながら VC 企業の資金を活用して成功した企業は存在します。
資金調達の条件やパワーバランスは、企業によって大きく異なり、多くの失敗事例ではプロジェクトが PE ファンドに完全に支配されてしまっています。

VoidZero は、シードステージではすべての投資家を合わせても株式の 18 % 未満しか支配しておらず、Evan You さんがコントロール権を維持しています。
さらに、投資家は取締役会の議席を持っておらず、VoidZero はオープンソースの取り組みのビジョンを完全にコントロールしています。
VoidZero の長期的なビジョンを理解し、そのペースと戦略を信頼してくれる投資家のみと提携しているとのことです。

## 他の unified toolchain プロジェクトとの違いと教訓は？

Evan You 氏は、Rome の例を挙げながら、unified toolchain というアイデア自体は間違っていないものの実行方法が重要であると指摘しています。
Rome は JavaScript で実装を開始しましたが、途中で Rust で書き直すことを決定しました。
その結果、多くの時間と労力が無駄になってしまい、採用もゼロからのスタートとなってしまいました。

また、フォーマッターは他のツールと切り離されやすく、収益化の観点からも最適なエントリーポイントではないと分析したようです。
VoidZero は、すでに多くのユーザーを抱える Vite を基盤としているため、Rome のような問題に直面することはないと考えているようです。

## Bun のようなランタイムとの互換性はあるのか？

VoidZero はランタイムに依存しない toolchain を目指しています。
一方、Bun や Deno は、ランタイムを中心とした開発体験を提供することで、Node.js からのユーザー獲得を目指しています。
そのため、Bun の toolchain は Bun ランタイムと密接に結びついています。

VoidZero は、個別のコンポーネントとして利用することも、toolchain 全体を統合することも可能です。
OXC は Rust プロジェクトで利用できる クレートの完全なリスト であり、さらに、Node.js パッケージとしても提供されています。
Bun が VoidZero の toolchain を活用する可能性は低いかもしれませんが、他のランタイムであれば連携の可能性は十分にあると考えているようです。

## VoidZero に近い既存のプロジェクトはあるか？

Evan You 氏は、VoidZero と完全に同等の既存のプロジェクトは存在しないと述べています。
目指す toolchain の観点で言えば Rust の Cargo が近いとのことです。
"Cargo for JavaScript" という表現については Alexander Lichter さんの口から出て来た表現で、Evan You さんは肯定しただけです。

## VoidZero に不可欠な、まだ知られていないプロジェクトは？

まだ公表されていないサービスについてはこのインタビューでも公表されませんでした。
方針については明言され、ユーザーの端末で実行されるものはオープンソースかつ無料で使用できることを基本方針としているとのことです。
有料のサービスはホスティングサービスとして提供される予定です。

## VoidZero の収益化モデルは？

VoidZero は企業向けのサービスに焦点を当てて収益化を目指しています。
具体的なサービス内容は競合や戦略上の理由からまだ明らかにされていませんが、オープンソースプロジェクトのライセンスを変更して課金することはないと明言しています。
収益化モデルの例として、

- Laravel - Laravel Cloud、
- NX - NX Cloud
- Bit - BitCloud

のような、オープンソースのフレームワーク/ツールと有料のクラウドサービスを組み合わせたビジネスモデルが挙げられます。
VoidZero も JavaScript 開発のあらゆる側面をカバーする包括的な toolchain を構築することで、同様のサービスを提供する可能性があります。
趣味の開発者は VoidZero の有料サービスを利用する必要はないと考えられます。

## VoidZero は Vue.js にどのような影響を与えるのか？

Vue.js はビジネス的に VoidZero とは独立したプロジェクトです。
しかし、Vue.js のデフォルトのビルド toolchain は Vite です。
VoidZero が Vite を強化することで、Vue.js ユーザーにもメリットがもたらされます。

VoidZero の取り組みはすべての開発者の開発体験を向上させることを目指していますが、Vue.js は特に重要な位置付け(first-class citizen)にあります。
新しいツールが Vue.js プラグインと互換性があること、新しいバージョンがリリースされたときに Vue.js がスムーズに動作することを保証する予定です。
また、Vue.js コンパイラの一部で Oxc のパーサーやトランスフォーマーを活用する可能性もあります。

## VoidZero の設立は Vue.js と Vite への注力にどのような影響を与えるのか？

会社設立により Vue.js に割ける時間は減りますが、Vue.js が放棄されることはないとのことです。
Vue.js は、安定しており多くのニーズを満たしています。
小さな改善、既存 API の改善、長年の問題の解決、内部的な書き直しによる高速化などに焦点を当てています。

また、Vite に関してはもすでにほとんどがチーム主導で開発されており、Evan You 氏自身は直接コードを書くことは少なくなっています。
優秀な貢献者を見つけ、彼らがより大きな役割を担えるよう支援することを重視しており、会社レベルでも同様のアプローチをとる予定です。

## UnJS プロジェクトとの関係は？

UnJS はランタイムレベルのライブラリを提供することに重点を置いています。
一方、VoidZero はビルド、変換、インフラツールといった言語レベルのサポートを提供することに重点を置いています。
直接的な関係はありませんが、将来的に [jiti](https://unjs.io/packages/jiti) が Oxc や Rolldown を活用する可能性はあります。

## Pooya さんの `.config` ディレクトリ提案のサポートは？

VoidZero がカバーするすべての設定は、単一のファイルで設定できるようになる予定です。
`.config` ディレクトリは現時点で問題なく機能しており、VoidZero のスコープに含まれるかは定かではないとのことです。

[Pooya Parsa さん](https://twitter.com/_pi0_)は UnJS, Nitro の作者であり、Nuxt コアチームメンバーです。

https://github.com/pi0/config-dir

## SWC、esbuild などの他のツールからの移行パスはあるのか？

Rolldown は、スコープの点で esbuild に非常に似ており、API は Rollup をモデルにしていますが機能セットは esbuild に非常に近いです。
esbuild から Rolldown への移行は容易であると Evan You さんは考えており、実際に移行を進めている例もあります。
Oxc のトランスフォーマーは、Babel のトランスフォーマーをモデルにしているため、SWC から Oxc への移行も比較的容易とのことです。
また、SWC にはバンドラーがなく、Oxc のバンドラーである Rolldown を使用することもできるそうです。

## Next.js が Vite をサポートする可能性は？

> Alexander Lichter:
> Let’s see. Okay. Cheeky question. When When Next.js will support Vite?
>
> Evan You:
> Probably never.

Next.js は Turbopack と密接に統合されているため Vite をサポートする可能性は低いでしょう。
Next.js を Vite 上で動作させるプロトタイプは作成されたようですが、内部的な違いが大きく Vercel も Vite のサポートには熱心ではないようです。

## oxc-lint は Stylistic ルールをサポートするのか？

oxc-lint の現在のスコープは意図的に限定されています。
将来的には、toolchain を可能な限り完全なものにすることを目指しており、Stylistic ルールのサポートも需要に応じて検討されるとのことです。

## Vite のライセンスが変更された理由は？

Vite の著作権を Evan You 氏個人から VoidZero 社に譲渡しました。
会社が Vite の開発をスポンサーするための法的根拠を明確にするためとのことです。

## Vite と Rolldown の最初のバージョンはいつリリースされるのか？

pkg.pr.new を通じて、Vite と Rolldown の継続的なリリースがすでに提供されています。

https://github.com/rolldown/vite

現時点ではいくつかの問題が残っていますが、年末か来年初めにはプロジェクトで実際にテストできるアルファ版またはベータ版がリリースされる予定とのことです。

## VoidZero の採用計画は？

VoidZero は現在、特定のポジションの募集は行っていません。
しかし、低レベルの開発経験があり、Rust の経験があればなお良く、unified toolchain というビジョンに共感できる人材からの応募は歓迎しています。
オープンソースへの貢献経験は重要な要素ですが、クローズドソースのプロジェクトで関連する経験を持つ人材も検討対象となります。
将来的には、会社の規模が拡大し、より多くのポジションが生まれた際に、Vite や Vitest チームからの採用や、スポンサーシップの増加も検討されます。

## 最後に

Evan You さんが設立した VoidZero の取り組みを通じて、JavaScript エコシステム全体を一つの統合された toolchain で支えるという壮大なビジョンが見えました。

VoidZero がオープンソースの価値を大切にしながらも、現実的な資金調達と収益化モデルを取り入れていることも分かりました。
Evan You さんのビジョンとリーダーシップによって、これからの JavaScript エコシステムがどのように進化していくのかとても楽しみです。
まだ公表されていない情報や rolldown/Vite のアルファ版、ベータ版も楽しみです。
ぼくは toolchain 周りの知識が乏しいので、楽しみに待ちながら学んでいきたいです。
公式アカウントをフォローして待ちます。

https://twitter.com/voidzerodev

Evan You さんが Python パッケージ、プロジェクトマネージャー [uv](https://docs.astral.sh/uv/) についても言及していたのが驚きでした。
[uv](https://docs.astral.sh/uv/) は "Cargo for Python" を目指しています。
こちらも今後が楽しみです。

Alexander Lichter さんのインタビュー動画のおかげで VoidZero についてキャッチアップすることができました。
この動画は 1 時間と長いですが、他の動画は短くまとまっているのでぜひチェックしてみてください。
ぼくもこれからも Alexander Lichter さんの動画で引き続き Vue, Nuxt をはじめ、フロントエンドの学習を続けていきたいです。

最後までよんでいただきありがとうございました！

https://twitter.com/engineer_naito/status/1847868262815846711
