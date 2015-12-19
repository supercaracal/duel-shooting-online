# Duel Shooting Online

## これは何？

Prototype.js の勉強用に作成した 1対1 のシューティングゲーム。今となっては Prototype.js が絶滅危惧種となってしまって悲しい。

* [Duel Shooting Demo](http://codepen.io/supercaracal/pen/QyNZEL) ... 糞AI同士が闘う単調なデモ
* [Duel Shooting Offline](http://duel-shooting.herokuapp.com/) ... 糞AIと闘うオフラインモード
* [Duel Shooting Online](http://duelshooting-online.herokuapp.com/) ... 誰かと闘うラグが激しいオンラインモード

## ゲーム仕様

* オンラインモードは2人以上アクセスが来ないと永遠に待ち状態。
* 機体はランダムに決まって自分では選べない。
* 糞AIは真ん中からキー押しっぱなしで連射するとすぐに倒せてしまう。

## 初期構築

```
$ git clone git@github.com:supercaracal/duelshooting_online.git
```

```
$ npm install
```

```
$ node web.js
```

## 継続開発

以下で Frontend の Javascript Files が自動で結合圧縮されます。

```
$ grunt watch
```

## 機体一覧

### White Demon

![White Demon](https://github.com/supercaracal/duelshooting_online/raw/master/img/white-demon.gif)

| Action     | Keyboard     | Mouse or Touch    |
|------------|--------------|-------------------|
| Move Right | Cursor Right | Lower part right  |
| Move Left  | Cursor Left  | Lower part left   |
| Wait       | Cursor Down  | Lower part center |
| Attack1    | Cursor Up    | Upper part center |
| Attack2    | F            | Upper part left   |
| Attack3    | M            | Upper part right  |

### Red Comet

![Red Comet](https://github.com/supercaracal/duelshooting_online/raw/master/img/red-comet.gif)

| Action     | Keyboard     | Mouse or Touch    |
|------------|--------------|-------------------|
| Move Right | Cursor Right | Lower part right  |
| Move Left  | Cursor Left  | Lower part left   |
| Avoid      | N            | Lower part center |
| Attack1    | Cursor Up    | Upper part center |
| Attack2    | F            | Upper part left   |
| Barrier    | I            | Upper part right  |

### Dark Emperor

![Dark Emperor](https://github.com/supercaracal/duelshooting_online/raw/master/img/dark-emperor.gif)

| Action      | Keyboard     | Mouse or Touch    |
|-------------|--------------|-------------------|
| Move Right  | Cursor Right | Right area        |
| Move Left   | Cursor Left  | Left area         |
| Attack Main | Cursor Up    | Middle area       |
| Attack Sub1 | A            | unsupported       |
| Attack Sub2 | S            | unsupported       |
| Attack Sub3 | D            | unsupported       |
| Attack Sub4 | F            | unsupported       |
| Attack Sub5 | Z            | unsupported       |
| Attack Sub6 | X            | unsupported       |
| Attack Sub7 | C            | unsupported       |
| Attack Sub8 | V            | unsupported       |
