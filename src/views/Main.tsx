import { useEffect, useRef, useState } from "react";
// import { SpotInfo } from "../components/SpotInfo";
// import styled from "styled-components";

export const Main = () => {
  const { naver } = window;
  const mapRef = useRef<HTMLElement | null | any>(null);
  // const markerRef = useRef<any | null>(null);

  // 사용자 위치 변수 : 위도,경도 객체
  const [myLocation, setMyLocation] = useState<
    { latitude: Number; longitude: Number } | string
  >("");

  // 임의로 받아온 값(예시)
  const otherLatLngs = [
    // 계대 행소 박물관
    { lng: 35.857, lat: 128.4899 },
    // 계대 근처 점터공원
    { lat: 35.8548, lng: 128.4939 },
    // 계대 근처 돌산공원
    { lat: 35.8573, lng: 128.4935 },
    // 계명문화대
    { lat: 35.8597, lng: 128.4909 },
    // 와룡아래공원
    { lat: 35.8566, lng: 128.5006 },
    // 와룡(위)공원
    { lat: 35.8584, lng: 128.5006 },
  ];

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
          // 확대/축소 가능 여부
          zoomControl: true,
          // 초기 줌 설정
          zoom: 16,
        });

        // 주변 마커
        otherLatLngs.map((object) => {
          // 주변 마커 찍기(위도, 경도값)
          var marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(object.lat, object.lng),
            map: mapRef.current,
          });
          markerClickEvent(marker);
        });
      }
    },
    // 사용자 위치가 바뀔때마다 재실행되는 함수
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mapRef, myLocation]
  );

  function markerClickEvent(marker: any) {
    // 스팟 마커가 클릭되었을때의 이벤트
    naver.maps.Event.addListener(marker, "click", function (e: any) {
      const mapLatLng = new naver.maps.LatLng(
        Number(marker.position._lat),
        Number(marker.position._lng)
      );
      // 선택한 마커로 부드럽게 이동
      mapRef.current.panTo(mapLatLng);
    });
  }

  return (
    <>
      <div
        id="map"
        style={{ width: "100%", minHeight: "100vh" }}
        ref={mapRef}
      />
    </>
  );
};
