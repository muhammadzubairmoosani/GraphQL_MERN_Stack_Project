import { useQuery } from "@apollo/client";
import React from "react";
import { GET_CLIENTS } from "../graphQL/queries";
import { ClientRow } from "./ClientRow";
import { Spinner } from "./Spinner";
export const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <h2>Something went wrong!...</h2>;
  return (
    <table className="table table-hover mt-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.clients.length ? (
          <>
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </>
        ) : (
          <tr>
            <td colSpan={4}>
              <div className="d-flex justify-content-center py-5">
                <h3>No Projects</h3>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
