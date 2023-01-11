
import { readFileSync, writeFileSync } from './../../../utils/fs'
const logger = DeviceRuntimeCore.HmLogger.getLogger('helloworld')
var Is_start=false
import { gettext } from 'i18n'
Page({
  build() {
    logger.debug('page build invoked')
  },
  onInit() {
    logger.debug('page onInit invoked')
  


    const text = hmUI.createWidget(hmUI.widget.TEXT)
text.setProperty(hmUI.prop.MORE, {
  x: 49,
  y: 69+64,
  w: 390-49-49,
  h: 555,
  text:gettext('cahnge_time'),
  color: 0xc08eaf,
  text_size: 30,
  text_style:hmUI.text_style.WRAP,
})
hmUI.setScrollView(true, 345,2) //345

function slideCheckedChangeFunc(slide, checked) {

  writeFileSync(checked, false,'sos_screen')

  if(checked)
  hmUI.showToast({
    text: gettext('notice_3')
    })
    else
    hmUI.showToast({
      text:gettext('notice_4')
      })
  }
  
  const slideSwitchtext = hmUI.createWidget(hmUI.widget.TEXT)
  slideSwitchtext.setProperty(hmUI.prop.MORE, {
x: 123-89,
y: 69,
w: 233,
h: 64,
text:  gettext('notice_5'),
color: 0xffffff,
text_size: 44,
align_h: hmUI.align.LEFT
})
var sos_screen=readFileSync('sos_screen'),sos_screen_button
if(sos_screen.length==0)
sos_screen_button=false
else
sos_screen_button=sos_screen
      const slideSwitch = hmUI.createWidget(hmUI.widget.SLIDE_SWITCH, {
        x: 123+89,
        y: 69,
        w: 128,
        h: 64,
        select_bg: 'switch/switch_on.png',
        un_select_bg: 'switch/switch_off.png',
        slide_src: 'switch/switch_cricle.png',
        slide_select_x: 64,
        slide_un_select_x: 0,
        checked: sos_screen_button,
        checked_change_func: slideCheckedChangeFunc
      })
  
  },
  onDestory() {
   
}   
})
