import React from 'react';
import { ReactComponent as Pencil } from '../assets/svg/pencil.svg';
import { ReactComponent as Trash } from '../assets/svg/trash.svg';

export default function BookCard({ id, title, author, category, published }) {
  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="book card shadow-sm">
        <img 
          src={`http://picsum.photos/300/400?grayscale`} 
          alt='book-img' 
          className="card-img-top" 
        />
        <div className="card-body" style={{ height: "8rem"}}>
          <div>
            <h5 className="card-title font-weight-bold">{title}</h5>
            <p className="card-subtitle">{author}</p>
            <p className="card-subtitle">{published}</p>
          </div>
        </div>
        <div className="card-footer">
          <div className="btn-group">
            <button 
              className="btn btn-sm btn-outline-secondary" 
              onClick={() => {}}>
                <Pencil width="12" height="12" />
                <span className="ml-1">Edit</span>
            </button>
            <button 
              className="btn btn-sm btn-outline-danger d-flex align-items-center" 
              onClick={() => {}}>
                <Trash width="12" height="12" />
                <span className="ml-1">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
