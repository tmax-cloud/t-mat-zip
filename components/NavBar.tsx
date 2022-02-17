import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();
  //location에 관련된 데이터를 알 수 있음.
  return (
    <div className="nav-wrapper">
      <nav>
        <Link href="/">
          <a className={router.pathname === '/' ? 'active' : ''}>HOME </a>
        </Link>
        <div className="link-wrapper">
          <Link href="/map">
            <a className={router.pathname === '/map' ? 'active' : ''}>MAP </a>
          </Link>
          <Link href="/history">
            <a className={router.pathname === '/history' ? 'active' : ''}>HISTORY </a>
          </Link>
        </div>
      </nav>

      <style jsx>
        {`
          .nav-wrapper {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
          nav {
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 500px;

            max-width: 1200xp;
          }
          a {
            text-decoration: none;
            font-weight: bold;
            font-size: 20px;
          }
          .active {
            color: red;
          }
          .link-wrapper {
            display: flex;
            gap: 40px;
          }
        `}
      </style>
    </div>
  );
}
