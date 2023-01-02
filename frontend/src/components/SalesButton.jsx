import "./TechListButton.css"
import * as React from "react";
import { Button } from "react-bootstrap";
import { useState, useRef, handleSubmit, handleChange } from "react";
import { CSVLink } from "react-csv";

// const headers = [
//   { label: "First Name", key: "firstName" },
//   { label: "Last Name", key: "lastName" },
//   { label: "Email", key: "email" },
//   { label: "Age", key: "age" }
// ];

const headers = [
  { label: "Merchant Name", key: "merchant_name" },
  { label: "Product", key: "product" },
  { label: "Active", key: "active" },
  { label: "MCC", key: "mcc" },
  { label: "MerchantID(MID)", key: "mcc" },
  { label: "POS Type", key: "pos_type" },
  { label: "TerminalID(TID)", key: "TID" }
];
const data = [
  { merchant_name: "Warren", product: "Morrow", active: "active", mcc: "123" ,mid:"156",pos_type:"type",TID:"178"},

];

 
const csvReport = {
  data:data,
  headers: headers,
  filename: 'POS list.csv'
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <div>
      <div class="row">
        <div class="col-12 col-md-8" style={{ marginTop: "10%" }}>
          {" "}
          <h3 className="heading">Point Of Sale</h3>
        </div>
        
        {sessionStorage.getItem("kdIQO@D!(mt&*&A*Sdzkkaod090@#@QOkkll)fjf>>,@Ors") == "MJSADN,<<<@#$$$@!#23jajsEJ!!2j3iosajjSzzkcooa@(*#*@&ksodjoAO!" ? (
        <div class="col-6 col-md-2" style={{ marginTop: "10%" }}>
        
 <CSVLink {...csvReport}> <Button> Export POS</Button> </CSVLink>  
        </div>
        ):<>
        <div class="col-6 col-md-2" style={{ marginTop: "10%" }}>
          <button onClick={handleOpen} disabled={true}>Export POS List</button>
        </div>
        </>}
      </div>
      
    </div>
  );
}