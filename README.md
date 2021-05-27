# Loaner (Backend)

Server side code for Loaner.

## Getting Started

- Replicate the `.env` from `.env.example`.
- Run `npm install` to install dependencies.
- Run `npm run dev` to start nodemon and local server at [localhost:5000](http://localhost:5000)

## API Endpoints

| Endpoint          | Type   | Input                                                                                                   | Description                                                                                                                                      |
| ----------------- | ------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| /signup           | `POST` | {firstName, email, password}                                                                            | Validate fields and signup user.                                                                                                                 |
| /signin           | `POST` | {email, password}                                                                                       | Validate fields and sign in user. Return token to                                                                                                |
| /signout          | `GET`  | N/A                                                                                                     | Sign out user by removing                                                                                                                        |
| /createNewLoan    | `POST` | {userId, name, address, contactNumber, loan amount, emi, start date, expiry date, type of loan, email}} | Validate fields and create a new loan. Validate EMI to ensure that it is less than loan and correct. Redirect the control to `/getLoansByUserId` |
| /getUserById      | `GET`  | {userId}                                                                                                | Fetch user details.                                                                                                                              |
| /getLoansByUserId | `GET`  | {userId}                                                                                                | Fetch all loans of a user.                                                                                                                       |
