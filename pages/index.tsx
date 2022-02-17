import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="home-wrapper">
      <div>
        <h1>this is home</h1>
      </div>
      <div>
        <h1>Quick Filter</h1>
      </div>
      <style jsx>
        {`
          .home-wrapper {
            display: grid;
            grid-template-columns: 5fr 1fr;
            padding-top: 40px;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
