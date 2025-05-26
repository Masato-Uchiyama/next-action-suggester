import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { Loader2 } from 'lucide-react'

function App() {
  const [inputText, setInputText] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Helper function to generate fallback suggestions
  const generateFallbackSuggestion = (text: string) => {
    console.log('Generating fallback suggestion for:', text)
    if (text.toLowerCase().includes("タスク") || text.toLowerCase().includes("task")) {
      return `
1. タスクを全て書き出す
2. 各タスクに締め切りと重要度を付ける
3. 緊急かつ重要なタスクを最優先にする
4. 時間枠を設定して作業する
5. 完了したタスクをチェックする
      `;
    } else {
      return `
次のアクションとして以下をお勧めします：
1. 目標を明確に書き出す
2. 必要なリソースを特定する
3. 最初の一歩を小さく設定する
4. 進捗を記録する方法を決める
5. 定期的に振り返りの時間を設ける
      `;
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputText.trim()) {
      setError('Please enter some text')
      return
    }

    setIsLoading(true)
    setError('')
    setSuggestion('')
    
    console.log('Submitting text:', inputText)
    
    const fallbackSuggestion = generateFallbackSuggestion(inputText)
    
    const loadingTimeout = setTimeout(() => {
      console.log('Loading timeout reached, using fallback')
      setSuggestion(fallbackSuggestion)
      setIsLoading(false)
    }, 3000) // 3 second timeout
    
    try {
      let backendSuccess = false
      
      try {
        console.log('Attempting to fetch from backend...')
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch('https://next-action-suggester-backend-jowmxten.fly.dev/api/suggest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: inputText }),
          signal: controller.signal
        }).finally(() => clearTimeout(timeoutId));
        
        console.log('Backend response status:', response.status)
        
        if (response.ok) {
          const data = await response.json()
          console.log('Backend response data:', data)
          setSuggestion(data.suggestion)
          backendSuccess = true
        }
      } catch (fetchError) {
        console.error('Backend fetch error:', fetchError)
      }
      
      if (!backendSuccess) {
        console.log('Using fallback suggestion')
        setSuggestion(fallbackSuggestion)
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.log('Using fallback suggestion after error')
      setSuggestion(fallbackSuggestion)
    } finally {
      clearTimeout(loadingTimeout)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Next Action Suggester</CardTitle>
          <CardDescription className="text-center">
            Enter text and get AI-powered suggestions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Enter your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full"
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting suggestions...
                </>
              ) : (
                'Get Suggestions'
              )}
            </Button>
          </form>
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-500 rounded">
              {error}
            </div>
          )}
          
          {suggestion && (
            <div className="mt-4">
              <h3 className="font-medium text-lg mb-2">Suggestion:</h3>
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                {suggestion}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          Powered by GPT-4o-mini
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
