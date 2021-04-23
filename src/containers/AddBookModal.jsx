import React, { useState, } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap'
import { useFormik } from 'formik'
import validate from '../utils/validation'

export default function AddBookModal({ toggleAdd, toggleAddBookModal, create }) { 
  const [fileName, setFileName] = useState('Choose Image...')
  const [uploadedImage, setUploadedImage] = useState(null)

  const uploadImagePreview = file => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => setUploadedImage([reader.result])
  }

  const formik = useFormik({
    initialValues: {
      bookName: '',
      bookAuthor: '',
      bookImage: ''
    },
    validate,
    onSubmit: (values, { resetForm, }) => {
      create(values, { resetForm })
    },
  });

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm } = formik;

  return (
    <Modal 
      isOpen={toggleAdd} 
      toggle={toggleAddBookModal} 
      className="book-modal" 
      onClosed={() => {
        resetForm({
          bookName: '',
          bookAuthor: '',
          bookImage: ''
        })
        setFileName('Choose Image...')
      }}
    >
      <ModalHeader toggle={toggleAddBookModal}>Add a Book</ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="bookName">Title</label>
            <input 
              type="text" 
              className="form-control"
              name="bookName"
              id="bookName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.bookName}
            />
            {errors.bookName && touched.bookName && <span className="error">{errors.bookName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="bookAuthor">Author</label>
            <input 
              type="text" 
              className="form-control"
              name="bookAuthor"
              id="bookAuthor"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.bookAuthor}
            />
            {errors.bookAuthor && touched.bookAuthor && <span className="error">{errors.bookAuthor}</span>}
          </div>
          <div className="form-group book-image-group">
            <p>Image</p>
            <label htmlFor="bookImage">{fileName}</label>
            <input 
              type="file"
              name="bookImage"
              id="bookImage"
              accept="image/*" 
              onChange={e => {
                setFieldValue("bookImage", e.target.files[0])
                setFileName(e.target.files[0].name)
                uploadImagePreview(e.target.files[0])
              }}
              onBlur={handleBlur}
            />
            {errors.bookImage && touched.bookImage && <span className="error">{errors.bookImage}</span>}
          </div>
          {values.bookImage && <div className="book-image">
            <img 
              src={uploadedImage} 
              alt="book-cover" 
              className="img img-fluid" 
            />
          </div>}
        </ModalBody>
        <ModalFooter>
          <button 
            type="submit"
            disabled={isSubmitting} 
            className="btn btn-success"
          >{isSubmitting ? 'Saving...' : 'Save'}</button>
          <button 
            onClick={toggleAddBookModal} 
            className="btn btn-secondary"
            >Cancel</button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
