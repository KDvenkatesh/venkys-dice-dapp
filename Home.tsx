import { Navigate, useNavigate } from "react-router-dom";

export default function home() {
  var navigate = useNavigate();

  async function connectbtn() {
    console.log("button working");
    const isconnected = await window.aptos.isConnected();
    console.log("is connected", isconnected);
    if (!isconnected) {
      await window.aptos.connect();
      navigate('/first');
    } else {
      console.log("Already connected");
      var add = await window.aptos.account();
      console.log("Acc address", add?.address);
    }
  }

  return (
    <>
      <h1>welcome to the home page</h1>
      <p>this is the home page of your application.</p>
      <button onClick={connectbtn}>connect</button>
    </>
  );
}
