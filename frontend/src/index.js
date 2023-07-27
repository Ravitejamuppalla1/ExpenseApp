import App from "./App";
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Configurestore from "./store/configurestore";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
const store = Configurestore()
console.log(store.getState())

store.subscribe(() => {
    console.log(store.getState())
})
const Root = ReactDOM.createRoot(document.getElementById('root'))
Root.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>)