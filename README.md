# Next Action Suggester

簡単なブラウザアプリケーション - 入力文に対してAI生成の提案を返します。

## 機能
- テキスト入力フィールド
- GPT-4o-miniを使用したAI提案生成
- レスポンシブなWebインターフェース

## 技術スタック
- **フロントエンド**: React + TypeScript + Tailwind CSS
- **バックエンド**: FastAPI (Python)
- **AI**: OpenAI GPT-4o-mini

## デプロイ済みアプリケーション
- アプリケーション: https://text-suggestion-app-brud8dj8.devinapps.com
- API: https://next-action-suggester-backend-egdngrcu.fly.dev

## ローカル開発
### フロントエンド
```bash
cd frontend
npm install
npm run dev
```

### バックエンド
```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload
```
