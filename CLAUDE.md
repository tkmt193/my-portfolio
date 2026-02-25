# CLAUDE.md — my-portfolio

このファイルはClaude Codeがこのリポジトリで作業する際の行動指針です。

---

## プロジェクト概要

- **目的**: 自己紹介ポートフォリオサイト
- **技術スタック**: React / TypeScript / Vite
- **リンター/フォーマッター**: Biome + ESLint
- **言語比率**: TypeScript 64%, CSS 32%, HTML 2%, JS 2%

---

## 作業スコープ（必読）

### ✅ 許可されている操作

- このリポジトリ（`my-portfolio/`）配下のファイルの読み取り・編集・作成
- `src/`・`public/` 配下のコンポーネント・スタイル・アセットの変更
- 設定ファイル（`vite.config.ts`, `tsconfig*.json`, `biome.json`, `eslint.config.js`）の編集
- `package.json` の依存関係の追加・更新（要確認）
- ビルド・テスト・リントコマンドの実行（下記の許可コマンド参照）

### ❌ 禁止されている操作

- **このリポジトリの外（親ディレクトリ `../` 以上）への書き込み・削除**
- `.env` / `.env.*` ファイルの読み取り・編集・出力
- SSH鍵・APIトークン・認証情報を含むファイルへのアクセス（`~/.ssh/`, `*secret*`, `*credential*` 等）
- `git push` の自動実行（必ずユーザーの確認を得ること）
- `npm publish` やデプロイコマンドの自動実行
- `curl` / `wget` による外部への任意のリクエスト
- システムグローバルへのパッケージインストール（`npm install -g` 等）
- `rm -rf` による大規模削除（個別ファイルの削除は可、要確認）

---

## 許可コマンド一覧

以下のコマンドは確認なしで実行してよい。

```bash
npm run dev        # 開発サーバー起動
npm run build      # プロダクションビルド
npm run preview    # ビルド結果プレビュー
npm run lint       # ESLint実行
npx biome check .  # Biomeチェック
npx biome format . # Biomeフォーマット
npx tsc --noEmit   # 型チェック
git status         # 状態確認
git diff           # 差分確認
git add .          # ステージング
git commit         # コミット（メッセージは必ず確認する）
```

以下のコマンドは**実行前にユーザーに確認すること**。

```bash
npm install <package>   # 新しい依存関係の追加
git push                # リモートへのプッシュ
rm <file>               # ファイル削除
```

---

## コーディング規約

### 全般

- **TypeScript strict モード**を遵守する（`tsconfig.app.json` の設定に従う）
- `any` 型の使用は禁止。やむを得ない場合は `unknown` を使い、型ガードを実装する
- コンポーネントは関数コンポーネント（FC）で記述する
- ファイル名はコンポーネントなら `PascalCase.tsx`、ユーティリティなら `camelCase.ts`

### スタイル

- CSSファイルはコンポーネントと同じディレクトリに配置する（`Component.module.css` 推奨）
- インラインスタイルは避ける

### Biome / ESLint

- コード変更後は必ず `npx biome check .` と `npm run lint` を実行して確認する
- 警告・エラーが出た場合は修正してからコミットする

---

## ディレクトリ構成（参考）

```
my-portfolio/
├── public/          # 静的ファイル
├── src/             # ソースコード（主な作業場所）
│   ├── components/  # Reactコンポーネント
│   ├── assets/      # 画像・フォント等
│   └── main.tsx     # エントリポイント
├── index.html
├── vite.config.ts
├── biome.json
└── package.json
```

---

## 変更を加える前に必ず行うこと

1. **影響範囲を確認する** — 変更するファイルが他のコンポーネントからインポートされていないか確認する
2. **型チェックを実行する** — `npx tsc --noEmit`
3. **リントを通す** — `npx biome check .` / `npm run lint`
4. **ビルドが通ることを確認する** — `npm run build`

---

## コミットメッセージ規約

```
feat: 新機能の追加
fix: バグ修正
style: スタイル変更（機能変更なし）
refactor: リファクタリング
chore: 設定・ツール変更
docs: ドキュメント変更
```

---

## セキュリティに関する注意

- `.gitignore` に記載されているファイルは**絶対にgitに追加しない**
- 環境変数（`import.meta.env.*`）はコード中にハードコードしない
- 外部ライブラリを追加する場合は、まずユーザーに追加理由と概要を説明し、承認を得てからインストールする

---

## 判断に迷ったら

- **破壊的な変更（ファイル削除、依存関係の大幅変更、設定ファイルの書き換え）は必ずユーザーに確認してから実行する**
- このリポジトリの外に影響するかもしれない操作は、理由を説明した上でユーザーの承認を待つ
- 不明点があれば実行より先に質問する
