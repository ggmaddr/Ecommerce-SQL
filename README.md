## Dear grader,
My mySQL connection cannot sustained while my laptop is sleeping. Therefore, if you run the project at the same time my laptop is shut down, the mysql connection will not be made. Please email me at giang.ta@sjsu.edu, or text me at 669-400-1216 (Grady) at the time you grade our app, I'll turn on my computer for the MYSQL server to turn on with it. I'm 100% sure my fullstack code and mysql database works, but it work on my computer turning on for the mysql server to turn on. 
Thank you so much!
# ECommerce - Admin Dashboard Node.js MySQL project

This guide will walk you through setting up a full-stack Node.js project from scratch.

### [Video demo](https://www.youtube.com/watch?v=iq73DF-spX4)
### [Report doc](https://docs.google.com/document/d/1pNlx6LOGwTO_B4_8k8DZLOiAyrBBSJHemclyIFORcvI/edit?usp=sharing)

## Prerequisites

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org) - JavaScript runtime
- [npm](https://www.npmjs.com) - Node.js package manager

## Getting Started

1. **Clone the project**:
   ```bash
   git clone https://github.com/ggmaddr/Ecommerce-SQL.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Express server with connecting to MySQL database**:
   ```bash
   node app.js
   ```

## Accessing the Application

Once the server is running, you can access different parts of the application. However, each page contains buttons reference to links to other pages.

- **Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- **Homepage**: [http://localhost:3000/home](http://localhost:3000/home)
- **Product Page**: [http://localhost:3000/products](http://localhost:3000/products)

## Project Structure

- **`app.js`**: Entry point of the Node.js application.
- **`db.js.js`**: Entry point of the Node.js application.
- **`public/`**: Contains static files (CSS, images, CommonJS scripts).
- **`views/`**: Contains views page (Templating engine EJS).


