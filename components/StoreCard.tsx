import * as React from 'react';

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
        <div style={{ border: '1px solid', width: '350px', height: '350px', margin: '10px' }}>
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

export default StoreCard;