import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export const Main = () => {
  const { naver } = window;
  const mapRef = useRef<HTMLElement | null | any>(null);
  const selectedMarker = useRef<any | null>(null);
  // 사용자 위치 변수 : 위도,경도 객체
  const [myLocation, setMyLocation] = useState<
    { latitude: Number; longitude: Number } | string
  >("");

  // 임의로 받아온 값(예시)
  const otherLatLngs = [
    // 계대 행소 박물관
    { lat: 35.857, lng: 128.4899, type: "bench" },
    // 계대 근처 점터공원
    { lat: 35.8548, lng: 128.4939, type: "bench" },
    // 계대 근처 돌산공원
    { lat: 35.8573, lng: 128.4935, type: "bench" },
    // 계명문화대
    { lat: 35.8597, lng: 128.4909, type: "bench" },
    // 와룡아래공원
    { lat: 35.8566, lng: 128.5006, type: "bench" },
    // 와룡(위)공원
    { lat: 35.8584, lng: 128.5006, type: "bench" },
    // 마포 어린이 공원
    { lat: 37.5354, lng: 126.9437, type: "bench" },
    // 복사꽃 어린이 공원
    { lat: 37.539, lng: 126.9465, type: "bench" },
    // 양재 시민의 숲
    { lat: 37.4707, lng: 127.0356, type: "bench" },
    // 두둑재 어린이 공원
    { lat: 37.468, lng: 127.044, type: "bench" },
    // 양재 근린 공원
    { lat: 37.4716, lng: 127.0428, type: "bench" },
    // 스타벅스 포이점
    { lat: 37.4778, lng: 127.0451, type: "starbucks" },
    // 스타벅스 하이브랜드점
    { lat: 37.4626, lng: 127.0367, type: "starbucks" },
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
          // 확대/축소 가능 여부
          zoomControl: true,
          // 초기 줌 설정
          zoom: 17,
        });

        // 주변 마커
        // eslint-disable-next-line array-callback-return
        otherLatLngs.map((object) => {
          var marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(object.lat, object.lng),
            map: mapRef.current,
            icon: {
              url: filterMarkerImg(object.type),
              size: new naver.maps.Size(15, 15),
              scaledSize: new naver.maps.Size(15, 15),
            },
          });
          // 마커가 클릭되었을때
          markerClickEvent(marker);
        });
      }
    },
    // 사용자 위치가 바뀔때마다 재실행되는 함수
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mapRef, myLocation]
  );

  // 마커들의 클릭 이벤트를 설정하는 함수
  function markerClickEvent(marker: any) {
    // 스팟 마커가 클릭되었을때의 이벤트
    naver.maps.Event.addListener(marker, "click", function (e: any) {
      const mapLatLng = new naver.maps.LatLng(
        Number(marker.position._lat),
        Number(marker.position._lng)
      );
      // 선택한 마커로 부드럽게 이동
      mapRef.current.panTo(mapLatLng);
      // 클릭된 마커의 사이즈 변화, 현재 클릭된 마커 업데이트(한 마커만 클릭됨을 표현)
      setClickedMarker(marker);
    });
  }
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
        icon.size = new naver.maps.Size(30, 30);
        icon.scaledSize = new naver.maps.Size(30, 30);
        marker.setIcon(icon);
        // current값을 업데이트
        selectedMarker.current = marker;
      } else if (selectedMarker.current !== marker) {
        // 초기값이 넘어온게 아니라면, 이전값은 사이즈를 되돌리고, 현재 값의 사이즈를 키우는 방식 이용
        // 이전에 존재한 마커는 사이즈를 줄임
        const beforeIcon = selectedMarker.current.getIcon();
        beforeIcon.size = new naver.maps.Size(20, 20);
        beforeIcon.scaledSize = new naver.maps.Size(20, 20);
        selectedMarker.current.setIcon(beforeIcon);
        // 현재 클릭된 마커는 사이즈를 키우고
        const nowIcon = marker.getIcon();
        nowIcon.size = new naver.maps.Size(30, 30);
        nowIcon.scaledSize = new naver.maps.Size(30, 30);
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
      <StyledMap id="map" ref={mapRef} />
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
