import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.png';
import { useRouter } from 'next/router';
import navbar from '../styles/NavBar.module.css';
export default function NavBar() {
  const router = useRouter();
  //location에 관련된 데이터를 알 수 있음.
  return (
    <div>
      <nav className={navbar.nav}>
        <div className={navbar.linkWrapper}>
          <div className={navbar.ImgLink}>
            <Link href="/" passHref>
              <Image src={logo} alt="Picture of the author" />
            </Link>
          </div>
          <div className={navbar.linkList}>
            <Link href="/map">
              <a className={router.pathname === '/map' ? navbar.active : ''}>MAP </a>
            </Link>
            <Link href="/history">
              <a className={router.pathname === '/history' ? navbar.active : ''}>HISTORY </a>
            </Link>
            <Link href="/game">
              <a className={router.pathname === '/game' ? navbar.active : ''}>GAME </a>
            </Link>
            <Link href="/notice">
              <a className={router.pathname === '/notice' ? navbar.active : ''}>NOTICE </a>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
