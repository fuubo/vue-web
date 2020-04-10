import moment from 'moment'
let dateFormat = function (data) {
  if (data) {
    return moment(String(data)).format('YYYY-MM-DD')
  }
  return ''
}
let dateAndTime = function (data) {
  if (data) {
    return moment(String(data)).format('YYYY-MM-DD HH:mm')
  }
  return ''
}
let age = function (data) {
  if (data && data !== '') {
    return moment().diff(data, 'years');

  } else {
    return ''
  }
}
const productPropertyDict = {
  款号: 'spu',
  尺码: 'size',
  创建人: 'createAt',
  创建时间: 'createTime',
  商品名称: 'productName',
  品牌: "brand",
  供应商名称: 'supplier',
  中类: 'categoryId',
  买手: 'buyer',
  合作类型: 'saleMode',
  年份: 'year',
  主色: 'color',

  零售价: 'suggestPrice',
  零售价倍率: 'suggestRatio',
  成本价: 'costPrice',
  会员价: 'memberPrice',
  会员价倍率: 'memberRatio',
  其他费用: 'otherPrice',
  采购价: 'purchasePrice',

  服装风格: 'style',
  版型: 'style12',
  服装廓形: 'style13',
  裸露部位: 'style14',
  领型: 'style15',
  袖型: 'style16',
  袖长: 'style17',
  裙长: 'style18',
  裤长: 'style19',
  衣长: 'style20',
  设计元素: 'style21',
  服装款式细节: 'style22',
  工艺处理: 'style23',
  花型图案: 'style24',
  设计亮点: 'style25',
  材质亮点: 'style26',
  版型亮点: 'style27',
  主材质: 'style28',

  第二色: 'style29',
  适合的极端身高: 'style30',
  最适合掩盖的缺点: 'style31',
  适合的极端体重: 'style32',
  推荐理由: 'style33',
  材质: 'style34',
  场合: 'style35',
  "季节": 'style36',
  "厚薄": 'style37',
  服装标签: 'style38',
  服装品相: 'style39',
  面料特点: 'style40',
  是否推荐给KOL: 'style41',
  是否百搭: 'style42',

  爆款状态: 'style43',
  是否主推品: 'style44'
};
const productPropertyKey = function (propertyName) {
  return productPropertyDict[propertyName] || ''
}

const orderStatusDict = {
  '-1': '已取消',
  '5': '待搭配',
  '10': '搭配中',
  '12': '预览中',
  '15': '待拣货-未打印拣货单',
  '17': '待拣货-已打印拣货单',
  '20': '待发货',
  '25': '物流中',
  '30': '已签收',
  '35': '已预约退回',
  '40': '回库中',
  '45': '待质检',
  '50': '订单异常',
  '55': '订单完成',
}
const orderStatus = function (code) {
  return orderStatusDict[code] || ''
}

const orderItemStatusDict = ['', '已购买', '已退回']

const orderItemStatus = function (code) {
  return orderItemStatusDict[code] || ''
}

const stockStatusDict = {
  '0': '已入库待绑定库位',
  '1': '正常',
  '2': '订单中',
  '3': '已购买',
  '4': '样品',
  '5': '次品',
  '6': '退回供应商',
  '7': '赠送送出',
  '8': '丢失',
  '10': '其他',
}
const stockStatus = function (code) {
  return stockStatusDict[code] || ''
}


const superSetDict = {
  "1": "商品",
  "2": "运营",
  "3": "仓库",
  "4": "市场"
}

const superSetType = function (code) {
  return superSetDict[code] || ''
}

export {
  dateFormat,
  dateAndTime,
  age,
  productPropertyDict,
  productPropertyKey,
  orderStatusDict,
  orderStatus,
  orderItemStatusDict,
  orderItemStatus,
  stockStatus,
  superSetType
}