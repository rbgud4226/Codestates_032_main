let map;
let marker;

function initMap() {
    // 초기 지도 설정
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 15
    });

    // 마커 생성
    marker = new google.maps.Marker({
        map: map,
        position: { lat: 0, lng: 0 },
        title: '현재 위치'
    });

    // 위치 업데이트 함수
    function updateLocation(latitude, longitude) {
        const latLng = new google.maps.LatLng(latitude, longitude);
        marker.setPosition(latLng);
        map.setCenter(latLng);
    }

    // 데이터를 백엔드로 보내는 함수
    function sendDataToBackend(latitude, longitude) {
        const data = { latitude, longitude };
        //ngrok 연결시 주소 변경
        const ngrokUrl = "https://f7e7-121-162-236-116.ngrok-free.app"

        fetch( ngrokUrl + "/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
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

//    // 사용자 위치 자동으로 가져오기
//    if ('geolocation' in navigator) {
//        navigator.geolocation.watchPosition(function (position) {
//            const latitude = position.coords.latitude;
//            const longitude = position.coords.longitude;
//            updateLocation(latitude, longitude);
//
//            // 데이터를 백엔드로 주기적으로 보내기 (10초마다)
//            setInterval(function() {
//                sendDataToBackend(latitude, longitude);
//            }, 30000);
//        }, function (error) {
//            console.error('사용자 위치를 가져오는데 실패했습니다.', error);
//        });
//    } else {
//        console.log('Geolocation을 지원하지 않는 브라우저입니다.');
//    }

//     버튼 클릭 시 위치 가져오기
    const getLocationButton = document.getElementById('getLocationButton');
    getLocationButton.addEventListener('click', function () {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                updateLocation(latitude, longitude);
                sendDataToBackend(latitude, longitude);
            }, function (error) {
                console.error('사용자 위치를 가져오는데 실패했습니다.', error);
            });
        } else {
            console.log('geolocation을 지원하지 않는 브라우저 입니다.');
        }
    });
}
