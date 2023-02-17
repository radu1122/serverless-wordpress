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
import { OptionsController } from "../sdk/optionsController.sdk.js";
import { useNavigate } from "react-router-dom";


export default (props) => {
  const navigate = useNavigate();

  const [options, setOptions] = useState([]);
  const [modalAddOption, setModalAddOption] = useState(false);

  const [error, setError] = useState("");

  const [optionName, setOptionName] = useState("");
  const [optionValue, setOptionValue] = useState("");

  const toggleModalAddOption = () => {
    setModalAddOption(!modalAddOption);
    setOptionValue("");
    setOptionName("");
  };

  useEffect(() => {
    async function fetchOptions() {
      const res = await OptionsController.getOptions(
        {token: localStorage.getItem("apiToken")}
      );
      if (res.success) {
        setOptions(res.data);
      }
    }
    fetchOptions();
  }, []);


  async function handleAdd(e) {
    e.preventDefault();
    if (!optionName) {
      setError("Title is mandatory");
      return;
    }
    if (!optionValue) {
      setError("Value is mandatory");
      return;
    }

    const res = await OptionsController.createOption({
      token: localStorage.getItem("apiToken"),
      body: {
        option_name: optionName,
        option_value: optionValue,
      }
    });
    if (res.success) {
      // refresh the page
      window.location.reload();
    }
  }

  return (
    <>
      <Modal isOpen={modalAddOption} toggle={toggleModalAddOption}>
        <ModalHeader toggle={toggleModalAddOption}>Add new Option</ModalHeader>
        <form>
          <ModalBody>
            <span className="text-danger">{error}</span>
            <div className="mb-3">
              <label>Option Name</label>
              <Input
                className="form-control"
                placeholder="Name"
                type="Name"
                autoComplete="Name"
                value={optionName}
                onChange={(e) => setOptionName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Option Vlaue</label>
              <Input
                className="form-control"
                placeholder="Value"
                type="Value"
                autoComplete="Value"
                value={optionValue}
                onChange={(e) => setOptionValue(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => handleAdd(e)} type="submit">
              Add
            </Button>
            <Button color="secondary" onClick={toggleModalAddOption}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
      <Container className="mt-2">
			<Card className="p-4 mt-2">

        <Row className="mt-2">
          <Col sm="11">
              <h3>All Options</h3>

              <Row>
                <Col sm="12">
                  {options.map((option) => (
                    <div key={option._id} className="mb-3">

                      <p><b>Value: </b>{option.option_value}</p>
                      <p><b>Name: </b>{option.option_name}</p>

                      <ButtonGroup aria-label="Basic example">
                        <Button
                          color="danger"
                          onClick={() => handleDelete(option._id)}
                        >
                          Delete option
                        </Button>
                      </ButtonGroup>
                    </div>
                  ))}
                </Col>

                <Col sm="3" className="mt-4">
                  <Button
                    color="primary"
                    onClick={() => {
                      toggleModalAddOption();
                    }}
                  >
                    Add Option
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