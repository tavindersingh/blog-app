# Blog Sphere - A Blogging Platform

## Setup Instructions
1. Clone the repo using command `git clone https://github.com/tavindersingh/blog-app.git` and cd into `blog-add` directory.
2. You will find there are two folders `backend` and `frontend`.
3. `backend` is a **Express.js** application and `frontend` is a **NextJS** application.
4. Default email and password for dummy user is `testuser@gmail.com` and `12345678`.

### Setup Instructions for `backend`
1. cd into `backend` directory.
2. Run `npm install` to install all the dependencies.
3. Refer to `.env.example` file to create a `.env` file and add the required environment variables.
4. Run `npm run build` to build the application.
5. If you get error related to `tsc` then run `npm install typescript` and then run `npm run build`.
6. Run `npm run populateData` to populate the database with some dummy data.
7. Run `npm run start` to start the application.
8. The application will be running on `http://localhost:3333` or the port you specified in the `.env` file.

### Setup Instructions for `frontend`
1. cd into `frontend` directory.
2. Run `npm install` to install all the dependencies.
3. Change the server url in `src/helper/app_constants.ts` file to the url of your backend server.
4. Run `npm run build` to build the application.
5. Run `npm run start` to start the application.
6. The application will be running on `http://localhost:3000`.

### Project Details

#### 1. Details about the backend
- The backend is built using **Express.js** and **MySQL** database.
- The backend is responsible for handling all the API requests and database operations.
- The `src` is divided into multiple modules such as `users`, `posts`, `auth`. So that each module is responsible for a specific task.
- Each of these folders have `service` file whicj is responsible for handling all the database operations, `routes` file which is responsible for handling all the API requests and `controller` file which is responsible for handling all the business logic.
- Also Each of these modules have `dto` files which helped in defining the request data types.
- There are other folders in `src` folder such as `middleware`, `helpers`, `config` etc.
- The `middleware` folder contains all the middleware for jwt authentication which validates the jwt token and checks if the user is authenticated or not.
- The `helpers` folder contains all the helper functions which are used in the backend.
- The `config` folder contains configuration files for the database.
- I am also using the `TypeORM` ORM for database operations because it seamlessly combines ORM and Typescript's type safety. Also it provides decorators which helps defining the database schema and relationships between tables easily.
- I followed this folder structue because it is easy to maintain and scale and each module is responsible for a specific task and are as loosly coupled as possible.

#### 2. Details about the frontend
- The frontend is built using **NextJS** and **TailwindCSS**.
- The frontend is responsible for handling all the UI and API requests.
- The `src` folder has multiple folders such as `components`, `app`, `helpers`, `hooks`, and `models`.
- The `app` folder contains the files related to each page in the application. It also have `api` folder which is responsible for handling all the API requests.
- The `components` folder contains all the reusable components.
- The `helpers` folder contains the files related to `axios` which is used for making API requests.
- The `hooks` folder contains the files related to their specific task. For example `useAuth` hook is responsible for handling the authentication of the user, `usePosts` hook is responsible for handling the posts.
- The `models` folder contains the models which defines the structure of the data in the API response.
- I have used server components for the posts list page and post detail page because they need to fetch data from the server and also they need to be server side rendered. So using Server  Components is the best option for these pages.
- Rest of the pages like Login, Signup, Dashboard and Create Post are client components because they are accessible to user after login and they don't need to be server side rendered.
- I have used api routes for the API requests because these apis can be accessed during server side rendering.
- I have stored the accessToken in the cookies on the server so that the tokens are secured.
- I have used `Formik` and `Yup` for form validation and schema validation.
- I have used `react-toastify` for displaying the toast messages.
- I have used DaisyUI for the theme and dropdown components. I used this because it is a tailwind plugin and in production css file only the classes which are used in the application are included.