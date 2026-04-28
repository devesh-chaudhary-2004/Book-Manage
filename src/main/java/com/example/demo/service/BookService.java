package com.example.demo.service;

import com.example.bookmanagement.model.Book;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookService {

    private List<Book> books = new ArrayList<>();

    // Add Book
    public Book addBook(Book book) {
        try {
            book.setId(UUID.randomUUID().toString());
            books.add(book);
            return book;
        } catch (Exception e) {
            throw new RuntimeException("Failed to add book: " + e.getMessage());
        }
    }

    // Get All Books
    public List<Book> getAllBooks() {
        try {
            return books;
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch books: " + e.getMessage());
        }
    }

    // Delete Book
    public String deleteBook(String id) {
        try {
            boolean removed = books.removeIf(book -> book.getId().equals(id));

            if (!removed) {
                throw new RuntimeException("Book not found");
            }

            return "Book deleted successfully";
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete book: " + e.getMessage());
        }
    }

    // Search by Title
    public List<Book> searchByTitle(String title) {
        try {
            return books.stream()
                    .filter(book -> book.getTitle().toLowerCase().contains(title.toLowerCase()))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Failed to search by title: " + e.getMessage());
        }
    }

    // Search by Author
    public List<Book> searchByAuthor(String author) {
        try {
            return books.stream()
                    .filter(book -> book.getAuthor().toLowerCase().contains(author.toLowerCase()))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Failed to search by author: " + e.getMessage());
        }
    }

    // Update Book
    public Book updateBook(String id, Book updatedBook) {
        try {
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
        } catch (Exception e) {
            throw new RuntimeException("Failed to update book: " + e.getMessage());
        }
    }
}
