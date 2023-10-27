# users-server

This is a backend scaffolding project built with Express.js, TypeScript, Sequelize ORM, and MySQL database. It includes CRUD operations, one-to-many and examples of updating one model with more models.

## Project Structure

```
users-server
├── README.md
├── package.json
├── .sequelizerc
├── src
│   ├── config
│   │   └── sequelize.config.ts
│   ├── controllers
│   │   ├── post.controller.ts
│   │   └── user.controller.ts
│   ├── models
│   │   ├── index.ts
│   │   ├── post.model.ts
│   │   └── user.model.ts
│   ├── routes
│   │   ├──  index.ts
│   │   ├──  post.routes.ts
│   │   └── user.routes.ts
│   └── index.ts
└── tsconfig.json

```

## Installation

1. Clone the repository: `git clone https://github.com/brandonjcg/users-server`
2. Install dependencies: `yarn`
3. Add a `.env` file with the following variables:

```
DB_NAME=users
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_PORT=3306
DB_SYNC=false|true
```

4. Create a MySQL database named `users`
5. Run the project: `yarn dev` (or `yarn start` for production)

## Usage

The project includes two models: `User` and `Post`. The `User` model has a one-to-many relationship with the `Post` model, and the `Post` model has a many-to-many relationship with itself.

The project includes the following routes:

- `GET /users`: Get all users
- `GET /users/:id`: Get a user by id
- `POST /users`: Create a new user
- `PUT /users/:id`: Update a user by id
- `DELETE /users/:id`: Delete a user by id
- `GET /posts`: Get all posts
- `GET /posts/:id`: Get a post by id
- `POST /posts`: Create a new post
- `PUT /posts/:id`: Update a post by id
- `DELETE /posts/:id`: Delete a post by id

## Sedders

The project includes seeders for the `Roles`. To run the seeders, run the following command:

```
npx tsc -p . && npx sequelize-cli db:seed:all --url 'mysql://user:password@localhost/database'
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Autor

- [Brandon Castillo](https://github.com/brandonjcg) - Software developer 👨🏽‍💻
