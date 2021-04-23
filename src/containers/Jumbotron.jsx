import React from 'react'

export default function Jumbotron({ toggleAddBookModal }) {
  
  return (
    <section className="py-3 text-center">
      <div className="row">
        <div className="col-12 text-center">
          <button className="btn btn-info my-2" onClick={toggleAddBookModal}>Add a Book</button>
        </div>
      </div>
    </section>
  )
}
