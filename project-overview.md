# Project Overview

## Title
Student Attendance Management System

## Summary
The Student Attendance Management System is a full-stack web application that
allows a college or department to manage student records and daily
attendance digitally, replacing manual registers and spreadsheets.

The system is built using:
- **React** (Vite) for the frontend user interface
- **Django** and **Django REST Framework (DRF)** for the backend REST API
- **SQLite** as the relational database

All data entered through the frontend is stored permanently in the SQLite
database via the Django ORM. Refreshing the browser, restarting the frontend,
or restarting the backend does not cause any data loss.

## Purpose
This project was built as a college activity to demonstrate practical,
industry-relevant skills:
- Designing a relational database schema
- Building a REST API with proper validation and error handling
- Building a React frontend that consumes a real backend API
- Following full CRUD (Create, Read, Update, Delete) principles
- Using Git/GitHub for version control
- Testing an API using Django's test framework and Postman

## Intended Audience
- College faculty evaluating the project during a viva/demonstration
- Students who want a clear, beginner-friendly reference for a full-stack
  CRUD project using React + Django REST Framework
