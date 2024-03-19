import React, { forwardRef } from "react";
import MapView, { Polyline } from "react-native-maps";
import tw from "twrnc";
import routeCoordinates from "../data/routes.json";
export const Map = forwardRef(({ location }, ref) => {
  return (
    <MapView
      ref={ref}
      style={tw`flex-1`}
      mapType="mutedStandard"
      showsUserLocation={true}
    >
      <Polyline coordinates={routeCoordinates} />
    </MapView>
  );
});

export default Map;
