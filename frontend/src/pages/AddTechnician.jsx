import { Navigation } from "../components/navigation";
import { Contact } from "../components/contact";
import React, { Fragment, useEffect, useState } from "react";
import CustomizedButtons from "../components/TechAddButton";
import TechSearch from "../components/AddTechnicianSearch";
import AddTechnician from "../components/AddTechnician";
import { useLocation } from "react-router-dom";

export const Addtec = (props) => {
  const [inputValue, setInputValue] = useState(" ");
  const [id, setId] = useState("");
  const location = useLocation();
  useEffect(() => {}, []);

  return (
    <Fragment>
      <div>
        <Navigation />
        <CustomizedButtons id={location.state.techID} />
        <TechSearch inputValue={inputValue} setInputValue={setInputValue} />
        <AddTechnician inputValue={inputValue} setInputValue={setInputValue} />
        <Contact />
      </div>
    </Fragment>
  );
};
export default Addtec;
