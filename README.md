# Ropstam Solutions Task - Backend

This repository contains the backend code for the given task.

### Instructions

- Clone the repository
- Configure `.env` according to `.env.example`
- `npm install`
- `npm run dev` or `npm run start`

### Important Links

✨ [Frontend Repository](https://github.com/mhm13dev/ropstam-frontend)

✨ [Postman Workspace](https://www.postman.com/dark-sunset-507082/workspace/ropstam-solutions)

✨ [Project Walk through](https://www.loom.com/share/47b66a73b03c456d80fcf2d5b4c5486e)

### API Endpoints

#### Test Endpoint

`/api`

#### Auth Endpoints

`/api/signup` - `POST`

`/api/login` - `POST`

`/api/me` - `GET`

`/api/logout` - `POST`

#### Categories Endpoint

`/api/categories` - `POST`

`/api/categories` - `GET`

`/api/categories/count` - `GET`

`/api/categories/:id` - `GET`

`/api/categories/:id` - `PATCH`

`/api/categories/:id` - `DELETE`

#### Cars Endpoint

`/api/cars` - `POST`

`/api/cars` - `GET`

`/api/cars/count` - `GET`

`/api/cars/:id` - `GET`

`/api/cars/:id` - `PATCH`

`/api/cars/:id` - `DELETE`

### Backend Checklist

- [x] Setup a project having APIs & frontend separately.

- [x] Signup / Login, Authentication

- [x] After sign-up the system should send a welcome email to the user along with a randomly generated password to login on the system later on. You can use any preferred method for sending emails.

- [x] On the front-end there should be a sign-in & sign-up page.

- [x] CRUD API for Cars

- [x] CRUD API for Categories

- [x] Your system should be protected XSS & should have implemented JWT.

- [x] Each create & update module must have both front-end & back-end data validation.
