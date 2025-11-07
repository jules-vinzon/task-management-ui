import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SignIn from "./pages/SignIn/signin";
import SignUp from "./pages/SignIn/signup";
import Home from "./pages/Home/home";
import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
