import React, {useEffect,useState,useRef} from 'react';
import { View,Text,Button } from 'react-native';

// import { Container } from './styles';

const Paypal = () => {
    const [checkout,setcheckout]=useState(false)

    useEffect(()=>{
         window.paypal.Button({
         createOrder:(data,action,err)=>{
            return action .order.create({
                intent:"CAPTURE",
                purchase_units:{
                    description:'Cool Phone',
                    amount:{
                        currency_code:"CAD",
                        value:650.00                    }

                }
            })
         },
         onApprove:async(data,actions)=>{
           const order =await action.order.capture();
           console.log(order);
         },
         onError:(err)=>{
            console.log(err)
         }
         }).render(paypal.currrent)
    },[])

  return (
    <View ref={paypal}>
        <Text>Paypal</Text>
    </View> 
  )
}

export default Paypal;