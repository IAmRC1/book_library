import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Spinner } from 'reactstrap'
import { BookCard, Footer, Header, Jumbotron } from '../containers'
import handleApi from '../api/handleApi'

export default function Home(props) {
  const [loading, setLoading] = useState(false)
  const [books, setBooks] = useState(null)
  
  const getBooks = () => {
    setLoading(true)
    handleApi('/books', 'get', true)
    .then(res => {
      setLoading(false)
      setBooks(res.data.data)
    })
    .catch(err => {
      setLoading(false)
      toast.error('Some error happened!')
    })
  }

  useEffect(() => {
    getBooks()
  }, [props])

  const signOut = () => {
    localStorage.removeItem('userData')
    props.history.push('/')
  }
  
  return (
    <>
      <Header signOut={signOut} />
      <main className="container">
        <Jumbotron />
        <div className="row">
          {loading 
            ? <div className="d-flex align-items-center justify-content-center w-100">
                <Spinner style={{ width: '3rem', height: '3rem' }} />
              </div>
            : books && books.map(book => (
              <BookCard 
                key={book._id} 
                id={book._id}
                title={book.title}
                author={book.author}
                category={book.category}
                published={book.published}
              />
            ))
          }
        </div>
      </main>
      <Footer 
        loading={loading} 
      />
   </>
  )
}
