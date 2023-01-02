const express = require("express");
const router = express.Router();

const { showZones,showsubZones,showtableforspecificzone,showtableforspecificteamleader,getalllocations,deletesubzone,unassignsubzone,replace_currentsubzone,createnewzone,createnewsubzone,updatelocationsubzone,searchzoneallLocations,deleteZone} = require("../controllers/zonesControllers");

// ## Return all zones under the city . where '1' represent cityID . If we provide cityID in the end it will
//    return all the zones that are in that city.
router.route("/showZones").get(showZones);

router.route("/showsubZones").get(showsubZones);
router.route("/deletesubzone/where/subzoneID=/:subzoneID").get(deletesubzone);
router.route("/deletezone/where/zoneID=/:zoneID").get(deleteZone);

router.route("/unassignsubzone/where/subzoneID=/:subzoneID/technicianID=/:technicianID").get(unassignsubzone);



router.route("/teamleaderlist_TabularData_API/where/zonename=/:zonename").get(showtableforspecificzone);

router.route("/teamleaderlist_TabularData_API/where/teamleadername=/:teamleadername").get(showtableforspecificteamleader);

router.route("/getalllocations/:limit/:offset").get(getalllocations);

router.route("/searchzoneallLocations/where/zonename=/:zonename").get(searchzoneallLocations);

router.route("/name/:name/subzone/:subzone/currentsubzone/:currentsubzone").get(replace_currentsubzone);

router.route("/createnewzone").post(createnewzone);

router.route("/createnewsubzone").post(createnewsubzone);


router.route("/updatelocationsubzone/:subzoneID/:updatedsubzoneName").get(updatelocationsubzone);



module.exports = router;
