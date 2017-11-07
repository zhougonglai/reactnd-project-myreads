import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Book from './shelves/Book';

class BookList extends Component {
  render() {
    const {books, onUpdate} = this.props;
    const shelves = {
      currentlyReading(){
        return books.filter(book => book.shelf === 'currentlyReading');
      },
      wantToRead(){
        return books.filter(book => book.shelf === 'wantToRead');
      },
      read(){
        return books.filter(book => book.shelf === 'read');
      }
    }

    return (
      <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {
            books.length > 0 ?
            Object.keys(shelves).map((shelve, index) => <Book key={index} title={shelve} onUpdate={onUpdate} books={shelves[shelve]()}/>):
            null
          }
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
    );
  }
}

export default BookList;