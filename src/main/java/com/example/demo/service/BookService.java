package com.example.demo.service;

import com.example.bookmanagement.model.Book;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookService {

    private List<Book> books = new ArrayList<>();
    public Book addBook(Book book) {
        book.setId(UUID.randomUUID().toString());
        books.add(book);
        return book;
    }

    // Get All Books
    public List<Book> getAllBooks() {
        return books;
    }


    public String deleteBook(String id) {
        books.removeIf(book -> book.getId().equals(id));
        return "Book deleted successfully";
    }

    // Search by Title
    public List<Book> searchByTitle(String title) {
        return books.stream()
                .filter(book -> book.getTitle().toLowerCase().contains(title.toLowerCase()))
                .collect(Collectors.toList());
    }

    // Search by Author
    public List<Book> searchByAuthor(String author) {
        return books.stream()
                .filter(book -> book.getAuthor().toLowerCase().contains(author.toLowerCase()))
                .collect(Collectors.toList());
    }

    public Book updateBook(String id, Book updatedBook) {
        return books.stream()
                .filter(book -> book.getId().equals(id))
                .findFirst()
                .map(book -> {
                    book.setTitle(updatedBook.getTitle());
                    book.setAuthor(updatedBook.getAuthor());
                    book.setPrice(updatedBook.getPrice());
                    book.setDescription(updatedBook.getDescription());
                    return book;
                })
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }
}
