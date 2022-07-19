# Prominente E-commerce

This is a three-part project consisting of an e-commerce website, content management system (CMS), and an AI chatbot assistant.

## Technology Stack

- The e-commerce website and CMS is built with NextJS, TailwindCSS, and Firebase (v9)
- The chatbot is built using Rasa, a framework for developing AI chatbots that utilizes natural language understanding (NLU)

## System Features

### E-commerce Website

- Authentication
  - Signup with name, email, password
  - Login with email and password
  - Forgot password
  - Protected pages with private routes
  - Re-authentication on email update
- Profile page
  - Update personal information (name, address, contact)
  - Update account settings (email, password)
- Add to cart
  - Add/remove items
  - Update item quantity
- Checkout
  - Checkout restriction with incomplete account info
  - Categorized orders (pending, to receive, received, cancelled)
- Notification system
  - Notify on account info update
  - Notify on order status update
  - Mark notifications as read

### Content Management System

- Add and manage products being shown in the ecommerce website
  - Includes easy toggling of product availability/visibility
- Display account information and orders of each registered user
- Search, filter, and sort orders received from the ecommerce website
- Update status of orders (pending, confirmed, unapproved, delivered)
- Daily total income and product sales tracking

### Rasa Chatbot Assistant

- Computes glass price
  - material, type, thickness, dimension, qty
- Recommends appropriate materials according to user preference
  - type,
