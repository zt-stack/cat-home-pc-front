import request from '@/utils/request'

// 获取猫咪信息
export const getCatInfoService = (params) => {
  return request.get('/cats', {
    params
  })
}

// 根据id查询猫咪信息
export const getCatByIdService = (id) => {
  return request.get('/cats/' + id)
}

// 更新猫咪信息
export const updateCatService = ({
  id,
  catName,
  age,
  state,
  health,
  address,
  image,
  entrydate
}) => {
  return request.put('/cats', {
    id,
    catName,
    age,
    state,
    health,
    address,
    image,
    entrydate
  })
}

// 新增猫咪接口
export const insertCatService = ({
  catName,
  age,
  state,
  health,
  address,
  image,
  entrydate
}) => {
  return request.post('/cats', {
    catName,
    age,
    state,
    health,
    address,
    image,
    entrydate
  })
}

// 根据id删除猫咪
export const deleteCatService = (id) => {
  return request.delete('/cats/' + id)
}
