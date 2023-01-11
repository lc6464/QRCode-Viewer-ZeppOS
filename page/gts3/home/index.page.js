const logger = DeviceRuntimeCore.HmLogger.getLogger('helloworld')
import { readFileSync, writeFileSync } from './../../../utils/fs'
const { messageBuilder } = getApp()._options.globalData
import { DEFAULT_TODOLIST_APP } from './../../../utils/constants'
var data,one,two,three,one_qrcode,two_qrcode,three_qrcode
var text_1,text_2,text_3,text_1_real,text_2_real,text_3_real;
import { gettext } from 'i18n'
//var Is_start=false
Page({
  onMessage() {
    messageBuilder.on('call', ({ payload: buf }) => {
      const json = messageBuilder.buf2Json(buf)
      data = json.map((d) => ({ name: d }))
      this.createAndUpdateList(1)
    })
  },
  getTodoList() {
    messageBuilder
      .request({
        jsonrpc: 'hmrpcv2',
        method: 'GET_TODO_LIST',
        params: {},
      })
      .then(({ result }) => {
        data = result.map((d) => ({ name: d }))
        this.createAndUpdateList(1)
      })
      .catch((res) => {})
  },
  build() {
    logger.debug('page build invoked')
  },
  onInit() {
    logger.debug('page onInit invoked')
    this.onMessage()
    this.getTodoList()
   hmUI.setStatusBarVisible(false)
   //1.打开应用恢复到上次页数 2.设置界面去除toast

   // Is_start=readFileSync('is_start')

    hmUI.setScrollView(true, 450, 1) 
    hmUI.scrollToPage(0, false)
    hmApp.setScreenKeep(true)

    data=readFileSync('data')
if(data.length==0)
data=DEFAULT_TODOLIST_APP


one = hmUI.createWidget(hmUI.widget.TEXT)
one.setProperty(hmUI.prop.MORE, {
  x: 0,
  y: 0,
  w: 390,
  h: 50,
  text: 'text_1',
  text_size: 44,
  color: 0xffffff,
  text_style:hmUI.text_style.NONE,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V
})
 two = hmUI.createWidget(hmUI.widget.TEXT)
two.setProperty(hmUI.prop.MORE, {
  x: 0,
  y: 450,
  w: 390,
  h: 24,
  text: 'text_2',
  text_size: 24,
  color: 0xffffff,
  text_style:hmUI.text_style.NONE,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V
})
 three = hmUI.createWidget(hmUI.widget.TEXT)
three.setProperty(hmUI.prop.MORE, {
  x: 0,
  y: 450+(450-0)*1,
  w: 390,
  h: 50,
  text: 'text_3',
  text_size: 44,
  color: 0xffffff,
  text_style:hmUI.text_style.NONE,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V
})
 one_qrcode = hmUI.createWidget(hmUI.widget.QRCODE, {
  x: 22.5+20,
  y: 75+20,
  w: 345-40,
  h: 345-40,
  bg_x: 22.5,
  bg_y: 75,
  bg_w: 345,
  bg_h: 345
})
// two_qrcode = hmUI.createWidget(hmUI.widget.QRCODE, {
//   x: 22.5+20,
//   y: 75+450+20,
//   w: 345-40,
//   h: 345-40,
//   bg_x: 22.5,
//   bg_y:  75+450,
//   bg_w: 345,
//   bg_h: 345
// })
// three_qrcode = hmUI.createWidget(hmUI.widget.QRCODE, {
//   x: 22.5+20,
//   y: 75+450+450+20,
//   w: 345-40,
//   h: 345-40,
//   bg_x: 22.5,
//   bg_y: 75+450+450,
//   bg_w: 345,
//   bg_h: 345
// })
this.createAndUpdateList(0)

       
//注册手势监听 一个 JsApp 重复注册会导致上一个注册的回调失效
hmApp.registerGestureEvent(function (event) {
  let msg = 'none'
  switch (event) {
    case hmApp.gesture.UP:
      msg = 'up'
      break
    case hmApp.gesture.DOWN:
      msg = 'down'
      break
    case hmApp.gesture.LEFT:
      msg = 'left'
      break
    case hmApp.gesture.RIGHT:
      msg = 'right'
      break
    default:
      break
  }
  console.log(`receive gesture event ${msg}`)
  //不跳过默认手势
  return false
})
hmApp.registerSpinEvent(function (key, degree) {
  console.log('receive key:' + key + ' degree:' + degree) //这里的 key 目前只能是 HOME，可以不用判断
})
  },
  onDestory() {
hmApp.unregisterSpinEvent()
hmApp.unregisterGestureEvent()
   hmApp.setScreenKeep(false)
},createAndUpdateList(sb) {

  if(sb==0){
    text_1=data[0]
    text_2=data[1]
    text_3=data[2]
    hmUI.showToast({
      text: gettext('notice_1')
    })
  }else if(sb==1){
    text_1=data[0].name+"——"+data[1].name
    text_2=data[4].name+"——"+data[5].name
    text_3=data[8].name+"——"+data[9].name
    writeFileSync([text_1,text_2,text_3], false,'data')
    hmUI.showToast({
      text: gettext('notice_2')
    })
}

text_1_real=text_1.split("——")
text_2_real=text_2.split("——")
text_3_real=text_3.split("——")

one.setProperty(hmUI.prop.MORE, {
  text: text_1_real[0],
})
two.setProperty(hmUI.prop.MORE, {
  text: 'fwz233',
})
three.setProperty(hmUI.prop.MORE, {
  text: text_3_real[0],
})
hmUI.deleteWidget(one_qrcode)
one_qrcode = hmUI.createWidget(hmUI.widget.QRCODE, {
  content: text_1_real[1],
  x: 22.5+20,
  y: 75+20,
  w: 345-40,
  h: 345-40,
  bg_x: 22.5,
  bg_y: 75,
  bg_w: 345,
  bg_h: 345
})
// hmUI.deleteWidget(two_qrcode)
// two_qrcode = hmUI.createWidget(hmUI.widget.QRCODE, {
//   content: text_1_real[1],
//   x: 22.5+20,
//   y: 75+450+20,
//   w: 345-40,
//   h: 345-40,
//   bg_x: 22.5,
//   bg_y:  75+450,
//   bg_w: 345,
//   bg_h: 345
// })
// hmUI.deleteWidget(three_qrcode)
// three_qrcode = hmUI.createWidget(hmUI.widget.QRCODE, {
//   content: text_1_real[1],
//   x: 22.5+20,
//   y: 75+450+450+20,
//   w: 345-40,
//   h: 345-40,
//   bg_x: 22.5,
//   bg_y: 75+450+450,
//   bg_w: 345,
//   bg_h: 345
// })
  //     hmUI.showToast({
  //   text: '666'+data[1].name
  // })
}
})
