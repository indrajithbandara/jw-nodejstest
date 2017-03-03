const resourcelanguage={
  resvlistview_TableLeftActTitle:"选择",
  resvlistview_TableColumnRESVNUM:"预订编号",
  resvlistview_TableColumnACCOUNT:"账单编号",
  resvlistview_TableColumnNAME:"客人姓名",
  resvlistview_TableColumnPHONE:"联系方式",
  resvlistview_TableColumnARRDT:"预订来期",
  resvlistview_TableColumnENDDT:"预订离期",
  resvlistview_TableColumnCREATEDATE:"创建时间",
  resvlistview_TableFGAddText:"添加",
  resvlistview_TableFGAddToolTip:"这是一个按钮",
  resvlistview_TableFGBatchDelText:"批量删除",
  resvlistview_TableFGBatchToolTip:"批量删除所选订单",
  resvlistview_TableLFTSelectToolTip:"选择订单",
  resvlistview_TableRFTEditText:"编辑",
  resvlistview_TableRFTEditToolTip:"这是一个按钮",
  resvlistview_TableRFTDelText:"删除",
  resvlistview_TableRFTDelToolTip:"这是一个按钮"
}

export const GetLanguage=(code)=>{
  return resourcelanguage[code];
}
