<h1>Task Management UI</h1>

<h2>Setup Instructions</h2>

<h3>Prerequisites</h3>

- Node.js (version 16+ recommended)
- npm or yarn
- Access to a running Task Management API backend

<h3>Installation</h3>

**1.** Clone the repository:
```
git clone https://github.com/jules-vinzon/task-management-ui.git
cd task-management-ui
```

**2.** Install dependencies:
```
npm install
# or
yarn install
```

**3.** Create a **.env** file in the root (if needed) and set the API base URL:
```
REACT_APP_API_URL=http://localhost:5000/api
```

**4.** Start the development server:
```
npm run dev
# or
yarn run dev
```
The app will be available at http://localhost:3000

<h2>Available Scripts</h2>

- ```yarn start``` / ```npm start```: Launches development server
- ```yarn build``` / ```npm run build```: Builds production-ready bundle in build/

<h2>Features</h2>

- **User Authentication:** Login, register, refetch, and logout using encrypted credentials and JWT
- **Task Management:** Create, view, update, and delete tasks
- **Task Listing:** Tasks are filtered by logged-in user and sorted by creation date
- **Responsive UI:** Built to adapt to different screen sizes

<h2>Assumptions Made</h2>

1. The UI interacts with the Task Management API at ```REACT_APP_API_URL```.
2. All requests requiring authentication include a JWT token stored in local storage or state.
3. API errors are returned in JSON and handled gracefully in the UI.
4. The UI assumes tasks have ```title```, ```description```, ```status```, and ```owner_id```.
5. User registration/login uses the RSA public key provided by ```/auth/get-key``` endpoint for encryption.
6. No offline mode or caching is implemented (all data comes from live API requests).
7. The app is bootstrapped with **Create React App**, so standard CRA scripts apply.




