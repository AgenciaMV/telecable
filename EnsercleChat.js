/*
* EnsercleChat.js - Javascript library to embed Chat functionality into a web page.
*
* @author     Girish P Nair
* @date       02/11/09
*
* Modification History :-
*
* Date         Author               Reason
* ====         ======               ======
* 02/11/09     Girish P Nair        Initial creation.
*
* Copyright © 2009 by SER Solutions, Inc. All Rights Reserved.
*
*/

var __gChatWin = null;
function waLaunchChatWindow(url, campaign, name, email, language, properties) {
    /// <summary>
    ///   Launches the chat window.
    /// </summary>
    /// <param name="url" type="String" optional="false">
    ///   The chat url.
    /// </returns>
    /// <param name="campaign" type="String" optional="false">
    ///   The campaign DNIS.
    /// </returns>
    /// <param name="name" type="String" optional="true">
    ///   The customer name. If not specified, will prompt for name.
    /// </returns>
    /// <param name="email" type="String" optional="true">
    ///   The email address. If not specified, will prompt for email.
    /// </returns>
    /// <param name="language" type="String" optional="true">
    ///   The language code. If not specified, will use the preferred language setting in the browser.
    /// </returns>
    /// <param name="properties" type="String" optional="true">
    ///   Additional properties in the format 'prop1=value1&prop2=value2&propN=valueN'.
    /// </returns>


    // If a chat window is already open, just bring it to focus.
    if (__gChatWin != null && __gChatWin.closed == false) {
        __gChatWin.focus();
        return;
    }

    if (typeof (url) == "undefined" || url == null) {
        alert("Please specify the chat url");
        return;
    }

    if (typeof (campaign) == "undefined" || campaign == null || campaign == '') {
        alert("Please specify the campaign");
        return;
    }
    
    var customerName = '';
    if (typeof (name) != "undefined" && name != null && name != '') {
        customerName = name;
    }
      
    var customerEmail = '';
    if (typeof (email) != "undefined" && email != null && email != '') {
        customerEmail = email;
    }

    var customerLanguage = '';
    if (typeof (language) != "undefined" && language != null && language != '') {
        customerLanguage = language;
    }

    var additionalProperties = '';
    if (typeof (properties) != "undefined" && properties != null && properties != '') {
        additionalProperties = '&' + properties;
    }
  
    var completeURL = (url == '') ? 'Default.aspx' : url + '/Default.aspx' ;
    completeURL += '?Campaign=' + campaign;
    completeURL += '&Name=' + customerName;
    completeURL += '&Email=' + customerEmail;
    completeURL += '&Language=' + customerLanguage;
    completeURL += additionalProperties;

    // Launch the chat window.
    __gChatWin = window.open(completeURL, 'ENSERCLE_CHAT_WIN', 'menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes,status=yes,width=640,height=500');
    __gChatWin.focus();
    
    return;
}

