import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

export default function Firstpage(){
    const [name, setname]= useState("")
    const [no, setno]= useState("")
    useEffect(()=>{
        checkConnection();
    },[]);
    async function checkConnection(){
        const isConnect=await window.aptos.isConneted();
        if (!isConnect){
            alert("first connect chy bey")
            console.log("wallet not connected")
            navigate("/")
        }
        else {
            var add = await window.aptos.account();
            console.log("Account address:", add?.address);
        }
    }

    var navigate = useNavigate();

    async function disconnectbtn() {
        console.log("Disconnect button clicked!");
        window.aptos.disconnect();
        console.log("Disconnected from wallet.");
        navigate("/");
    }
    function submitf(){
        event?.preventDefault();
        console.log("name:", name);
        console.log("no:",no);
    }

   
    return(
        <div>
            <form>
                <input type="text" id="name" name="name" placeholder="enter your name" onChange={e => setname(e.target.value)} />
                <input type="Number" id="no" name="no" placeholder="enter no" onChange={e => setno(e.target.value)}/>
                <input type="password" id="password" placeholder="enter strong password"/>
                <button onClick={submitf}>submit</button>
            </form>
        <h1>firstpage</h1>
        <button onClick={disconnectbtn}>disconnect</button>
        </div>
    );
}


