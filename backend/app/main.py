from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import openai
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Next Action Suggester API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("OPENAI_API_KEY")

class SuggestionRequest(BaseModel):
    text: str

@app.post("/api/suggest")
async def suggest(request: SuggestionRequest):
    try:
        input_text = request.text
        
        if api_key == "your_openai_api_key_here" or not api_key:
            if "タスク" in input_text or "task" in input_text.lower():
                suggestion = """
1. タスクを全て書き出す
2. 各タスクに締め切りと重要度を付ける
3. 緊急かつ重要なタスクを最優先にする
4. 時間枠を設定して作業する
5. 完了したタスクをチェックする
                """
            else:
                suggestion = """
次のアクションとして以下をお勧めします：
1. 目標を明確に書き出す
2. 必要なリソースを特定する
3. 最初の一歩を小さく設定する
4. 進捗を記録する方法を決める
5. 定期的に振り返りの時間を設ける
                """
            
            return {
                "success": True,
                "suggestion": suggestion,
                "note": "Using mock response (API key not configured)"
            }
        
        openai.api_key = api_key
        
        prompt = f"Based on the following input, provide helpful suggestions or next actions: {input_text}"
        
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that provides concise, actionable suggestions."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150
        )
        
        suggestion = response.choices[0].message.content
        
        return {
            "success": True,
            "suggestion": suggestion
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
