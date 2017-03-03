const resourcelanguage={
  messagemanage_title:"系统消息列表",
  resvcenterpage_messagemanage_title:"预订消息",
  resvcenter_resvlistcom_messagemanage_title:"消息列表"
}

export const GetLanguage=(code)=>{
  return resourcelanguage[code];
}
