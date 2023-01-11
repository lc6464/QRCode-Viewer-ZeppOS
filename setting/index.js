import { gettext } from 'i18n'
import { DEFAULT_TODOLIST } from './../utils/constants'
AppSettingsPage({
  state: {
    todoList: [],
    props: {},
  },
  addTodoList(val) {
    this.state.todoList.push(val)
    this.setItem()
  },
  editTodoList(val, index) {
    this.state.todoList[index] = val
    this.setItem()
  },
  deleteTodoList(index) {
    this.state.todoList.splice(index, 1)
    this.setItem()
  },
  setItem() {
    const newString = JSON.stringify(this.state.todoList)
    this.state.props.settingsStorage.setItem('todoList', newString)
  },
  setState(props) {
    this.state.props = props
    if (props.settingsStorage.getItem('todoList')) {
      this.state.todoList = JSON.parse(props.settingsStorage.getItem('todoList'))
    } else {
      this.state.todoList = [...DEFAULT_TODOLIST]
    }
    console.log('todoList: ', this.state.todoList)
  },
  build(props) {
    this.setState(props)
    const contentItems = []
    const addBTN0 =Button({
            label: '如何使用:',
            style: {
              fontSize: '21px',
              borderRadius: '5px',
              background: '#ffffff',
              color: '#c08eaf',
            },
            onClick: () => {
            },
          })
          const addBTN1 =Button({
            label: '1.修改时间请点击黑色数字',
            style: {
              fontSize: '21px',
              borderRadius: '5px',
              background: '#ffffff',
              color: '#c08eaf',
            },
            onClick: () => {
            },
          })
          const addBTN2 =Button({
            label: '2."-"之前的数字为抛竿的秒数',
            style: {
              fontSize: '21px',
              borderRadius: '5px',
              background: '#ffffff',
              color: '#c08eaf',
            },
            onClick: () => {
            },
          })
          const addBTN3 =Button({
            label: '3."-"之后的数字为检查的秒数',
            style: {
              fontSize: '21px',
              borderRadius: '5px',
              background: '#ffffff',
              color: '#c08eaf',
            },
            onClick: () => {
            },
          })
    this.state.todoList.forEach((item, index) => {
      contentItems.push(
        View({
          style: {
            borderBottom: '1px solid #eaeaea',
            padding: '6px 0',
            marginBottom: '6px',
            display: 'flex',
            flexDirection: 'row',
          },
        }, [
          View({
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              justfyContent: 'center',
              alignItems: 'center',
            },
          }, [
            TextInput({
              label: '',
              bold: true,
              value: item,
              subStyle: {
                color: '#333',
                fontSize: '14px',
              },
              maxLength: 200,
              onChange: (val) => {
                if (val.length > 0 && val.length <= 200) {
                  this.editTodoList(val, index)
                } else {
                  console.log("todoList can't be empty or too long!")
                }
              },
            }),
          ], ),
          // Button({
          //   label: gettext('delete'),
          //   style: {
          //     fontSize: '12px',
          //     borderRadius: '30px',
          //     background: '#D85E33',
          //     color: '#c08eaf',
          //   },
          //   onClick: () => {
          //     this.deleteTodoList(index)
          //   },
          // }),
        ], ),
      )
    })
    return View({
      style: {
        padding: '12px 20px',
      },
    }, [
     // addBTN0,addBTN1,addBTN2,addBTN3,
      contentItems.length > 0 && View({
        style: {
          marginTop: '12px',
          padding: '10px',
          border: '1px solid #eaeaea',
          borderRadius: '6px',
          backgroundColor: 'white',
        },
      }, [...contentItems], ),
    ], )
  },
})