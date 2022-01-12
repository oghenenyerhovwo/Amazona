// importing node modules
import axios from "axios";

  // "proxy": "https://my-amazona-backend.herokuapp.com",
// importing constants
import {
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,

} from "../constants/uploadConstants"

export const uploadImage = (imageFile) => (dispatch ) => {
    const bodyFormData = new FormData()
    bodyFormData.append("image", imageFile)

    dispatch({
        type: UPLOAD_IMAGE_REQUEST,
        payload:imageFile,
    })
    axios
        .post(
            "/api/uploads",
            bodyFormData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        .then(res =>{
            dispatch({
            type: UPLOAD_IMAGE_SUCCESS,
            payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: UPLOAD_IMAGE_FAIL,
                payload: err.response && err.response.data.message ?
                        err.response.data.message : err.message,
                })
        })
};