import { useEffect, useState } from "react";
import Error from "./request_answer_component/error.component";
import Loading from "./request_answer_component/loading.component";
import axios from 'axios';
import { getEnvironmentData } from "worker_threads";
import { getDialogTitleUtilityClass, TableRow } from "@mui/material";
import React from "react";

/*function getData() {
    const res = await  axios.get("http://localhost:3000/user/");
    return res.json();
    
    axios.get("http://localhost:3000/user/").then(
        (res) => { console.log(res.data); }
    );
}*/

function CreateDefaultUser()
{
	// if no user with id == 1
    // create default user with id 1

    const axios = require('axios');
    const res = axios.get("http://localhost:3000/user/").then(
        (response: any) => {
            this.setState({response: response})
        }).catch( (error: any) => {
            console.log(error);
        })


     export default function App() {
        const [post, setPost] = React.useState(null);
         
        React.useEffect(() => {
            axios.get("http://localhost:3000/user/").then((response) => {
                setPost(response.data);
            });
        }, []);

    if(!post)
    {
      //  leng = res.data.id;
        axios.post("http://localhost:3000/user/name/default");
    }
    console.log(res.data);

    //axios.post("http://localhost:3000/user/name/default", formData).then(
	//	(res) => { console.log(res); },
	//	(error) => { console.log(error); }
	//);
    return (
        <div>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      );
    
}

export default CreateDefaultUser;
}