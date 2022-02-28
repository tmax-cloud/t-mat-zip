import * as React from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
//import { callKakao } from './kakao';
import Script from 'next/script'

const kakaoKey = "6528e7f75d2844bbd51073a4861745ad";

const Map: NextPage = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState('');
  const [queryText, setQueryText] = React.useState('');
  const [latitude, setLatitude] = React.useState(37.353644);
  const [longitude, setLongitude] = React.useState(127.105032);
  const getStoreDataByName = async (queryText: string) => {
    const query = encodeURIComponent(queryText);
    if (query && query !== '') {
      //서버 콜로 변경 필요
      //현재는 카카오 api로 보내는 중
      const response = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`, {
        headers: {
          "Authorization": "KakaoAK e1be8cde4e50ac11f4d643a0b0c38bbc"
        }
      });
      setData(response.data.documents);
    }
  }

  const changeSearchText = (e: any) => {
    setSearchText(e.target.value);
  };
  const onKeyPress = (e: any) => {
    if (e.key === 'Enter') setQueryText(searchText);
  };
  const updateQueryText = () => {
    setQueryText(searchText);
  };
  React.useEffect(() => {
    getStoreDataByName(queryText);
  }, [queryText]);

  const moveMap = (e: any) => {
    console.log(e.target.value);
    if (e.target.value == 1) {
      setLatitude(37.353644);
      setLongitude(127.105032);
    }
    if (e.target.value == 2) {
      setLatitude(37.350000);
      setLongitude(127.109000);
    }    
  };

  return (
    <div>
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}`}
        strategy='beforeInteractive'
        onLoad={() => { setLoading(true); console.log(loading); }}
      />
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=services,clusterer,drawing`}
        strategy='beforeInteractive'
        onLoad={() => { setLoading(true); console.log(loading); }}
      />
      <h1>this is Map</h1>
      <input type='text' value={searchText} onChange={changeSearchText} onKeyPress={onKeyPress}></input>
      <button type='button' onClick={updateQueryText}>검색</button>
      <button type='button' value={1} onClick={moveMap}>티맥스 타워 이동</button>
      <button type='button' value={2} onClick={moveMap}>미금역 이동</button>
      <KakaoMap latitude={latitude} longitude={longitude} storeData={data} />

      <div>{data.map((d: any, i: number) => {
        return <StoreCard
          key={`address_name-${i}`}
          categoryGroupName={d.category_groupName}
          categoryName={d.category_name}
          placeName={d.place_name}
          phone={d.phone}
          placeUrl={d.place_url}
          addressName={d.address_name}
          roadAddressName={d.road_address_name}
        />
      })}
      </div>
    </div>
  );
};
const KakaoMap: React.FC<KakaoMapProps> = ({
  latitude = 37.353644,
  longitude = 127.105032,
  storeData = [],
}) => {
  const mapRef = React.useRef(null);
  React.useEffect(() => {

    (window as any).kakao.maps.load(function () {
      // v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.

      const options = {
        center: new (window as any).kakao.maps.LatLng(latitude, longitude),
        level: 3
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
          content: '<div style="width:150px;text-align:center;padding:6px 0;">' + data.road_address_name + '</div>'
        });
        storeInfoWindow.open(map, storeMarker);
        /*
        const geocoder = new (window as any).kakao.maps.services.Geocoder();
        geocoder.addressSearch(data.road_address_name, function (result: any, status: any) {

          // 정상적으로 검색이 완료됐으면 
          if (status === (window as any).kakao.maps.services.Status.OK) {

            var coords = new (window as any).kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new (window as any).kakao.maps.Marker({
              map: map,
              position: coords
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new (window as any).kakao.maps.InfoWindow({
              content: '<div style="width:150px;text-align:center;padding:6px 0;">' + data.road_address_name + '</div>'
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            //map.setCenter(new (window as any).kakao.maps.LatLng(latitude, longitude));
          }
        });
        */
        map.setCenter(new (window as any).kakao.maps.LatLng(latitude, longitude));
      });

    });


  }, [latitude, longitude, storeData]);
  return (
    <div>
      <h1>Kakao Map</h1>
      <div ref={mapRef} style={{ width: '800px', height: '600px' }}></div>
    </div>
  );
}
type KakaoMapProps = {
  latitude: number,
  longitude: number,
  storeData?: any[];
};

const StoreCard: React.FC<StoreCardProps> = ({
  categoryGroupName,
  categoryName,
  placeName,
  phone,
  placeUrl,
  addressName,
  roadAddressName,
}) => {
  return (
    <div style={{ borderBlock: '1px solid' }}>
      <h1>{placeName}</h1>
      <p>{categoryGroupName}{'>'}{categoryName}</p>
      <p>{phone}</p>
      <p>{placeUrl}</p>
      <p>{addressName}</p>
      <p>{roadAddressName}</p>
    </div>
  );
}

type StoreCardProps = {
  categoryGroupName: string,
  categoryName: string;
  placeName: string;
  phone: string;
  placeUrl: string;
  addressName: string;
  roadAddressName: string;
};

export default Map;
