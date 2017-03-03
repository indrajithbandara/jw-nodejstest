'use strict';

const qs=require('qs');

const mockjs=require('mockjs');

module.exports={
  'GET /api/message_query' (req,res){
    const page=qs.parse(req.query);
    let Random=mockjs.Random;
    const data=mockjs.mock({
      'data|20':[{
        'MessageId|+1':1,
        'MessageText':Random.ctitle(3, 20),
        MessageDate:Random.date('yyyy-MM-dd'),
        'ReNumber|1-60':1,
        MessageUpdateDate:Random.date('yyyy-MM-dd')
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
