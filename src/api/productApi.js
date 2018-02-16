import axios from 'axios'

/**
 * 随机获得商品条目
 * @param {Integer} page 
 * @param {Integer} rows 
 */
export const getRandomProducts=(page,rows)=>{
    return axios.get('/mypdd/randomProducts',{
        params:{
            page,
            rows
        }
    });
}

/**
 * 按分类id查询商品条目
 * @param {Integer} opt1 一级分类id
 * @param {Integer} opt2 二级分类id
 * @param {Integer} page 
 * @param {Integer} rows 
 */
export const getProductsBySort=(option)=>{
    return axios.get('/mypdd/getProductsBySort',{
        params:{
            opt1:option.opt1,
            opt2:option.opt2,
            page:option.page,
            rows:option.rows
        }
    });
}

/**
 * 根据商品id获得商品详情
 * @param {Integer} id
 */
export const getProductDetailById=(id)=>{
    return axios.get('/mypdd/getProductDetailById',{
        params:{
            id
        }
    });
}

/**
 * 根据商品id获得商品sku
 * @param {Integer} id
 */
export const getSkuById=(id)=>{
    return axios.get('/mypdd/getSkuById',{
        params:{
            id
        }
    });
}

/**
 * 根据商品id获得商品评论
 * @param {Integer} id
 */
export const getCommentsById=(id)=>{
    return axios.get('/mypdd/getCommentsById',{
        params:{
            id
        }
    });
}

/**
 * 根据商品id获得商品拼单信息
 * @param {Integer} id
 */
export const getPingDanById=(id)=>{
    return axios.get('/mypdd/getPingDanById',{
        params:{
            id
        }
    });
}