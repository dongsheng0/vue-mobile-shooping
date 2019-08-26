import headerNav from '../components/header/nav';

import navigate from '../components/footer/navigate.vue'
import productcard from '../components/common/productcard.vue'
import {
  ActionSheet,
  IndexBar,
  IndexAnchor,
  ImagePreview,
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  Sku,
  Card,
  Button,
  SwipeCell,
  Dialog,
  Tab,
  Tabs,
  Row,
  Checkbox,
  CheckboxGroup,
  SubmitBar,
  NavBar,
  Tabbar,
  TabbarItem,
  Panel,
  List,
  Step,
  Steps,
  Field,
  Popup,
  Stepper,
  RadioGroup,
  Radio,
  Picker,
  Uploader,
  Info
} from 'vant';

const components = [
  ActionSheet,
  IndexBar,
  IndexAnchor,
  ImagePreview,
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  SwipeItem,
  Sku,
  Card,
  Button,
  SwipeCell,
  Dialog,
  headerNav,
  Tab, Tabs, Toast, Row, Checkbox, CheckboxGroup, SubmitBar, NavBar, Tabbar, TabbarItem, navigate, Panel, List, Step, Steps, Field, Popup, productcard, Stepper, RadioGroup, Radio, Picker, Uploader, Info
]


export default (Vue) => {
  components.forEach(Component => {
    Vue.component(Component.name, Component)
  });
}