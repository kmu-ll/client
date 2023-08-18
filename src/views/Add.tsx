import React, { useEffect, useRef, useState } from "react";
import useDrawer from "../hooks/useDrawer";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import PlaceIcon from "@mui/icons-material/Place";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useInput } from "../hooks/useInput";

const Add = () => {
  const { naver } = window;
  const mapRef = useRef<HTMLElement | null | any>(null);
  const { Drawer, isOpen, toggleDrawer } = useDrawer({ init: false });
  const [myLocation, setMyLocation] = useState<
    { latitude: Number; longitude: Number } | string
  >("");

  const { value: nameValue, onChange: onNameChange } = useInput("");
  const { value: descriptionValue, onChange: onDescriptionChange } =
    useInput("");
  const { value: typeValue, onChange: onTypeChange } = useInput("bench");

  const drawerBleeding = 56;

  // const handleChange = (event: SelectChangeEvent) => {
  //   setRestype(event.target.value as RestType);
  // };

  const onSubmit = () => {
    console.log(typeValue, nameValue, descriptionValue);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    // 위치추적에 성공했을때 위치 값을 넣어줍니다.
    function success(position: any) {
      setMyLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    // 위치 추적에 실패 했을때 초기값을 넣어줍니다.
    function error() {
      setMyLocation({ latitude: 37.4979517, longitude: 127.0276188 });
    }
  }, []);

  useEffect(
    () => {
      // 사용자 중심 위치로 지도 이동
      if (typeof myLocation !== "string") {
        // 만약 default값인 string("")이 아니라면(즉, 사용자 위치 객체가 넘어갔다면)
        mapRef.current = new naver.maps.Map("map_add", {
          center: new naver.maps.LatLng(
            myLocation.latitude,
            myLocation.longitude
          ),
          // 확대/축소 가능 여부
          zoomControl: true,
          // 초기 줌 설정
          zoom: 16,
        });

        // 주변 마커
      }
    },
    // 사용자 위치가 바뀔때마다 재실행되는 함수
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mapRef, myLocation]
  );

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: "absolute",
          right: 20,
          bottom: drawerBleeding + 20,
        }}
        onClick={toggleDrawer(true)}
      >
        <AddIcon />
      </Fab>
      <div
        id="map_add"
        style={{ width: "100%", minHeight: "100vh" }}
        ref={mapRef}
      />
      <div
        style={{
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <PlaceIcon style={{ color: "#ff00ff" }} />
      </div>

      <Drawer
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        drawerBleeding={drawerBleeding}
      >
        <div
          style={{
            width: "100%",
            padding: "16px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={typeValue}
              label="Type"
              onChange={onTypeChange}
            >
              <MenuItem value={"bench"}>벤치</MenuItem>
              <MenuItem value={"jungja"}>정자</MenuItem>
              <MenuItem value={"starbucks"}>스타벅스</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="이름"
            variant="standard"
            value={nameValue}
            onChange={onNameChange}
          />
          <TextField
            id="outlined-basic"
            label="설명"
            variant="standard"
            multiline
            rows={4}
            value={descriptionValue}
            onChange={onDescriptionChange}
          />
          <Button
            style={{
              textTransform: "none",
              padding: "8px",
            }}
            onClick={onSubmit}
            variant="contained"
          >
            추가
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default Add;
