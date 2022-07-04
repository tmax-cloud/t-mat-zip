import * as React from 'react';

const KakaoMap: React.FC<KakaoMapProps> = ({
    latitude = 37.353644,
    longitude = 127.105032,
    storeData = [],
}) => {
    const mapRef = React.useRef(null);
    React.useEffect(() => {
        (window as any).kakao.maps.load(function () {
            const options = {
                center: new (window as any).kakao.maps.LatLng(latitude, longitude),
                level: 2
            };
            const map = new (window as any).kakao.maps.Map(mapRef.current, options);

            map.relayout();
            storeData.map((data) => {
                let storeCoord = new (window as any).kakao.maps.LatLng(data.y, data.x);
                let storeMarker = new (window as any).kakao.maps.Marker({
                    map: map,
                    position: storeCoord
                });
                let storeInfoWindow = new (window as any).kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">' + data.place_name + '</div>'
                });
                storeInfoWindow.open(map, storeMarker);
            });
            map.setCenter(new (window as any).kakao.maps.LatLng(latitude, longitude));
            console.log('latitude: ' + latitude + ' longitude: ' + longitude);
        });
    }, [latitude, longitude, storeData]);
    return (
        <div>
            <div ref={mapRef} style={{ width: '800px', height: '600px', margin: '10px' }}></div>
        </div>
    );
}
type KakaoMapProps = {
    latitude: number,
    longitude: number,
    storeData?: any[];
};

export default KakaoMap;