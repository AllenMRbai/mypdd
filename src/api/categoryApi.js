import axios from 'axios'

/**
 * 获得一级分类列表
 */
export const getCategoryOnes=()=>{
    return axios.get('/mypdd/getCategoryOnes');
}

/**
 * 获得二级分类
 * @param {Integer} optId1 
 */
export const getCategoryTwos=(optId1)=>{
    return axios.get('/mypdd/getCategoryTwos',{
        params:{
            optId1
        }
    });
}

/**
 * 获得所有分类
 */
export const getAllCategory=()=>{
    return axios.get('/mypdd/getAllCategory');
}
