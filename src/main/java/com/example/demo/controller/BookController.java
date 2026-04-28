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
        try {
            return bookService.addBook(book);
        } catch (Exception e) {
            throw new RuntimeException("Failed to add book: " + e.getMessage());
        }
    }

    // Get All Books
    @GetMapping
    public List<Book> getAllBooks() {
        try {
            return bookService.getAllBooks();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch books: " + e.getMessage());
        }
    }

    // Delete Book
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable String id) {
        try {
            return bookService.deleteBook(id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete book: " + e.getMessage());
        }
    }

    // Update Book
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable String id, @RequestBody Book book) {
        try {
            return bookService.updateBook(id, book);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update book: " + e.getMessage());
        }
    }

    // Search by Title
    @GetMapping("/search/title")
    public List<Book> searchByTitle(@RequestParam String title) {
        try {
            return bookService.searchByTitle(title);
        } catch (Exception e) {
            throw new RuntimeException("Failed to search by title: " + e.getMessage());
        }
    }

    // Search by Author
    @GetMapping("/search/author")
    public List<Book> searchByAuthor(@RequestParam String author) {
        try {
            return bookService.searchByAuthor(author);
        } catch (Exception e) {
            throw new RuntimeException("Failed to search by author: " + e.getMessage());
        }
    }
}
