import { useState } from "react";

export const SpotInfo = ({ spotData }) => {
  const [spotInfo, setSpotInfo] = useState(spotData);

  const lat = spotInfo.lat;
  const lng = spotInfo.lng;
  // const id = spotInfo.id;
  // const name = spotInfo.name;
  // const discription = spotInfo.discription;

  return (
    <>
      <div>Hello World!</div>
    </>
  );
};
