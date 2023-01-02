
import { Navigation } from "../components/navigation";
import { Contact } from "../components/contact";
import React, { Fragment, useEffect, useState } from 'react';
import AddSearch from "../components/AddLeaSearch";
import AddLeader from "../components/AddLeader";
import CustomizedButtons from "../components/AddLeaButton";
import { useLocation } from "react-router-dom";


export const AddTech = (props) => {

  const [name, setName] = useState('');
  const [id, setId] = useState("")

  const location = useLocation();
  useEffect(() => {
    console.log("teamLeaderID", location);

    // setName(location.state.teamLeaderID)
  }, [])

  return (
    <Fragment>
      <div>
        <Navigation name={name} />
        <CustomizedButtons id={location.state.teamLeaderID} />
        <AddSearch />
        <AddLeader />

        <Contact />

      </div>
    </Fragment>


  )
};
export default AddTech;
