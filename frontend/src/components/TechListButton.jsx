import "./TechListButton.css";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "react-bootstrap";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Form from "react-bootstrap/Form";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { getDisplayName } from "@mui/utils";

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
  let nodejsip = "http://67.205.163.34:8000";

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zone, setZone] = React.useState("");
  const [subzone, setSubzone] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);
  const [subzones, setSubZones] = useState([]);
  const [subzoneresponse, setsubzoneresponse] = useState(false);
  const [zoneresponse, setZoneresponse] = useState(false);
  const [cityresponse, setCityresponse] = useState(false);
  const [regionresponse, setRegionresponse] = useState(false);
  const [techniciansresponse, setTechniciansresponse] = useState(false);
  const [citydisabled, setCitydisabled] = useState(true);
  const [zonedisabled, setZonedisabled] = useState(true);
  const [subzonedisabled, setSubzonedisabled] = useState(true);

  let [regionCity, setRegioncity] = useState("");

  const handleChange = (event) => {
    let value = event.target.value;

    let name = event.target.name;

    console.log("Value is:", event.target.value);

    setRegioncity((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
  };

  const getCities = (region) => {
    setCitydisabled(false);
    setRegion(region);
    let myurl = nodejsip + "/regions/regionid/" + region;
    setCityresponse(false);
    axios
      .get(myurl)
      .then((res) => {
        //  data = res.data.myData;
        setCityresponse(res.data.success);
        setCities(res.data.myData);
      })
      .catch((err) => console.log(err));
  };

  const getZones = (city) => {
    setZonedisabled(false);
    setCity(city);
    let myurl = nodejsip + "/regions/cityid/" + city;
    setZoneresponse(false);
    axios
      .get(myurl)
      .then((res) => {
        //  data = res.data.myData;
        setZoneresponse(res.data.success);
        setZones(res.data.myData["theData"]);
      })
      .catch((err) => console.log(err));
  };

  const getSubZones = (zone) => {
    setSubzonedisabled(false);
    setZone(zone);
    let myurl = nodejsip + "/regions/zoneid/" + zone;
    setsubzoneresponse(false);
    axios
      .get(myurl)
      .then((res) => {
        //  data = res.data.myData;
        setsubzoneresponse(res.data.success);
        setSubZones(res.data.myData["theData"]);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    console.log("handleSubmit ran");
    event.preventDefault();
    // 👇️ access input values here
    console.log("Name 👉️", name);
    console.log("Subone👉️", subzone);
    console.log("Details👉️", details);

    let myurl =
      nodejsip +
      "/teamleaders/updatetechnician/name/" +
      name +
      "/subzone/" +
      subzone;

    console.log("theurlsnow", myurl);
    axios.get(myurl).then((res) => {
      console.log(res);
      console.log(res.data);
      console.log("sending post request to update technician");
    });
    // 👇️ clear all input values in the form
    setName("");
    setCity("");
    setRegion("");
    setZone("");
    setSubzone("");
    setDetails("");
    setOpen(false);
    window.location.reload(false);
  };

  const [apiData_3, setapiData_3] = useState([]);
  useEffect(() => {
    callApi_3();
  }, []);

  async function fetchData_3() {
    var data_3 = [""];
    setTechniciansresponse(false);
    await axios
      .get(nodejsip + "/teamleaders/allTechniciansList")
      .then((res) => {
        setTechniciansresponse(res.data.success);
        data_3 = res.data.myData;
        console.log("The data is here", data_3);
      })
      .catch((err) => console.log(err));
    return data_3;
  }
  var myData_3;
  async function callApi_3() {
    // console.log("Call api called");
    setapiData_3(await fetchData_3());
    // console.log(apiData);
  }

  //API call to get all teamleaders list
  const [apiData_2, setapiData_2] = useState([]);
  useEffect(() => {
    callApi_2();
  }, []);

  async function fetchData_2() {
    var data_2 = [""];
    setRegionresponse(false);
    await axios
      .get(nodejsip + "/regions/registered")
      .then((res) => {
        setRegionresponse(res.data.success);
        data_2 = res.data.myData;
      })
      .catch((err) => console.log(err));
    return data_2;
  }
  var myData_2;
  async function callApi_2() {
    // console.log("Call api called");
    setapiData_2(await fetchData_2());
    // console.log(apiData);
  }

  //API call to get all regions
  const [apiData_1, setapiData_1] = useState([]);
  useEffect(() => {
    callApi_1();
  }, []);

  async function fetchData_1() {
    var data_1 = [""];
    await axios
      .get(nodejsip + "/regions/cities")
      .then((res) => {
        data_1 = res.data.myData;
      })
      .catch((err) => console.log(err));
    return data_1;
  }
  var myData_1;
  async function callApi_1() {
    // console.log("Call api called");
    setapiData_1(await fetchData_1());
    // console.log(apiData);
  }

  //API call to get all regions
  const [apiData_zones, setapiData_zones] = useState([]);
  useEffect(() => {
    callApi_zones();
  }, []);

  async function fetchData_zones() {
    var data_zones = [""];
    await axios
      .get(nodejsip + "/regions/zones")
      .then((res) => {
        data_zones = res.data.myData;
      })
      .catch((err) => console.log(err));
    return data_zones;
  }
  var myData_zones;
  async function callApi_zones() {
    // console.log("Call api called");
    setapiData_zones(await fetchData_zones());
    // console.log(apiData);
  }

  //API call to get all regions
  const [apiData_subzones, setapiData_subzones] = useState([]);
  useEffect(() => {
    callApi_subzones();
  }, []);

  async function fetchData_subzones() {
    var data_subzones = [""];
    await axios
      .get(nodejsip + "/zones/showsubZones")
      .then((res) => {
        data_subzones = res.data.myData;
      })
      .catch((err) => console.log(err));
    return data_subzones;
  }
  var myData_subzones;
  async function callApi_subzones() {
    // console.log("Call api called");
    setapiData_subzones(await fetchData_subzones());
    // console.log(apiData);
  }

  return (
    <div>
      <div class="row">
        <div class="col-12 col-md-8" style={{ marginTop: "10%" }}>
          {" "}
          <h3 className="heading">Technician List</h3>
        </div>
        {sessionStorage.getItem(
          "mt&*&A*Sf>>,kkaod090@#@QOkkllkkkaoO@D!()fjf>>,@Ors"
        ) == "A*(SU(8ahsdj::u81y1&@&*ZLd,,a<POQOEI!2u98easkjdaskodj!zzzz" ? (
          <div class="col-6 col-md-2" style={{ marginTop: "10%" }}>
            <Button onClick={handleOpen}>Assign Technician On Subzone</Button>
          </div>
        ) : (
          <>
            <div class="col-6 col-md-2" style={{ marginTop: "10%" }}>
              <Button disabled={true} onClick={handleOpen}>
                Assign Technician On Subzone
              </Button>
            </div>
          </>
        )}
      </div>
      {/* <Button onClick={handleOpen} style={{ marginTop: "10%" }}>Assign Technician On Subzone</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h4 style={{ marginBottom: "10%", marginLeft: "5%" }}>
              Assign Technician On Subzone{" "}
            </h4>
          </div>

          <div fullWidth>
            <div>
              <h5 style={{ paddingLeft: "6%" }}>Technician Name</h5>
            </div>
            <div style={{ width: "100%" }}>
              <select
                style={{
                  fontSize: 12,
                  marginLeft: "-0",
                  width: "100%",
                  height: "4Rem",
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              >
                <option value="">Select Technician</option>
                {techniciansresponse === true ? (
                  apiData_3.map((info) => (
                    <option value={info.technicianID}>
                      {info.technicianName}{" "}
                    </option>
                  ))
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "2em",
                    }}
                  >
                    <CircularProgress
                      disabled={true}
                      color="warning"
                      size={20}
                    />
                  </Box>
                )}
              </select>
            </div>
          </div>

          <div fullWidth>
            <div>
              <h5 style={{ paddingLeft: "6%" }}>Region</h5>
            </div>
            <div style={{ width: "100%" }}>
              <select
                style={{
                  fontSize: 12,
                  marginLeft: "-0",
                  width: "100%",
                  height: "4Rem",
                }}
                value={region}
                onChange={(e) => getCities(e.target.value)}
              >
                <option value="">Select Region</option>
                {regionresponse === true ? (
                  apiData_2.map((info) => (
                    <option value={info.regionID}>{info.regionName} </option>
                  ))
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "2em",
                    }}
                  >
                    <CircularProgress
                      disabled={true}
                      color="warning"
                      size={20}
                    />
                  </Box>
                )}
              </select>
            </div>
          </div>

          <div fullWidth>
            <div>
              <h5 style={{ paddingLeft: "6%" }}>City</h5>
            </div>
            <div style={{ width: "100%" }}>
              <select
                style={{
                  fontSize: 12,
                  marginLeft: "-0",
                  width: "100%",
                  height: "4Rem",
                }}
                value={city}
                onChange={(e) => getZones(e.target.value)}
              >
                <option value="">Select City</option>
                {cityresponse === true ? (
                  cities.map((info) => (
                    <option value={info.cityID}>{info.cityName} </option>
                  ))
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "2em",
                    }}
                  >
                    <CircularProgress
                      disabled={true}
                      color="warning"
                      size={20}
                    />
                  </Box>
                )}
              </select>
            </div>
          </div>
          <div fullWidth>
            <div>
              <h5 style={{ paddingLeft: "6%" }}>Zones</h5>
            </div>
            <div style={{ width: "100%" }}>
              <select
                style={{
                  fontSize: 12,
                  marginLeft: "-0",
                  width: "100%",
                  height: "4Rem",
                }}
                value={zone}
                onChange={(e) => getSubZones(e.target.value)}
              >
                <option value="">Select Zone</option>
                {zoneresponse === true ? (
                  zones.map((info) => (
                    <option value={info.zoneID}>{info.zoneName} </option>
                  ))
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "2em",
                    }}
                  >
                    <CircularProgress
                      disabled={true}
                      color="warning"
                      size={20}
                    />
                  </Box>
                )}
              </select>
            </div>
          </div>

          <div fullWidth>
            <div>
              <h5 style={{ paddingLeft: "6%" }}>SubZones</h5>
            </div>
            <div style={{ width: "100%" }}>
              <select
                style={{
                  fontSize: 12,
                  marginLeft: "-0",
                  width: "100%",
                  height: "4Rem",
                }}
                value={subzone}
                onChange={(e) => setSubzone(e.target.value)}
              >
                <option value="">Select Subzone</option>
                {subzoneresponse === true ? (
                  subzones.map((info) => (
                    <option value={info.subzoneID}>{info.subzoneName} </option>
                  ))
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "2em",
                    }}
                  >
                    <CircularProgress
                      disabled={true}
                      color="warning"
                      size={20}
                    />
                  </Box>
                )}
              </select>
            </div>
          </div>

          <div>
            <h5 style={{ paddingLeft: "6%" }}>Location Details</h5>
          </div>

          <TextField
            inputProps={{ style: { fontSize: 12 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
            className="form-field"
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Location Details"
            onChange={(event) => setDetails(event.target.value)}
            value={details}
          />

          <div class="form-outline mb-4 col-lg-4" style={{ marginTop: "5%" }}>
            <Button
              onClick={handleSubmit}
              type="submit"
              disabled={
                name == "" ||
                region == "" ||
                city == "" ||
                zone == "" ||
                subzone == ""
              }
            >
              Save
            </Button>{" "}
          </div>

          <div class="form-outline mb-4 col-lg-4" style={{ marginTop: "5%" }}>
            <Button
              onClick={handleClose}
              as="input"
              type="reset"
              value="Cancel"
            />{" "}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
