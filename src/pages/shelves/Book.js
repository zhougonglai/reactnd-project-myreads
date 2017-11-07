import React, { Component } from 'react';
import BookItem from './BookItem';

class Book extends Component {

  render() {
    const {title, books, onUpdate} = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          {
            books.length > 0 ? (
              <ol className="books-grid">
                {books.map(book => (
                  <li key={book.id}>
                    <BookItem book={book} onUpdate={onUpdate}/>
                  </li>
                ))}
              </ol>
            ): null
          }
        </div>
      </div>
    );
  }
}

export default Book;