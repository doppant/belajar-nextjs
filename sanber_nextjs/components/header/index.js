import { withAuth } from "../with-auth"
import styles from "./styles.module.css"
import Link from "next/link";

function Header() {
  return <div className={styles.header}>
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/profil">Profil</Link>
      </li>
      <li>
        <Link href="/users">Users</Link>
      </li>
      <li>
        <Link href="/notes">Notes</Link>
      </li>
      <li>
        <Link href="/post">Post</Link>
      </li>
    </ul>
  </div>
}

export default withAuth(Header);