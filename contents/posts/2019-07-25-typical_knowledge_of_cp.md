---
title: 競技プログラミングにおけるオレオレ典型知識
description:
tags:
  - 競技プログラミング
  - C++
  - Ruby
  - 典型
created_at: 2019-07-25
updated_at: 
draft: true
---

くさころです。ころころ。「典型力」をご存知ですか。

[競技プログラミングの強みと「典型力」について - chokudaiのブログ](http://chokudai.hatenablog.com/entry/2018/04/23/165232)

chokudaiさんの記事を読んで、干し芋のリストに「典型力」が加わったので自分なりに得た知識の言語化を試みます。
特に、こういった知識はなかなか言語化されてないと思うので。
内容は思いつき次第追加します。

## 注意
- くさころは緑コーダーなので上級者の参考にはならないと思います
- 自分にしかわからない書き方をしているかもしれませんし、間違った知識かもしれません。あまり鵜呑みにしないでください
- 時間とともに更新されていく系の記事です

# 方針を立てる
書かれている順番にやれということではないです。

- 愚直な解法を考えて、そこから計算量を落とす
- 前処理をすることで計算量を落とせるか
- 処理を分けることで計算量を落とせるか
- 分割して考えられるか、状態をまとめて扱えるか→DPを疑ってみる
- 数え上げ→DPを疑ってみる
- 最もシンプルな場合から着想を得る
- 最大（最小）となる場合を考える
- 操作
  - 逆から考えてみる
  - もっとシンプルな操作に言い換えられるか

- 知らないアルゴリズムです
  - 英語でググる（そのコンテストにおいて可能なら）
  - 蟻本を眺める（そのコンテストにおいて可能なら）

- [競技プログラミング問題パターン - yukicoder](https://yukicoder.me/wiki/pattern)

解けそうな方針が立ったら、計算量を見積もります。


# 計算量
- 制約によっては\\(2^N\\)を疑う
- \\(N=10^5\\)で\\(N\log_2 N \simeq 16.6 \times 10^5 \\)
- \\(N=10^6\\)で\\(N\log_2 N \simeq 19.9 \times 10^6 \\)
- \\(\frac{N}{1} + \frac{N}{2} + \frac{N}{3} + ... + \frac{N}{N} = NlogN \\)
- \\(N\sqrt{N}\\)は簡単な処理で\\(N=10^5\\)くらいならたぶん間に合う（\\(N\sqrt{N} \simeq 316 \times 10^5 \simeq 3 \times 10^8  \\)）

# WAを出したら
- 論理
  - 極端に大きな値、小さな値を入れてみる（コーナーケース）
  - 同じ値を複数入れてみる
  - 制約を見間違えてないか
  - 問題文を読み間違えてないか（[競技プログラミングにおける問題文の読み方](https://9sako6.me/posts/2019/07/21/how_to_read_a_sentence/)）
  - \\(mod\\)計算を忘れてないか
  - 出力形式を間違えてないか
- 言語
  - オーバーフローしてないか
  - 初期化を忘れてないか
  - 十分な大きさの配列を確保しているか
  - 変数名を間違えてないか
  - 演算子の優先度によるバグ
  - ライブラリのバグ

# グラフ
- 木とみなせるか
- 頂点数\\(\leq 300\\)くらいならワーシャルフロイド法の適用を疑ってみる

# DP
- 分割して考えられるか、状態をまとめて扱えるか
- 十分大きな配列を用意する
- 初期化する
  - 最小化なら\\(INF\\)、最大化なら\\(0\\)か\\(-INF\\)で
- 初期条件を考える
- DPの気持ちを思い出す（一度計算した値を再利用）


# XOR
[テルさんのツイート](https://twitter.com/TeruMiyake/status/1150695360223797248)より引用

```c++
1. 結合則が成り立つ // どんな順番で計算してもいい  
2. 2つ同じものがくっつくと対消滅する // a^a=0。a^b=0 -> a=bも言える  
3. 任意の偶数nについて、n^(n+1)=1 // 偶数の右端桁は0なので n^n^1=0^1=1  
4. a+b >= a^b かつ 桁あふれしない // なお等号成立は「どの桁も繰り上がらないとき」  
5. a^x == b^x <=> a == b // ^x をしても式の意味が潰れない。!=でも同じ  
  --> 6. a^x == b <=> a == b^x // 移項みたいなことができる。!=でも同じ  
7. a^b + a&b = a|b // 被ってないbit + 被ったbit = どっちかにあるbit  
8. a^b + 2*(a&b) = a+b // 足し算とは「被ってないbit + 被ったbitの繰り上げ(x2)」
```


# 区間
- 区間への操作が互いに交差してないものとみなす
- 二次元で表す([D - AtCoder Express 2](https://atcoder.jp/contests/abc106/tasks/abc106_d))
- 終端でソートして貪欲

# 条件を満たすものの存在
- 答えの候補となる文字列、数列などを生成しておき、その中から条件に合うものを出力


# 言語
C++とRubyを使うので、言語特有のTipsを書いていくつもりです。

## C++

### 整数型
- `long long`
  - -9,223,372,036,854,775,808 から 9,223,372,036,854,775,807
  - \\(9 \times 10^{18} \\)よりちょっとでかい

## Ruby


# 参考
- [競技プログラミングの強みと「典型力」について - chokudaiのブログ](http://chokudai.hatenablog.com/entry/2018/04/23/165232)
- [競技プログラミングの問題の解き方、そのマニュアル - うさぎ小屋](https://kimiyuki.net/blog/2016/06/21/how-to-solve-problems-in-competitive-programming/)