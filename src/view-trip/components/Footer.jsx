import React from 'react'

function Footer() {
  return (
    <footer className="my-10 text-center text-gray-500">
      <b className="text-primary">AI Trip Planner</b> &copy; {new Date().getFullYear()} &mdash; <span className="text-accent">Bon Voyage!</span>
    </footer>
  )
}

export default Footer