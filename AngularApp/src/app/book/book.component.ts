import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { BookService } from '../shared/book.service';
import { Book } from '../shared/book.model';

declare var M: any;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [BookService]
})
export class BookComponent implements OnInit {

  constructor(public bookService: BookService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshBookList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.bookService.selectedBook = {
      _id: "",
      title: "",
      author: "",
      yearPublished: null,
      isbn: null,
      category: ""
    }
  }
 
  // Post & Update
  onSubmit(form: NgForm) {
    if (form.value._id) {
      this.bookService.putBook(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshBookList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
    else {
      this.bookService.postBook(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshBookList();
        M.toast({ html: 'Saved Successfully', classes: 'rounded'});     
      });
    }
}

    // Refresh
    refreshBookList() {
      this.bookService.getBookList().subscribe((res) => {
        this.bookService.books = res as Book[];
      });
    }

    // Edit
    onEdit(emp: Book) {
      this.bookService.selectedBook = emp;
    }

    // Delete
    onDelete(_id: string, form: NgForm) {
      if (confirm('Are you sure to delete this record ?') == true) {
        this.bookService.deleteBook(_id).subscribe((res) => {
          this.refreshBookList();
          this.resetForm(form);
          M.toast({ html: 'Deleted successfully', classes: 'rounded' });
        });
      }
    }
  }


