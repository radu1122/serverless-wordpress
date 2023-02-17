import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UsersController } from "../sdk/usersController.sdk"

export default (props) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      localStorage.getItem("apiToken") == null ||
      localStorage.getItem("user") == null
    ) {
      localStorage.clear();
      navigate("/login");
    }

    async function checkToken() {
      const res = await UsersController.checkSession({token: localStorage.getItem("apiToken")});
      if (!res.success) {
        localStorage.clear();
        navigate("/login");
      }
    }
    checkToken();
  }, []);

  return <>

  <ul>
    <li><a href="/admin/posts">Articles</a></li>
    <li><a href="/admin/options">Options</a></li>
    <li><a href="/admin/users">Users</a></li>
  </ul>
  {props.element}
  </>;
};