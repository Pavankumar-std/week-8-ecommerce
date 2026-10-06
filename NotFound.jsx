import React from "react";

import {
    Link
} from "react-router";

function NotFound() {

    return (
        <main className="container page-space">

            <div className="empty-state">

                <div className="empty-state__icon">
                    404
                </div>

                <h1>
                    Page Not Found
                </h1>

                <p>
                    The page you are looking for
                    doesn't exist.
                </p>

                <Link
                    to="/"
                    className="button button--primary"
                >
                    Go Home
                </Link>

            </div>

        </main>
    );
}

export default NotFound;