# gas-health-check

GoogleAppsScriptでwebサイトの死活監視

## 認証と雛形作成

    npm i
    npm i -g clasp
    npm run setup

## コードのアップロード

    npm run push

## 設定

    clasp open

アップロードしたGoogleAppsScriptのページが開きます

1. スクリプトプロパティにメールアドレス、監視URLの指定

ファイル -> プロジェクトのプロパティ -> タブ名「スクリプトのプロパティ」

- プロパティ `to` で監視結果の送信先メールアドレス
- プロパティ `http` で始まるものは監視URL対象です

[![https://gyazo.com/c8a98ca518e0b74ba2ea28487708cb63](https://i.gyazo.com/c8a98ca518e0b74ba2ea28487708cb63.png)](https://gyazo.com/c8a98ca518e0b74ba2ea28487708cb63)

[![https://gyazo.com/d32302177f9f9b4d675e1bcde4323ca8](https://i.gyazo.com/d32302177f9f9b4d675e1bcde4323ca8.png)](https://gyazo.com/d32302177f9f9b4d675e1bcde4323ca8)


2. 実行権限の付与 & スケジュールの作成

`setScheduling` の関数を実行、認証をする。

[![https://gyazo.com/120fc248b881d9c4dc9206b3e71da6f6](https://i.gyazo.com/120fc248b881d9c4dc9206b3e71da6f6.png)](https://gyazo.com/120fc248b881d9c4dc9206b3e71da6f6)

3. 終了

1分毎に死活監視されるようになります。httpステータスコードに変更があればメールが届きます。


WIP: `clasp run` の実行がちゃんとできればブラウザ設定は不要かも?
現状はエラーが返される
