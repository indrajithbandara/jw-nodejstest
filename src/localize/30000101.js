const _languageConfig = {
  // 多语配置的key使用文件名+标识后缀组成：
  // 例：30000101-historyName：'客人姓名'
  //     30000101-SearchItems-0-text:'客人姓名'
  //     30000101-SearchItems-1-text:'客人电话'
  // filename[-componentref][-projectname][-index][-property]:'文字描述'
  'C30000101-SearchItems-0-text': '客人姓名',
  'C30000101-SearchItems-1-text': '客人电话',
  'C30000101-payType-Title': '支付类型',
  'C30000101-payType-Placeholder': '支付类型',
  'C30000101-HySelectCom-NotFoundContent': '未找到相关项',
  'C30000101-payType-DataSource-0-ItemText': '信用卡',
  'C30000101-payType-DataSource-1-ItemText': '会员储蓄卡',
  'C30000101-payType-DataSource-2-ItemText': '现金',
  'C30000101-payType-DataSource-3-ItemText': '支付平台',
  'C30000101-payType-ToolTipText':'前台结账方式前台结账方式前台结账方式前台结账方式',
  'C30000101-payType-ErrMessage':'支付方式必须填写'
}

/**
 * 根据key获取对应的文字信息
 * @param {string} key 语言配置识别号
 */
export function GetLanguage(key) {
  if (_languageConfig) {
    const _languageText = _languageConfig[key];
    return _languageText
      ? _languageText
      : '';
  } else {
    return '';
  }
}
