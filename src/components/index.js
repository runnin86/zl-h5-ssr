// import 'weui/dist/style/weui.min.css'
import Header from './header/index.js'
import Button from './button/index.js'
import Group from './group/index.js'
import Cell from './cell/index.js'
import CityPick from './city-picker/index.js'
// import Icon from './icon/index.js'
import Textarea from './textarea/index.js'
import Input from './input/index.js'
import Badge from './badge/index.js'
import Switch from './switch/index.js'
import Spinner from './spinner/index.js'
// import TabContainerItem from './tab-container-item/index.js'
// import TabContainer from './tab-container/index.js'
import Navbar from './navbar/index.js'
import NavbarItem from './navbar-item/index.js'
import Tabbar from './tabbar/index.js'
import TabbarItem from './tabbar-item/index.js'
import Search from './search/index.js'
import Checklist from './checklist/index.js'
import Radio from './radio/index.js'
import Slider from './slider/index.js'
import Loadmore from './loadmore/index.js'
import Actionsheet from './actionsheet/index.js'
import Popup from './popup/index.js'
import Swipe from './swipe/index.js'
import SwipeItem from './swipe-item/index.js'
import Picker from './picker/index.js'
// import DatetimePicker from './datetime-picker/index.js'
import Progress from './progress/index.js'
import Circle from './circle/index.js'
import Toast from './toast/index.js'
import Indicator from './indicator/index.js'
import Dialog from './dialog/index.js'
// import Lazyload from './lazyload/index.js'
import Grid from './grid/index.js'
import GridItem from './grid-item/index.js'
import Flex from './flex/index.js'
import FlexItem from './flex-item/index.js'
import Panel from './panel/index.js'
import MediaBox from './media-box/index.js'
import Preview from './preview/index.js'
import Footer from './footer/index.js'
import CountDown from './countdown/index.js'
// import Qrcode from './qrcode/index.js'
import ScrollMenu from './scroll-menu/index.js'
import ScrollNotice from './scroll-notice/index.js'
import FloorGoods from './floor-goods/index.js'
// import ComposeImage from './compose-image/index.js'
// import '../src/assets/font/iconfont.css'

const install = function (Vue) {
  if (install.installed) return

  Vue.component(Header.name, Header)
  Vue.component(Button.name, Button)
  Vue.component(Group.name, Group)
  Vue.component(Cell.name, Cell)
  Vue.component(CityPick.name, CityPick)
  // Vue.component(Icon.name, Icon)
  Vue.component(Textarea.name, Textarea)
  Vue.component(Input.name, Input)
  Vue.component(Badge.name, Badge)
  Vue.component(Switch.name, Switch)
  Vue.component(Spinner.name, Spinner)
  Vue.component(Tabbar.name, Tabbar)
  Vue.component(TabbarItem.name, TabbarItem)
  // Vue.component(TabContainerItem.name, TabContainerItem)
  // Vue.component(TabContainer.name, TabContainer)
  Vue.component(Navbar.name, Navbar)
  Vue.component(NavbarItem.name, NavbarItem)
  Vue.component(Search.name, Search)
  Vue.component(Checklist.name, Checklist)
  Vue.component(Radio.name, Radio)
  Vue.component(Slider.name, Slider)
  Vue.component(Loadmore.name, Loadmore)
  Vue.component(Actionsheet.name, Actionsheet)
  Vue.component(Popup.name, Popup)
  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)
  Vue.component(Progress.name, Progress)
  Vue.component(Circle.name, Circle)
  Vue.component(Picker.name, Picker)
  // Vue.component(DatetimePicker.name, DatetimePicker)
  Vue.component(Grid.name, Grid)
  Vue.component(GridItem.name, GridItem)
  Vue.component(Flex.name, Flex)
  Vue.component(FlexItem.name, FlexItem)
  Vue.component(Panel.name, Panel)
  Vue.component(MediaBox.name, MediaBox)
  Vue.component(Preview.name, Preview)
  Vue.component(Footer.name, Footer)
  Vue.component(CountDown.name, CountDown)
  // Vue.component(Qrcode.name, Qrcode)
  Vue.component(ScrollMenu.name, ScrollMenu)
  Vue.component(ScrollNotice.name, ScrollNotice)
  Vue.component(FloorGoods.name, FloorGoods)
  // Vue.component(ComposeImage.name, ComposeImage)
  // Vue.use(Lazyload, {
  //   loading: require('../../static/img/loading-spin.svg'),
  //   try: 3
  // })

  Vue.$dialog = Vue.prototype.$dialog = Dialog
  Vue.$toast = Vue.prototype.$toast = Toast
  Vue.$indicator = Vue.prototype.$indicator = Indicator
}

// 安装
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '1.0.0',
  install,
  Header,
  Button,
  Group,
  Cell,
  CityPick,
  // Icon,
  Textarea,
  Input,
  Badge,
  Switch,
  Spinner,
  // TabContainerItem,
  // TabContainer,
  Navbar,
  NavbarItem,
  Tabbar,
  TabbarItem,
  Search,
  Checklist,
  Radio,
  Slider,
  Loadmore,
  Actionsheet,
  Popup,
  Swipe,
  SwipeItem,
  Progress,
  Circle,
  Toast,
  Indicator,
  Dialog,
  // Lazyload,
  Picker,
  // DatetimePicker,
  Grid,
  GridItem,
  Flex,
  FlexItem,
  Panel,
  MediaBox,
  Preview,
  Footer,
  CountDown,
  // Qrcode,
  ScrollMenu,
  ScrollNotice,
  // ComposeImage,
  FloorGoods
}
