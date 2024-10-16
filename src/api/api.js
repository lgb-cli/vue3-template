import requestFun from './request';

export const uploadImage = (data) => {
  return requestFun('post', '/api/upload/image', data, {
    contentType: 'multipart/form-data'
  });
};