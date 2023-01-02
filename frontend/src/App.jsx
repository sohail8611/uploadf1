import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import LeaderList from "./pages/LeaderList";
import  AddLea  from "./pages/AddTeamLeader";
import Reset from "./pages/Reset";
import Pass from "./pages/Pass";
import AddTech from "./pages/AddTechnician";
import TechList from "./pages/TechniciansList";
import Location from "./pages/Location";
import Resource from "./pages/AddResource";
import Sales from "./pages/Sales";
import { Contact } from "./components/contact";
import Sample from "./pages/LandingPage";
import CreateSale from "./pages/CreatePOS";
import Login from "./pages/Login";
import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { Routes,Router } from 'react-router-dom';
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import axios from "axios";
// import { Provider } from 'react-redux';
import { Provider } from 'react-redux';
import store from "./config/redux/store";
import  Testdropdown  from "./pages/testdropdown";

let nodejsip ="http://67.205.163.34:8000"

///user login details saving in session or localstorage
// sessionStorage.setItem('userID', '1');
// sessionStorage.setItem('userTYPE', 'teamleader');
// sessionStorage.setItem('isLogin', 'true');
// sessionStorage.setItem('manageZones', 'false');
// sessionStorage.setItem('manageSubZones', 'true');
// sessionStorage.setItem('manageTerminals', 'true');
// sessionStorage.setItem('assignOrUpdateTeamleaderOnZone', 'True');
// sessionStorage.setItem('View', 'True');
// sessionStorage.setItem('isLogin', 'True');
// sessionStorage.setItem('nodeip', 'localhost:8000');
  
// console.log(sessionStorage.getItem('assignOrUpdateTeamleaderOnZone'),"pppppppppppppppppppppppp")


  // let nodejsip ="http://67.205.163.34:8000"
  // let myurl = nodejsip+"/users/get_permissions"
  // var data=[""];
  // axios
  //   .get(myurl)
  //   .then((res) => {
  //      data = res.data.myData;
  //     console.log("permission_data:",data[0]["type"])

  //     console.log("permission_data:",data[0]["manageZones"])
  //     console.log("permission_data:",data[0]["manageSubzones"])
  //     console.log("permission_data:",data[0]["manageTerminals"])

  //     sessionStorage.setItem('manageZones', data[0]["manageZones"]);
  //     sessionStorage.setItem('manageSubZones', data[0]["manageSubzones"]);
  //     sessionStorage.setItem('manageTerminals', data[0]["manageTerminals"]);
  //     // setCities(res.data.myData)
  //   })
  //   .catch((err) => console.log(err));


