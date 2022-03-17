import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, userDetails} from "../api";
import { addToFavorites, postComment, removeFromFavorites} from "../api/product";
import { setProductDetails } from "../redux/actions/product_actions";
import Carousel from 'react-gallery-carousel';
import { FacebookShareButton, WhatsappShareButton, TelegramShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon, TelegramIcon } from "react-share";
import { Comment, Avatar, Form, Button, List, Input, Tooltip,message } from 'antd';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';
import { createComment } from "../api/product";
const key = "updateable";
const { TextArea } = Input;

const Ad = ({ match }) => {
    const dispatch = useDispatch();
    const { productDetails } = useSelector((state) => state.product);
    const [favorite,setFavorite] = useState();
    const [userId,setUserId] = useState();
    const [userDetail,setUserDetail] = useState();
    const fetchProductDetails = async () => {
        const productDetails = await fetchProduct(match.params.id, {
            'with': 'category;customAttributeValues.customAttribute;region;city;user;comments.user'
        });
         if (productDetails != null) {
            dispatch(setProductDetails(productDetails));
            setFavorite(productDetails.is_favorite);
            console.log(favorite);
        }
    };

    const token = localStorage.getItem('token');
    const [submitting,setSubmitting]=useState(false);
    const [value,setValue]=useState('');
    const onSubmit = async ()=>{
        if (!value) {
            return;
        }
        const user = await userDetails();
         if(user != null){
            setUserId(user.id);
            setUserDetail(user);
            
        }
        const params = {
            'text' :value,
            'advertisement_id':productDetails.id,
            'user_id':userId
        }
        setSubmitting(true);

        const result = await createComment(value, productDetails.id, productDetails.user_id);
        if (result) {
            setValue('');
            fetchProductDetails();
        }
        setSubmitting(false);
    }

    const CommentList = (productDetails) => (
        <List
            dataSource={productDetails.comments}
            header={`${productDetails.comments.length} ${productDetails.comments.length > 1 ? 'Комментариев' : 'Комментариев'}`}
            itemLayout="horizontal"
            renderItem={item => <Comment
                // actions={[
                //     <span key="comment-basic-reply-to">Ответить</span>,
                // ]}
                avatar={<Avatar src={item.user.media?.length ? item.user.media[0].original_url : 'https://joeschmoe.io/api/v1/random'} />}
                author={item.user.name}
                content={item.text}
            />}
        />
    );

    const addFav = async () =>{
        const addToFav = await addToFavorites(productDetails.id);
        message.success({ content: 'Добавлено в избранное!', key, duration: 2 });
        setFavorite(true);
    }
    const removeFav = async ()=>{
        const addToFav = await removeFromFavorites(productDetails.id);
        message.error({ content: 'Удалено из избранного!', key, duration: 2 });
        setFavorite(false);
    }
    useEffect(() => {
        fetchProductDetails();

    }, []);

    if (productDetails != null) {
        var time = moment(productDetails.created_at, 'YYYYMMDD, h:mm:ss a');
        moment.locale('ru');
        var update = time.calendar();
    }

    return (
        <div>
            <Navbar />  
                {productDetails != null ? <>          
                <div className="col-xl-12 mt-xl-3 mt-3">
                    <div className="row px-xl-3 px-2">
                        <div className="col-xl-8 border rounded py-3">
                            <div className="row">
                                <div className="col-xl-12">
                                    <label style={{ fontSize: "22px", whiteSpace: "normal" }}>{productDetails.title}</label><br />
                                    <Carousel
                                        images={productDetails.media.map((item) => ({
                                            src: `${item.original_url}`
                                        }))}
                                        style={{ height: "450px", width: "100%" }}
                                    />
                                </div>
                                <div className="col-xl-12">
                                    <hr className="d-block d-xl-none" />
                                    <div className="row">
                                        <div className="col-xl-12 mt-3" style={{ fontSize: "14px", whiteSpace: "normal" }}>
                                            <div className="row">
                                                <label className="col-6">Категория:</label><label className="col-6 label">{productDetails.category != null ? productDetails.category.name : <></>}</label>
                                                <label className="col-6">Цена:</label><label className="col-6 label">{productDetails.price + " " + productDetails.currency_symbol}</label>
                                                {productDetails.custom_attribute_values != null ?
                                                    productDetails.custom_attribute_values.map((item) => {
                                                        return (
                                                            <>
                                                                <label className="col-6">{item.custom_attribute.title}:</label>
                                                                <label className="col-6">{item.value}</label>
                                                            </>
                                                        )
                                                    })
                                                    : <></>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="col-xl-12">
                                <label style={{ fontSize: "18px", whiteSpace: "normal" }}>Описание</label>
                                <p className="label">{productDetails.description}</p>
                            </div>
                        </div>
                        <div className="col-xl-4">
                        <div className="col-xl-12 border rounded mt-3 mt-xl-0">
                                    <div className="row">
                                        <div className="col-xl-12 mt-xl-4">
                                        <hr className="d-block d-xl-none" /> 
                                        <button class="btn col-xl-12 text-white" style={{backgroundColor:"#4dab04"}} data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1"><i class="fas fa-phone-volume"></i> Показать номер</button>
                                            <div class="collapse multi-collapse" id="multiCollapseExample1">
                                                <div class="card card-body">
                                                <a href={"tel:"+productDetails.phones}>{productDetails.phones}</a>
                                                </div>
                                            </div>    
                                        </div>
                                        {token ?
                                        <>  
                                        <div className="col-xl-12 mt-xl-2">
                                        <hr className="d-block d-xl-none" /> 
                                         
                                        {favorite == null || favorite == false?
                                        <button class="btn btn-outline-secondary col-xl-12" onClick={addFav}><i class="far fa-heart"></i> Добавить в избранное</button>    
                                        :<button class="btn col-xl-12 text-white" style={{backgroundColor:"#4dab04"}} onClick={removeFav}><i class="far fa-heart"></i>Удалить из избранного</button>
                                        }
                                        
                                        </div>
                                        </>
                                        :<></>
                                        }
                                    <div className="col-xl-12 mt-xl-2">
                                        <hr className="d-block d-xl-none" />
                                        <button class="btn btn-outline-danger col-xl-12"><i class="fas fa-exclamation-triangle"></i> Пожаловаться</button>
                                    </div>
                                    </div>
                                    <div className="col-xl-12 mt-xl-2">
                                        <hr />
                                        {productDetails.user.media?.length ?
                                        <img src={productDetails.user.media[0].original_url} style={{ borderRadius: "50%", width: "50px", height: "50px" }} />
                                        :
                                        <Avatar size={42} icon={<UserOutlined />} />
                                    }
                                        <label className="ml-2">{productDetails.user != null ? productDetails.user.name : <></>}</label>
                                        <hr />
                                    </div>
                                    <div className="col-6 col-xl-12 mt-2">
                                        <label className="text-muted">Поделиться</label><br />
                                        <FacebookShareButton
                                            url={window.location.href}
                                            quote={"フェイスブックはタイトルが付けれるようです"}
                                            hashtag={"#hashtag"}
                                            description={"aiueo"}
                                            className="Demo__some-network__share-button mr-1"
                                        >
                                            <FacebookIcon size={30} round />
                                        </FacebookShareButton>
                                        <WhatsappShareButton
                                            url={window.location.href}
                                            quote={"フェイスブックはタイトルが付けれるようです"}
                                            hashtag={"#hashtag"}
                                            description={"aiueo"}
                                            className="Demo__some-network__share-button mr-1"
                                        >
                                            <WhatsappIcon size={30} round />
                                        </WhatsappShareButton>
                                        <TelegramShareButton
                                            url={window.location.href}
                                            quote={"フェイスブックはタイトルが付けれるようです"}
                                            hashtag={"#hashtag"}
                                            description={"aiueo"}
                                            className="Demo__some-network__share-button"
                                        >
                                            <TelegramIcon size={30} round />
                                        </TelegramShareButton>
                                        <hr className="d-none d-xl-block" />
                                    </div>
                                    <div className="col-6 col-xl-12 mt-0 mt-xl-2">
                                        <label class="ml-3 text-muted"><i class="far fa-eye"></i> Просмотры: {productDetails.views}<br />
                                            <i class="fas fa-map-marker-alt"></i> Местоположение: {productDetails.region != null ? productDetails.region.name + "," + productDetails.city.name : ""}<br />
                                            <i class="far fa-clock"></i> Обновлено: {update}
                                        </label>
                                    </div>

                                </div>
                                <hr />
                            </div>
                        </div>
                            <div className="col-xl-8 border rounded mt-3 py-3">
                            <label style={{fontSize:15}}>Комментарии</label>
                            {
                                token != null ?
                                    <>
                                        {
                                            productDetails.can_comment == "all" ?
                                                <div className="col-xl-12">
                                                    {
                                                        productDetails.comments?.length
                                                            ? <CommentList comments={productDetails.comments} />
                                                            : <>Нет комментариев</>
                                                    }
                                                    <Comment
                                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                                                        content={
                                                            <>
                                                                <Form.Item>
                                                                    <TextArea rows={4}
                                                                        onChange={(e) => { setValue(e.target.value) }} value={value} />
                                                                </Form.Item>
                                                                <Form.Item>
                                                                    <Button className="rounded-pill" htmlType="submit" loading={submitting} onClick={onSubmit} style={{ backgroundColor: "#4dab04", color: "#fff" }}>
                                                                        Добавить комментарий
                                                                    </Button>
                                                                </Form.Item>
                                                            </>
                                                        }
                                                    />

                                                </div>
                                                :
                                                <></>
                                        }
                                    </>
                                    :
                                    <>
                                        <div className="col-xl-12 py-2">
                                            <label style={{ fontSize: 14 }}>Чтобы оставить комментарий нужно авторизоваться</label>
                                            <br />
                                            <Button style={{ borderColor: "#4dab04", color: "#4dab04" }}><a href="/login">Войти</a></Button>
                                        </div>
                                    </>
                            }
                        </div>
                </div>
            </> : <div>loading</div>}
        </div>
    );
}

export default Ad;