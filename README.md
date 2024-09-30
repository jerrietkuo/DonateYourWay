# MERN Stack Project - [Project Name]

## Description

This project is an interactive, user-focused MERN stack single-page application (SPA) designed to solve a real life problem around donating to charities. Built with a scalable back-end using MongoDB, a GraphQL API, and an Express.js and Node.js server, this project also utilizes a React front-end to provide an engaging user experience. We used Tailwind CSS for styling and integrated Stripe for payment functionality. This project was created collaboratively as part of a group assignment to demonstrate our skills in developing full-stack applications with a focus on agile development practices.

## Key Features

- **Full-stack MERN Application**: Combines MongoDB, Express, React, and Node.js.
- **Authentication**: Implemented JWT-based user authentication.
- **GraphQL API**: Used for data interaction, including queries and mutations.
- **Responsive Design**: Styled with Tailwind CSS to ensure compatibility across different devices.
- **Payment Integration**: Stripe integrated for accepting payments.
- **Agile Workflow**: Project managed with Git branch workflow and collaborative tools.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose ODM
- **API**: GraphQL
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS
- **Payments**: Stripe
- **Deployment**: Render

## Installation

1. Clone the repository: https://github.com/jerrietkuo/DonateYourWay
2. Install dependencies: npm install
3. Create a .env file with the necessary environment variables, including JWT secret and Stripe API keys.
4. Start the server: npm start

## Usage
Once the application is running, you can interact with it by visiting the deployed link or running it locally. Users can register, log in, view content, and interact with data based on authentication. Stripe payment is integrated to support e-commerce features.

## Database
Users:
  - _id (ObjectId)
  - username (String)
  - email (String)
  - friends (Array of User _id references)
  - donations (Array of embedded Donation objects)
      - charity (Charity _id reference)
      - user (User _id reference)
      - amount (Number)
      - date (Date)
  - favoriteCharities (Array of Charity _id references)
  - favoriteCategories (Array of Category _id references)

Charities:
  - _id (ObjectId)
  - name (String)
  - location (String)
  - mission (String)
  - websiteLink (String)
  - imageLink (String)
  - ein (String)
  - categories (Array of Category _id references)

Categories:
  - _id (ObjectId)
  - name (String)

Donations (embedded in User):
  - charity (Charity _id reference)
  - user (User _id reference)
  - amount (Number)
  - date (Date)

## Screenshots
![Home Page Screenshot](public/webdonate.png)
![Donation Screenshot](public/webdonation.png)

https://donateyourway.onrender.com/

## GitHub Repository
https://github.com/jerrietkuo/DonateYourWay

## User Story
As a user, I want to easily navigate through an intuitive and interactive platform, allowing me to view, purchase, and interact with data securely. This platform solves the problem of providing a user-friendly, dynamic, and scalable solution for online interactions.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Authors

Jerriet Kuo - Developer  ttps://github.com/jerrietkuo
Pritam Sur - Developer https://github.com/surpritam
Kim Desveaux - Developer https://github.com/KimCBNS


## Acknowledgements
Special thanks to our mentors and peers for their support during development.
Let's work together to bring your vision to life and make it a reality!
