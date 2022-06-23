import Vue from 'vue'
import Table from "@/components/Table"
import Title from "@/components/Title"
import DialogAlert from "@/components/DialogAlert"
import Input from "@/components/Form Components/Input"
import FormSelect from "@/components/Form Components/FormSelect"
import FormSelectTyping from "@/components/Form Components/FormSelectTyping"
import Search from "@/components/Search"
import ArtcalsForm from "@/components/Forms/ArticalForm"
import Button from "@/components/Button"
import Loading from "@/components/Loading"
import Stepper from "@/components/Stepper"
import DragDropImages from "@/components/DragDropImages"
import AutoComplete from "@/components/Form Components/AutoComplete"
import Switcher from "@/components/Form Components/Switcher"
import TextArea from "@/components/Form Components/TextArea"
import File from "@/components/Form Components/File"
import RadioButtonsGroup from "@/components/Form Components/RadioButtonsGroup"
import FormSlider from "@/components/Form Components/FormSlider"
import Datepicker from "@/components/Form Components/Date"
import Carousal from "@/components/Carousal"

import ReasonReject from "@/components/Form Components/ReasonReject"
import Filters from "./components/FIlters/Filters"
import CountFilter from "./components/FIlters/components/CountFilter"
import ComperFilter from "./components/FIlters/components/ComperFilter"

import DateFilter from "./components/FIlters/components/DateFilter"
import OfficeForm from "./components/Forms/OfficeForm"


Vue.component('Table', Table)
Vue.component('Title', Title)
Vue.component('DialogAlert', DialogAlert)
Vue.component('Input', Input)
Vue.component('FormSelect', FormSelect)
Vue.component('FormSelectTyping', FormSelectTyping)
Vue.component('Search', Search)
Vue.component('Button', Button)
Vue.component('Loading', Loading)
Vue.component('Stepper', Stepper)
Vue.component('ArtcalsForm', ArtcalsForm)

Vue.component('DragDropImages', DragDropImages)
Vue.component('AutoComplete', AutoComplete)
Vue.component('Carousal', Carousal)
Vue.component('Switcher', Switcher)
Vue.component('TextArea', TextArea)
Vue.component('File', File)
Vue.component('RadioButtonsGroup', RadioButtonsGroup)
Vue.component('FormSlider', FormSlider)
Vue.component('Date', Datepicker)
Vue.component('Filters', Filters)
Vue.component('CountFilter', CountFilter)
Vue.component('ComperFilter', ComperFilter)
Vue.component('ReasonReject',ReasonReject)
Vue.component('DateFilter', DateFilter)
Vue.component('OfficeForm', OfficeForm)
export default {}