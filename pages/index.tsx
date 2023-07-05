import { useCallback, useEffect, useRef, useState } from "react";
import * as S from "../styles/index";
import fire from "../public/fire.svg";
import Image from "next/image";

declare global {
  interface Window {
    initMap: () => void;
  }
}

function App() {
  const mapElement = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const loadScript = useCallback((url: string) => {
    const firstScript = window.document.getElementsByTagName("script")[0];
    const newScript = window.document.createElement("script");
    newScript.src = `${url}&language=ko`;
    newScript.async = true;
    newScript.defer = true;
    firstScript?.parentNode?.insertBefore(newScript, firstScript);
  }, []);

  const initMap = useCallback(() => {
    const { google } = window;
    if (!mapElement.current || !google) return;

    const disasterLocation = { lat: 37.0545, lng: 128.5455 };
    const incheonWeather = { lat: 37.4562557, lng: 126.7052062 };
    const seoulWeather = { lat: 37.566535, lng: 126.9779692 };
    const daejeonWeather = { lat: 36.3504119, lng: 127.3845475 };
    const ulsanWeather = { lat: 35.5383773, lng: 129.3113596 };
    const busanWeather = { lat: 35.1795543, lng: 129.0756416 };
    const gwangjuWeather = { lat: 35.1595454, lng: 126.8526012 };
    const jejuWeather = { lat: 33.4890113, lng: 126.4983023 };

    const map = new google.maps.Map(mapElement.current, {
      zoom: 6.7,
      center: disasterLocation,
      disableDefaultUI: true,
    });

    const fireMarkerIcon = {
      url: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnp6ZW8wYTBicnd1cXh3Nm54cXdjMXNsOGo1bW5jaDI3bzIyZWk4YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/sRW4SCnxfcx1LaFBtt/giphy.gif",
      scaledSize: new google.maps.Size(50, 50),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(25, 50),
    };

    const sunnyIcon = {
      url: "https://cdn-icons-png.flaticon.com/512/136/136723.png",
      scaledSize: new google.maps.Size(50, 50),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(25, 50),
    };

    const marker = new google.maps.Marker({
      position: disasterLocation,
      map,
      icon: fireMarkerIcon,
    });

    marker.addListener("click", handleClick);

    map.addListener("click", () => {
      setIsModalOpen(false);
    });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleClick = () => {
    openModal();
  };

  useEffect(() => {
    const script = window.document.getElementsByTagName("script")[0];
    const includeCheck = script.src.startsWith(
      "https://maps.googleapis.com/maps/api"
    );

    // script 중복 호출 방지
    if (includeCheck) return initMap();

    window.initMap = initMap;
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyApKEuDFjCdQcVr42xMYoyiYIfylkIaiFY&callback=initMap&language=en"
    );
  }, [initMap, loadScript]);


  return (
    <div>
      <S.MapContainer ref={mapElement} />
      {isModalOpen && (
        <S.MarkerModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Marker Modal"
          overlayClassName="modalOverlay"
          className="modalContent"
        >
          <S.MarkerContent>
            <S.TitleList>
              <S.Lists>
                <Image src={fire} alt="산불" />
              </S.Lists>
              <S.Lists>
                <S.Title>태백산맥</S.Title>
              </S.Lists>
            </S.TitleList>
            <S.DescArea>
              <S.Description>
                7월 4일 13시 30분 태백산 산불 발생. <br />
                현재 울진군까지 확산 중
              </S.Description>
            </S.DescArea>
            <S.BtnContainer href="native://transition">
              <S.DonateBtn>후원하기</S.DonateBtn>
            </S.BtnContainer>
          </S.MarkerContent>
        </S.MarkerModal>
      )}
    </div>
  );
}

export default App;
