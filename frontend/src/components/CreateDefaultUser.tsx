import { useEffect, useState } from "react";
import Error from "./request_answer_component/error.component";
import Loading from "./request_answer_component/loading.component";
import axios from 'axios';
import { getEnvironmentData } from "worker_threads";
import { getDialogTitleUtilityClass, TableRow } from "@mui/material";
import React from "react";

function CreateDefaultUser()
{
	// if no user with id == 1
    // create default user with id 1

    const axios = require('axios');
    const res = axios.get("http://localhost:3000/user/").then(res =>
    {
        console.log(res);
        if(res.data.length === 0)
        {
            axios.post("http://localhost:3000/user/name/default");
        }
    }
    );
    return (
        <div>
        </div>
    );
    
}

export default CreateDefaultUser;