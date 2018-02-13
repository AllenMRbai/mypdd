import axios from 'axios'

/**
 * 获得一级分类列表
 */
const getCategoryOnes=()=>{
    return axios.get('/mypdd/getCategoryOnes');
}

/**
 * 获得二级分类
 * @param {Integer} optId1 
 */
const getCategoryTwos=(optId1)=>{
    return axios.get('/mypdd/getCategoryTwos',{
        optId1
    });
}

/**
 * 获得所有分类
 */
const getAllCategory=()=>{
    return axios.get('/mypdd/getAllCategory');
}

module.exports={
    getCategoryOnes,
    getCategoryTwos,
    getAllCategory
}