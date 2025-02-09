import {GoogleLogin} from "@react-oauth/google";
import React from "react";


function Test() {

    // const onSuccess = (res: { credential: any; }) => {
    //
    //     fetch("http://localhost:8080/login", {
    //         method: "POST",
    //         body: JSON.stringify(res.credential)
    //
    //     })
    //         .then((response) => console.log(response.json()))
    //         .catch((error) => console.log(error));
    //
    //     console.log(res.credential)
    //
    // }


    return (
        <div>
            <h2>React Google Login</h2>
            <GoogleLogin onSuccess={() => console.log()} />
        </div>
    )
}

export default Test;