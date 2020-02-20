import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import { Redirect } from 'react-router-dom';

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
      var GETParams = GETParams || {};
      var url = url || "";
      url = location.href;

      var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&')

      for (var i = 0; i < parameters.length; i++) {
          var key = parameters[i].split('=')[0]
          var value = parameters[i].split('=')[1]
          GETParams[key] = value
      }

      return GETParams[name];
    };

    render() {
      console.log("리다이렉트~");
      
      const token = this.getUrlParameter('token');
      const error = this.getUrlParameter('error');

      if(token) {
          localStorage.setItem(ACCESS_TOKEN, token);
          return <Redirect to={{
              pathname: "/profile",
              state: { from: this.props.location }
          }}/>; 
      } else {
          return <Redirect to={{
              pathname: "/login",
              state: { 
                  from: this.props.location,
                  error: error 
              }
          }}/>; 
      }
    }
}

export default OAuth2RedirectHandler;