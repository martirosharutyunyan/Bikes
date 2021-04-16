import React, { FC } from "react";

const Loader: FC = () => {
    return (
        <>
            <div className="loaderReact">
                <div
                    className="spinner-border text-primary"
                    style={{ width: "500px", height: "500px" }}
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </>
    );
};

export default Loader;
