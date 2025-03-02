import React, {useState} from "react";
import {getUserData} from "../../services/userService.ts";
import {Button} from "react-magma-dom";
import {Account, EMPTY_ACCOUNT} from "../../interfaces/Account.ts";

function Home() {

    const [account, setAccount] = useState<Account>(EMPTY_ACCOUNT);


    const fetchUser = async () => {
        const response: Account = await getUserData();
        setAccount(response)
    };

    return (
        <div>
            <div>Home dashboard</div>
            <Button onClick={fetchUser}>CLICK</Button>
            <div>
                {account.firstName}
            </div>
            <div>
                {account.lastName}
            </div>
            <div>
                {account.email}
            </div>

        </div>
    );
}

export default Home;