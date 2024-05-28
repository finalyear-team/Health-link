# Telemedicine Web Application

Welcome to the HealthLink Telemedicine Web Application, a platform designed to connect doctors with patients for virtual consultations. This application supports text chat, video chat, a forum for Q&A, and a blog page for various health-related articles.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Features

- **User Roles**: Admin, Moderator, Doctor, and Patient, each with distinct permissions.
- **Communication**: Text chat and video chat between doctors and patients.
- **Social Interaction**: Users can post, share, like, and comment on posts.
- **Forum**: Users can ask and answer health-related questions.
- **Blog**: Platform for posting and reading health-related blogs.
- **Security**: Secure authentication and authorization mechanisms.
- **Responsive Design**: Mobile-friendly user interface.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time Communication**: WebRTC, Socket.io
- **Version Control**: Git, GitHub

## Installation

### Prerequisites

- Node.js
- Typescript
- npm or yarn
- MYSQL

## Usage
- **Register and log in**: Users can sign up as doctors or patients and log in to the system.
- **Profile Management**: Users can update their profile information.
- **Text and Video Chat**: Doctors and patients can initiate text and video chats.
- **Forum Interaction**: Users can ask questions, and others can provide answers.
- **Blog Interaction**: Users can post, read, like, share, and comment on blogs.

## Project Structure

health-link/
├── admin/
├── client/                 # Frontend Next.js v.14 application
│   ├── Services
│   ├── actions
│   ├── app
│   ├── common/Loader
│   ├── components
│   ├── firebase
│   ├── graphql
│   ├── hooks
│   ├── lib
│   ├── public
│   ├── store
│   ├── types
│   ├── utils
│   ├── .env.example
│   ├── .eslintrc.json
│   ├── Dockerfile.dev
│   ├── Dockerfile.prod
│   ├── README.md
│   ├── components.json
│   ├── middleware.ts
│   ├── next.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
├── server/                 # Backend Nest.js application
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js            
├── .gitignore
├── Health_link.session.sql
├── README.md
├── docker-compose.dev.yml
├── docker-compose.yml
└── package-lock.json

