import React, { Component } from 'react';

class Book extends Component {
  render() {
    const {title, books} = this.props;
    console.log(books);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          {
            books.length > 0 ? (
              <ol className="books-grid">
                {books.map(book => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193,
                           backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                          </div>
                        <div className="book-shelf-changer">
                          <select defaultValue={book.shelf}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors.join(',')}</div>
                    </div>
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