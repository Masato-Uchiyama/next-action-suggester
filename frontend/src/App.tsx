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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputText.trim()) {
      setError('Please enter some text')
      return
    }

    setIsLoading(true)
    setError('')
    setSuggestion('')
    
    try {
      const response = await fetch('https://next-action-suggester-backend-egdngrcu.fly.dev/api/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get suggestion')
      }
      
      setSuggestion(data.suggestion)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
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
