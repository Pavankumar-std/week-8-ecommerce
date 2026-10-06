import React from "react";

import Cart
    from "../components/Cart/Cart";

function CartPage() {

    return (
        <main className="container page-space">

            <div className="section-heading">

                <p className="section-label">
                    SHOPPING BAG
                </p>

                <h1>
                    Your Cart
                </h1>

            </div>

            <Cart />

        </main>
    );
}

export default CartPage;