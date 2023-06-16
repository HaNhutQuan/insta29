import React, {  useState } from "react";
import {  useSelector } from "react-redux";

import fetchData from "../utils/fetchData";
import UserCard from "./UserCard";
const Search = () => {
      const [search, setSearch] = useState('');
      const [users, setUsers] = useState([]);

      const auth = useSelector((state) => state.auth);
     

      const handleClose = () => {
            setSearch('')
            setUsers([])
      }
      const handleSearch = async (e) => {
            e.preventDefault()            
            if (!search) return;
            try {
                  const res = await fetchData.getData(`search?username=${search}`, auth.token);
                  setUsers(res.data.user)
            } catch (error) {
                  console.log(error);
            }
      }

      return (
            <form className="search_form" onSubmit={handleSearch}>
                  <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} name="search" />
                  <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
                        <span className="material-icons">search</span>
                        <span>Enter to Search</span>
                  </div>
                  <div className="close_search" onClick={handleClose}
                        style={{ opacity: users.length === 0 ? 0 : 1 }} >
                        &times;
                  </div>
                  <button type="submit" style={{display: 'none'}}>Search</button>
                  <div className="user">
                        {
                              search && users.map(users => (
                                    <UserCard
                                          key={users._id}
                                          user={users}
                                          border="border"
                                          handleClose={handleClose}
                                    />
                              ))
                        }
                  </div>
            </form>


      );
}
export default Search;