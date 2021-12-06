import React, { useEffect } from "react";
import Ad from "./ad";
import Navbar from "../components/navbar";
import SearchBar from "../components/search-bar";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../redux/actions/product_actions";
import { Link } from "react-router-dom";
import * as api from "../api";
import Footer from "../components/footer";
import { Skeleton } from "@mui/material";

const Main = () => {  
  const dispatch = useDispatch();
    const {products} = useSelector((state) => state.product);
    const defaultImg = 'https://kartinkin.com/uploads/posts/2021-07/thumbs/1626123851_61-kartinkin-com-p-svetlo-serii-fon-krasivo-63.jpg';
    const fetchProducts = async () => {
        const products = await api.fetchProducts();
        if (products != null) {
            dispatch(setProducts(products));
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
  return (
    <div>
      <Navbar />
      <SearchBar />
      <main role="main" class="container-fluid">
        <div class="row">
          <div class="col-md-8">
            <h5 class="text-muted">Новые Объявления</h5>
            <div class="row mt-4 mb-4">
            {/* {products === null || products === undefined || products === ""} ?
            <div className="row mt-4 mb-4"> 
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
            :   */}
            {products.map((product) => {
              var image;
              if(product.media.length > 0){ 
                image = product.media[0].original_url;
              }else{
                image=defaultImg;
              }
              var nowDay = new Date().getDay();
              var Fulldate = new Date(product.created_at);
              var date = Fulldate.getDate();
              var month = Fulldate.getDate();
              var year = Fulldate.getFullYear();
              var day = Fulldate.getDay();
              var res = date+'/'+month+'/'+year;
              if(day<nowDay && day+1==nowDay){
                res = "Вчера";
              }
              
              
                        return (
                            <div className="col-md-4 mt-2 mb-2">
                              <a href={`/products/${product.id}`}>
                                <div class="card">
                                    <div style={{backgroundImage : "url('"+ image +"')",backgroundSize:"cover",width:"100%",height:"250px"}} alt="..."/>
                                    <div class="card-body">
                                        <h5 class="card-title text-dark">{product.title}</h5>
                                        <p class="card-text text-muted">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <label className="text-muted" style={{fontSize:15}}>
                                          Цена:{product.price}
                                        </label>
                                        <br/>
                                        <label className="text-muted" style={{fontSize:15}}>
                                          Дата добавления:{res}
                                        </label>
                                    </div>
                                </div>
                              </a>  
                            </div>
                        )
                    })}
            </div> 
            <hr />
            <h5 class="text-muted">Бизнес профили</h5>
            <div class="col-md-12 pb-5 pt-1 owl-carousel owl-theme" id="slider">
              <div class="slide">
                <img
                  src="https://kartinkin.com/uploads/posts/2021-07/thumbs/1626123851_61-kartinkin-com-p-svetlo-serii-fon-krasivo-63.jpg"
                  width="100%"
                />
                <h5 class="slide__title">Заголовок слайда</h5>
                <a href="#" class="slide__link">Кнопка</a>
              </div>

              <div class="slide">
                <img
                  src="https://kartinkin.com/uploads/posts/2021-07/thumbs/1626123851_61-kartinkin-com-p-svetlo-serii-fon-krasivo-63.jpg"
                  width="100%"
                />
                <h5 class="slide__title">Заголовок слайда</h5>
                <a href="#" class="slide__link">Кнопка</a>
              </div>
              <div class="slide">
                <img
                  src="https://kartinkin.com/uploads/posts/2021-07/thumbs/1626123851_61-kartinkin-com-p-svetlo-serii-fon-krasivo-63.jpg"
                  width="100%"
                />
                <h5 class="slide__title">Заголовок слайда</h5>
                <a href="#" class="slide__link">Кнопка</a>
              </div>
              <div class="slide">
                <img
                  src="https://kartinkin.com/uploads/posts/2021-07/thumbs/1626123851_61-kartinkin-com-p-svetlo-serii-fon-krasivo-63.jpg"
                  width="100%"
                />
                <h5 class="slide__title">Заголовок слайда</h5>
                <a href="#" class="slide__link">Кнопка</a>
              </div>

              <div class="slide">
                <img
                  src="https://kartinkin.com/uploads/posts/2021-07/thumbs/1626123851_61-kartinkin-com-p-svetlo-serii-fon-krasivo-63.jpg"
                  width="100%"
                />
                <h5 class="slide__title">Заголовок слайда</h5>
                <a href="#" class="slide__link">Кнопка</a>
              </div>

              <div class="slide">
                <img
                  src="https://kartinkin.com/uploads/posts/2021-07/thumbs/1626123851_61-kartinkin-com-p-svetlo-serii-fon-krasivo-63.jpg"
                  width="100%"
                />
                <h5 class="slide__title">Заголовок слайда</h5>
                <a href="#" class="slide__link">Кнопка</a>
              </div>

              <div class="slide">
                <img
                  src="https://kartinkin.com/uploads/posts/2021-07/thumbs/1626123851_61-kartinkin-com-p-svetlo-serii-fon-krasivo-63.jpg"
                  width="100%"
                />
                <h5 class="slide__title">Заголовок слайда</h5>
                <a href="#" class="slide__link">Кнопка</a>
              </div>
            </div>
          </div>
          <div class="col-md-4"></div>
        </div>
      </main>
      <Footer/>
    </div>    
  );
}

export default Main;