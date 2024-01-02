import React, { useState } from 'react';
import { CardField, StripeProvider } from '@stripe/stripe-react-native';
import { View,Text, SafeAreaView} from 'react-native';

const StripePayement = () => {
  const [complete, setComplete] = useState(false);

  const handlePayment = async () => {
    // Ici, vous effectuez le paiement en utilisant la bibliothèque Stripe.
    // Utilisez les informations de carte entrées par l'utilisateur et la clé secrète Stripe.

    // Après avoir effectué le paiement avec succès, définissez complete sur true.
    setComplete(true);
  };

  return (
    <SafeAreaView>
    <StripeProvider publishableKey="votre_cle_stripe">
      <View style={{width:'100%'}}>
        <CardField
          postalCodeEnabled={false} // Personnalisez selon vos besoins
          onCardChange={(cardDetails) => {
            // Vous pouvez gérer les détails de la carte en temps réel ici
          }}
        />
        <Text onClick={handlePayment}>Payer</Text>
      </View>
    </StripeProvider>

    </SafeAreaView>
  )

};

export default StripePayement;
