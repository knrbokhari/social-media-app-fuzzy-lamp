import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import EditPost from "./pages/EditPost/EditPost";
import Follower from "./pages/Follower/Follower";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
        <Route
          path="/post/:id"
          element={user ? <EditPost /> : <Navigate to="../auth" />}
        />
        <Route
          path="/follower"
          element={user ? <Follower /> : <Navigate to="../auth" />}
        />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

// http://localhost:5000

// https://cryptic-atoll-67099.herokuapp.com
