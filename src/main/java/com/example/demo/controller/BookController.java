package com.example.demo.controller;

import com.example.bookmanagement.model.Book;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/books")
public class BookController {


    
    @Autowired
    private BookService bookService;

    // Add Book
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    // Get All Books
    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    // Delete Book
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable String id) {
        return bookService.deleteBook(id);
    }

    @PutMapping("/{id}")
    public Book updateBook(@PathVariable String id, @RequestBody Book book) {
        return bookService.updateBook(id, book);
    }

    // Search by Title
    @GetMapping("/search/title")
    public List<Book> searchByTitle(@RequestParam String title) {

        return bookService.searchByTitle(title);
    }

    // Search by Author
    @GetMapping("/search/author")
    public List<Book> searchByAuthor(@RequestParam String author) {
        return bookService.searchByAuthor(author);
    }
}
