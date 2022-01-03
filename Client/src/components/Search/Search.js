import { createSearchParams, useNavigate } from "react-router-dom";
import './Search.css';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    let navigate = useNavigate();
    const onSubmit = (e) => {
        var from = new Date();
        var dd = from.getDate();
        var mm = from.getMonth() + 1;
        var yyyy = from.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        from = yyyy + '-' + mm + '-' + dd;

        var to = new Date();
        to.setDate(to.getDate() + 30);
        dd = to.getDate();
        mm = to.getMonth() + 1;
        yyyy = to.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        to = yyyy + '-' + mm + '-' + dd;

        if (searchQuery) {
            const params = { place_name: searchQuery, from: from, to: to };
            navigate({
                pathname: '/search',
                search: `?${createSearchParams(params)}`,
            });
        }
        e.preventDefault();
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="bar">
                <input
                    value={searchQuery}
                    onInput={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    id="header-search"
                    placeholder="If you want to go out, I know a place, I, I know a place we can go!"
                    name="s"
                    className="searchbar"
                    title="Search"
                />
                <button className="searchbutton" type="submit">
                    <div>
                        <span>
                            <svg focusable="false" fill="#4285f4" className="searchicon" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                            </svg>
                        </span>
                    </div>
                </button>
            </div>
        </form>
    );
};

export default SearchBar;