import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
import { useCompanyDetails } from '../../../Hooks/Company';
import axios from 'axios';
import { payment } from '../../../api';


const loadScript = (src) => {
    return new Promise((resolve ) => {
      const script = document.createElement("script")
      script.src = src;
      script.onload = () => {
        resolve(true)
      }
      script.onerror = (err) => {
        console.log("Error  : ",err);
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

const PaymentCard = ({small ,colored,popular,planName,amount,days}) => {
    
     const [company, setCompany] = useState(JSON.parse(localStorage.getItem('company')))
        const {isLoading , isError , error , data} = useCompanyDetails(company?.company._id)
        const [plan, setPlan] = useState(null)
    
        async function displayRazorpay() {

            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

            
            if(!res) return alert('Razorpay SDK failed to load. Are you online ?')
            
            const resp =await payment({amount:amount},data?.data.company._id)
        
            const options = {
                "key": process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount,
                "name": {plan},
                "currency" : resp.data.currency,
                "amount" : resp.data.amount.toString(),
                "description": "Thank you for choosing jobsWay.",
                "image": "http://localhost:4000/logo.jpg",
                "order_id": resp.data.id,
                "handler": function (response){
                    alert(response.razorpay_payment_id);
                    alert(response.razorpay_order_id);
                    alert(response.razorpay_signature)
                },
                "prefill": {
                    "name": data?.data.company.companyName,
                    "email": data?.data.company.email,
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#008FAE"
                }
            }
            var paymantObject = new window.Razorpay(options)
            paymantObject.open()
        }
    

    const handleClick = (e) => {
        e.preventDefault()
        if(amount == 0){
            console.log("isZero",amount);
        }else{
            displayRazorpay()
        }
    }
    

    return (
        <div className={`w-3/4 m-8 h-${small ? '80' : '96'} shadow-xl rounded-xl flex flex-col justify-between p-6 ${colored && 'text-white'}`} style={!colored ? {border : '.5px solid #0A0047'} : {backgroundColor:'#0A0047'}}>
           <div className="flex justify-between items-center">
           <h4 className="font-semibold text-xl w-full">{planName}</h4>
           {popular && <span className="text-sm bg-success py-1 px-4 rounded-2xl text-white ">Popular</span>}
           </div>
            <div className="w-full flex items-center justify-center flex-col">
                <div className="flex items-end"><p className="text-6xl font-semibold flex items-center"><Icon icon="bx:bx-rupee" color="black" height="54" className="p-0 m-0" color={colored && '#f8f8f8'} />{amount}</p><span className="text-secondary text-sm mb-3">/job</span></div>
                <p className="mt-2">Jobs Show for {days} days</p>
            </div>
            <Link className="bg-primary w-full rounded-md h-10 flex items-center justify-center text-white font-semibold" style={{backgroundColor:'#5B40FF'}} onClick={handleClick}>Select Plan</Link>
        </div>
    )
}

export default PaymentCard
