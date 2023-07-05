import { useCallback, useEffect, useRef, useState } from "react";
import * as S from "../styles/index";

declare global {
  interface Window {
    initMap: () => void;
  }
}

const Weather = () => {
  const mapElement = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const loadScript = useCallback((url: string) => {
    const firtstScript = window.document.getElementsByTagName("script")[0];
    const newScript = window.document.createElement("script");
    newScript.src = `${url}&language=ko`;
    newScript.async = true;
    newScript.defer = true;
    firtstScript?.parentNode?.insertBefore(newScript, firtstScript);
  }, []);

  const initMap = useCallback(() => {
    const { google } = window;
    if (!mapElement.current || !google) return;

    const incheonWeather = { lat: 37.4562557, lng: 126.7052062 };
    const seoulWeather = { lat: 37.566535, lng: 126.9779692 };
    const daejeonWeather = { lat: 36.3504119, lng: 127.3845475 };
    const ulsanWeather = { lat: 35.5383773, lng: 129.3113596 };
    const busanWeather = { lat: 35.1795543, lng: 129.0756416 };
    const gwangjuWeather = { lat: 35.1595454, lng: 126.8526012 };
    const jejuWeather = { lat: 33.4890113, lng: 126.4983023 };

    const map = new google.maps.Map(mapElement.current, {
      zoom: 6.7,
      center: seoulWeather,
      disableDefaultUI: true,
    });

    const sunnyIcon = {
      url: "https://cdn-icons-png.flaticon.com/512/136/136723.png",
      scaledSize: new google.maps.Size(50, 50),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(25, 50),
    };

    const rainyIcon = {
      url: "https://forums.synfig.org/uploads/default/original/2X/3/31d749625faa93271be23874d416f9be755b7cb9.gif",
      scaledSize: new google.maps.Size(50, 50),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(25, 50),
    };

    const incheonMarker = new google.maps.Marker({
      position: incheonWeather,
      map,
      icon: rainyIcon,
    });

    const seoulMarker = new google.maps.Marker({
      position: seoulWeather,
      map,
      icon: rainyIcon,
    });

    const daejeonMarker = new google.maps.Marker({
      position: daejeonWeather,
      map,
      icon: rainyIcon,
    });

    const gwangjuMarker = new google.maps.Marker({
      position: gwangjuWeather,
      map,
      icon: rainyIcon,
    });

    const busanMarker = new google.maps.Marker({
      position: busanWeather,
      map,
      icon: sunnyIcon,
    });

    const ulsanMarker = new google.maps.Marker({
      position: ulsanWeather,
      map,
      icon: sunnyIcon,
    });

    const jejuMarker = new google.maps.Marker({
      position: jejuWeather,
      map,
      icon: rainyIcon,
    });
  }, []);

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
    </div>
  )
};

export default Weather;
