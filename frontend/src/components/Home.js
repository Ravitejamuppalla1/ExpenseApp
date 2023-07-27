import { startAccountDetails } from "../actions/useraction"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startAccountDetails())
    }, [])
    const AccountDetails = useSelector((state) => {
        return state.userdata.data
    })

    return (
        <div className='container-fluid'>
            <div className='row'>
                <center> <h2 style={{ color: "DarkBlue" }}>Welcome to Home page</h2></center>
                <div className='col-md-6'>
                    <h3 style={{ paddingTop: '100px' }}>
                        Keeping track of expenses is an essential aspect of financial management. It is crucial for individuals,
                        businesses and organizations to keep track of their spending habits so that they can make informed decisions
                        about future expenditures. Firstly, tracking expenses helps us identify areas where we tend to overspend </h3>
                </div>
                <div className='col-md-4' >
                    <img src="https://bookkeepers.com/wp-content/uploads/2020/01/monthly-expenses-planning-checklist-receipts-wallet-how-to-stick-to-a-budget-ss-featured.jpg.webp"
                        alt="village app" style={{ width: "600px", height: "400px" }} />
                </div>
            </div>
        </div>

    )
}

export default Home