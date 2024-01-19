The framework is designed to perform CRUD operations on a GraphQL API for managing functions.
It provides insights into the prerequisites, tools, technologies, methods, commands, and other essential aspects used in the project.

**Prerequisites**
Ensure the following prerequisites are met before setting up and running the framework:
Node.js and npm: 
Install the latest versions of Node.js and npm from https://nodejs.org/.
Mocha: Mocha is a feature-rich JavaScript test framework. Install it globally using:
“npm install -g mocha”
Chai: Chai is a BDD / TDD assertion library for Node.js. Install it using:
“npm install chai”
dotenv: dotenv is a zero-dependency module that loads environment variables from a .env file. Install it using: “npm install dotenv”
Axios: Axios is a promise-based HTTP client for the browser and Node.js. Install it using:
“npm install axios”

**Graphql Queries and Variables**
In your GraphQL API automation framework, the queries and variables are stored externally in separate files, and they are dynamically loaded and used during test execution. 
This approach provides several advantages, such as better organization, easy maintenance, and separation of concerns between code and data.
The project follows the structure outlined below:

/project-root
│
├── Graphql_queries/
│   ├── Functions/
│   │   ├── CreateFunction.graphql
│   │   ├── GetFunction.graphql
│   │   ├── UpdateFunction.graphql
│   │   └── DeleteFunction.graphql
│   └── ... (Other GraphQL query files)
│
├── Graphql_variables/
│   ├── Functions_var/
│   │   ├── CreateFunction.json
│   │   ├── GetFunction.json
│   │   ├── UpdateFunction.json
│   │   └── DeleteFunction.json
│   └── ... (Other variable files)
│
├── .env
├── test/
│   └── apiTests.js
├── mocha.opts
└── package.json

**Environment Variables (.env)**
Create a .env file in the project root with the following content:
GRAPHQL_ENDPOINT=https://dev-sb-api.advantage-eclinical.com/studyBuilder
AUTH_TOKEN=YOUR_ACTUAL_AUTH_TOKEN
Replace YOUR_ACTUAL_AUTH_TOKEN with your real authorization token.

**Chaining Process in the Framework:**
In the Mocha test script (apiTests.js), the sequence of operations (create, retrieve, update, delete) is defined within separate test cases using Mocha's "it" function. 
Each test case represents a step in the process, and the data or information obtained in one step might be used in subsequent steps.

**Running Tests**
Execute the following command to run the GraphQL API CRUD tests:
node test.js
npx mocha GraphqlTests/Chaining2-tests.js --timeout 3000 --reporter mochawesome
