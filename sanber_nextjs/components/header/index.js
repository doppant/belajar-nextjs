import { withAuth } from "../with-auth"
import styles from "./styles.module.css"

function Header() {
  return <div className={styles.header}>header</div>
}

export default withAuth(Header);