import { useCallback, useEffect, useRef } from 'react';

declare global {
    interface Window {
      initMap: () => void;
    }
  }

function App() {
  const mapElement = useRef(null);

  const loadScript = useCallback((url: string) => {
    const firstScript = window.document.getElementsByTagName('script')[0];
    const newScript = window.document.createElement('script');
    newScript.src = url;
    newScript.async = true;
    newScript.defer = true;
    firstScript?.parentNode?.insertBefore(newScript, firstScript);
  }, []);

  const initMap = useCallback(() => {
    const { google } = window;
    if (!mapElement.current || !google) return;


    const location = { lat: 37.5656, lng: 126.9769 };
    const map = new google.maps.Map(mapElement.current, {
      zoom: 17,
      center: location,
    });
    new google.maps.Marker({
      position: location,
      map,
    });
  }, []);


  useEffect(() => {
    const script = window.document.getElementsByTagName('script')[0];
    const includeCheck = script.src.startsWith(
      'https://maps.googleapis.com/maps/api'
    );


    // script 중복 호출 방지
    if (includeCheck) return initMap();


    window.initMap = initMap;
    loadScript(
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDhilbUZ7s4b1saj9DYuxYMnEeRYJBaGsU&callback=initMap&language=en'
    );
  }, [initMap, loadScript]);


  return <div ref={mapElement} style={{ minHeight: '800px' }} />;
}


export default App;