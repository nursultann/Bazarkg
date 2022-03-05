import React,{useState,useEffect} from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import {fetchArticles} from "../api/index";
const Articles = () =>{
    const [articles,setArticles] = useState();
    const fetchArticle = ()=>{
        const _articles = fetchArticles();
        if(_articles!=null){
        setArticles(_articles);
        }
    }
    useEffect(() => {
        fetchArticle();
    }, []);
        return(
            <div>
            <Navbar/>
            <div className="row px-2">
            <div className="col-md-10 py-2">
               <div className="col-md-12">
                   <label style={{fontSize:28}} className="">Статьи и новости</label>
                    <hr/>
               </div>
               {articles == null ?
               <>
               {articles.map((article)=>{
               <a class="nav-link" href="/article">
                <div className="col-md-12 shadow-sm">
                    <div className="row">
                        <div className="col-md-3">
                        <img src="https://www.cnet.com/a/img/-qQkzFVyOPEoBRS7K5kKS0GFDvk=/940x0/2020/04/16/7d6d8ed2-e10c-4f91-b2dd-74fae951c6d8/bazaart-edit-app.jpg" width="100%" class="rounded"/>
                        </div>
                        <label>{article.title}</label>
                        <div className="col-md-9">
                        <p style={{display: "-webkit-box",
                                        webkitLineClamp: "10",
                                        webkitBoxOrient: "vertical",
                                        overflow: "hidden"}}>
                        {}                    
                        </p>
                        </div>
                    </div>
                <hr/>    
                </div>
                </a>
               })}
                </>
                :<>Загрузка</>
                }            
            </div>
            <div className="col-md-2">

            </div>
            </div>

             

              
              
            <Footer/>
            </div>
        );
}
export default Articles;