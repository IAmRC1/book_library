import React from 'react'

export default function Footer({ loading, booksCount }) {
  return (
    <footer className={`text-muted py-5 ${loading ? 'fixed-bottom' : ''}`}>
      <div className="container">
        <p className="mb-1 text-center">Books example is &copy; Rishabh, but please download and customize it for yourself!</p>
      </div>
    </footer>
  )
}
