import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GetRest } from "../api/map";
import useDrawer from "../hooks/useDrawer";
import { useInput } from "../hooks/useInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

type Rest = {
  lat: number;
  lng: number;
  name: string;
  description: string;
  type: string;
};

export const Main = () => {
  const { naver } = window;
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [rest, setRest] = useState<Rest[]>([]);
  const [filteredRest, setFilteredRest] = useState<Rest[]>([]);
  const selectedMarker = useRef<any | null>(null);
  const [currentPlace, setCurrentPlace] = useState<Rest | null>();
  const { Drawer, isOpen, toggleDrawer, setOpen } = useDrawer({ init: false });
  const { value: typeValue, onChange: onTypeChange } = useInput("all");
  const drawerBleeding = 56;
  let navigate = useNavigate();

  // 사용자 위치 변수 : 위도,경도 객체
  const [myLocation, setMyLocation] = useState<
    { latitude: Number; longitude: Number } | string
  >("");

  useEffect(() => {
    GetRest().then((data) => setRest(data));
  }, []);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (typeValue === "all") {
      setFilteredRest([...rest]);
    } else {
      setFilteredRest([...rest].filter((data) => data.type === typeValue));
    }
  }, [typeValue, rest]);

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  useEffect(() => {
    console.log(filteredRest);
  }, [filteredRest]);

  //현재 위치를 추적합니다.
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
  // 현재 위치를 추적한 후, 현재 위치를 중심점으로 옮기고, 스팟들의 마커를 찍어줍니다.
  useEffect(
    () => {
      // 사용자 중심 위치로 지도 이동
      if (typeof myLocation !== "string") {
        // 만약 default값인 string("")이 아니라면(즉, 사용자 위치 객체가 넘어갔다면)
        mapRef.current = new naver.maps.Map("map", {
          center: new naver.maps.LatLng(
            myLocation.latitude,
            myLocation.longitude
          ),
          scaleControl: false,
          logoControl: false,
          // 확대/축소 가능 여부
          zoomControl: false,
          // 초기 줌 설정
          zoom: 17,
        });

        // 주변 마커
        // eslint-disable-next-line array-callback-return
        filteredRest.map((object) => {
          var marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(object.lat, object.lng),
            map: mapRef.current,
            icon: {
              url: filterMarkerImg(object.type),
              size: new naver.maps.Size(25, 25),
              scaledSize: new naver.maps.Size(25, 25),
            },
          });
          // 마커가 클릭되었을때
          naver.maps.Event.addListener(marker, "click", function (e: any) {
            const mapLatLng = new naver.maps.LatLng(
              Number(marker.position._lat),
              Number(marker.position._lng)
            );
            // 선택한 마커로 부드럽게 이동
            mapRef.current.panTo(mapLatLng);
            // 클릭된 마커의 사이즈 변화, 현재 클릭된 마커 업데이트(한 마커만 클릭됨을 표현)
            setClickedMarker(marker);
            setCurrentPlace(object);
            setOpen(true);
          });
        });
      }
    },
    // 사용자 위치가 바뀔때마다 재실행되는 함수
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mapRef, myLocation, filteredRest]
  );

  // 넘어온 객체의 type에 따라 이미지 변경하는 함수
  function filterMarkerImg(markerType: any) {
    // 마커가 넘어왔을때 해당 이미지 옵션에 따라 이미지 분류
    switch (markerType) {
      case "bench":
        return "./img/bench.png";
      case "starbucks":
        return "./img/starbucks.png";
      case "jungja":
        return "./img/jungja.png";
      default:
        return "./img/default.png";
    }
  }
  // 클릭된 마커의 사이즈를 키우는 함수
  function setClickedMarker(marker: any) {
    // 만약 초기에 클릭되었거나, 이후부터는 현재 클릭된 마커와 담겨있는 마커값이 다르다면,
    if (!selectedMarker.current || selectedMarker.current !== marker) {
      // 초기값인 null이 넘어온 첫 경우엔
      if (!selectedMarker.current) {
        // 현재 마커의 사이즈를 키우고
        const icon = marker.getIcon();
        icon.size = new naver.maps.Size(60, 60);
        icon.scaledSize = new naver.maps.Size(60, 60);
        marker.setIcon(icon);
        // current값을 업데이트
        selectedMarker.current = marker;
      } else if (selectedMarker.current !== marker) {
        // 초기값이 넘어온게 아니라면, 이전값은 사이즈를 되돌리고, 현재 값의 사이즈를 키우는 방식 이용
        // 이전에 존재한 마커는 사이즈를 줄임
        const beforeIcon = selectedMarker.current.getIcon();
        beforeIcon.size = new naver.maps.Size(30, 30);
        beforeIcon.scaledSize = new naver.maps.Size(30, 30);
        selectedMarker.current.setIcon(beforeIcon);
        // 현재 클릭된 마커는 사이즈를 키우고
        const nowIcon = marker.getIcon();
        nowIcon.size = new naver.maps.Size(60, 60);
        nowIcon.scaledSize = new naver.maps.Size(60, 60);
        marker.setIcon(nowIcon);
        // selectedMarker의 current값을 지금 누른 마커로 변경
        selectedMarker.current = marker;
      }
    }
    const icon = marker.getIcon();
    icon.size = new naver.maps.Size(30, 30);
    icon.scaledSize = new naver.maps.Size(30, 30);
    marker.setIcon(icon);
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: drawerBleeding + 100,
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
          총 {filteredRest.length}개의 쉼터가 있습니다.
        </span>
      </div>
      <StyledMap id="map" ref={mapRef} />
      <div
        style={{
          position: "absolute",
          width: "100%",
          maxWidth: "500px",
          top: 0,
        }}
      >
        <FormControl
          fullWidth
          style={{ position: "absolute", width: "100px", top: 20, right: 20 }}
        >
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeValue}
            label="Type"
            onChange={onTypeChange}
          >
            <MenuItem value={"all"}>전체</MenuItem>
            <MenuItem value={"bench"}>벤치</MenuItem>
            <MenuItem value={"jungja"}>정자</MenuItem>
            <MenuItem value={"starbucks"}>스타벅스</MenuItem>
          </Select>
        </FormControl>
      </div>
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
          aria-label="add"
          style={{
            position: "absolute",
            background: "#285430",
            bottom: drawerBleeding + 20,
            right: 20,
          }}
          onClick={() => navigate("/add")}
        >
          <AddIcon />
        </Fab>
      </div>

      <Drawer
        drawerBleeding={drawerBleeding}
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            padding: "16px",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              padding: "16px",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              장소 이름
            </span>
            <span
              style={{
                marginBottom: "32px",
              }}
            >
              {currentPlace?.name}
            </span>
            <span
              style={{
                fontSize: "20px",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              설명
            </span>
            <span>{currentPlace?.description}</span>
          </div>
        </div>
      </Drawer>
      {/* {isClicked ? <SpotInfo spotData={otherLatLngs} /> : null} */}
    </>
  );
};

const StyledMap = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`;
