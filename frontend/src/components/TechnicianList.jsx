import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "react-bootstrap";
// import { Link } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";

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

export default function AddTechnician(props) {
  let nodejsip = "http://67.205.163.34:8000";
  const [apiData, setapiData] = useState([]);
  const [searchedValue, setSearchedValue] = useState([]);
  const [myFlag, setMyFlag] = useState(false);
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const [zoneInputValue, setZoneInputValue] = useState();
  const [techInputValue, setTechInputValue] = useState();

  const gotoAddTech = (techID) => {
    navigate("/addtech", { state: { techID } });
  };

  ///////////////////////////// Getting data from database
  useEffect(() => {
    setapiData([]);
    callApi();
  }, [offset, props]);

  async function fetchData() {
    var data = [""];
    if (props.searchArray.techname == "" && props.searchArray.zonename == "") {
      setMyFlag(false);
      await axios
        .get(nodejsip + "/teamleaders/technicianslist/" + limit + "/" + offset)
        .then((res) => {
          data = res.data.myData;
        })
        .catch((err) => console.log(err));
      return data;
    }
    if (props.searchArray.techname != "") {
      setMyFlag(false);
      await axios
        .get(
          nodejsip +
            "/teamleaders//technniciansearch/where/technicianname=/" +
            props.searchArray.techname
        )
        .then((res) => {
          data = res.data.myData;
        })
        .catch((err) => console.log(err));
      return data;
    }
    if (props.searchArray.zonename != "") {
      setMyFlag(false);
      await axios
        .get(
          nodejsip +
            "/teamleaders//technniciansearch/where/zonename=/" +
            props.searchArray.zonename
        )
        .then((res) => {
          data = res.data.myData;
        })
        .catch((err) => console.log(err));
      return data;
    }
  }

  async function callApi() {
    let values = await fetchData();
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
  // ///////////////////////////////////////////////////////

  // ///////////////////////////// //////////////   SEARCHING FUNCTIONS

  // async function search () {
  //   var myarray2 = [];
  //   if (props.searchArray.techname == " " && props.searchArray.zonename == " ") {
  //     setMyFlag(false);
  //   } else {
  //     if (props.searchArray.techname != " ")
  //     {
  //       await axios
  //       .get(nodejsip + "/teamleaders//technniciansearch/where/technicianname=/"+props.searchArray.techname)
  //       .then((res)=>{setSearchedValue(res.data.myData)})
  //       .catch((err) => console.log(err));
  //     }
  //     else if (props.searchArray.zonename != " ")
  //     {
  //       await axios
  //       .get(nodejsip + "/teamleaders//technniciansearch/where/zonename=/"+props.searchArray.zonename)
  //       .then((res)=>{setSearchedValue(res.data.myData)})
  //       .catch((err) => console.log(err));
  //     }

  //   }
  // };

  // // // CAlling search function on every change of input value
  // useEffect(() => {
  //   search();
  // }, [props]);

  // //////////////////////////////////////////////////

  return (
    <>
      <TableContainer component={Paper} style={{ marginBottom: "1px" }}>
        <div style={{ height: "500px" }}>
          {console.log("this is", props)}
          {!myFlag ? (
            // For all values
            <div style={myComponent}>
              {console.log("apidata", apiData)}
              {console.log("apidata lenght", apiData.length)}
              {apiData.length ? (
                <Table sx={{ minWidth: 800 }} aria-label="customized table">
                  <TableHead className="table-row">
                    <TableRow>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Technician
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Zone
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Subzone
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Region
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        City
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Action
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {apiData.map((info) => (
                      <StyledTableRow>
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {info.technicianName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {info.zoneName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {info.thesubzoneName}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ textTransform: "None" }}
                        >
                          {info.regionName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {info.cityName}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <div class="form-outline mb-4 col-lg-6">
                            <Button
                              type="button"
                              class="btn btn-outline-warning"
                              align="right"
                              onClick={() => gotoAddTech(info.technicianID)}
                            >
                              {/* <Link to='/addteamleader' className='page-scroll' style={{ color: "white" }}>

                      View Details
                    </Link> */}
                              View Details
                            </Button>
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
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
                          Technician
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
                          style={{ fontSize: 17, margin: "auto" }}
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
                          Technician
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
                          Subzone
                        </StyledTableCell>
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
                          Action
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {searchedValue.map((info) => (
                        <StyledTableRow>
                          <StyledTableCell
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {info.technicianName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {info.zoneName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {info.thesubzoneName}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            style={{ textTransform: "None" }}
                          >
                            {info.regionName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {info.cityName}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <div class="form-outline mb-4 col-lg-6">
                              <Button
                                type="button"
                                class="btn btn-outline-warning"
                                align="right"
                                onClick={() => gotoAddTech(info.technicianID)}
                              >
                                {/* <Link to='/addteamleader' className='page-scroll' style={{ color: "white" }}>

                      View Details
                    </Link> */}
                                View Details
                              </Button>
                            </div>
                          </StyledTableCell>
                        </StyledTableRow>
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
                            Technician
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
                            style={{ fontSize: 17, margin: "auto" }}
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
