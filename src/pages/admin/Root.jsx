import { Outlet, Link } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <nav>
        <div className='nav-logo-div'>
          <Link to={'/'}><a>FARM-TO-TABLE</a></Link>
        </div>
        <div className='nav-menu-div'>
          <Link to={'/myorders'}>My Orders</Link>
        </div>
      </nav>
      <Outlet />
    </>
  )
}