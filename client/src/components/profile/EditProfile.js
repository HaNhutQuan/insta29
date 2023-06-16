import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { checkImage } from "../../utils/imageUpload";
import { updateProfileUser } from "../../redux/actions/profileAction";
import { ToastContainer } from "react-toastify";

const EditProfile = ({ user, setOnEdit }) => {
      const initState = { username: '', fullname: '' };
      const [userData, setUserData] = useState(initState)
      const { username, fullname } = userData;

      const [avatar, setAvatar] = useState('');

      const auth = useSelector((state) => state.auth);
      const dispatch = useDispatch()

      const changeAvatar = (e) => {
            const file = e.target.files[0];            
            const err = checkImage(file);
            if(err) return;
            setAvatar(file);
       };

      const handleInput = (e) => {
            const { name, value } = e.target
            setUserData({ ...userData, [name]: value })
      }

      const handleSubmit = (e) => {
            e.preventDefault()
            dispatch(updateProfileUser({userData, avatar, auth}))
      }

      useEffect(() => {
            setUserData(auth.user)
      }, [auth.user]);
      return (
            <div className="edit_profile">

                  <form onSubmit={handleSubmit}>
                        <button className="btn btn-danger btn-close float-right" onClick={() => setOnEdit(false)}>
                              Close
                        </button>
                        <div className="info_avatar my-5">
                              <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="avatar" />

                              <span className="fas fa-camera">
                                    <p>Change</p>
                                    <input type="file" name="file" id="file_up" accept="image/*" onChange={changeAvatar} />
                              </span>
                        </div>

                        <div className="form-group">
                              <label htmlFor="username">User Name</label>
                              <div className="position-relative">
                                    <input type="text" className="form-control" id="username"
                                          name="username" value={username} onChange={handleInput} />
                                    <small className="text-dark position-absolute"
                                          style={{ top: '50%', right: '5px', transform: 'translateY(-50%)' }}>
                                          {username.length}/25
                                    </small>
                              </div>
                        </div>

                        <div className="form-group">
                              <label htmlFor="fullname">Full Name</label>
                              <div className="position-relative">
                                    <input type="text" className="form-control" id="fullname"
                                          name="fullname" value={fullname} onChange={handleInput} />
                                    <small className="text-dark position-absolute"
                                          style={{ top: '50%', right: '5px', transform: 'translateY(-50%)' }}>
                                          {fullname.length}/25
                                    </small>
                              </div>
                        </div>
                        <button className="btn btn-dark w-100" type="submit">Save</button>
                  </form>
                  <ToastContainer/>
            </div>
      )
};

export default EditProfile;