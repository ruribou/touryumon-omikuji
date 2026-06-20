# 🎋 おみくじ Web アプリ

生年月日と今日の日付をもとに重み付け抽選を行い、**毎日異なる／同じ人・同じ日なら必ず同じ**おみくじ結果を返す和風 Web アプリです。

## 技術スタック

| レイヤー | 技術 |
|---|---|
| フロントエンド | React (Vite) + TypeScript |
| バックエンド | Hono (Node.js) |
| スタイリング | Tailwind CSS（和風テーマ） |
| 通信 | fetch API (REST) |

## ディレクトリ構成

```
omikuji-app/
├── frontend/   # React アプリ (Vite) — :5173
└── backend/    # Hono API サーバー    — :3000
```

## セットアップと起動

### 1. バックエンド

```bash
cd backend
npm install
npm run dev        # http://localhost:3000 で起動
```

### 2. フロントエンド（別ターミナル）

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173 で起動
```

ブラウザで http://localhost:5173 を開いてください。
（フロントの `/api` リクエストは Vite のプロキシ経由でバックエンドに転送されます）

## 仕組み

### シード生成（決定論的）

```
seed = hash(生年月日文字列 + "|" + 今日の日付文字列)
```

FNV-1a 系ハッシュでシードを作り、`mulberry32` で疑似乱数列を生成します。
同じ人・同じ日なら同じシード → 同じ結果。日付が変われば結果も変わります。

### 重み付け

| ランク | 大吉 | 吉 | 中吉 | 小吉 | 末吉 | 凶 | 大凶 |
|---|---|---|---|---|---|---|---|
| 基本確率 | 10% | 25% | 25% | 20% | 12% | 6% | 2% |

- **誕生日**（月日一致）: 大吉・吉の重みを大幅 UP、凶系を抑制
- **誕生月**（月一致）: 吉系の重みを微 UP

重み付きルーレット抽選でランクを決定し、ラッキーカラー・ナンバーも同じ乱数列から導出します。

## API 仕様

### `POST /api/omikuji`

リクエスト:

```json
{ "birthday": "2000-05-15" }
```

レスポンス:

```json
{
  "rank": "大吉",
  "messages": {
    "overall": "...",
    "love": "...",
    "work": "...",
    "health": "...",
    "money": "..."
  },
  "isBirthday": false,
  "luckyColor": "金色",
  "luckyNumber": 7
}
```
