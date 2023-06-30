import { useMutation } from "@apollo/client";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DELETE_PROJECT } from "../graphQL/mutations";
import { GET_PROJECTS } from "../graphQL/queries";

export const DeleteProjectButton = ({ projectId }) => {
  const navigation = useNavigate();
  const [deleteProject, { loading }] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigation("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  return (
    <div className="d-flex mt-5 ms-auto">
      <button
        className="btn btn-danger m-2"
        disabled={loading}
        onClick={deleteProject}
      >
        <FaTrash className="icon" />
        Delete Project
      </button>
    </div>
  );
};
