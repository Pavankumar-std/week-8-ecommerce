import React from "react";

import Checkout
    from "../components/Checkout/Checkout";

function CheckoutPage() {

    return (
        <main className="container page-space">

            <div className="section-heading">

                <p className="section-label">
                    SECURE CHECKOUT
                </p>

                <h1>
                    Checkout
                </h1>

            </div>

            <Checkout />

        </main>
    );
}

export default CheckoutPage;