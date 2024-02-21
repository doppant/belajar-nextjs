import { withAuth } from "../with-auth"
function Header() {
  return <div>header</div>
}

export default withAuth(Header);