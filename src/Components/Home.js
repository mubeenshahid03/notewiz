import React from "react";
import Notes from "./Notes";
import Addnote from "./Addnote";
import Model from "./Model";

function Home(props) {
 const {showalert}=props    

  return (
    <>
      <Model showalert={showalert}/>
      <Addnote showalert={showalert} />
      <Notes showalert={showalert}/>

    </>
  );
}

export default Home;
