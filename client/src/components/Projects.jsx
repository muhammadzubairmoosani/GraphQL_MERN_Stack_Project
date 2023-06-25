import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
// import { ClientRow } from "./ClientRow";
import { GET_PROJECTS } from "../graphQL/queries";
import { Spinner } from "./Spinner";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  useEffect(() => {
    console.log({ loading, error, data });
  }, [loading, error, data]);

  if (loading) return <Spinner />;
  if (error) return <h2>Something went wrong!...</h2>;

  return (
    <>
      {data.projects.length ? (
        <div className="row mt-4">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
};
