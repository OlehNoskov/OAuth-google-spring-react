import React, {useEffect} from "react";
import {Button} from "react-magma-dom";
import {useNavigate} from "react-router-dom";
import {USER} from "../../constants/constants.ts";
import {Account} from "../../interfaces/Account.ts";

const Home = () => {

    const navigate = useNavigate();
    let user = window.localStorage.getItem(USER);
    const currentUser: Account = JSON.parse(user);

    const logOut = () => {
        window.localStorage.clear();
        navigate("/")
    };


    useEffect(() => {
        console.log(currentUser)
    }, []);

    return (
        <div>
            <div>Home dashboard</div>
            <p></p>

            <div>
                {currentUser.firstName}
            </div>
            <div>
                {currentUser.lastName}
            </div>
            <div>
                {currentUser.email}
            </div>

            <Button onClick={logOut}>
                Log out
            </Button>

        </div>
    );
};

export default Home;
