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
<<<<<<< HEAD
import { Button } from '@mui/material';
import ProductItem from "../components/product/product_item";
=======
import { Skeleton } from "@mui/material";
>>>>>>> d89b5fbaa896eb96789f5ad9ee70f84742841016

const Main = () => {  
  const dispatch = useDispatch();
  const {products} = useSelector((state) => state.product);


  const fetchInitProducts = async () => {
    let products = await api.fetchProducts({'sub': true});
    if (products != null) {
      products = products.concat(await api.fetchProducts());
      dispatch(setProducts(products));
    }
  };

  const fetchProducts = async () => {
    let prods = products.concat(await api.fetchProducts());
    if (prods != null) {
      dispatch(setProducts(prods));
    }
  };

  useEffect(() => {
    fetchInitProducts();
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
<<<<<<< HEAD
              return (
                <><ProductItem product={product} /></>
              )
            })}
=======
                        return (
                            <div className="col-md-4 mt-2 mb-2">
                                <div class="card">
                                    <img src={product.media.length > 0 ? product.media[0].original_url : 'https://kartinkin.com/uploads/posts/2021-07/thumbs/1626123851_61-kartinkin-com-p-svetlo-serii-fon-krasivo-63.jpg'} class="card-img-top" alt="..."/>
                                    <div class="card-body">
                                        <h5 class="card-title">{product.title}</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href={`/products/${product.id}`} class="badge badge-primary px-2 py-2">Подробнее</a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
>>>>>>> d89b5fbaa896eb96789f5ad9ee70f84742841016
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