import React, { useEffect, useState } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    google: typeof google;
  }
}

const Map = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  useEffect(() => {
    // Google Maps API 스크립트 동적으로 로드
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAOzvTvvSWTOjRa62uoYmY1t9YM2kV9w_8&libraries=places`;
    script.defer = true;
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    // 위치 업데이트 함수
    function updateLocation(latitude: number, longitude: number) {
      if (map && marker) {
        const latLng = new google.maps.LatLng(latitude, longitude);
        marker.setPosition(latLng);
        map.setCenter(latLng);

        // 데이터를 백엔드로 보내는 함수 호출
        sendDataToBackend(latitude, longitude);
      }
    }

    // 데이터를 백엔드로 보내는 함수
    function sendDataToBackend(latitude: number, longitude: number) {
      const data = { latitude, longitude };
      // ngrok 연결시 주소 변경
      const ngrokUrl = "https://0582-121-162-236-116.ngrok-free.app/";

      fetch(ngrokUrl + "api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          console.log("서버응답:", data);
          // 여기에서 필요한 응답 처리 로직을 추가하세요.
        })
        .catch(error => {
          console.error("오류:", error);
          // 여기에서 오류 처리 로직을 추가하세요.
        });
    }

    // 지도 초기화 함수
    function initializeMap() {
      const mapElement = document.getElementById("map");
      if (mapElement && window.google) {
        // Geolocation API를 사용하여 현재 위치 얻기
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(position => {
            const currentLat = position.coords.latitude;
            const currentLng = position.coords.longitude;

            // 현재 위치로 초기 지도 설정
            const initialLatLng = { lat: currentLat, lng: currentLng };
            const initialMap = new window.google.maps.Map(mapElement, {
              center: initialLatLng,
              zoom: 15,
            });
            setMap(initialMap);

            // 커스텀 마커 이미지 설정
            const customMarkerImage = {
              url: "https://i.imgur.com/d12kDES.png",
              size: new google.maps.Size(70, 70),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(25, 50),
            };

            // 마커 생성
            const initialMarker = new window.google.maps.Marker({
              map: initialMap,
              position: initialLatLng,
              title: "현재 위치",
              icon: customMarkerImage,
            });
            setMarker(initialMarker);

            // 사용자의 현재 위치로 업데이트
            updateLocation(currentLat, currentLng);
          });
        }
      }
    }
  }, []);

  return (
    <div>
      <MapContainer id="map" />
    </div>
  );
};

export default Map;

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: pink;
`;
