import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "../App.css";
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

function createData(
  merchantname,
  product,
  active,
  mcc,
  merchantid,
  postype,
  terminalid,
  action
) {
  return {
    merchantname,
    product,
    active,
    mcc,
    merchantid,
    postype,
    terminalid,
    action,
  };
}

const rows = [
  createData(
    "KHALIQ ALMUBAYRIK",
    " PAX A920",
    "Active",
    5331,
    145287591,
    "Terminal",
    5674903291,
    "View Details"
  ),
];

export default function CustomizedTables(props) {
  const [apiData, setapiData] = useState([]);
  const [response, setResponse] = useState("false");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  let nodejsip = "http://67.205.163.34:8000";
  let theurl =
    nodejsip + "/terminals/get_terminals_table/" + limit + "/" + offset;

  async function fetchData() {
    var data = [""];
    var response = [""];
    setResponse(false);
    if (
      props.searchArray.POSType == "" &&
      props.searchArray.Prod == "" &&
      props.searchArray.TerminalID == "" &&
      props.searchArray.MerchantID == "" &&
      props.searchArray.MerchantListName == ""
    ) {
      await axios
        .get(theurl)
        .then((res) => {
          data = res.data.myData;
          response = res.data.success;
        })
        .catch((err) => console.log("therr", err));
      return { data, response };
    }
    if (props.searchArray.POSType != "") {
      await axios
        .get(
          nodejsip +
            "/terminals" +
            "/terminal_search_pos/where/pos=/" +
            props.searchArray.POSType
        )
        .then((res) => {
          data = res.data.myData;
          response = res.data.success;
        })
        .catch((err) => console.log("therr", err));
      return { data, response };
    }
    if (props.searchArray.Prod != "") {
      await axios
        .get(
          nodejsip +
            "/terminals" +
            "/terminal_search_product/where/product=/" +
            props.searchArray.Prod
        )
        .then((res) => {
          data = res.data.myData;
          response = res.data.success;
        })
        .catch((err) => console.log("therr", err));
      return { data, response };
    }
    if (props.searchArray.TerminalID != "") {
      await axios
        .get(
          nodejsip +
            "/terminals" +
            "/terminal_search_terminalid/where/terminalid=/" +
            props.searchArray.TerminalID
        )
        .then((res) => {
          data = res.data.myData;
          response = res.data.success;
        })
        .catch((err) => console.log("therr", err));
      return { data, response };
    }
    if (props.searchArray.MerchantID != "") {
      await axios
        .get(
          nodejsip +
            "/terminals" +
            "/terminal_search_merchantid/where/merchantid=/" +
            props.searchArray.MerchantID
        )
        .then((res) => {
          data = res.data.myData;
          response = res.data.success;
        })
        .catch((err) => console.log("therr", err));
      return { data, response };
    }
    if (props.searchArray.MerchantListName != "") {
      await axios
        .get(
          nodejsip +
            "/terminals" +
            "/terminal_search_merchantname/where/merchantname=/" +
            props.searchArray.MerchantListName
        )
        .then((res) => {
          data = res.data.myData;
          response = res.data.success;
        })
        .catch((err) => console.log("therr", err));
      return { data, response };
    }
  }

  async function callApi() {
    let values = await fetchData();
    if (values.data.length == 0) {
      if(offset>0)
      {
        setOffset(offset - 10);
      }
      else{
        setOffset(0)
      }
    }
    setapiData(values.data);
    setResponse(values.response);
  }

  useEffect(() => {
    setapiData([]);
    callApi();
  }, [offset, props]);

  // ///////////////////////////// //////////////   SEARCHING FUNCTIONS
  const [myFlag, setMyFlag] = useState(false);

  // //////////////////////////////////////////////////

  return (
    <>
      <TableContainer component={Paper} style={{ marginBottom: "1px" }}>
        <div style={{ height: "500px" }}>
          {!myFlag ? (
            // For all values
            <div style={myComponent}>
              {response === true ? (
                <>
                  <Table sx={{ minWidth: 800 }} aria-label="customized table">
                    <TableHead className="table-row">
                      <TableRow>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Merchant Name
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Product
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Active
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          MCC
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          MerchantID (MID)
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          POS Type
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          TerminalID (TID)
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
                      {apiData.map((info) => (
                        <StyledTableRow key={info.merchantName}>
                          <StyledTableCell
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {info.merchantName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {info.product}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {info.active}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {info.mcc}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {info.merchantID}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {info.posType}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {info.terminalID}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <div
                              class="form-outline mb-4 col-lg-4"
                              align="center"
                            >
                              <Button
                                type="button"
                                class="btn btn-outline-warning"
                                style={{ marginLeft: "30px" }}
                              >
                                <Link
                                  to="/createsale"
                                  className="page-scroll"
                                  style={{ color: "white" }}
                                >
                                  View Details
                                </Link>
                              </Button>
                            </div>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              ) : (
                <>
                  <Table sx={{ minWidth: 800 }} aria-label="customized table">
                    <TableHead className="table-row">
                      <TableRow>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Merchant Name
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Product
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Active
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          MCC
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          MerchantID (MID)
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          POS Type
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          TerminalID (TID)
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
            <div style={myComponent}>
              {response === true ? (
                <>
                  <Table sx={{ minWidth: 800 }} aria-label="customized table">
                    <TableHead className="table-row">
                      <TableRow>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Merchant Name
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Product
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Active
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          MCC
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          MerchantID (MID)
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          POS Type
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          TerminalID (TID)
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
                </>
              ) : (
                <>
                  <Table sx={{ minWidth: 800 }} aria-label="customized table">
                    <TableHead className="table-row">
                      <TableRow>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Merchant Name
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Product
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Active
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          MCC
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          MerchantID (MID)
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          POS Type
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          TerminalID (TID)
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
