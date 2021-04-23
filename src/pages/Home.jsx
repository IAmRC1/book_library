import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Spinner } from 'reactstrap'
import { AddBookModal, EditBookModal, BookCard, Footer, Header, Jumbotron } from '../containers'
import handleApi from '../api/handleApi'

export default function Home({ history, }) {
  const [loading, setLoading] = useState(false)
  const [books, setBooks] = useState(null)
  const [toggleAdd, setToggleAdd] = useState(false)
  const [toggleEdit, setToggleEdit] = useState(false)
  const [bookToEdit, setBookToEdit] = useState(null)
  
  const getBooks = () => {
    setLoading(true)
    handleApi('/books/list', 'get', true)
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
  }, [])

  const toggleAddBookModal = () => {
    setToggleAdd(!toggleAdd)
  }

  const create = (values, { resetForm }) => {
    const formdata = new FormData();
    formdata.append("name", values.bookName)
    formdata.append("author", values.bookAuthor)
    formdata.append("image", values.bookImage)
    
    handleApi('/books/save', 'post', true, formdata)
    .then(res => {
      if(res.data.status === 0){
        toggleAddBookModal()
        toast.error(res.data.message)
        resetForm()
      } else if(res.data.status === 1){
        getBooks()
        toggleAddBookModal()
        toast.success(res.data.message)
        resetForm()
      }
    })
  }

  const toggleEditBookModal = (id) => {
    setToggleEdit(!toggleEdit)
    const singleBook = books.filter(book => book.id === id)[0]
    setBookToEdit(singleBook)
  }

  const edit = (values) => {
    const formdata = new FormData();
    formdata.append("id", values.id)
    formdata.append("name", values.bookName)
    formdata.append("author", values.bookAuthor)
    formdata.append("image", values.bookImage)
    
    handleApi('/books/save', 'post', true, formdata)
    .then(res => {
      if(res.data.status === 0){
        toggleEditBookModal()
        toast.error(res.data.message)
      } else if(res.data.status === 1){
        getBooks()
        toggleEditBookModal()
        toast.success(res.data.message)
      }
    })
  }

  const deleteBook = (id) => {
    const booksAfterDeletion = books.filter(book => book.id !== id)
    const formdata = new FormData();
    formdata.append("id", id)
    handleApi('/books/delete', 'post', true, formdata)
    .then(res => {
      setBooks(booksAfterDeletion)
      toast.success(res.data.message)
    })
  }

  const signOut = () => {
    localStorage.removeItem('assignment_token')
    history.push('/')
  }
  
  return (
    <>
      <Header signOut={signOut} />
      <main className="container">
        <Jumbotron toggleAddBookModal={toggleAddBookModal} />
        <div className="row">
          {loading 
            ? <div className="d-flex align-items-center justify-content-center w-100">
                <Spinner style={{ width: '3rem', height: '3rem' }} />
              </div>
            : books && books.map(book => (
              <BookCard 
                key={book.id} 
                name={book.name}
                author={book.author}
                image={book.image}
                deleteBook={() => deleteBook(book.id)}
                toggleEditBookModal={() => toggleEditBookModal(book.id)}
              />
            ))
          }
        </div>
      </main>
      <Footer 
        loading={loading} 
      />
      <AddBookModal 
        toggleAdd={toggleAdd}
        toggleAddBookModal={toggleAddBookModal}
        create={create}
      />
      <EditBookModal 
        toggleEdit={toggleEdit}
        toggleEditBookModal={toggleEditBookModal}
        bookToEdit={bookToEdit}
        edit={edit}
      />
   </>
  )
}
