import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import '../../dist/css/custom_card.css';
import { setProductDetails } from "../../redux/actions/product_actions";
import { AppImage } from "../custom_components";
<<<<<<< HEAD
import {Button,notification,Avatar} from "antd";
import { deleteAd } from "../../api/user";
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';
const ProductItem = ({product}) => {
=======
import { Button, notification } from "antd";
import { deleteAd } from "../../api/user";
import moment from 'moment';

const ProductItem = ({ product }) => {
>>>>>>> cdee08dcee277b1fc3d1e71e5d7e1a0fc45be23d
    const dispatch = useDispatch();
    const history = useHistory();

    const navigateToProductDetailsPage = (product) => {
        dispatch(setProductDetails(product));
        history.push(`products/${product.id}`);
    };

    const baseStyle = { height: 'auto' };
    if (typeof product.features === 'object' && !Array.isArray(product.features)) {
        if (product.features.color !== null) {
            baseStyle.background = product.features.color;
        }
    }
    const openNotification = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };

    const removeAd = async () => {
        deleteAd(product.id);
        openNotification('success', 'Успешно удалено!', null);
        history.push("/");
    }

    var time = moment(product.created_at, 'YYYYMMDD, h:mm:ss a');
    moment.locale('ru');
    var update = time.calendar();
    const image = product.has_media
        ? product.media[0].original_url
        : '';
    return (
<<<<<<< HEAD
            <div className="col-md-12 shadow-sm" style={{ ...baseStyle }}>
            <div className="row">    
            <div className="col-md-12 px-0" style={{ height: 150 }}>
                <AppImage height={150} width="100%" src={image} classNameName="card-img-top rounded" style={{objectFit: "cover"}} />
                {product.is_vip ? 
                    <div style={{ position: "absolute", left: "30px", top: "10px",  }}><span className="badge badge-danger p-2">VIP</span></div> 
                    : <></>}
            </div>
            </div>
            <div class="card-body">
                <div className="row">    
                <label style={{fontSize:17}} class="card-title px-0 col-md-12 py-0 label">{product.price +" "+ product.currency_symbol}</label>
                <p style={{fontSize:15,fontFamily:"sans-serif",whiteSpace:"nowrap"}} class="card-title label px-0 text-primary py-0 col-md-12">{product.title}</p>
                {/* <p class="card-text" style={{
                                    display: "-webkit-box",
                                    webkitLineClamp: "1",
                                    webkitBoxOrient: "vertical",
                                    overflow: "hidden"}}>{product.description}</p> */}
                {/* <label className="text-muted" style={{fontSize:15}}>
                    Опубликовано: {allDate}
                </label> */}
                </div>
                <div className="row px-0 d-flex justify-content-between">
                <Avatar size="small" icon={<UserOutlined />} />
                <label className="text-muted label" style={{fontSize:11}}>
                <i class="far fa-clock"></i> {update}<br/>
                <i class="far fa-eye"></i>  {product.views}
                </label>
                </div>
                <a style={{fontSize:12}} className="badge badge-success" onClick={() => navigateToProductDetailsPage(product)}>Посмотреть</a>
                <a style={{fontSize:12}} className="badge badge-warning ml-1 mt-2" href={"/products/"+product.id+"/edit"}>Редактировать</a>
                <a style={{fontSize:12}} className="badge badge-danger ml-1 mt-2" onClick={removeAd}>Удалить</a>
=======
        <div className="shadow-sm bg-white rounded ml-3" style={{ ...baseStyle }}>
            <div style={{ height: 250 }}>
                <AppImage height={250} width="100%" src={image} classNameName="card-img-top rounded" style={{ objectFit: "cover" }} />
                {product.is_vip ?
                    <div style={{ position: "absolute", left: "30px", top: "10px", }}><span className="badge badge-danger p-2">VIP</span></div>
                    : <></>}
            </div>
            <div class="card-body bg-white">
                <label style={{ fontSize: 20 }} class="card-title">{product.price + " " + product.currency_symbol}</label>
                <p class="card-text" style={{
                    lineHeight: "30px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden"
                }}>{product.description}</p>
                {/* <label className="text-muted" style={{fontSize:15}}>
                        Опубликовано: {allDate}
                    </label> */}
                <label className="text-muted" style={{ fontSize: 12 }}>
                    <i class="far fa-clock"></i> {update}
                </label>
                <br />
                <Button onClick={() => navigateToProductDetailsPage(product)}>Посмотреть</Button>
                <br />
                <Button className="mt-2" href={"/products/" + product.id + "/edit"}>Редактировать</Button>
                <br />
                <Button className="mt-2" onClick={removeAd}>Удалить</Button>
>>>>>>> cdee08dcee277b1fc3d1e71e5d7e1a0fc45be23d
            </div>
        </div>
    );
};

export default ProductItem;