import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup
} from "reactstrap";
import React, { useState, useEffect, useRef } from "react";
import { UsersController } from "../sdk/usersController.sdk.js";
import { useNavigate } from "react-router-dom";


export default (props) => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [modalAddUser, setModalAddUser] = useState(false);

  const [error, setError] = useState("");

  const [user_email, setUserEmail] = useState("");
  const [user_pass, setUserPass] = useState("");
  const [user_nicename, setUserNicename] = useState("");
  const [user_type, setUserType] = useState("editor");

  const toggleModalAddUser = () => {
    setModalAddUser(!modalAddUser);
    setOptionValue("");
    setOptionName("");
  };

  useEffect(() => {
    async function fetchOptions() {
      const res = await UsersController.getAllUsers(
        {token: localStorage.getItem("apiToken")}
      );
      if (res.success) {
        setUsers(res.data);
      }
    }
    fetchOptions();
  }, []);


  async function handleAdd(e) {
    e.preventDefault();
    if (!user_email || !user_pass || !user_nicename) {
      setError("All fields are mandatory");
      return;
    }

    setError("");

    const res = await UsersController.register({
      token: localStorage.getItem("apiToken"),
      body: {
        email: user_email,
        password: user_pass,
        nicename: user_nicename,
        type: user_type
      }
    });
    if (res.success) {
      // refresh the page
      window.location.reload();
    }
  }

  return (
    <>
      <Modal isOpen={modalAddUser} toggle={toggleModalAddUser}>
        <ModalHeader toggle={toggleModalAddUser}>Add new Option</ModalHeader>
        <form>
          <ModalBody>
            <span className="text-danger">{error}</span>
            <div className="mb-3">
              <label>Email</label>
              <Input
                className="form-control"
                placeholder="email"
                type="email"
                autoComplete="email"
                value={user_email}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <Input
                className="form-control"
                placeholder="password"
                type="password"
                autoComplete="password"
                value={user_pass}
                onChange={(e) => setUserPass(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Nicename</label>
              <Input
                className="form-control"
                placeholder="nicename"
                type="nicename"
                autoComplete="nicename"
                value={user_nicename}
                onChange={(e) => setUserNicename(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => handleAdd(e)} type="submit">
              Add
            </Button>
            <Button color="secondary" onClick={toggleModalAddUser}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal> 
      <Container className="mt-2">
			<Card className="p-4 mt-2">

        <Row className="mt-2">
          <Col sm="11">
              <h3>All Users</h3>

              <Row>
                <Col sm="12">
                  {users.map((user) => (
                    <div key={user._id} className="mb-3">

                      <p><b>Email: </b>{user.user_email}</p>
                      <p><b>nicename: </b>{user.user_nicename}</p>
                      <p><b>type: </b>{user.user_type}</p>
                      <p><b>status: </b>{user.user_status}</p>
                      <p><b>registered date: </b>{user.user_registered}</p>

                      <br/><br/>
                    </div>
                  ))}
                </Col>

                <Col sm="3" className="mt-4">
                  <Button
                    color="primary"
                    onClick={() => {
                      toggleModalAddUser();
                    }}
                  >
                    Add User
                  </Button>
                </Col>
              </Row>
          </Col>
          <Col sm="1" className="text-right">
            <Button
              color="primary"
              onClick={() => {
                localStorage.removeItem("apiToken");
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </Col>
        </Row>
				</Card>

      </Container>
    </>
  );
};