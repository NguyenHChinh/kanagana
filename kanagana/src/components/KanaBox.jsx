import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import props from "prop-types";

function KanaBox(props) {

    return(
        <>
            <h1> [ { props.char } ]</h1>
        </>
    )
}

export default KanaBox;