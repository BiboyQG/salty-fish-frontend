import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import './Search.css';
import pic1 from './pictures/1.jpg';
import pic2 from './pictures/2.jpg';
import pic3 from './pictures/3.jpg';
import pic4 from './pictures/4.jpg';

// Dummy data array, replace with your actual data fetching logic
const items = [
	{ id: 1, img: pic1, title: 'Item 1' },
	{ id: 2, img: pic2, title: 'Item 2' },
	{ id: 3, img: pic3, title: 'Item 3' },
	{ id: 4, img: pic4, title: 'Item 4' },
];

// Placeholder for your search function
// This function should interact with your backend or search algorithm
const fetchSearchResults = async (query) => {
	// Implement your search logic here and return the results
	// For demonstration, we'll return an empty array
	const results = items.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
	return results;
};

const Search = () => {
	const history = useHistory();
	const location = useLocation();
	// Extract the search query from the URL
	const searchQueryFromURL = new URLSearchParams(location.search).get('query') || '';

	// State to store the search results
	const [searchResults, setSearchResults] = useState([]);
	// State to keep track of the user's search input
	const [searchQuery, setSearchQuery] = useState(searchQueryFromURL);

	// Fetch search results when the query in the URL changes
	useEffect(() => {
		if (searchQueryFromURL) {
			const performSearch = async () => {
				const results = await fetchSearchResults(searchQueryFromURL);
				setSearchResults(results);
			};
			performSearch();
		}
	}, [searchQueryFromURL]);

	// Update the search query state when the user types in the search bar
	const handleSearchInputChange = (e) => {
		setSearchQuery(e.target.value);
	};

	// Handle the 'Enter' key press to perform the search
	const handleSearchKeyPress = (e) => {
		if (e.key === 'Enter') {
			// Update the URL with the new search term
			history.push(`/search?query=${searchQuery}`);
		}
	};

	return (
		<div className="search-page">
			<div className="search-container">
				<input
					type="text"
					placeholder="Type in..."
					className="search-input"
					value={searchQuery}
					onChange={handleSearchInputChange}
					onKeyPress={handleSearchKeyPress}
				/>
				{/* Using a button instead of Link for the search to trigger the search function */}
				<button onClick={() => history.push(`/search?query=${searchQuery}`)} className="search-link">Search!</button>
			</div>
			<div className="picture-grid">
				{searchResults.map((item, index) => (
					// <div className="row" key={index}>
					// 	<Link to={`/details/${item.id}`}>
					// 		<img src={item.img} alt={item.title} />
					// 	</Link>
					// </div>
					<Link to={`/details/${item.id}`}>
						<img src={item.img} alt={item.title} />
					</Link>
				))}
			</div>
		</div>
	);
};

export default Search;