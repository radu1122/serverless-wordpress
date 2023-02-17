import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./views/Login";
import Register from "./views/Register";
import Auth from "./layouts/Auth";
import Admin from "./layouts/Admin";
import Options from "./views/Options";
import Users from "./views/Users";
import PostsAdmin from "./views/PostsAdmin";
import Posts from "./views/Posts";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth element={<Login />} />} />
        <Route path="/register" element={<Auth element={<Register />} />} />
        <Route
          path="/admin/options"
          element={<Admin element={<Options />} />}
        />
        <Route path="/admin/users" element={<Admin element={<Users />} />} />
        <Route
          path="/admin/posts"
          element={<Admin element={<PostsAdmin />} />}
        />
        <Route path="/posts" element={<Posts />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}
