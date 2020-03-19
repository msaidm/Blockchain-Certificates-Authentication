import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

export default class listWallets extends React.Component {
      
        constructor(props){
          super(props);
          this.state ={ 
              allWallets: []
              }
        }

  listAllWallets(){
     fetch('https://api.streetcred.id/custodian/v1/api/wallets', {
        method: 'GET',
        headers: {
                Authorization: 'Bearer dq6RoZ4gJWss_hRtGC_cyUBv66JwZhUbRRKukMPtv4o',
                XStreetcredSubscriptionKey: '0c1596b315f84ac9a4de6810ef464411',
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
      })
        .then(response => response.json())
        .then(json => {        
                this.setState({
                allWallets: json,
                isLoading: false,
                });   
                       } )
        .catch(error => {
          console.error(error);
        });
        
   }

}
