export const MockVacancies = {
  totalCount: 3,
  vacancies: [
    {
      id: 1,
      count: 15,
      title: 'Angular',
      description: 'Middle Angular Developer ',
      lastDate: '2024-12-15T00:00:00.817Z',
      interviewQuestions: [
        {
          id: 1,
          title: 'What is Angular?',
          options: [
            { id: 1, text: 'A JavaScript framework for building web applications', isCorrect: true },
            { id: 2, text: 'A type of database', isCorrect: false },
            { id: 3, text: 'A server-side technology', isCorrect: false }
          ]
        },
        {
          id: 2,
          title: 'What is the main programming language used in Angular?',
          options: [
            { id: 1, text: 'Java', isCorrect: false },
            { id: 2, text: 'TypeScript', isCorrect: true },
            { id: 3, text: 'Python', isCorrect: false }
          ]
        },
        {
          id: 3,
          title: 'Which company developed Angular?',
          options: [
            { id: 2, text: 'Google', isCorrect: true },
            { id: 1, text: 'Facebook', isCorrect: false },
            { id: 3, text: 'Microsoft', isCorrect: false }
          ]
        },
        {
          id: 4,
          title: 'What is the primary purpose of Angular CLI?',
          options: [
            { id: 1, text: 'To compile the application', isCorrect: false },
            { id: 3, text: 'To run SQL queries', isCorrect: false },
            { id: 2, text: 'To create, build, and manage Angular projects', isCorrect: true }
          ]
        },
        {
          id: 5,
          title: 'Which of the following is a feature of Angular?',
          options: [
            { id: 1, text: 'Two-way data binding', isCorrect: true },
            { id: 2, text: 'Server-side rendering only', isCorrect: false },
            { id: 3, text: 'No support for single-page applications', isCorrect: false }
          ]
        },
        {
          id: 6,
          title: 'What is a component in Angular?',
          options: [
            { id: 1, text: 'A part of the Angular CLI', isCorrect: false },
            { id: 3, text: 'A database entity', isCorrect: false },
            { id: 2, text: 'A building block of the user interface', isCorrect: true }
          ]
        },
        {
          id: 7,
          title: 'What is a directive in Angular?',
          options: [
            { id: 2, text: 'A type of Angular component', isCorrect: false },
            { id: 1, text: 'A way to modify the DOM or behavior of an element', isCorrect: true },
            { id: 3, text: 'A database configuration', isCorrect: false }
          ]
        },
        {
          id: 8,
          title: 'What does NgModule in Angular represent?',
          options: [
            { id: 1, text: 'A file manager in Angular', isCorrect: false },
            { id: 3, text: 'A way to fetch data from the server', isCorrect: false },
            { id: 2, text: 'A decorator for defining a module', isCorrect: true }
          ]
        },
        {
          id: 9,
          title: 'What is Angular’s default module loader?',
          options: [
            { id: 3, text: 'Webpack', isCorrect: true },
            { id: 1, text: 'RequireJS', isCorrect: false },
            { id: 2, text: 'SystemJS', isCorrect: false }
          ]
        },
        {
          id: 10,
          title: 'What is a service in Angular?',
          options: [
            { id: 1, text: 'A class for business logic and data handling', isCorrect: true },
            { id: 2, text: 'A type of HTML element', isCorrect: false },
            { id: 3, text: 'A part of the Angular CLI', isCorrect: false }
          ]
        },
        {
          id: 11,
          title: 'What is the role of RxJS in Angular?',
          options: [
            { id: 1, text: 'To handle routing', isCorrect: false },
            { id: 2, text: 'To handle reactive programming', isCorrect: true },
            { id: 3, text: 'To manage CSS styles', isCorrect: false }
          ]
        },
        {
          id: 12,
          title: 'What is Angular Universal used for?',
          options: [
            { id: 1, text: 'For client-side rendering', isCorrect: false },
            { id: 2, text: 'For server-side rendering', isCorrect: true },
            { id: 3, text: 'For creating mobile applications', isCorrect: false }
          ]
        },
        {
          id: 13,
          title: 'What is the purpose of the ngIf directive?',
          options: [
            { id: 1, text: 'To add event listeners', isCorrect: false },
            { id: 3, text: 'To create animations', isCorrect: false },
            { id: 2, text: 'To conditionally render elements', isCorrect: true }
          ]
        },
        {
          id: 14,
          title: 'What does the async pipe in Angular do?',
          options: [
            { id: 1, text: 'It subscribes to an Observable or Promise and returns the latest value.', isCorrect: true },
            { id: 2, text: 'It handles routing between components.', isCorrect: false },
            { id: 3, text: 'It validates form inputs.', isCorrect: false }
          ]
        },
        {
          id: 15,
          title: 'What is Angular’s zone.js library used for?',
          options: [
            { id: 2, text: 'To handle HTTP requests', isCorrect: false },
            { id: 3, text: 'To manage CSS animations', isCorrect: false },
            { id: 1, text: 'To manage Angular zones for change detection', isCorrect: true }
          ]
        }
      ]
    },
    {
      id: 2,
      count: 15,
      title: "React",
      description: "Middle React Developer",
      lastDate: "2024-12-20T23:50:21.817Z",
      interviewQuestions: [
        {
          id: 1,
          title: "What is React?",
          options: [
            { id: 2, text: "A backend framework", isCorrect: false },
            { id: 3, text: "A database management tool", isCorrect: false },
            { id: 1, text: "A JavaScript library for building user interfaces", isCorrect: true },
          ]
        },
        {
          id: 2,
          title: "Who developed React?",
          options: [
            { id: 1, text: "Google", isCorrect: false },
            { id: 2, text: "Facebook", isCorrect: true },
            { id: 3, text: "Microsoft", isCorrect: false }
          ]
        },
        {
          id: 3,
          title: "What is JSX in React?",
          options: [
            { id: 1, text: "A syntax extension for JavaScript", isCorrect: true },
            { id: 2, text: "A CSS preprocessor", isCorrect: false },
            { id: 3, text: "A type of database query", isCorrect: false }
          ]
        },
        {
          id: 4,
          title: "What is the purpose of the Virtual DOM in React?",
          options: [
            { id: 1, text: "To manage server requests", isCorrect: false },
            { id: 2, text: "To improve rendering performance", isCorrect: true },
            { id: 3, text: "To handle form validation", isCorrect: false }
          ]
        },
        {
          id: 5,
          title: "What is a React component?",
          options: [
            { id: 2, text: "A backend API endpoint", isCorrect: false },
            { id: 3, text: "A type of database record", isCorrect: false },
            { id: 1, text: "A reusable piece of UI", isCorrect: true }
          ]
        },
        {
          id: 6,
          title: "What are React hooks?",
          options: [
            { id: 2, text: "Tools for handling animations", isCorrect: false },
            { id: 3, text: "Built-in form validators", isCorrect: false },
            { id: 1, text: "Functions for managing state and side effects", isCorrect: true }
          ]
        },
        {
          id: 7,
          title: "What is the useState hook used for?",
          options: [
            { id: 1, text: "To manage component state", isCorrect: true },
            { id: 2, text: "To handle routing", isCorrect: false },
            { id: 3, text: "To manage form inputs", isCorrect: false }
          ]
        },
        {
          id: 8,
          title: "What is the purpose of the useEffect hook?",
          options: [
            { id: 2, text: "To render the component conditionally", isCorrect: false },
            { id: 1, text: "To handle side effects in functional components", isCorrect: true },
            { id: 3, text: "To fetch CSS styles", isCorrect: false }
          ]
        },
        {
          id: 9,
          title: "What is React Router used for?",
          options: [
            { id: 1, text: "For managing navigation and routing in a React application", isCorrect: true },
            { id: 2, text: "For connecting to the backend", isCorrect: false },
            { id: 3, text: "For state management", isCorrect: false }
          ]
        },
        {
          id: 10,
          title: "What is Redux in React?",
          options: [
            { id: 2, text: "A testing framework", isCorrect: false },
            { id: 3, text: "A CSS utility library", isCorrect: false },
            { id: 1, text: "A state management library", isCorrect: true }
          ]
        },
        {
          id: 11,
          title: "What is the purpose of React.memo?",
          options: [
            { id: 2, text: "To manage local storage", isCorrect: false },
            { id: 1, text: "To prevent unnecessary re-renders of a component", isCorrect: true },
            { id: 3, text: "To handle API requests", isCorrect: false }
          ]
        },
        {
          id: 12,
          title: "What is the context API in React?",
          options: [
            { id: 1, text: "A way to share data between components without props drilling", isCorrect: true },
            { id: 2, text: "A database configuration tool", isCorrect: false },
            { id: 3, text: "A way to handle routing", isCorrect: false }
          ]
        },
        {
          id: 13,
          title: "What is Prop Drilling in React?",
          options: [
            { id: 1, text: "Passing data through multiple layers of components", isCorrect: true },
            { id: 2, text: "A method for fetching data from APIs", isCorrect: false },
            { id: 3, text: "A way to manage local storage", isCorrect: false }
          ]
        },
        {
          id: 14,
          title: "What is a higher-order component (HOC) in React?",
          options: [
            { id: 2, text: "A component for managing routes", isCorrect: false },
            { id: 3, text: "A tool for managing CSS styles", isCorrect: false },
            { id: 1, text: "A function that takes a component and returns a new component", isCorrect: true }
          ]
        },
        {
          id: 15,
          title: "What is React’s useRef hook used for?",
          options: [
            { id: 2, text: "To manage API requests", isCorrect: false },
            { id: 1, text: "To access and manipulate DOM elements directly", isCorrect: true },
            { id: 3, text: "To define CSS styles", isCorrect: false }
          ]
        }
      ]
    },
    {
    id: 3,
    count: 15,
    title: "System Administration",
    description: "Junior System Administrator",
    lastDate: "2024-12-20T23:50:21.817Z",
    interviewQuestions: [
        {
        id: 1,
        title: "What is a server?",
        options: [
            { id: 1, text: "A computer that provides services to other computers", isCorrect: true },
            { id: 2, text: "A device for printing documents", isCorrect: false },
            { id: 3, text: "A software for video editing", isCorrect: false }
          ]
        },
        {
        id: 2,
        title: "What is the primary purpose of an operating system?",
        options: [
            { id: 1, text: "To manage hardware and software resources", isCorrect: true },
            { id: 2, text: "To provide internet connectivity", isCorrect: false },
            { id: 3, text: "To design websites", isCorrect: false }
          ]
        },
        {
        id: 3,
        title: "What is Active Directory?",
        options: [
            { id: 1, text: "A directory service for Windows domain networks", isCorrect: true },
            { id: 2, text: "A cloud storage platform", isCorrect: false },
            { id: 3, text: "An email client", isCorrect: false }
          ]
        },
        {
        id: 4,
        title: "What is the purpose of a DNS server?",
        options: [
            { id: 1, text: "To resolve domain names into IP addresses", isCorrect: true },
            { id: 2, text: "To store user data", isCorrect: false },
            { id: 3, text: "To manage firewall rules", isCorrect: false }
          ]
        },
        {
        id: 5,
        title: "What is a firewall?",
        options: [
            { id: 1, text: "A security system that controls incoming and outgoing network traffic", isCorrect: true },
            { id: 2, text: "A tool for managing databases", isCorrect: false },
            { id: 3, text: "A software for creating backups", isCorrect: false }
          ]
        },
        {
        id: 6,
        title: "What is virtualization in IT?",
        options: [
            { id: 1, text: "Creating virtual versions of hardware, OS, or storage", isCorrect: true },
            { id: 2, text: "A tool for designing graphics", isCorrect: false },
            { id: 3, text: "A type of database management", isCorrect: false }
          ]
        },
        {
        id: 7,
        title: "What is a VPN used for?",
        options: [
            { id: 1, text: "To create a secure connection over a public network", isCorrect: true },
            { id: 2, text: "To manage local databases", isCorrect: false },
            { id: 3, text: "To monitor server performance", isCorrect: false }
          ]
        },
        {
        id: 8,
        title: "What is an IP address?",
        options: [
            { id: 1, text: "A unique identifier for devices on a network", isCorrect: true },
            { id: 2, text: "A tool for optimizing software", isCorrect: false },
            { id: 3, text: "A type of storage device", isCorrect: false }
          ]
        },
        {
        id: 9,
        title: "What is the difference between TCP and UDP?",
        options: [
            { id: 1, text: "TCP is connection-oriented, UDP is connectionless", isCorrect: true },
            { id: 2, text: "TCP is faster than UDP", isCorrect: false },
            { id: 3, text: "UDP is used for all internet protocols", isCorrect: false }
          ]
        },
        {
        id: 10,
        title: "What is RAID in system administration?",
        options: [
            { id: 1, text: "A way to combine multiple disks for redundancy or performance", isCorrect: true },
            { id: 2, text: "A type of processor", isCorrect: false },
            { id: 3, text: "A software update method", isCorrect: false }
          ]
        },
        {
        id: 11,
        title: "What is SSH used for?",
        options: [
            { id: 1, text: "To securely access remote servers", isCorrect: true },
            { id: 2, text: "To transfer large files", isCorrect: false },
            { id: 3, text: "To block malicious websites", isCorrect: false }
          ]
        },
        {
        id: 12,
        title: "What is the function of a proxy server?",
        options: [
            { id: 1, text: "To act as an intermediary for client requests to servers", isCorrect: true },
            { id: 2, text: "To encrypt network traffic", isCorrect: false },
            { id: 3, text: "To manage local user accounts", isCorrect: false }
          ]
        },
        {
        id: 13,
        title: "What is the purpose of system monitoring tools?",
        options: [
            { id: 1, text: "To track performance and resource usage", isCorrect: true },
            { id: 2, text: "To configure operating systems", isCorrect: false },
            { id: 3, text: "To manage printers", isCorrect: false }
          ]
        },
        {
        id: 14,
        title: "What is the role of a system administrator?",
        options: [
            { id: 1, text: "To ensure systems are operational, secure, and updated", isCorrect: true },
            { id: 2, text: "To develop mobile applications", isCorrect: false },
            { id: 3, text: "To design websites", isCorrect: false }
          ]
        },
        {
        id: 15,
        title: "What is the purpose of a backup system?",
        options: [
            { id: 1, text: "To recover data in case of loss or failure", isCorrect: true },
            { id: 2, text: "To improve server performance", isCorrect: false },
            { id: 3, text: "To monitor network activity", isCorrect: false }
          ]
        }
      ]
    }
  ]
};
