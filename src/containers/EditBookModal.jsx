import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap'
import { useFormik } from 'formik'
import validate from '../utils/validation.js'

export default function EditBookModal({ toggleEdit, toggleEditBookModal, edit, bookToEdit }) {

  const [fileName, setFileName] = useState('Choose Image...')
  const [uploadedImage, setUploadedImage] = useState(null)

  const uploadImagePreview = file => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => setUploadedImage([reader.result])
  }

  const formik = useFormik({
    initialValues: {
      bookName: bookToEdit ? bookToEdit.name : '',
      bookAuthor: bookToEdit ? bookToEdit.author : '',
      bookImage: bookToEdit ? bookToEdit.image : ''
    },
    validate,
    onSubmit: values => edit(values),
    enableReinitialize: true,
  });

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue, dirty, } = formik;

  return (
    <Modal 
      isOpen={toggleEdit} 
      toggle={toggleEditBookModal} 
      className="book-modal"
    >
      <ModalHeader toggle={toggleEditBookModal}>Edit Book</ModalHeader>
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
          <div className="book-image">
            <img 
              src={uploadedImage ? uploadedImage : values.bookImage} 
              alt="book-cover" 
              className="img img-fluid" 
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button 
            type="submit"
            disabled={isSubmitting || !dirty} 
            className="btn btn-success"
          >{isSubmitting ? 'Editing...' : 'Edit'}</button>
          <button 
            onClick={toggleEditBookModal} 
            className="btn btn-secondary"
            >Cancel</button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
