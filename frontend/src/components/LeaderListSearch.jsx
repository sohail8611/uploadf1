import { React, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Search } from "react-bootstrap-icons";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import "../App.css";

export default function AddSearch(props) {
  const [zoneSearchValue, setzoneSearchValue] = useState("");
  const [teamleaderSearchValue, setteamleaderSearchValue] = useState("");
  const reducerData = useSelector((data) => data);
  function clearInput() {
    setzoneSearchValue("");
    setteamleaderSearchValue("");
    props.clearSearch();
  }
  const dispatch = useDispatch();

  // console.log(reducerData,"reducerdata")

  const setZoneSearchRedux = (e) => {
    dispatch({
      type: "SETZONESEARCH",
      value: e,
    });
    dispatch({
      type: "SETLEADERNAMESEARCH",
      value: "",
    });

    

    props.set({ ...props.data, leaderlist_search_zone: e });

    // console.log("reducerData:", reducerData);
  };

  const setTeamleaderSearchRedux = (e) => {
    dispatch({
      type: "SETLEADERNAMESEARCH",
      value: e,
    });

    dispatch({
      type: "SETZONESEARCH",
      value: "",
    });
    

    props.set({ ...props.data, leaderlist_search_teamleadername: e });

    // console.log("reducerData:", reducerData);
  };

  useEffect(() => {
    console.log("use_effect_called");
  }, [reducerData.leaderlist_search_zone]); // listen only to currentChannelName changes

  return (
    <div className="main">
      <div class="row justify-content-start">
        <div class="form-outline mb-4 col-lg-4">
          {/* <label className="form-label">Zone</label>
          <div className="search" style={{ width: '35%' }}>
             <TextField  className="form-field"
              
              id="search"
              variant="outlined"
              fullWidth
              label="Zone"
              value={zoneSearchValue}
              onChange={(e) => setzoneSearchValue(e.target.value)}
            


            />
            
           
          </div> */}
          <div>
            <Grid className="dflex" item form="maincomponent" xs>
              <TextField
                style={{ width: "30%", marginLeft: "8%", marginBottom: "3%" }}
                inputProps={{ style: { fontSize: 12 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
                className="form-field"
                id="outlined-basic"
                variant="outlined"
                label="Zone"
                
                onChange={(e) => setzoneSearchValue(e.target.value)}
              />
              <IconButton
                sx={{ border: "4px orange", borderRadius: 10 }}
                onClick={(e) => setZoneSearchRedux(zoneSearchValue)}
              >
                <SearchIcon style={{ fontSize: "20px", color: "orange" }} />
              </IconButton>
            </Grid>
          </div>
          <Button
            style={{
              marginLeft: "8%",
              marginBottom: "2%",
              fontWeight: "bold",
              fontSize: 12,
              color: "#ff4d00",
            }}
            onClick={() => clearInput()}
          >
            Clear Search
          </Button>
        </div>
        <div class="form-outline mb-4 col-lg-4">
          <div>
            <Grid className="dflex" item form="maincomponent" xs>
              <TextField
                style={{ width: "30%", marginLeft: "8%", marginBottom: "3%" }}
                inputProps={{ style: { fontSize: 12 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
                className="form-field"
                id="outlined-basic"
                variant="outlined"
                label="Leader Name"
                onChange={(e) => setteamleaderSearchValue(e.target.value)}
              />
              <IconButton
                onClick={(e) => setTeamleaderSearchRedux(teamleaderSearchValue)}
                sx={{ border: "4px orange", borderRadius: 10 }}
              >
                <SearchIcon style={{ fontSize: "20px", color: "orange" }} />
              </IconButton>
            </Grid>
          </div>
          <Button
            style={{
              marginLeft: "8%",
              marginBottom: "2%",
              fontWeight: "bold",
              fontSize: 12,
              color: "#ff4d00",
            }}
            onClick={() => clearInput()}
          >
            Clear Search
          </Button>
        </div>
      </div>
    </div>
  );
}
