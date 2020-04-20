import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import '../assets/tailwind.scss'
import { Header } from './Header'
import Canvas from './Canvas'

const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Sorting demo</title>
      </Helmet>
      <Header />
      <div className="h-screen bg-green-600 flex justify-center items-center p-4 flex-col">
        <h1 data-test="greeting" className="text-white text-4xl text-center">
          Welcome to the Sorting Demo!
        </h1>
        <Canvas/>
      </div>
    </HelmetProvider>
  )
}

export default App
