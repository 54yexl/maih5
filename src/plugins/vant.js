import '@vant/touch-emulator' // 桌面端touch适配
import { 
  Button,
  List,
  Tab,
  Tabs,
  Cell,
  Tabbar,
  Calendar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Grid,
  Stepper,
  Divider,
  GridItem,
  Rate,
  Dialog,
  NavBar,
  Loading,
  Icon,
  Image,
  Form,
  Popup,
  Picker,
  DatetimePicker,
  Field,
  ActionBar,
  ActionBarButton,
  CellGroup,
  Sticky,
  Card,Sidebar,
  SidebarItem ,
  ConfigProvider,
  Checkbox,
  Cascader,
  CountDown,
  Steps,
  Step,
  RadioGroup,
  Radio,
  Row, Col,
  Uploader
} from "vant";

const plugins = [
  Button,
  List,
  Tab,
  Tabs,
  Cell,
  Rate,
  Tabbar,
  Dialog,
  TabbarItem,
  Calendar,
  Swipe,
  Stepper,
  Divider,
  SwipeItem,
  Grid,
  ActionBar,
  ActionBarButton,
  Loading,
  Form,
  Field,
  CellGroup,
  GridItem,
  NavBar,
  Icon,
  Sticky,
  Popup,
  Picker,
  DatetimePicker,
  Image,
  Card,Sidebar,
  SidebarItem,
  ConfigProvider,
  Checkbox,
  Cascader,
  CountDown,
  Steps,
  Step,
  RadioGroup,
  Radio,
  Row, Col,
  Uploader
];

export const vantPlugins = {
  install: function(app) {
    plugins.forEach(item => {
      if(item.name === 'Dialog') {
        app.component(item.Component.name, item.Component);
      }else {
        app.component(item.name, item);
      }
      // app.use(item)
    });
  }
};
