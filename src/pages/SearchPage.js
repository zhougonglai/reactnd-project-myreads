import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';
import PreLoading from '../util/PreLoading';
import BookItem from './shelves/BookItem';

class SearchPage extends Component {

  state={
    query: '',
    loading: false,
    books: []
  }

  updateQuery(value) {
    this.setState({
      query: value.trim()
    });
  }

  onKeyPress(code) {
    if(code === 13){
      this.setState({loading: true},() => {
        BooksAPI.search(this.state.query)
        .then(books => {
          if(Array.isArray(books)){
            this.setState((preState, props) => {
              /**
               * 认真看了数据之后知道这里所说的!!同步!!是什么意思. 
               * 因为search后的 数据没有 shelf字段 所以需要将myBook数据与searchResult 进行交叉过滤
               * result 过滤掉 mybook重叠的部分 concat => mybook中过滤掉result没有的book (有点绕...)
               */
              let result = books.filter(book => !props.books.some(mybook => mybook.id === book.id))
                          .concat(props.books.filter(mybook => books.some(book => mybook.id === book.id)));
              return {books: result, loading: false};
            });
          }else{
            alert(books.error);
          }
        });
      })
    }
  }

  render() {
    const {query, books, loading} = this.state;
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
                loading ? <PreLoading /> :
                books.map(book => <BookItem book={book} key={book.id} onUpdate={onUpdate}/>)
              }
            </ol>
        </div>
    </div>
    );
  }
}

export default SearchPage;