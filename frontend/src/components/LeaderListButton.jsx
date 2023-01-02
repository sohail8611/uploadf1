import "./TechListButton.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "react-bootstrap";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
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
  const [details, setDetails] = React.useState("");

  const [zoneresponse, setZoneresponse] = useState(false);
  const [cityresponse, setCityresponse] = useState(false);
  const [regionresponse, setRegionresponse] = useState(false);
  const [teamleaderresponse, setTeamleaderresponse] = useState(false);

  const [citydisabled, setCitydisabled] = useState(true);
  const [zonedisabled, setZonedisabled] = useState(true);

  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);

  const handleChange_region = (event) => {
    console.log("Region is:", event.target.value);
    setRegion(event.target.value);

    console.log("City is:", event.target.value);
    event.preventDefault();
  };

  const handleChange_city = (event) => {
    console.log("Region is:", event.target.value);
    setCity(event.target.value);

    console.log("City is:", event.target.value);
    event.preventDefault();
  };

  // const handleChange_zone = event => {

  //   console.log('Region is:', event.target.value);
  //   setZone(event.target.value);

  //   console.log('City is:', event.target.value);
  //    event.preventDefault();
  // };

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
    setCity(city);
    setZonedisabled(false);
    let myurl = nodejsip + "/regions/cityid/" + city;
    setZoneresponse(false);
    axios
      .get(myurl)
      .then((res) => {
        //  data = res.data.myData["theData"];
        setZoneresponse(res.data.success);
        setZones(res.data.myData["theData"]);
        console.log("resdata:", res.data);
      })
      .catch((err) => console.log(err));
  };

  //API call to get all teamleaders list
  const [apiData_3, setapiData_3] = useState([]);
  useEffect(() => {
    callApi_3();
  }, []);

  async function fetchData_3() {
    var data_3 = [""];
    await axios
      .get(nodejsip + "/regions/zones")
      .then((res) => {
        data_3 = res.data.myData;
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
  const [Loader, setLoader] = useState(false);
  useEffect(() => {
    callApi_2();
  }, []);

  async function fetchData_2() {
    var data_2 = [""];
    setTeamleaderresponse(false);
    await axios
      .get(nodejsip + "/teamleaders/registered")
      .then((res) => {
        setTeamleaderresponse(res.data.success);
        data_2 = res.data.myData;
      })
      .catch((err) => console.log(err));
    return data_2;
  }
  var myData_2;
  async function callApi_2() {
    // console.log("Call api called");
    setLoader(true);
    setapiData_2(await fetchData_2());
    setLoader(false);
    // console.log(apiData);
  }

  //API call to get all regions
  const [apiData_1, setapiData_1] = useState([]);
  useEffect(() => {
    callApi_1();
  }, []);

  async function fetchData_1() {
    var data_1 = [""];
    setRegionresponse(false);
    await axios
      .get(nodejsip + "/regions/registered")
      .then((res) => {
        data_1 = res.data.myData;
        setRegionresponse(res.data.success);
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

  // //API call  to get all ccities
  //  const [apiData, setapiData] = useState([]);
  //  useEffect(() => {
  //    callApi();
  //  }, [setRegion]);

  //  async function fetchData() {
  //    var data = [""];
  //    await axios
  //      .get("http://localhost:8000/regions/cities")
  //      .then((res) => {
  //        data = res.data.myData;
  //      })
  //      .catch((err) => console.log(err));
  //    return data;
  //  }
  //  var myData;
  //  async function callApi() {
  //    // console.log("Call api called");
  //    setapiData(await fetchData());
  //    // console.log(apiData);
  //  }

  const handleSubmit = (event) => {
    console.log("handleSubmit ran");
    event.preventDefault();
    // 👇️ access input values here
    console.log("Name 👉️", name);
    console.log("Zone👉️", zone);
    console.log("Details👉️", details);

    let myurl = nodejsip + "/teamleaders/name/" + name + "/zone/" + zone;

    console.log("theurlsnow", myurl);
    axios.get(myurl).then((res) => {
      console.log(res);
      console.log(res.data);
      console.log("sending post request");
    });

    // 👇️ clear all input values in the form
    setName("");
    setCity("");
    setRegion("");
    setZone("");
    setDetails("");
    setOpen(false);
    window.location.reload(false);
  };

  return (
    <>
      <div>
        <div class="row">
          <div class="col-12 col-md-8" style={{ marginTop: "10%" }}>
            {" "}
            <h3 className="heading">Team Leader List</h3>
          </div>
          {sessionStorage.getItem(
            "mt&*&A*Sdzkkaod@#@QOkkllkdIQO@D!()fjf>>,@Ors"
          ) == "9zzzdaos@Zj@#!^@&#^12638787!#*)(@()*9023<><:<:>!323Zrkko0p" ? (
            <div class="col-6 col-md-2" style={{ marginTop: "10%" }}>
              <Button onClick={handleOpen}>Assign Team Leader</Button>
            </div>
          ) : (
            <>
              <div class="col-6 col-md-2" style={{ marginTop: "10%" }}>
                <Button disabled={true}>Assign Team Leader</Button>
              </div>
            </>
          )}
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <h4 style={{ marginBottom: "10%", marginLeft: "5%" }}>
                Assign Team Leader{" "}
              </h4>
            </div>

            <div fullWidth>
              <div>
                <h5 style={{ paddingLeft: "6%" }}>Team Leader Name</h5>
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
                  <option value="">Select Team Leader</option>
                  {regionresponse === true ? (
                    apiData_2.map((info) => (
                      <option value={info.teamLeaderID}>
                        {info.teamLeaderName}{" "}
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
                    apiData_1.map((info) => (
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
                  onChange={(e) => setZone(e.target.value)}
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
                  name == "" || region == "" || city == "" || zone == ""
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
    </>
  );
}
