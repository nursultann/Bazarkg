import ApiClient from "./ApiClient";

export const fetchProducts = async (params = { limit: 20, offset: 0 }) => {
    try {
        if (!params.hasOwnProperty('sub')) {
            if (!params.hasOwnProperty('offset')) params['offset'] = 0;
            if (!params.hasOwnProperty('limit')) params['limit'] = 20;
        }
        params['orderBy'] = 'id';
        params['sortedBy'] = 'desc';

        const response = await ApiClient.get('/products', params);
        if (response.status == 200 || response.status == 201) {
            return response.data.data;
        }
    } catch (error) {
        console.log('fetching products error ', error);
    }

    return null;
};

export const fetchProduct = async (id, params) => {
    try {
        const response = await ApiClient.get(`/products/${id}`, params);
        if (response.status == 200 || response.status == 201) {
            return response.data.data;
        }
    } catch (error) {
        console.log('fetching product error ', error);
    }

    return null;
};

export const createProduct = async (params) => {
    try {
        const response = await ApiClient.post('/products', params, 'multipart/form-data');
        if (response.status == 200 || response.status == 201) {
            return response.data;
        }
    } catch (error) {
        console.log('create product error ', error.response);
    }

    return null;
};

export const updateProduct = async (id, params) => {
    try {
        if (params instanceof FormData && !params.has('_method')) {
            params.append('_method', 'PATCH');
        } else if (typeof params === 'Object' && !params.hasOwnProperty('_method')) { 
            params['_method'] = 'PATCH'; 
        } else {
            console.log('params not object');
        }

        const response = await ApiClient.post(`/products/${id}`, params, 'multipart/form-data');
        if (response.status == 200 || response.status == 201) {
            return response.data;
        }
    } catch (error) {
        console.log('fetching products error ', error.response);
    }

    return null;
};

export const fetchUserProducts = async (params = { limit: 20, offset: 0 }) => {
    try {
        if (!params.hasOwnProperty('sub')) {
            if (!params.hasOwnProperty('offset')) params['offset'] = 0;
            if (!params.hasOwnProperty('limit')) params['limit'] = 20;
        }
        params['orderBy'] = 'id';
        params['sortedBy'] = 'desc';
        
        const response = await ApiClient.get('/user/products', params);
        if (response.status == 200 || response.status == 201) {
            return response.data.data;
        }
    } catch (error) {
        console.log('fetching products error ', error);
    }

    return null;
};
export const fetchUserFavorites = async (params = { limit: 20, offset: 0 }) => {
    try {
        if (!params.hasOwnProperty('sub')) {
            if (!params.hasOwnProperty('offset')) params['offset'] = 0;
            if (!params.hasOwnProperty('limit')) params['limit'] = 20;
        }
        params['orderBy'] = 'id';
        params['sortedBy'] = 'desc';
        
        const response = await ApiClient.get('/favorites', params);
        if (response.status == 200 || response.status == 201) {
            return response.data.data;
        }
    } catch (error) {
        console.log('fetching products error ', error);
    }

    return null;
};

export const fetchSearchProducts = async (params)=>{
    try {
        if (!params.hasOwnProperty('sub')) {
            if (!params.hasOwnProperty('offset')) params['offset'] = 0;
            if (!params.hasOwnProperty('limit')) params['limit'] = 20;
        }
        
        const response = await ApiClient.get('/products', params);
        if (response.status == 200 || response.status == 201) {
            return response.data.data;
        }
    } catch (error) {
        console.log('fetching products error ', error);
    }

    return null;
}

export const addToFavorites = async (id) => {
    try {
        const response = await ApiClient.post(`/products/${id}/addtofav`);
        if (response.status == 200 || response.status == 201) {
            return response.data.data;
        }
    } catch (error) {
        console.log('addToFavoritesError ', error.response);
    }

    return null;
}

export const removeFromFavorites = async (id) => {
    try {
        const response = await ApiClient.post(`/products/${id}/remfromfav`);
        if (response.status == 200 || response.status == 201) {
            return response.data.data;
        }
    } catch (error) {
        console.log('removeFromFavoritesError ', error.response);
    }

    return null;
}
export const postComment = async (params)=>{
    try {
        console.log('params ', params);
        const response = await ApiClient.post(`/comments`,params);
        if (response.status == 200 || response.status == 201) {
            return response.data.data;
        }
    } catch (error) {
        console.log('comments err ', error.response);
    }

    return null;
}