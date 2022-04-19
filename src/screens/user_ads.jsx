import { Avatar } from 'antd';
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { fetchUsersProducts } from '../api/product';
import Navbar from '../components/navbar';
import ProductItem from "../components/product/product_item";

const UserAds = ({ match }) => {
    const [product, setProducts] = useState()

    const fetchProducts = async () => {
        const _products = await fetchUsersProducts({
            'search': 'user_id:' + match.params.id,
            'searchFields': 'user_id:=',
        });
        if (_products != null) {
            setProducts(_products)
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="row mt-4 px-2">
                            <div className='col-xl-12 border rounded py-3'>
                                <div className="col-xl-6">
                                    <Avatar size={100} icon={<UserOutlined />} />
                                    <label className='ml-2'><b>User</b></label>
                                </div>
                                <div className='col-xl-6'>

                                </div>
                            </div>
                            <div className='col-xl-12 border rounded py-3 mt-4'>
                                <label style={{ fontSize: 18 }}><b>Объявления</b></label>
                                <div className='row'>
                                    {product != null && product != undefined ?
                                        product.map((item) => (
                                            <div className="col-xs-12 col-sm-6 col-xl-6 mt-3">
                                                <ProductItem product={item} />
                                            </div>
                                        ))
                                        : <center>
                                            <LoadingOutlined />
                                        </center>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default UserAds;