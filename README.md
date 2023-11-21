# Employee Review System

Employee Review System is a web application that allows administrators to manage employees and performance reviews. Employee can review their peers performance.

![BET2_AdminPage](https://github.com/SumanthFSD/EmployeeReviewSystem/assets/80679363/343ae4b2-93ab-4b92-9b10-cea2e59bac66)

![BET2_userPage](https://github.com/SumanthFSD/EmployeeReviewSystem/assets/80679363/85ef900c-dd68-4a2a-901d-e5ad17c4965e)


## Project Structure

```
/EmployeeReviewSystem
│
├── controllers
│   ├── adminController.js
│   ├── employeeController.js
│   └── authController.js
├── models
│   ├── employee.js
│   ├── performanceReview.js
├── public
│   ├── styles.css
├── routes
│   ├── admin.js
│   ├── auth.js
│   └── employee.js
├── views
│   ├── admin
│   │   ├── assign-review.ejs
│   │   ├── dashboard.ejs
│   │   └── edit-employee.ejs
│   │   ├── employees.ejs
│   │   └── performance-reviews.ejs
│   │   ├── review-details.ejs
│   ├── auth
│   │   ├── login.ejs
│   │   ├── register.ejs
│   ├── employee
│   │   ├── dashboard.ejs
│   │   ├── performance-reviews.ejs
│   │   └── ...
├── config.js
├── index.js
├── package-lock.json
├── package.json
├── README.md
```


## Table of Contents

1. [Node.js Environment Setup](#nodejs-environment-setup)
2. [Screenshots](#screenshots)
3. [Contributors](#contributors)


## Node.js Environment Setup

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/SumanthFSD/EmployeeReviewSystem.git
    cd EmployeeReviewSystem
    ```

2. **Install Dependencies:**

    ```bash
    npm install express ejs mongoose express-session body-parser
    ```

3. **Run the Application:**

    ```bash
    node app.js
    ```

    Your application will be running on `http://localhost:8000` by default.

## Screenshots
![BET2_Register](https://github.com/SumanthFSD/EmployeeReviewSystem/assets/80679363/d5f0ab43-ecbf-4312-b3db-11990ccbdaf0)
![BET2_Login](https://github.com/SumanthFSD/EmployeeReviewSystem/assets/80679363/ee846fdd-e666-46b9-93bc-b92889367394)



## Contributors

- [Sumanth Reddy Gatla](https://github.com/EmployeeReviewSystem)

