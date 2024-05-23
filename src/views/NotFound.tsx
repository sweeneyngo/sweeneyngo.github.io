import { useRouteError, isRouteErrorResponse } from "react-router-dom";

function NotFound() {
    const error = useRouteError();
    console.error(error);

    const message = errorMessage(error);

    function errorMessage(error: unknown): string {
        if (isRouteErrorResponse(error)) {
            return `${error.status} ${error.statusText}`
        } else if (error instanceof Error) {
            return error.message
        } else if (typeof error === "string") {
            return error
        } else {
            console.error(error);
            return "Unknown error";
        }
    }

    return (
        <div id="error-page">
            <h1>Ruh-roh!</h1>
            <h5>
                <i>{message}</i>
            </h5>
            <p>Sorry, an unexpected error has occurred.</p>
        </div>
    );
}

export default NotFound;
