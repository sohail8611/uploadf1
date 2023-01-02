import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Row } from "react-bootstrap";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "../App.css";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Component from "./map";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
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

const myComponent = {
  width: "auto",
  height: "auto",
  overflowX: "scroll",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
    padding: 5,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    height: 10,
  },
}));

<>
  {" "}
  <Button variant="warning">Warning</Button>{" "}
</>;

export default function CustomizedTables(props) {
  let nodejsip = "http://67.205.163.34:8000";
  const [open, setOpen] = React.useState(false);
  const [subzoneresponse, setsubzoneresponse] = useState(false);
  const [zone, setZone] = React.useState("");
  const [subzone, setSubzone] = React.useState("");
  const [subzones, setSubZones] = useState([]);
  const [add, setadd] = React.useState("");
  const [currentsubzone, setCurrentsubzone] = React.useState("");
  const [defaultselectedsubzone, setDefaultselectedsubzone] =
    React.useState(null);
  const [defaultSelectedZoneValue, setDefaultSelectedZoneValue] =
    React.useState("");
  const [defaultSelectedZoneID, setDefaultSelectedZoneID] = React.useState("");
  const [showhide, setShowhide] = useState("");
  const handleChange = (event) => setadd(event.target.value);
  const [map, setMap] = useState(false);
  const [tableresponse, setTableresponse] = useState(false);
  const [apiData, setapiData] = useState([]);
  const [searchedValue, setSearchedValue] = useState([]);
  const [myFlag, setMyFlag] = useState(false);

  const [thesubzoneIdtobeDeleted, setThesubzoneIdtobeDeleted] = useState(false);
  const [popup, setpopup] = useState(false);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [thezonetobeDeleted, setThezonetobeDeleted] = useState(null);
  const { setZoneGlobalList } = props;

  const openPopup = (thesubzoneId, thezoneId) => {
    console.log("thesubzoneId:", thesubzoneId);
    console.log("thezoneId:", thezoneId);

    setThesubzoneIdtobeDeleted(thesubzoneId);
    setThezonetobeDeleted(thezoneId);
    setpopup(true);
  };

  const closePopupNo = () => {
    setThesubzoneIdtobeDeleted("");
    setThezonetobeDeleted(null);
    setpopup(false);
  };

  const closePopupYes = () => {
    console.log("thezoneidafteryesis:", thesubzoneIdtobeDeleted);
    setpopup(false);
    removesubzone(thesubzoneIdtobeDeleted, thezonetobeDeleted);
  };

  const handleshowhide = (event) => {
    const getuser = event.target.value;
    setShowhide(getuser);
  };
  const handleSubmit = (event) => {
    console.log(currentsubzone, "currentSubzone");
    console.log(defaultselectedsubzone, "defaultname");
    if (defaultselectedsubzone == null) {
      setDefaultselectedsubzone("null");

      let myurl =
        nodejsip +
        "/zones/updatelocationsubzone/" +
        9999999999 +
        "/" +
        "nullSubZone" +
        ",,," +
        defaultSelectedZoneValue +
        "___" +
        defaultSelectedZoneID;
      axios
        .get(myurl)
        .then((res) => {
          //  data = res.data.myData;
          setsubzoneresponse(res.data.success);
          setSubZones(res.data.myData["theData"]);
          window.location.reload(false);
          // setapiData([]);
          // callApi();
        })
        .catch((err) => console.log(err));
    } else {
      let myurl =
        nodejsip +
        "/zones/updatelocationsubzone/" +
        currentsubzone +
        "/" +
        defaultselectedsubzone +
        ",,," +
        defaultSelectedZoneValue +
        "___" +
        defaultSelectedZoneID;
      axios
        .get(myurl)
        .then((res) => {
          //  data = res.data.myData;
          setsubzoneresponse(res.data.success);
          setSubZones(res.data.myData["theData"]);
          window.location.reload(false);
          // setapiData([]);
          // callApi();
        })
        .catch((err) => console.log(err));
    }

    setTableresponse(false);
    console.log("handleSubmit ran");
    event.preventDefault();
    // 👇️ access input values here
    console.log("Subzone 👉️", subzone);
    setOpen(false);
  };
  const getSubZones = (zone) => {
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
      .catch((err) => {
        console.log(err);
        setsubzoneresponse(true);
      });
  };

  const handleOpen = (subzoneID, zoneName, zoneID, thezoneName) => {
    setCurrentsubzone(subzoneID);
    setDefaultselectedsubzone(thezoneName);
    setDefaultSelectedZoneValue(zoneName);
    setDefaultSelectedZoneID(zoneID);
    // getSubZones(zoneID);

    console.log("thezoneName:", thezoneName);
    console.log("thesubzoneID:", subzoneID);
    console.log("zoneName:", zoneName);
    console.log("zoneID:", zoneID);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const removesubzone = (subzoneID, zoneId) => {
    console.log("subzoneId to be delted: ", subzoneID);
    console.log("zoneId to be delted: ", zoneId);
    if (subzoneID != null) {
      console.log("I am subzone id deletion ...", subzoneID);

      axios
        .get(nodejsip + "/zones/deletesubzone/where/subzoneID=/" + subzoneID)
        .then((res) => {
          // setCurrentsubzoneID(subz)
          // setapiData([]);
          // callApi();
          window.location.reload(false);
          console.log("subzoneID deleted", subzoneID);
          // setReranderPage(zoneID)
        })
        .catch((err) => console.log(err));
    } else {
      console.log("I am zone id deletion ...", zoneId);
      axios
        .get(nodejsip + "/zones/deletezone/where/zoneID=/" + zoneId)
        .then((res) => {
          // setCurrentsubzoneID(subz)
          // setapiData([]);
          // callApi();
          window.location.reload(false);
          console.log("zone deleted:", zoneId);
          // setReranderPage(zoneID)
        })
        .catch((err) => console.log(err));
    }
  };

  // ///////////////////////////// /////// getting data from db
  useEffect(() => {
    setapiData([]);
    callApi(offset);
  }, [offset, props]);

  async function fetchData(offset) {
    var data = [""];
    setTableresponse(false);
    if (props.inputValue == "") {
      await axios
        .get(nodejsip + "/zones/getalllocations/" + limit + "/" + offset)
        .then((res) => {
          data = res.data.myData;
          setTableresponse(res.data.success);
        })
        .catch((err) => {
          console.log(err);
          setTableresponse(true);
        });
      return data;
    }
    if (props.inputValue != "") {
      await axios
        .get(
          nodejsip +
            "/zones/searchzoneallLocations/where/zonename=/" +
            props.inputValue
        )
        .then((res) => {
          data = res.data.myData;
          setTableresponse(res.data.success);
        })
        .catch((err) => {
          console.log(err);
          setTableresponse(true);
        });
      return data;
    }
  }
  async function callApi(offset) {
    let values = await fetchData(offset);
    if (values.length == 0) {
      if(offset>0)
      {
        setOffset(offset - 10);
      }
      else{
        setOffset(0)
      }
    }
    setapiData(values);
  }

  // //////////////////////////////////////////////////
  return (
    <>
      <TableContainer component={Paper} style={{ marginBottom: "1px" }}>
        <div style={{ height: "500px" }}>
          {console.log("im heree", apiData)}
          {!myFlag ? (
            // For all values
            <div style={myComponent}>
              {apiData.length ? (
                <Table sx={{ minWidth: 800 }} aria-label="customized table">
                  <TableHead className="table-row">
                    <TableRow>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Region
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        City
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Zone
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        SubZone
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Action
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {apiData.map((row) => (
                      <>
                        <StyledTableRow>
                          <StyledTableCell
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {row.regionName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.cityName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.zoneName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.thesubzoneName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Row>
                              <div className="form-outline mb-4 col-lg-5">
                                <Button
                                  style={{ marginBottom: "8px" }}
                                  onClick={() =>
                                    handleOpen(
                                      row.subzoneID,
                                      row.zoneName,
                                      row.zoneID,
                                      row.thesubzoneName
                                    )
                                  }
                                >
                                  <PencilSquare color="white" size={20} />
                                </Button>

                                <Modal
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <Box sx={style}>
                                    <form onSubmit={handleSubmit}>
                                      <div>
                                        <h5 style={{ paddingLeft: "6%" }}>
                                          {" "}
                                          Subzone Name
                                        </h5>
                                      </div>

                                      <FormControl fullWidth>
                                        {/* <InputLabel  style={{ fontSize: 12 }}  id="demo-simple-select-label">SubZone</InputLabel> */}
                                        {defaultselectedsubzone ? (
                                          <>
                                            <TextField
                                              className="form-field"
                                              style={{ fontSize: 12 }}
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              // required= "true "
                                              label="Subzone"
                                              defaultValue={
                                                defaultselectedsubzone
                                              }
                                              onChange={(event) =>
                                                setDefaultselectedsubzone(
                                                  event.target.value
                                                )
                                              }
                                            />
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                        <h5 style={{ paddingLeft: "6%" }}>
                                          {" "}
                                          zone Name
                                        </h5>
                                        <TextField
                                          className="form-field"
                                          style={{ fontSize: 12 }}
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          // required= "true "
                                          label="zone name"
                                          defaultValue={
                                            defaultSelectedZoneValue
                                          }
                                          onChange={(event) =>
                                            setDefaultSelectedZoneValue(
                                              event.target.value
                                            )
                                          }
                                        />
                                      </FormControl>

                                      {map ? (
                                        <>
                                          {
                                            <div className="App">
                                              <div id="floating-panel">
                                                <div class="form-outline mb-4 col-lg-2">
                                                  <Button>Zone</Button>
                                                </div>
                                                <div class="form-outline mb-4 col-lg-4">
                                                  <Button>Subzone</Button>
                                                </div>
                                                <div class="form-outline mb-4 col-lg-4">
                                                  <Button>Delete</Button>
                                                </div>
                                              </div>

                                              <Component />
                                            </div>
                                          }
                                        </>
                                      ) : (
                                        <></>
                                      )}

                                      <div
                                        class="form-outline mb-4 col-lg-7"
                                        style={{ marginTop: "15%" }}
                                      >
                                        <Button
                                          onSubmit={handleSubmit}
                                          type="submit"
                                        >
                                          Save
                                        </Button>{" "}
                                      </div>

                                      <div
                                        class="form-outline mb-4 col-lg-3"
                                        style={{ marginTop: "15%" }}
                                      >
                                        <Button
                                          onClick={handleClose}
                                          as="input"
                                          type="reset"
                                          value="Cancel"
                                        />{" "}
                                      </div>
                                    </form>
                                  </Box>
                                </Modal>
                              </div>
                              <div className="form-outline mb-4 col-lg-4">
                                <Button
                                  // removesubzone(row.subzoneID)
                                  onClick={() =>
                                    openPopup(row.subzoneID, row.zoneID)
                                  }
                                >
                                  <Trash color="white" size={20} />
                                </Button>

                                <Dialog
                                  open={popup}
                                  onClose={handleClose}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description"
                                >
                                  <DialogTitle id="alert-dialog-title">
                                    {"Do you want to delete this record?"}
                                  </DialogTitle>

                                  <DialogActions>
                                    <Button onClick={closePopupYes}>Yes</Button>
                                    <Button onClick={closePopupNo} autoFocus>
                                      No
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                              </div>
                            </Row>
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <>
                  <Table sx={{ minWidth: 800 }} aria-label="customized table">
                    <TableHead className="table-row">
                      <TableRow>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Region
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          City
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Zone
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          SubZone
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Action
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "10em",
                    }}
                  >
                    <h3>Loading...</h3>
                    <CircularProgress
                      disabled={true}
                      color="warning"
                      size={40}
                    />
                  </Box>
                </>
              )}
            </div>
          ) : (
            <>
              {/* For searched values  */}
              <div style={myComponent}>
                {apiData.length ? (
                  <Table sx={{ minWidth: 800 }} aria-label="customized table">
                    <TableHead className="table-row">
                      <TableRow>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Region
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          City
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Zone
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          SubZone
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Action
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                ) : (
                  <>
                    <Table sx={{ minWidth: 800 }} aria-label="customized table">
                      <TableHead className="table-row">
                        <TableRow>
                          <StyledTableCell
                            align="center"
                            style={{ fontSize: 17 }}
                          >
                            Region
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            style={{ fontSize: 17 }}
                          >
                            City
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            style={{ fontSize: 17 }}
                          >
                            Zone
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            style={{ fontSize: 17 }}
                          >
                            SubZone
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            style={{ fontSize: 17 }}
                          >
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "10em",
                      }}
                    >
                      <h3>Loading...</h3>
                      <CircularProgress
                        disabled={true}
                        color="warning"
                        size={40}
                      />
                    </Box>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </TableContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: "-1%",
          marginBottom: "1%",
        }}
      >
        <Button
          onClick={() => {
            if (offset > 0) {
              setOffset(offset - 10);
            } else {
              setOffset(0);
            }
          }}
        >
          Previous
        </Button>
        <Button
          disabled={apiData.length < 10}
          style={{ marginLeft: "1%" }}
          onClick={() => {
            setOffset(offset + 10);
          }}
        >
          {console.log("im here", offset)}
          Next
        </Button>
        <TextField
          style={{
            width: "5%",
            height: "1%",
            marginTop: "3%",
            marginLeft: "1%",
          }}
          inputProps={{ style: { fontSize: 12 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
          className="form-field"
          id="outlined-basic"
          variant="outlined"
          label="Current Page"
          value={offset / 10 + 1}
        />
      </div>
    </>
  );
}
