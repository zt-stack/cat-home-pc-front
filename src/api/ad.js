import request from '@/utils/request'

// 分页查询获取列表
export const getAdListService = (params) => {
  return request.get('/ads', {
    params
  })
}

// 根据id查询
export const getAdByIdService = (id) => {
  return request.get('/ads/' + id)
}

// 根据id删除
export const deleteAdByIdService = (id) => {
  return request.delete('/ads/' + id)
}

// 更新接口
export const updateAdService = ({
  id,
  adName,
  brandName,
  price,
  address,
  image
}) => {
  return request.put('/ads', {
    id,
    adName,
    brandName,
    price,
    address,
    image
  })
}

// 新增接口
export const insertAdService = ({
  id,
  adName,
  brandName,
  price,
  address,
  image
}) => {
  return request.post('/ads', {
    id,
    adName,
    brandName,
    price,
    address,
    image
  })
}

// 批量删除
export const arrayAdService = (array) => {
  return request.delete('/ads/' + array)
}
