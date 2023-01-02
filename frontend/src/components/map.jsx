import React from "react";
import { Button } from "react-bootstrap";
import { GoogleMap, DrawingManager, Polygon } from "@react-google-maps/api";
const defaultLocation = { lat: 21.510716840303072, lng: 39.173123103145684 };
function getPaths(polygon, localThis) {
  var polygonBounds = polygon.getPath();
  var bounds = [];

  for (var i = 0; i < polygonBounds.length; i++) {
    var point = {
      lat: polygonBounds.getAt(i).lat(),
      lng: polygonBounds.getAt(i).lng(),
    };
    bounds.push(point);
  }

  // setCreatedpolygon(bounds)
  // data=bounds
  console.log("thebound:", bounds);

  localThis.props.getCoOrdinates(bounds);
  // console.log("localThis:", localThis);
}

class Component extends React.Component {
  state = {
    path1: this.props.zonePolygons, //for plotting all zones or a single zone .depending on location tyoe selection

    path2:
      this.props.subzonepolygons == undefined ? [] : this.props.subzonepolygons, //for plotting subzones of a selected zone
  };
  constructor(props) {
    super(props);

    this.previosOverlay = null;
    this.handleOverlayComplete = this.handleOverlayComplete.bind(this);
  }
  onMapLoad = (_map) => {};
  handleOverlayComplete(e) {
    if (this.previosOverlay) {
      this.previosOverlay.setMap(null);
    }
    this.previosOverlay = e.overlay;
  }

  render() {
    return (
      <div>
        <GoogleMap
          center={defaultLocation}
          zoom={10}
          onLoad={(map) => this.onMapLoad(map)}
          mapTypeId="terrain"
          mapContainerStyle={{
            height: "500px",
            borderRadius: "10px",
            width: "800px",
            color: "red",
          }}
        >
          {this.state.path1.map((map, _index) => (
            <Polygon draggable path={map} />
          ))}
          {this.state.path2.map((map, _index) => (
            <Polygon draggable path={map} />
          ))}

          <DrawingManager
            options={{
              drawingControl: true,

              drawingControlOptions: {
                style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: window.google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
              },

              polygonOptions: {
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                strokeWeight: 2,
                strokeOpacity: 0.8,
                strokeColor: "#FF0000",
                clickable: true,
                editable: false,
                geodesic: false,
                visible: true,
                zIndex: 1,
              },
            }}
            onOverlayStart
            onOverlayComplete={this.handleOverlayComplete}
            onPolygonComplete={(value) => console.log(getPaths(value, this))}
          />
        </GoogleMap>
      </div>
    );
  }
}

export default Component;
