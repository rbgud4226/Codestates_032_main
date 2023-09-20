import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

declare global {
  interface Window {
    google: typeof google;
    initMap: () => void; // initMap 함수를 전역으로 선언
  }
}

function Map() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);
  const [locationData, setLocationData] = useState<
    { lat: number; lon: number }[]
  >([]);

  useEffect(() => {
    // Google Maps API 스크립트 동적으로 로드
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCiAdxhRI2pBCZkcF29d_CavZ_DALp47w4&libraries=places,drawing&callback=initMap`;
    script.defer = true;
    script.async = true;
    script.addEventListener("load", initializeMap);
    document.head.appendChild(script);

    // initMap 함수를 전역으로 선언
    window.initMap = initializeMap;

    function initializeMap() {
      const mapElement = document.getElementById("map");
      if (mapElement && window.google) {
        // Geolocation API를 사용하여 현재 위치 얻기
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(position => {
            const currentLat = position.coords.latitude;
            const currentLng = position.coords.longitude;
            console.log("ㅋㅋ", {
              lat: currentLat,
              lon: currentLng,
            });
            // 클라이언트에서 백엔드로 현재 위치 데이터 전송
            axios
              .post(`${process.env.REACT_APP_DB_HOST}/location`, {
                lat: currentLat,
                lon: currentLng,
              })
              .then(response => {
                console.log("초기 위치 데이터를 백엔드로 보냈습니다.");
                console.log(response);
                setLocationData(response.data);
              })
              .catch(error => {
                console.error(
                  "초기 위치 데이터를 백엔드로 보내는데 실패했습니다.",
                  error,
                );
              });

            const initialMap = new window.google.maps.Map(mapElement, {
              center: { lat: currentLat, lng: currentLng },
              zoom: 15,
            });
            setMap(initialMap);

            const customMarkerImage = {
              url: "https://i.imgur.com/d12kDES.png",
              size: new google.maps.Size(70, 70),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(25, 50),
            };

            // 초기 마커 생성 및 할당
            const initialMarker = new window.google.maps.Marker({
              map: initialMap,
              position: { lat: currentLat, lng: currentLng },
              title: "현재 위치",
              icon: customMarkerImage,
            });
            marker.current = initialMarker;

            // 클릭 이벤트 핸들러 등록
            initialMap.addListener("click", handleMapClick);
          });
        }
      }
    }

    function handleMapClick(e: google.maps.MapMouseEvent) {
      const clickedLatLng = e.latLng;
      console.log("클릭한 위치 좌표:", {
        lat: clickedLatLng.lat(),
        lon: clickedLatLng.lng(),
      });

      // 클릭한 위치로 마커 이동
      if (marker.current) {
        const newPosition = new google.maps.LatLng(
          clickedLatLng.lat(),
          clickedLatLng.lng(),
        );
        marker.current.setPosition(newPosition);
      }

      axios
        .post(`${process.env.REACT_APP_DB_HOST}/location`, {
          lat: clickedLatLng.lat(),
          lon: clickedLatLng.lng(),
        })
        .then(response => {
          console.log("클릭한 위치를 백엔드로 보냈습니다.");
          setLocationData(response.data);
        })
        .catch(error => {
          console.error("클릭한 위치를 백엔드로 보내는데 실패했습니다.", error);
        });
    }
  }, []);
  console.log(locationData);

  return (
    <div>
      <MapContainer id="map" />
    </div>
  );
}

export default Map;

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: pink;
`;
