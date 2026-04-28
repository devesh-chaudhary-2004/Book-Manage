package com.example.bookmanagement.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {

    private String id;
    private String title;
    private String author;
    private double price;
    private String description;
}
