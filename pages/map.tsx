import * as React from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import { useScript } from './hooks';
import { callKakao } from './kakao';
import Script from 'next/script'

const KakaoScript = () => {
  return (
    <Script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=6528e7f75d2844bbd51073a4861745ad&libraries=services,clusterer,drawing" />
  )
}

const Map: NextPage = () => {
  const [data, setData] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [queryText, setQueryText] = React.useState('');
  const [latitude, setLatitude] = React.useState(33);
  const [longitude, setLongitude] = React.useState(125);
  const [radius, setRadius] = React.useState(20000);
  const [coordinate, setCoordinate] = React.useState({ latitude: 33, longitude: 125, radius: 20000 });
  const [kakao, setKakao] = React.useState(null);

  //const mapStatus = useScript("//dapi.kakao.com/v2/maps/sdk.js?appkey=6528e7f75d2844bbd51073a4861745ad"); 
  //const libraryStatus = useScript("//dapi.kakao.com/v2/maps/sdk.js?appkey=6528e7f75d2844bbd51073a4861745ad&libraries=services,clusterer,drawing");

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
  const getStoreDataByCoordinate = async (latitude: number, longitude: number, radius: number) => {
    //const check = (latitude, longitude) => {return true}; //위경도 체크?
    const check = true;
    if (check) {
      console.log('latitude: ' + latitude + ', longitude: ' + longitude + ', radius :' + radius);
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

  const changeLatitude = (e: any) => {
    setLatitude(e.target.value);
  };
  const changeLongitude = (e: any) => {
    setLongitude(e.target.value);
  };
  const changeRadius = (e: any) => {
    setRadius(e.target.value);
  };
  const updataCoordinate = () => {
    setCoordinate({ latitude: latitude, longitude: longitude, radius: radius });
  };
  React.useEffect(() => {
    getStoreDataByCoordinate(coordinate.latitude, coordinate.longitude, coordinate.radius);
  }, [coordinate]);
  /*
  React.useEffect(() => {
    const temp = callKakao();
    console.log(temp);
    setKakao(temp);
    
    //setKakao(window.kakao ? window.kakao : null);
    //const kakao = callKakao();
    //const kakao = window.kakao;
  });
  */
  //<KakaoScript />
  //<KakaoMap kakao={kakao} />
  return (
    <div>
      <h1>this is Map</h1>
      <input type='text' value={searchText} onChange={changeSearchText} onKeyPress={onKeyPress}></input>
      <button type='button' onClick={updateQueryText}>검색</button>
      <input type='number' value={latitude} onChange={changeLatitude} ></input>
      <input type='number' value={longitude} onChange={changeLongitude} ></input>
      <input type='number' value={radius} onChange={changeRadius} ></input>
      <button type='button' onClick={updataCoordinate}>검색</button>

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

const KakaoMap = (kakao: any) => {
  const [mapOpen, setMapOpen] = React.useState(false);
  const lat = 33;
  const lon = 125;
  const mapRef = React.useRef(null);
  React.useEffect(() => {
    if (mapOpen) {
      //const kakao = callKakao();
      //const kakao = window.kakao;
      const options = {
        center: new kakao.maps.LatLng(lat, lon),
        level: 3
      };
      const map = new kakao.maps.Map(mapRef.current, options);
      console.log('After make map');
    }
  }, [mapOpen]);
  return (
    <div>
      <h1>Kakao Map</h1>
      <button onClick={() => setMapOpen(!mapOpen)}>{mapOpen ? 'close' : 'open'}</button>
      <div ref={mapRef}></div>
    </div>
  );
}


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
