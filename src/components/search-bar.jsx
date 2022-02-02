import {useState,useEffect,Link} from 'react';
import img from '../img/logo.png';
import React from "react";
import CategorySlider from "./category/category_slider";
import {Button} from 'antd';
import { Cascader } from 'antd';
import { Input, Space } from 'antd';
import { AudioOutlined, SearchOutlined } from '@ant-design/icons';
import { setCategories } from "../redux/actions/category_actions";
import { useSelector, useDispatch } from "react-redux";
import * as api from "../api";
import { TreeSelect } from 'antd';
import {useHistory} from "react-router-dom";
const { Search } = Input;
const { TreeNode } = TreeSelect;
const SearchBar = () => {
  const [value, setValue] = useState(undefined);
  const [search,setSearch] = useState();
  const history = useHistory();
  const onChange = () => {
    setValue(value);
  }
  const Search = ()=>{
    history.push(`search_result/${search}`);
  }
  const dispatch = useDispatch();
    const {categories} = useSelector((state) => state.category);

    const fetchCategoriesTree = async () => {
        const categories = await api.fetchCategoriesTree();
        if (categories != null) {
            dispatch(setCategories(categories));
        }
    };
    useEffect(() => {
      fetchCategoriesTree();
  }, []);
  const childrenContent = (children) => (
    <>
        {children.map((item) => (<>
          <TreeNode 
          id={item.id}
          value={item.name}
          title={item.name}
          >                     
        </TreeNode>
        </>))}
        
    </>
);
// const content = (category) => {
//   return (
//     <>
//     <Link to={`/category/${category.id}`}></Link>
//     </>
//   );
// };
        return(
            <div>
            <div class="col-md-12">
    <div class="row">
        <div class="col-md-12">
        <div className='row py-2 px-3 px-lg-0 d-md-flex align-items-center'>
        <div className="col-lg-3 text-center d-none d-lg-block">
                <a className="navbar-brand" href="/" ><img src='https://www.bazar.kg/build/images/bazarkg-logo.39b422a5.svg' style={{width:"100%"}}/></a>
        </div>
        <div className='col-lg-8 rounded' style={{backgroundColor:"#fff0bb"}}>
          <div className='row'>
          <div className='col-lg-3 px-2 px-lg-1 py-2 py-lg-2'>  
              <TreeSelect
                showSearch
                style={{ width: '100%' }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Категории"
                allowClear
                treeDefaultExpandAll
                onChange={onChange}
              >
                {categories.map((category) => {
                      return (
                        category.children?.length ? 
                        <TreeNode  
                            placement="bottom"
                            id={category.id} 
                            value={category.name} 
                            title={category.name}
                        >
                            {childrenContent(category.children)}
                        </TreeNode> 
                        : <TreeNode 
                        id={category.id} 
                        value={category.name} 
                        title={category.name}>
                        </TreeNode>
                        )  
                    })}
              </TreeSelect>
          </div>
          <div className="col-lg-9 px-2 px-lg-1 mt-2 mt-lg-0 py-1 py-lg-2" >
              <Input className='col-lg-10' placeholder="Поиск..." onChange={(e)=>{setSearch(e.target.value)}} style={{ width: "100%" }} />
              <Button className='mt-3 mt-lg-0 col-12 col-lg-2 rounded-pill' type="primary" style={{backgroundColor:'#4dab04'}} onClick={Search}>
              Найти
              </Button>
          </div>
          </div>
          </div>    
        </div>
        </div>
    </div>
    <div className="col-md-12 pb-3">
      <hr/>
      <center><CategorySlider /></center>
    </div>
    
  </div>
  <hr/>
  </div>
        );
    }
export default SearchBar;