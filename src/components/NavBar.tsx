import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.png';
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();
  //location에 관련된 데이터를 알 수 있음.
  return (
    <div className="nav-wrapper">
      <nav>
        <Link href="/" passHref>
          <Image className="logo" src={logo} alt="Picture of the author" />
        </Link>
        <div className="link-wrapper">
          <Link href="/map">
            <a className={router.pathname === '/map' ? 'active' : ''}>MAP </a>
          </Link>
          <Link href="/history">
            <a className={router.pathname === '/history' ? 'active' : ''}>HISTORY </a>
          </Link>
          <Link href="/game">
            <a className={router.pathname === '/game' ? 'active' : ''}>GAME </a>
          </Link>
          <Link href="/notice">
            <a className={router.pathname === '/notice' ? 'active' : ''}>NOTICE </a>
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
            padding: 0 200px;
            max-width: 1200xp;
          }
          a {
            font-weight: bold;
            font-size: 20px;
          }
          .active {
            color: #f6681c;
          }
          .link-wrapper {
            display: flex;
            gap: 40px;
          }
          .logo {
            width: 250px;
            height: 150px;
            top: 25px;
          }
        `}
      </style>
    </div>
  );
}
