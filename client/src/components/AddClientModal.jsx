import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { FaUser } from "react-icons/fa";
import { ADD_CLIENT } from "../graphQL/mutations";
import { GET_CLIENTS } from "../graphQL/queries";

export const AddClientModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || phone === "") {
      alert("Please fill in all fields");
    }

    addClient(name, email, phone);

    setName("");
    setEmail("");
    setPhone("");
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="addClientModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addClientModal">
                Add Client
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <label htmlFor="email" className="form-label">
                    Email
                    <input
                      type="text"
                      id="email"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <label htmlFor="phone" className="form-label">
                    Phone
                    <input
                      type="text"
                      id="phone"
                      className="form-control"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
