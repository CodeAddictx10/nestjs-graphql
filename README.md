# 🚀 Documentation (GraphQL API - NestJS)

This document provides an overview of the GraphQL API backend built with **NestJS**, **TypeORM** and **Postgres** using CODE FIRST approach. It also contains the instructions on how to run it locally.

---

## 📚 Overview
The API exposes endpoints to manage departments, sub-departments and login.
On the Database level, one to many relationship exists before a department and sub departments. Cascade on delete is set on the relationship which means when a department is deleted all the related sub departments will be deleted too. This make the system to follow the ACID principle of relational database. 
Futhermore, to avoid N+1 query, the TypeORM eager load feature is used. Contrainst like unique column and indexes were add too.

---
## 🔐 Authentication
- Uses **NestJs JWT**
- Auth guards are applied to all endpoints expect the login endpoint.
- Users must be authenticated to access department or sub-department queries and mutations
---

```graphql
type Auth {
  token: String!
}

type User {
  id: Int!
  username: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

### 🔐 Mutations
- `login(payload: LoginInput!): Auth!`  
  Authenticates a user and returns a token used for secured requests.
---
## 🏢 Department Module
```graphql
type Department {
  id: Int!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  subDepartments: [SubDepartment!]
}
```

### 📘 Queries

- `getDepartments`: Returns a list of all departments.
- `getDepartmentById(id: Int!)`: Returns a single department by ID.

### ✏️ Mutations

- `createDepartment(createDepartmentInput: CreateDepartmentInput!): Department!`  
  Creates a new department (optionally with sub-departments).

- `updateDepartment(updateDepartmentInput: UpdateDepartmentInput!): Department!`  
  Updates a department’s name.

- `deleteDepartment(id: Int!): Boolean!`  
  Deletes a department by ID.

---

## 🧩 Sub-Department Module

```graphql
type SubDepartment {
  id: Int!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  department: Department
}
```

### 📘 Queries

- `getSubDepartments`: Returns all sub-departments.
- `getSubDepartmentById(id: Int!)`: Returns a sub-department by ID.

### ✏️ Mutations

- `createSubDepartment(createSubDepartmentInput: CreateSubDepartmentInput!): SubDepartment!`  
  Creates a new sub-department under a department.

- `updateSubDepartment(updateSubDepartmentInput: UpdateSubDepartmentInput!): SubDepartment!`  
  Updates a sub-department’s name or reassigns its department.

- `deleteSubDepartment(id: Int!): Boolean!`  
  Deletes a sub-department by ID.
---


## 🛠 How to Run the App Locally

### ✅ Prerequisites

Ensure the following are installed:

- **Node.js** (v18 or later recommended)
- **npm** or **yarn**
- **Postgres**
- Properly configured environment variables (see `.env.example`)

### 📦 Installation

```bash
git clone https://github.com/CodeAddictx10/nestjs-graphql.git server

cd server

yarn install

cp .env.example .env.local # Create a local environment file

yarn run start:dev # Start the local development server
