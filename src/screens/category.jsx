import React from "react";
import{ useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SearchBar from "../components/search-bar";
import { setCategoryProducts } from "../redux/actions/product_actions";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryProducts } from "../api";
import { Skeleton, Grid } from "@mui/material";
import ProductItem from "../components/product/product_item";
import SubCategories from "../components/category/sub_categories ";
const Category = ({match})=> {
    const dispatch = useDispatch();
    const [categoryProducts,setProducts] = useState();
    const [ category, setCategory ] = useState();
    const fetchCategory = async () => {
        const category = await fetchCategoryProducts(match.params.id);
        if (category != null) {
            console.log(category.advertisements);
            setCategory(category);
            setProducts(category.advertisements);
            dispatch(setCategoryProducts(category.advertisements));
        }
    };
    useEffect(() => {
        fetchCategory();
      }, []);
        return(
            <div>
            <Navbar />
            <SubCategories category={category}/>
            <div className="row mx-0 mt-3">
                <div className="col-md-12">
                <label style={{fontSize:18}}>По категории</label>
                </div>
                    {categoryProducts === null || categoryProducts === undefined || categoryProducts.length === 0 ?
                    <Grid container spacing={2} className="pl-3 pt-4 pb-4">
                    <Grid item xs={4}>
                        <Skeleton variant="rectangular" width={'100%'} height={100} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                    </Grid>
                    <Grid item xs={4}>
                        <Skeleton variant="rectangular" width={'100%'} height={100} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                    </Grid>
                    <Grid item xs={4}>
                        <Skeleton variant="rectangular" width={'100%'} height={100} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                    </Grid>
                    </Grid>
                : categoryProducts.map((product) => {
                    return (
                        <div className="col-xs-12 col-sm-6 col-xl-4 mt-3 mb-3">
                        <ProductItem product={product} />
                        </div>            
                    )
                })}
            </div>   
            <Footer/>
           </div>
        );
}
export default Category;