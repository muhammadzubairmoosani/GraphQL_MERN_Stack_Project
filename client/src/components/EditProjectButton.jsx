import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../graphQL/queries";
import { UPDATE_PROJECT } from "../graphQL/mutations";

export const EditProjectButton = ({ project }) => {
  console.log(project);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("");

  useEffect(() => {
    switch (project.status) {
      case "Not Started":
        setStatus("new");
        break;
      case "In Progress":
        setStatus("progress");
        break;
      case "Completed":
        setStatus("completed");
        break;

      default:
        setStatus("new");
    }
  }, []);

  const [updateProject, { loading }] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields");
    }
    updateProject(name, description, status);
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            value={name}
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button className="btn btn-primary" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
};
