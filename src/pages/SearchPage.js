import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import BookItem from './shelves/BookItem';

class SearchPage extends Component {

  state={
    query: '',
    books: []
  }

  updateQuery(value) {
    this.setState({
      query: value.trim()
    });
  }

  onKeyPress(code) {
    if(code === 13){
      this.props.search(this.state.query)
      .then(books => {
        this.setState({books});
      });
    }
  }

  render() {
    const {query, books} = this.state;
    const {onUpdate} = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" value={query} 
                  onChange={(event) => this.updateQuery(event.target.value)}
                  onKeyPress={(event) => this.onKeyPress(event.charCode)}
                  placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              books.map(book => <BookItem book={book} key={book.id} onUpdate={onUpdate}/>)
            }
          </ol>
        </div>
    </div>
    );
  }
}

export default SearchPage;