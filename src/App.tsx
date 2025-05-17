import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Home from './components/Home'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Contact from './components/Contact'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-light-pink dark:border-dark-pink rounded-full opacity-25"></div>
            <div className="absolute inset-0 border-t-4 border-dark-pink dark:border-light-pink rounded-full animate-spin"></div>
          </div>
          <h2 className="mt-4 text-xl font-bold text-dark-pink dark:text-light-pink">Loading...</h2>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <Home />
      <Services />
      <Portfolio />
      <About />
      <Contact />
    </Layout>
  )
}

export default App
