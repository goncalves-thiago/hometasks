//Styles
import './ChangeAvatar.css';

// Hooks
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import { useAuthValue } from '../../Context/AuthContext';
import { useUploadAvatar } from '../../hooks/useUploadAvatar';
import { useRemoveAvatar } from '../../hooks/useRemoveAvatar';

//Util
import { API_URL, nameInitials } from '../../Util/Util';
import getCroppedImg from '../../Util/CropImage';

const ChangeAvatar = () => {

  const [error, setError] = useState("");
  const [information, setInformation] = useState("");
  const [disableSaveButton, setDisableSaveButton] = useState(true);
  const {userData, refreshUser} = useAuthValue();
  const {uploadAvatar, error: uploadAvatarError, load: uploadAvatarLoad} = useUploadAvatar();
  const {removeAvatar} = useRemoveAvatar();
  const navigate = useNavigate();

  //React-easy-crop variables
  const [crop, setCrop] = useState({x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
 
  useEffect(() => {
    if(userData.avatarUrl)
      setAvatarUrl(`${API_URL}/${userData.avatarUrl}`);
  },[userData]);

  const onCropChange = (crop) => {
    setCrop(crop);
    setDisableSaveButton(false);
  }

  const onCropComplete = (croopedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setInformation("");

    const croppedImage = await getCroppedImg(
      avatar,
      croppedAreaPixels,
      rotation
    );
  
    const data = await fetch(croppedImage);
    const blob = await data.blob();
    const fileType = blob.type;
    const file = new File([blob], 'file.png', { type: fileType });
    
    // Uploads the image
    const newAvatar = new FormData();
    newAvatar.append('file', file);
    await uploadAvatar(userData.id, newAvatar);
    
    if(!uploadAvatarLoad) {
      setAvatar("");
      refreshUser();
    }
  }

  const handleUpload = (e) => {
    e.preventDefault();
    setError("");
    setInformation("");

    // Show image on the screen
    setAvatar(URL.createObjectURL(e.target.files[0]));
        
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    setError("");
    setInformation("");

    await removeAvatar(userData.id);
    refreshUser();
  }

  return (
    <div className="container" id="family">
        <div className="row d-flex justify-content-center">
            <div className="col-xl-8">
                <form onChange={()=>setDisableSaveButton(false)}>
                    <div className="card">
                        <div className="card-body">
                            
                            { (!avatarUrl && avatar) &&
                              <div className="row mb-3">
                                <div className="col">
                               
                                    <div className="crop-container">
                                        <Cropper
                                            image={avatar}
                                            crop={crop}
                                            zoom={zoom}
                                            aspect={1}
                                            cropShape="round"
                                            showGrid={false}
                                            onCropChange={onCropChange}
                                            onCropComplete={onCropComplete}
                                            onZoomChange={onZoomChange}
                                        />
                                    </div>
                                
                                </div>
                             </div>
                            }
                            

                            { (!avatarUrl && !avatar) &&
                              <div className="d-flex justify-content-center mb-4">
                                  <div className="crop-avatar rounded-circle d-flex align-items-center justify-content-center">
                                      <p className="m-0">{nameInitials(userData.name)}</p>
                                  </div>
                              </div>
                            }
                            
                            { (avatarUrl && !avatar) &&
                            <div className="d-flex justify-content-center mb-4">
                                <img src={avatarUrl} className="img-fluid crop-avatar rounded-circle" 
                                  alt="avatar" />
                            </div>
                            }
                            

                            <div className="row row-cols-auto justify-content-center">
                        
                                {/* ---Back button--- */}
                                <div className="col mt-2">
                                    <button className="btn btn-family" onClick={()=>navigate("/")}>Voltar</button>
                                </div>

                                {/* ---Upload button--- */}
                                {!avatarUrl &&
                                <div className="col mt-2">
                                    <input type="file" id="avatarUpload" onChange={(e)=>handleUpload(e)} />
                                    <label htmlFor="avatarUpload">   
                                        <div className="btn btn-family">Upload</div>
                                    </label>
                                </div>
                                }

                                {/* ---Save button--- */}
                                {avatar &&
                                <div className="col mt-2">
                                    <button className="btn btn-success" onClick={(e)=>handleSave(e)}
                                        disabled={disableSaveButton}>Salvar</button>
                                </div>
                                }

                                {/* ---Delete button--- */}
                                {avatarUrl &&
                                <div className="col mt-2">
                                    <button className="btn btn-danger" onClick={(e)=>handleDelete(e)}
                                        disabled={(!userData.avatarUrl) ? true : false}>Deletar</button>
                                </div>
                                }                               
                        
                            </div>
                        </div>

                        {/* ---Error message--- */}
                        {error && <div className="alert alert-danger mt-2 mx-3 p-2 text-center" role="alert">{error}</div>}
                        {uploadAvatarError && <div className="alert alert-danger mt-2 mx-3 p-2 text-center" role="alert">{uploadAvatarError}</div>}

                        {/* ---Information message--- */}
                        {(!error && !uploadAvatarError && information) ? 
                        <div className="alert alert-success mt-2 mx-3 p-2 text-center" role="alert">{information}</div> : null}

                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default ChangeAvatar;