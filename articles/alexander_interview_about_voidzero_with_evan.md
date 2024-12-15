---
title: "動画『All about VoidZero - The Interview with Evan You』を見てわかったこと思ったこと"
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

- rolldown/vite の α 版 or β 版 は 2024 年末か 2025 年早々を目指している

## Who is Alexander Lichter?

https://www.lichter.io/

https://github.com/manniL/

Nuxt, UnJS メンバーの Alexander Lichter さんですが、Youtube もされています。

![Alexander Lichter's Youtube channel with thumbnails](/images/alexander_interview_about_voidzero_with_evan/alex-youtube.png)

主に Vue, Nuxt に関する Tips や解説動画を投稿されています。
[『All about VoidZero - The Interview with Evan You』](https://youtu.be/33ex2A04b7g?si=ERcpbXL6chiqzXYk)は、[Vue Fes Japan 2024](https://vuefes.jp/2024/) の当日に別の場所でインタビュー、撮影が行われていたようです。
(ぼくは当日をスタッフを務めており、たしかにスタッフ無線でお二人がどこかで何かをされているようなことを聞いていました。)

# What is VoidZero?

VoidZero は Vue, Vite 作者 Evan You さんが立ち上げた会社です。

https://voidzero.dev/

> Our mission is to make web developers more productive than ever before.

> **The Mission**
> We are building a unified high-performance toolchain for JavaScript: including parser, transformer, resolver, linter, formatter, minifier, bundler, test runner, and meta framework support. Our mission is to make the next generation of JavaScript developers more productive than ever before.

2024 年 10 月 1 日に 460 万ドル(約 7 億 800 万円 2024 年 12 月 15 日時点)の資金調達を行なったことが発表されました。

https://twitter.com/voidzerodev/status/1841100762203492595

昨年末に Evan You さんが何かを匂わせていましたが、ようやく明かされました。

https://twitter.com/youyuxi/status/1741101029784277413

インタビュー動画でも言及していますが、チームメンバーは

https://voidzero.dev/team

で紹介されています。
ここに記載されている方の他にも社外アドバイザー？として [NAPI-RS](https://napi.rs/) の [Broooooklyn](https://twitter.com/Brooooook_lyn) さんもおられるようです。
