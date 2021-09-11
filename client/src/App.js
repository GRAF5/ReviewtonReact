import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Body from "./components/body/Body";
import { useDispatch } from "react-redux";
import { userActions } from "./redux/actions/userActions";

function App() {
  const dispatch = useDispatch();
  //Get data from server by using hooks
  /*const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  */
  useEffect(()=>{
    dispatch(userActions.current());
  }, []);
  return (
    <>
        <Header/>
        <Body/>
        <Footer/>
    </>
  );
}

export default App;