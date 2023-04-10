import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import './ErrorPage.scss';

export default function ErrorPage() {
  let error = useRouteError() as any;
  if (!isRouteErrorResponse(error)) {
    error = {
      message: 'UnknownError',
    };
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message || 'Unknown Error'}</i>
      </p>
    </div>
  );
}
