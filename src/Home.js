import { useEffect, useState } from 'react';
import './Home.css';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import Search from './Search';
import pic1 from './pictures/1.jpg';
import pic2 from './pictures/2.jpg';
import pic3 from './pictures/3.jpg';
import pic4 from './pictures/4.jpg';
import Details from './Details';

const Home = () => {
    const [query, setQuery] = useState("");
    const { path } = useRouteMatch();


    return (
        <div className="home">
            <div className="search-container">
                <input type='text' placeholder='Type in...' className='search-input' onChange={(e) => setQuery(e.target.value)}/>
                {/* <Link to={`${path}search`} className='search-link'>Search!</Link> */}
                <Link to={`/search?query=${query}`} className='search-link'>Search!</Link>
            </div>


            <div className="picture-grid">
                <div className="row">
                    <Link to={`/details/1`}><img src={pic1} alt="Picture 1" /></Link>
                    <Link to={`/details/2`}><img src={pic2} alt="Picture 2" /></Link>
                </div>
                <div className="row">
                    <Link to={`/details/3`}><img src={pic3} alt="Picture 3" /></Link>
                    <Link to={`/details/4`}><img src={pic4} alt="Picture 4" /></Link>
                </div>
            </div>
            
            <Switch>
                <Route path={`${path}search`}>
                    <Search />
                </Route>
                <Route path={`${path}details`}>
                    <Details />
                </Route>
            </Switch>
        </div>
    );
}

export default Home;
