### **Vacancy Management System User Guide**

The system is designed to display mock vacancies, manage applications, and track candidate information. It consists of two parts: the guest user panel and the admin panel.

* **Guest User Panel:** Allows users to view vacancies and submit applications.  
* **Admin Panel:** Used to track the results of applications (guest users cannot see application results).

  ### **Usage Guidelines**

The frontend of the application is developed using Angular 18, and data is stored in JSON format in localStorage. To run the system, your computer must have **Node.js v18.0.0** or higher, and **npm v9.0.0** or higher.

To get started:

1. Navigate to the `vacancy_management_system` folder and run the command `npm i` or `npm install`.  
2. Then, run the command `ng serve` to start the application.

   ### **Technologies Used**

The project utilizes **Angular Material** for design and custom design elements. To avoid redundancy, reusable components, services, and directives were created. Unit tests for components, services, and directives were written using **Jasmine**.

### **Vacancy Management**

* **Vacancy List:** Upon opening the system, the user is treated as a guest and presented with a list of vacancies. The vacancy page includes a title, brief description, application deadline, and an "Apply" button. If the application deadline has passed, the vacancy cannot be applied for.  
  * The "Rows per Page" is purely for display purposes.  
  * Clicking the "Visible Columns" button displays the column names in the grid. Users can select which columns to display, and the selection remains even after the page refreshes.  
* **Application Process:**  
  * **Applying for a Vacancy:** Each vacancy has an "Apply" button next to it. When clicked, the user is directed to a form to enter personal details (name, surname, email, and phone number). The user is also informed about the rules and time limits for answering the questions.  
    * Mandatory fields (name, surname, email, and phone number) trigger warnings if left empty or filled incorrectly.  
  * **Answering Questions:** After entering personal details, the user proceeds to a dynamic form with 15 sequential questions. Each step has a 1-minute time limit. The "Continue" button prevents the user from going back.  
    * The timer turns red with 20 seconds left. If the user doesn't proceed within 1 minute, the window closes and a time-out message is shown.  
    * A candidate cannot reapply for the same vacancy. If they attempt to do so, a warning message appears. However, they can apply for other vacancies using the same phone number.  
  * **Uploading CV:** After answering the questions, the candidate uploads their CV. At this point, the timer is removed, allowing the user to upload the file. Only **PDF** and **DOC** formats are accepted, with a maximum file size of 5MB. If the file format is incorrect or exceeds the size limit, the upload process is halted, and an error message is shown.  
    * Once the CV is successfully uploaded, a message confirming the successful completion of the application is displayed.

  ### **Admin Users**

* When a guest user enters the system, the "Login" button appears in the top right corner (next to the "Guest User" text). Clicking the button redirects to the login page, where two options are available:  
  * Continue as Guest  
  * Login as Admin  
* To log in as an admin, the user must enter a username and password. If incorrect credentials are provided, validation prevents access.  
  * **Admin Credentials:**  
    * Username: admin  
    * Password: 123456789  
* The admin user has access to both the "Vacancies" and "Applications" pages.  
  * **Vacancies Page:** Displays a list of vacancies.  
  * **Applications Page:** Displays the following information:  
    * Candidate’s name, surname, phone number, and email.  
    * Correct answer percentage and score.  
    * Vacancy title and brief description.  
    * Uploaded CV (hovering over the attach icon shows the file name in a tooltip; clicking the icon downloads DOC files or opens PDF files in a new tab).  
* Admin users cannot see the "Apply" button on the vacancy list.  
* After logging in, the "Login" button is replaced with a "Logout" button, which allows the admin to exit the system.

  ### **Technical Implementation**

* **TokenGuard:** Used to ensure data security.  
* **Standalone Components:** Components and services are developed independently.  
* **Directives:** Apply validation rules to application and login buttons based on user roles.  
* **Unit Tests:** Unit tests are written for each component, service, and directive using the AAA (Arrange-Act-Assert) pattern. You can run tests with the command `ng test`.  
* **Form Management:** Complex forms are managed using **ReactiveFormsModule**, with specific validation rules applied to each form.  
* **HttpErrorInterceptor:** Used for error handling in API requests.  
* **Interfaces:** Used to make the code clearer and to immediately understand the purpose of each variable.  
* **Custom Design:** Custom pop-up windows and table components have been implemented.  
* **Services:**  
  * **Vacancy Management Service:** Handles the vacancy list and manages applications.  
  * **Candidate Information Service:** Stores the information of applicants and ensures it is used on the appropriate pages.  
  * **File Upload Service:** Handles file format and size checks for CV uploads.  
  * **Authentication Service:** Manages user sessions and role-based access control.

  ### **Additional Features**

* **404 Page:** For non-existent pages. If an incorrect URL is entered, you will be redirected to a 404 page. (Example URL: [`http://localhost:4200/vacancies/page-not-found`](http://localhost:4200/vacancies/page-not-found) )  
* **Access Denied Page:** For unauthorized access attempts. If a guest user tries to access the "Applications" page via URL, they will be shown this page. (Example URL: [`http://localhost:4200/vacancies/results`](http://localhost:4200/vacancies/results) )  
* **SonarLint:** Used for code quality checks and tested using the SonarLint VSCode extension.  
