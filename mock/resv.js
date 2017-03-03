'use strict';

const qs=require('qs');

const mockjs=require('mockjs');

module.exports={
  'GET /api/resvlist_query' (req,res){
    const page=qs.parse(req.query);
    const data=mockjs.mock({
      'data|8':[{
        'RESVNUM|+1':1,
        'ACCOUNT':mockjs.Random.string( 6, 14 ),
        NAME:'@cname',
        'PHONE|11':1,
        'ARRDT':mockjs.Random.date('yyyy-MM-dd'),
        'ENDDT':mockjs.Random.date('yyyy-MM-dd'),
        'CREATEDATE':mockjs.Random.date('yyyy-MM-dd')
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
      currentPage:data.currentPage,
      pageSize:data.pageSize,
      recordsTotal:data.recordsTotal,
      responseCommonDto:data.responseCommonDto,
      data:data.data
    });
  }
};
