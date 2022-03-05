import React from "react";
import {Link} from 'react-router-dom';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { userDetails, userSettings } from "../api/user";
import { useEffect,useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions/user_actions";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Button } from "@mui/material";
import { setProducts } from "../redux/actions/product_actions";
import * as api from "../api";
import ProductItem from "../components/product/user_product_item";
import { Tabs } from 'antd';
import { Input } from 'antd';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
const key = 'updatable';
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  
const Settings = () => {
    const [loading,setLoading] = useState(false);
    const [imageUrl,setImageurl] = useState();
    const [name,setName] = useState();
    const [userid,setUserid] = useState();
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
    if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, i =>{
            setLoading(false);
            setImageurl(i);
        }
        );
      }
    }
    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );
    if (!localStorage.getItem('token')) {
        window.location.href = '/';
    }
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const {products} = useSelector((state) => state.product);
    const limit = 20;
    const [offset, setOffset] = useState(0);
    const fetchUserDetails = async () => { 
        const user = await userDetails(); 
        if(user != null){
            dispatch(setUser(user));
            setUserid(user.id);
        }
    };
    const UserProducts = async () =>{
        let _products = await api.fetchUserProducts({'sub': true});
        if(_products!=null){
            dispatch(setProducts(_products));
            setOffset(offset + limit);
        }
    };
    const saveSettings = async ()=>{
        if (name != null || name.length > 4){
        const params = {
            'name': name,
            'avatar':imageUrl
        }
        console.log(userid);
        message.loading({ content: 'Загрузка...', key });
        const result = await userSettings(params,userid, function (data) {
            setTimeout(() => {
                message.success({ content: 'Успешно!', key, duration: 2 });
            }, 1000);
            window.location.href = '/profile';
        }, function (data) {
            console.log("Error");
        });
    }else{
        message.error('Имя не может быть короче 4 символов', 10);
    }
    }
    useEffect(() => {
        fetchUserDetails();
        UserProducts();
    }, []);
    return(
        user === null || user === undefined || user === "" 
            ? <div className="col-md-12">
                    <Skeleton variant="rectangular" width={'100%'} height={200} />
                    <div className="row mt-3">
                        <div className="col-md-4">
                        <Skeleton variant="text" />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rectangular" width={210} height={118} />
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                <Skeleton variant="rectangular" width={'100%'} height={50} />
                                </div>
                                <div className="col-md-4">
                                    <Skeleton variant="rectangular" width={'100%'} height={100} />
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                </div>
                                <div className="col-md-4">
                                    <Skeleton variant="rectangular" width={'100%'} height={100} />
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                </div>
                                <div className="col-md-4">
                                    <Skeleton variant="rectangular" width={'100%'} height={100} />
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                :
            <div>
            <Navbar/>
            <div className="col-xl-12">
            <div className="row px-3 mb-5">
                <div className="col-xl-4 border mt-3 mt-xl-3 bg-white rounded">
                      <div className="col-xl-12 py-2">
                            <div className="row">
                                <div className="col-12">
                                <Avatar size={64} icon={<UserOutlined />}/>
                                    <label className="ml-3">{user.name}</label>
                                </div>
                            </div> 
                      </div>
                      <hr/>
                      <div class="row">
                      <div className="col-xl-12">
                            <ul class="list-group">
                                <li class="list-group-item">+{user.phone}</li>
                                <li class="list-group-item"><Link to="/wallets">Пополнить</Link>: {user.balance} сом</li>
                                <li class="list-group-item"><Link to="/profile">Мои объявления</Link></li>
                                <li class="list-group-item"><Link to="/favorites">Избранные</Link></li>
                                <li class="list-group-item"><Link to="/settings">Настройки</Link></li>
                            </ul>
                      </div>
                      </div>
                      <hr/>
                </div>
                <div className="col-xl-8 mt-3 mt-xl-0">
                        <div className="col-xl-12 mt-3 border rounded py-3">
                            <label style={{fontSize:18}}>Настройки пользователя</label>
                            <div className="row py-3">
                                <div className="col-xl-12 mb-3">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                                </div>
                                <div className="col-md-1">
                                    <label style={{fontSize:16}}>Имя:</label>
                                </div>
                                <div className="col-md-4">       
                                    <Input placeholder="Имя" onChange={(e)=>{setName(e.target.value)}} />
                                </div>
                                <div className="col-md-12 mt-4">
                                    <Button style={{color:"#fff",backgroundColor:"#4dab04"}} type="primary" onClick={saveSettings}>Сохранить изменения</Button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            </div>
            <Footer/>
            </div>
        );
}
export default Settings;