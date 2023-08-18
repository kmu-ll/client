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
import { PostRest } from "../api/map";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

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
  let navigate = useNavigate();

  const drawerBleeding = 56;

  // const handleChange = (event: SelectChangeEvent) => {
  //   setRestype(event.target.value as RestType);
  // };

  const onSubmit = () => {
    // console.log(typeValue, nameValue, descriptionValue);
    if (nameValue === "" || descriptionValue === "" || typeValue === "") {
      alert("모든 칸을 기입해주세요");
      return;
    }
    const center = mapRef.current.getCenter();
    // console.log(center);
    PostRest(
      center._lat,
      center._lng,
      nameValue,
      descriptionValue,
      typeValue
    ).then(() => {
      alert("업로드 완료");
      navigate("/");
    });
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
          zoomControl: false,
          scaleControl: false,
          logoControl: false,
          // 초기 줌 설정
          zoom: 17,
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
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          position: "absolute",
          bottom: 0,
        }}
      >
        <Fab
          color="primary"
          aria-label="check"
          style={{
            position: "absolute",
            background: "#285430",
            bottom: drawerBleeding + 20,
            right: 20,
          }}
          onClick={toggleDrawer(true)}
        >
          <CheckIcon />
        </Fab>
      </div>

      <Fab
        color="primary"
        aria-label="add"
        size="small"
        style={{
          position: "absolute",
          right: "calc(50% - 20px)",
          margin: "auto",
          bottom: drawerBleeding + 20,
          background: "#000000",
          opacity: 0.5,
        }}
        onClick={() => navigate("/")}
      >
        <CloseIcon />
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
        <PlaceIcon fontSize="large" style={{ color: "#285430" }} />
      </div>
      <div
        style={{
          width: "100%",
          position: "absolute",
          top: "calc(25% - 100px)",
          left: 0,
        }}
      >
        <span
          style={{
            position: "relative",
            padding: "8px",
            borderRadius: "4px",
            background: "rgba(0,0,0,0.5)",
            top: 50,
            left: 0,
            margin: "0 auto",
            color: "#ffffff",
            zIndex: 100,
          }}
        >
          장소를 지정해주세요
        </span>
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
