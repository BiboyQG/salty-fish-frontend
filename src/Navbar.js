import { Link } from 'react-router-dom';
import { useContext, Fragment } from 'react';
import { UserContext } from './components/context/user.context'
import { signOutUser } from './components/utils/firebase/firebase.utils';

const Navbar = () => {

  const { currentUser } = useContext(UserContext);

    return (
      <nav className="navbar">
        <h1>UIUC Salty Fish 🐿️</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/upload">Upload</Link>
          {currentUser ? (
            <Fragment>
              <span onClick={signOutUser}>Sign out</span>
              <Link to="/auth">{ currentUser.displayName}</Link>
            </Fragment>
          ) : (
            <Link to="auth">Sign in</Link>
          )}
        </div>
      </nav>
    );
}
 
export default Navbar;
