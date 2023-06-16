import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalType";
import { toast, ToastContainer } from "react-toastify";
import { createPost } from "../../redux/actions/postAction";
const Status = () => {
      const auth = useSelector((state) => state.auth);
      const dispatch = useDispatch();
      const [content, setContent] = useState('');
      const [images, setImages] = useState([])

      const handleChangeImages = (e) => {
            const files = [...e.target.files]
            let newImages = []

            files.forEach(file => {
                  if (!file) return toast.error("File does not exist.");

                  if (file.size > 1024 * 1024 * 5) {
                        return toast.error("The image/video largest is 5mb.");
                  }

                  return newImages.push(file);
            })
            setImages(newImages);
      }

      const deleteImages = (index) => {
            const newArr = [...images]
            newArr.splice(index, 1)
            setImages(newArr)
      }

      const handleSubmit = (e) => {
            e.preventDefault();
            if (images.length === 0)       return toast.error("Please add your photo.");
            dispatch(createPost({content, images, auth}));
      }

      return (
            <div className="status_modal">
                  <form onSubmit={handleSubmit}>
                        <div className="status_header">
                              <h5 className="m-0">Create Post</h5>
                              <span onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: false })}>&times;</span>
                        </div>

                        <div className="status_body">
                              <textarea name="content" value={content}
                                    placeholder={`${auth.user.username}, what are you thinking?`}
                                    onChange={(e) => setContent(e.target.value)} />

                              <div className="show_images">
                                    {
                                          images.map((img, index) => (
                                                <div key={index} id="file_img">
                                                      <img src={URL.createObjectURL(img)} alt="images" />
                                                      <span onClick={() => deleteImages(index)}>&times;</span>
                                                </div>
                                          ))

                                    }

                              </div>
                              <div className="input_images">
                                    <div className="file_upload">
                                          <i className="fas fa-image" />
                                          <input type="file" name="file" id="file" multiple accept="image/*" onChange={handleChangeImages} />
                                    </div>

                              </div>
                        </div>

                        <div className="status_footer my-2">
                              <button className="btn btn-primary w-100" type="submit">Post</button>
                        </div>
                  </form>
                  <ToastContainer />
            </div>
      )
}

export default Status;
