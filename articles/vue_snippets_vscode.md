---
title: "Vue Composition API script setup のお約束をスニペットにする【VS Code】"
emoji: "🫒"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["vue", "vscode"]
publication_name: "comm_vue_nuxt"
published: true
---

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

```vue
<script setup lang="ts">
//
</script>

<template>
  <!--  -->
</template>

<style scoped>
/*  */
</style>
```

を新しい `.vue` ファイルを作成するたびに書きます。
VS Code のスニペットとして登録してしまおうと思います。

## 手順

1. `.vscode/` に `vue.code-snippets` を作成
2. スニペットを登録

```json:vue.code-snippets
{
  "Vue3 Component": {
    "prefix": "vue",
    "scope": "vue",
    "body": [
      "<script setup lang=\"ts\">",
      "",
      "</script>",
      "",
      "<template>",
      "",
      "</template>",
      "",
      "<style scoped>",
      "",
      "</style>"
    ],
    "description": "Vue3 Composition API script setup TypeScript"
  }
}
```

![custom snippet suggestion in a new vue file](/images/vue_snippets_vscode/snippet-suggestion.png)

![custom snippet completion](/images/vue_snippets_vscode/snippet-completion.png)

## 最後に

最後まで読んでいただきありがとうございました！

## 参考

https://code.visualstudio.com/docs/editor/userdefinedsnippets
