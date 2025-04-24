import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Homepage from "../components/Homepage";

function Home() {
    return(
        <>
            <h1><Homepage/></h1>
        </>
    )
}

export default Home;