import React from "react";
import Lottie from "lottie-react";

export default function LottieAnimation({ lotti, width, height }) {
    return (
        <div style={{ width: width, height: height }}>
            <Lottie
                animationData={lotti}
                loop={true}
                autoplay={true}
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
}