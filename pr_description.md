# 次のアクション提案アプリケーションの実装

このPRでは、テキスト入力に基づいてAIが次のアクションを提案するフルスタックアプリケーションを実装しています。

## 機能
- テキスト入力フォーム
- GPT-4o-miniを使用したAI提案生成
- レスポンシブなWebインターフェース
- モックレスポンス機能（APIキーなしでもデモ可能）

## 技術スタック
- **フロントエンド**: React + TypeScript + Tailwind CSS
- **バックエンド**: FastAPI (Python)
- **AI**: OpenAI GPT-4o-mini API

## デプロイ済みアプリケーション
以下のURLで実際のアプリケーションを試すことができます：
- アプリケーション: https://text-suggestion-app-brud8dj8.devinapps.com
- API: https://next-action-suggester-backend-egdngrcu.fly.dev

## スクリーンショット
![アプリケーションのスクリーンショット](/home/ubuntu/screenshots/localhost_5173_022539.png)

## 実装の詳細
- フロントエンドはReact + TypeScriptで実装し、UIコンポーネントにはshadcn/uiを使用
- バックエンドはFastAPIで実装し、OpenAI APIと統合
- APIキーが設定されていない場合はモックレスポンスを返す機能を実装
- 日本語入力に対応

## ローカル開発手順
詳細はREADME.mdを参照してください。

## Devinセッション
このPRはDevinによって作成されました：https://app.devin.ai/sessions/7466342263c34c0186af9bdc7c0e41f7

作成者: masato.keitaiyou@gmail.com
