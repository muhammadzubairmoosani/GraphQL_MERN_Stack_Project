import { useMutation } from "@apollo/client";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from "../graphQL/mutations";
import { GET_CLIENTS, GET_PROJECTS } from "../graphQL/queries";

export const ClientRow = ({ client }) => {
  const [deleteClient, { loading }] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          onClick={deleteClient}
          className="btn btn-danger btn-sm"
          disabled={loading}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};
