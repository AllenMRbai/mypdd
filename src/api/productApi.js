import axios from 'axios'

/**
 * 随机获得商品条目
 * @param {Integer} page 
 * @param {Integer} rows 
 */
const getRandomProducts=(page,rows)=>{
    return axios.get('/mypdd/randomProducts',{
        page,
        rows
    });
}

/**
 * 按分类id查询商品条目
 * @param {Integer} opt1 一级分类id
 * @param {Integer} opt2 二级分类id
 * @param {Integer} page 
 * @param {Integer} rows 
 */
const getProductsBySort=(opt1,opt2,page,rows)=>{
    return axios.get('/mypdd/getProductsBySort',{
        opt1,
        opt2,
        page,
        rows
    });
}


module.exports={
    getRandomProducts,
    getProductsBySort
}
