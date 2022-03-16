import * as React from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import { tempData2 } from './tempData';
import KakaoMap from '../components/KakaoMap';
import StoreCard from '../components/StoreCard';

const kakaoKey = "6528e7f75d2844bbd51073a4861745ad";
const kakaoKeyAuth = "KakaoAK e1be8cde4e50ac11f4d643a0b0c38bbc";

const Map: NextPage = () => {
  const [data, setData] = React.useState<any[]>([]);
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
          "Authorization": kakaoKeyAuth
        }
      });
      setData(response.data.documents);
    }
  }
  const getStoreDatafromServer = async () => {

    //테스트 서버 콜    
    const response = await axios.get('http://192.168.8.105:8000/matzips/');
    setData(response.data);
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
    if (e.target.value == 1) {
      setLatitude(37.353644);
      setLongitude(127.105032);
      //setData(tempData1);
      //getStoreDataByName('티맥스 타워');
      getStoreDatafromServer();
    }
    if (e.target.value == 2) {
      setLatitude(37.350000);
      setLongitude(127.109000);
      setData(tempData2);
      //getStoreDataByName('미금역');
    }
  };

  return (
    <div>
      <h1>this is Map</h1>

      <button type='button' value={1} onClick={moveMap}>티맥스 타워</button>
      <button type='button' value={2} onClick={moveMap}>미금역</button>
      <input type='text' value={searchText} onChange={changeSearchText} onKeyPress={onKeyPress}></input>
      <button type='button' onClick={updateQueryText}>카카오 검색</button>
      <KakaoMap latitude={latitude} longitude={longitude} storeData={data} />

      <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
        {data.map((d: any, i: number) => {
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

export default Map;
