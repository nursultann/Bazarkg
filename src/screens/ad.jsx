import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, userDetails} from "../api";
import { addToFavorites, postComment, removeFromFavorites} from "../api/product";
import { setProductDetails } from "../redux/actions/product_actions";
import Carousel from 'react-gallery-carousel';
import { FacebookShareButton, WhatsappShareButton,TelegramShareButton } from "react-share";
import { FacebookIcon,WhatsappIcon, TelegramIcon } from "react-share";
import { Comment, Avatar, Form, Button, List, Input, message } from 'antd';
import moment from 'moment';
const key = 'updatable';
const { TextArea } = Input;
const Ad = ({match}) => {
    const dispatch = useDispatch();
    const {productDetails} = useSelector((state) => state.product);
    const [userId,setUserId] = useState();
    const [favorite,setFavorite] = useState();
    // const {shareUrl,setUrl} = useState();
    // setUrl();
    const fetchProductDetails = async () => {
        const productDetails = await fetchProduct(match.params.id, {
            'with': 'category;customAttributeValues.customAttribute;region;city;user;comments'
        });
         if (productDetails != null) {
            dispatch(setProductDetails(productDetails));
            setFavorite(productDetails.is_favorite);
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
        }
        const params = {
            'text' :value,
            'advertisement_id':productDetails.id,
            'user_id':userId
        }
        setSubmitting(true);
        const post = await postComment(params);
        setTimeout(() => {
            alert("added"+value);
            setSubmitting(false);
            setValue('');
          }, 1000);
    }
    const CommentList = (comments)=>{
        console.log(comments.comments[1].text);
        return( 
        <>     
        {comments.comments.map((comment)=>{
                <Comment
                    actions={[<span key="comment-nested-reply-to">Reply to</span>]}
                    author={<a>Han Solo</a>}
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                    content={
                    <p>
                        {comment.text}
                    </p>
                    }
                >
                    
                </Comment>
        })}        
        </>
    );
    }        

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
    if(productDetails!=null){
        var time = moment(productDetails.created_at, 'YYYYMMDD, h:mm:ss a');
        moment.locale('ru');
        var update = time.calendar();
}          
    return(
        <div>
            <Navbar />  
                {productDetails != null ? <>          
                <div className="col-xl-12 mt-xl-2">
                    <div className="row">
                        <div className="col-xl-8">
                            <div className="row">
                                <div className="col-xl-12">
                                <label style={{fontSize:"22px",whiteSpace:"normal"}}>{productDetails.title}</label><br/>
                                    <Carousel 
                                        images={productDetails.media.map((item) => ({
                                            src: `${item.original_url}`
                                        }))} 
                                        style={{ height:"450px", width: "100%" }} />
                                </div>
                                <div className="col-xl-12">
                                <hr className="d-block d-xl-none" />
                                    <div className="row">
                                        <div className="col-xl-12 mt-3" style={{fontSize:"14px",whiteSpace:"normal"}}>
                                            <div className="row">
                                                <label className="col-6">Категория:</label><label  className="col-6 label">{productDetails.category != null ? productDetails.category.name : <></> }</label>
                                                <label className="col-6">Цена:</label><label className="col-6 label">{productDetails.price+" " + productDetails.currency_symbol}</label>
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
                            <hr/>
                            <div className="col-xl-12">
                            <label style={{fontSize:"18px",whiteSpace:"normal"}}>Описание</label>
                            <p className="label">{productDetails.description}</p>
                            </div>
                        </div>
                        <div className="col-xl-4">
                        <div className="col-xl-12 mt-2">
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
                                         
                                        {!favorite ?
                                        <button class="btn btn-outline-secondary col-xl-12" onClick={addFav}><i class="far fa-heart"></i>Добавить в избранное</button>    
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
                                        <div className="col-xl-12 mt-xl-2">
                                        <hr/>   
                                        <img src="https://www.bazar.kg/build/images/no-avatar.451f5561.svg" style={{borderRadius:"50%",width:"50px", height:"50px"}}/>
                                        <label className="ml-2">{productDetails.user != null ? productDetails.user.name : <></> }</label>
                                        <hr/>
                                        </div>
                                        <div className="col-6 col-xl-12 mt-2"> 
                                        <label className="text-muted">Поделиться</label><br/>    
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
                                        <hr className="d-none d-xl-block"/>
                                        </div>
                                        <div className="col-6 col-xl-12 mt-0 mt-xl-2">   
                                        <label class="ml-3 text-muted"><i class="far fa-eye"></i> Просмотры: {productDetails.views}<br/>
                                        <i class="fas fa-map-marker-alt"></i> Местоположение: {productDetails.region != null ? productDetails.region.name+","+productDetails.city.name : ""}<br/>
                                        <i class="far fa-clock"></i> Обновлено: {update}
                                        </label>
                                        </div>
                                        
                                    </div>
                                <hr/>
                            </div>
                        </div>
                            <div className="col-xl-8">
                            {
                                token != null ? 
                                    <>
                                    {    
                                    productDetails.can_comment == "all" ?
                                    <div className="col-xl-12">
                                    {
                                    productDetails.comments != null && productDetails.comments.length >0 ? <CommentList comments={productDetails.comments} />
                                    : <>Нет комментариев</>
                                    }    
                                        <Comment
                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                                        content={
                                            <>
                                            <Form.Item>
                                            <TextArea rows={4} 
                                            onChange={(e) => { setValue(e.target.value)}} value={value} />
                                            </Form.Item>
                                            <Form.Item>
                                            <Button className="rounded-pill" htmlType="submit" loading={submitting} onClick={onSubmit} style={{backgroundColor:"#4dab04",color:"#fff"}}>
                                                Добавить комментарий
                                            </Button>
                                            </Form.Item>
                                        </>
                                        }
                                        />
                                        
                                    </div>
                                    : 
                                    <></>
                                    }</>
                                    : 
                                    <>
                                    <div className="col-xl-12 py-2">
                                    <label style={{fontSize:14}}>Чтобы оставить комментарий нужно авторизоваться</label>
                                    <br/>
                                    <Button style={{borderColor:"#4dab04",color:"#4dab04"}}><a href="/login">Войти</a></Button>
                                    </div>
                                    </>
                            }
                            </div>
                    </div>
                </div>
                </> : <div>loading</div>}
                <Footer/>  
        </div>
    );
}

export default Ad;