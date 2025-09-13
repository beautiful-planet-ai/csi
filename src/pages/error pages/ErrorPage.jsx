import { Button } from "primereact/button";
import React from "react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
 
const ErrorPage = () => {
  const error = useRouteError();
 
  console.log(isRouteErrorResponse(error));
 
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn't exist!</div>;
    }
 
    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>;
    }
 
    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }
 
    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }
 
  return (
    <section className="flex flex-column h-screen w-screen gap-3 text-center justify-content-center">
      <h1 className="text-primary text-5xl">Oops...! An error has occurred</h1>
      <small>Please go back to home page and re-try later!</small>
      <Link to="/">
        <Button label="Home" icon="pi pi-home" id="error-home" />
      </Link>
    </section>
  );
};
 
export default ErrorPage;