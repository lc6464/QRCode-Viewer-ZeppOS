
import { readFileSync, writeFileSync } from '../../../utils/fs'
const logger = DeviceRuntimeCore.HmLogger.getLogger('helloworld')
import { DEFAULT_TODOLIST_APP } from './../../../utils/constants'
import { gettext } from 'i18n'
var data
var sos_num
var sos_number
var vibrate
var alarm_sos
var timer_sos
var p,j
Page({
  build() {
    logger.debug('page build invoked')
  },
  onInit() {
    logger.debug('page onInit invoked')
  

    // hmApp.alarmCancel(alarm_sos)

    data=readFileSync('data')
    if(data.length==0)
    data=DEFAULT_TODOLIST_APP    
    sos_num=readFileSync('sos_num')
    if(sos_num==0){
      hmApp.goBack()
    }
    sos_number=readFileSync('sos_number')
   data=data[sos_num-1].split("-")
   p=data[0]
   j=data[1]
  //  =data[0]+1-1
  //  =data[1]+1-1  
//   datattt=[10,5]
 
//  hmUI.showToast({
//   text: datattt[0]+'hi'+datattt[1]+'\n'+data[0]+'hi'+data[1]
//   })

    vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)
    vibrate.motorenable = 1
    vibrate.crowneffecton = 1
    vibrate.scene = 14
    vibrate.start()



    if(sos_num!=0){
      if(sos_number%2==1)
      alarm_sos = hmApp.alarmNew({
        file: 'page/gtr-3/home/sos',
        appid: 1003490,
        delay: parseInt(p),              
      })
      else if(sos_number%2==0)
      alarm_sos = hmApp.alarmNew({
        file: 'page/gtr-3/home/sos',
        appid: 1003490,
        delay:  parseInt(j),          
      })
    }

    const text = hmUI.createWidget(hmUI.widget.TEXT)
    if(sos_number%2==1)
    text.setProperty(hmUI.prop.MORE, {
      x: 49,
      y: 69+64,
      w: 454-49-49,
      h: 281,
      text:  gettext('notice_6'),
      color: 0xffffff,
      text_size: 64,
      text_style:hmUI.text_style.WRAP,
      align_h: hmUI.align.RIGHT,
    })
    else if(sos_number%2==0)
    text.setProperty(hmUI.prop.MORE, {
      x: 49,
      y: 69+64,
      w: 454-49-49,
      h: 281,
      text: gettext('notice_7'),
      color: 0xffffff,
      text_size: 64,
      text_style:hmUI.text_style.WRAP,
      align_h: hmUI.align.RIGHT,
    })

    var sos_screen=readFileSync('sos_screen'),sos_screen_button
    if(sos_screen.length==0)
    sos_screen_button=false
    else
    sos_screen_button=sos_screen

    if(sos_number%2==1)
    timer_sos = timer.createTimer(
      2000,
      3000,
      function (option) {
        //回调
        hmApp.goBack()
        if(sos_screen_button)
 hmSetting.setScreenOff()
      },
      { hour: 0, minute: 15, second: 30 }
    )
    else if(sos_number%2==0)
    timer_sos = timer.createTimer(
      3000,
      3000,
      function (option) {
        //回调
        hmApp.goBack()
        if(sos_screen_button)
hmSetting.setScreenOff()
      },
      { hour: 0, minute: 15, second: 30 }
    )
  


  },
  onDestory() {
    vibrate.stop()
  sos_number++
    writeFileSync(sos_number, false,'sos_number') 
    timer.stopTimer(timer_sos)
}   
})

