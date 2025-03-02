import React, {useState} from "react";
import {getUserData} from "../services/userService.ts";
import {Button} from "react-magma-dom";
import {Account, EMPTY_ACCOUNT} from "../interfaces/Account.ts";

function Home() {

    const [account, setAccount] = useState<Account | null>(EMPTY_ACCOUNT);

    const fetchUser = async () => {
        const response: Account | null = await getUserData();
        setAccount(response)
    };

    return (
        <>
            <div>Home dashboard</div>
            <Button onClick={() => fetchUser()}>CLICK</Button>
            <div>
                {account?.firstName}
            </div>
            <div>
                {account?.lastName}
            </div>
            <div>
                {account?.email}
            </div>
        </>
    );
}

export default Home;