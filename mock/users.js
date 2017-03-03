'use strict';

const qs=require('qs');

const mockjs=require('mockjs');

module.exports={
  'GET /api/users' (req,res){
    const page=qs.parse(req.query);
    const data=mockjs.mock({
      'data|20':[{
        'ID|+1':1,
        STAFF_CODE:mockjs.Random.string(6),
        USER_NAME:'@cname',
        USER_NAME_EN:'USER_NAME_EN',
        LOGIN_ACCOUNT:'@email',
        CREATED_DATE:'2016-11-11',
        MODIFIED_DATE:'2016-12-12'
      }],
      currentPage:1,
      pageSize:10,
      recordsTotal:17,
      responseCommonDto:{
        errorLevel:0,
        resultCode:0,
        message:'000000'
      }
    });
    res.json({
      success:true,
      currentPage:data.currentPage,
      pageSize:data.pageSize,
      recordsTotal:data.recordsTotal,
      responseCommonDto:data.responseCommonDto,
      data:data.data
    });
  },
  'GET /api/adduser' (req,res){
    const page=qs.parse(req.query);
    const data=mockjs.mock({
      'data|20':[{
        'ID|+1':1,
        STAFF_CODE:mockjs.Random.string(6),
        USER_NAME:'@cname',
        USER_NAME_EN:'USER_NAME_EN',
        LOGIN_ACCOUNT:'@email',
        CREATED_DATE:'2016-11-11',
        MODIFIED_DATE:'2016-12-12'
      }],
      currentPage:1,
      pageSize:10,
      recordsTotal:17,
      responseCommonDto:{
        errorLevel:0,
        resultCode:0,
        message:'000000'
      }
    });
    res.json({
      success:true,
      currentPage:data.currentPage,
      pageSize:data.pageSize,
      recordsTotal:data.recordsTotal,
      responseCommonDto:data.responseCommonDto,
      data:data.data
    });
  }
};
