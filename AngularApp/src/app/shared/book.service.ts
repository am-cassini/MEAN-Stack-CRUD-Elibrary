import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Book } from './book.model';

@Injectable()
export class BookService {
  selectedBook: Book;
  books: Book[];
  readonly baseURL = 'http://localhost:3000/books';

  constructor(public http : HttpClient) { }

  //Post
  postBook(emp : Book){
    return this.http.post(this.baseURL, emp);
  } 

  //Retrieve
  getBookList(){
    return this.http.get(this.baseURL);
  }

  // Update
  putBook(emp: Book) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  // Delete 
  deleteBook(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}