// const USER_ID = sessionStorage.getItem('userID');

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
  
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [login, setlogin] = React.useState(false);
  useEffect(() => {
    
    // Authenticated
    if (sessionStorage.getItem("&!&26@asd9s9d8ZJJzjkJLA@*(&&hjbbzccnm2@<><!2Uu!I,.!@7#&") == '7&&**asddj***&&^^@,,<:::<;>@!sajdkasj*@!&!^^*!*!&&@sdhhsa#4@1@') {
      let _thetype = 0;
            if (sessionStorage.getItem("@112sZ##@@#@32&*&&*Z<><>:@@!aasdas@@UUUU@!87^@&<<<>>!") == "jsad2761@@^%@zasd,,>.jisad9@8&&7jsakdzxcvvase@!!!@3@#@!!zdWA"){
        _thetype = "teamleader"
      }
      if (sessionStorage.getItem("@112sZ##@@#@32&*&&*Z<><>:@@!aasdas@@UUUU@!87^@&<<<>>!") == "jsasd11@@^asdjkjzo,,>.##5532@@!4324ad9@8&&7jsakd@!Vdscz#%#@1"){
        _thetype = "technician"
      }
      if (sessionStorage.getItem("@112sZ##@@#@32&*&&*Z<><>:@@!aasdas@@UUUU@!87^@&<<<>>!") == "Maksdj982opaasda[[asasdadvvv42@@4#$$Z2532@@adkkz9(*728&&7jsakd"){
        _thetype = "teamleader"
      }
      console.log("thetypeis:",_thetype)
      axios
        .get("http://67.205.163.34:1143/get_permissions/"+_thetype)
        .then((res) => {
          let manageTeamleaders = "38&*QhASJzn@132AZZ23@@#23671!@MM>l;l<,!13172(@*&@1"
          let manageTechnicians = "*QhASJzn@(132AZZ23@@#23671!@MM>l;l<,!1317238&@*&@1"
          let manageTerminals = "132AhASJzn@(@@#23671!@MM>l;l<,!1317238&*Q@*&@1"
          let manageLocations = "l<,!1317238&132AZZ23@@#23671!@MM>l;*QhASJzn@(@*&@1"
          let manageResources = "!1317132AZZ23@@#23671!@MM>l;l<,238&*QhASJzn@(@*&@1"

          if (res.data[0]["manageTeamleaders"] == 'true'){
            manageTeamleaders = "9zzzdaos@Zj@#!^@&#^12638787!#*)(@()*9023<><:<:>!323Zrkko0p"
          }
          if (res.data[0]["manageTechnicians"] == 'true'){
            manageTechnicians = "A*(SU(8ahsdj::u81y1&@&*ZLd,,a<POQOEI!2u98easkjdaskodj!zzzz"
          }
          if (res.data[0]["manageTerminals"] == 'true'){
            manageTerminals = "MJSADN,<<<@#$$$@!#23jajsEJ!!2j3iosajjSzzkcooa@(*#*@&ksodjoAO!"
          }
          if (res.data[0]["manageLocations"] == 'true'){
            manageLocations = "OASOKOmzmmIOQ@&*@&@#^!^73176787AS*dhKZdk,d,adMANDI*&17t271hani"
          }
          if (res.data[0]["manageResources"] == 'true'){
            manageResources = "MMIDZIdhasHUD*Y@Y10y1yayd8a9sd8adaDH(!(2iksjadsadjaJDAODOAWIi@i"
          }

          sessionStorage.setItem('mt&*&A*Sdzkkaod@#@QOkkllkdIQO@D!()fjf>>,@Ors', manageTeamleaders);
          sessionStorage.setItem('mt&*&A*Sf>>,kkaod090@#@QOkkllkkkaoO@D!()fjf>>,@Ors', manageTechnicians);
          sessionStorage.setItem('kdIQO@D!(mt&*&A*Sdzkkaod090@#@QOkkll)fjf>>,@Ors', manageTerminals);
          sessionStorage.setItem('mt&*&A*Sdjf>od090@#@QOkkllkdIQO@D!()fj@Ors', manageLocations);
          sessionStorage.setItem('mt&*&A*Sdzd090@#@QOkkllkdIQO@D!(090>>,@Ors',  manageResources);
          // console.log("thethings")
          // console.log(sessionStorage.getItem("manageTeamleaders"))
          // console.log(sessionStorage.getItem("manageTechnicians"))
          // console.log(sessionStorage.getItem("manageLocations"))
          // setCities(res.data.myData)
        })
        .catch((err) => console.log(err));

      if (sessionStorage.getItem("&!&26@asd9s9d8ZJJzjkJLA@*(&&hjbbzccnm2@<><!2Uu!I,.!@7#&") == "7&&**asddj***&&^^@,,<:::<;>@!sajdkasj*@!&!^^*!*!&&@sdhhsa#4@1@")
      {setlogin('true')
      setLandingPageData(JsonData);
    }
      
      
    }
    else{
      setlogin(false)
    }
    


    
  }, []);
if (login == 'true'){
console.log("login checked",login)

  return (
    
<Router>
      {/* <Fragment> */}
      <Provider store={store}>
    <Routes>
      <Route exact path="/" element={<Sample/> } />
      
      <Route exact path="/leaderlist" element={<LeaderList/> } />
      <Route exact path="/addteamleader" element={<AddLea/> } />
      <Route exact path="/addtech" element={<AddTech/> } />
      <Route exact path="/techlist" element={<TechList/> } />
      <Route exact path="/location" element={<Location/> } />
      <Route exact path="/sales" element={<Sales/> } />
      <Route exact path="/createsale" element={<CreateSale/> } />
      <Route exact path="/resource" element={<Resource/> } />
      <Route exact path="/testdropdown" element={<Testdropdown/> } />
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/pass" element={<Pass/>}/>  
      <Route exact path="/reset" element={<Reset/>}/>  
      {/* <Route exact path="/ab" element={<Ab/> } /> */}
    </Routes>
    </Provider>
    {/* </Fragment> */}
</Router>


  );

}
else{
  
  return (
    
    <Router>
          {/* <Fragment> */}
          <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<Login/> } />
          
          <Route exact path="/leaderlist" element={<Login/> } />
          <Route exact path="/addteamleader" element={<Login/> } />
          <Route exact path="/addtech" element={<Login/> } />
          <Route exact path="/techlist" element={<Login/> } />
          <Route exact path="/location" element={<Login/> } />
          <Route exact path="/sales" element={<Login/> } />
          <Route exact path="/createsale" element={<Login/> } />
          <Route exact path="/resource" element={<Login/> } />
    
          <Route exact path="/testdropdown" element={<Login/> } />
          
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/pass" element={<Pass/>}/>
          <Route exact path="/reset" element={<Reset/>}/>
    
           
          
          {/* <Route exact path="/ab" element={<Ab/> } /> */}
        </Routes>
        </Provider>
        {/* </Fragment> */}
    </Router>
    
    
      );




}
};

export default App;
