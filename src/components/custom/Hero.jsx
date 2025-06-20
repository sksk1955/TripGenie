import React from 'react'
import { Button } from '../ui/button.jsx'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="flex flex-col items-center mx-auto gap-9 max-w-3xl py-16">
      <h1 className="font-extrabold text-5xl text-center mt-10 text-primary drop-shadow-lg leading-tight">
        <span className="text-secondary">Discover Your Next Adventure</span> <br />
        <span className="text-accent">with AI Trip Planner</span>
      </h1>
      <p className="text-xl text-gray-600 text-center max-w-xl">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'}>
        <Button className="bg-primary text-white px-8 py-3 rounded-full shadow-lg hover:bg-secondary transition-all text-lg">
          Get Started, It's Free
        </Button>
      </Link>
      <img src="/landing.png" alt="Travel" className="w-full max-w-xl rounded-2xl shadow-xl border-4 border-accent" />
    </section>
  )
}

export default Hero