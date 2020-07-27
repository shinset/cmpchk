
function cmpChk() { // create a useless function because this script could run without it as a simple snippet in your console
console.log('%c + C M P C H K +', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');

try { // lets try to call a CMP framework
 
    /* check IF the typeof __tcfapi (cmp V2) IS NOT undefined which mean it does exist in the page context */ 

    if (typeof(__tcfapi) != 'undefined') {
        
   /* Then PING the __tcfapi to check the CMP load & status then return the full object */     
  __tcfapi('ping', 2, (pingReturn) => {
console.debug('PING cmp v2 status');
console.warn('Ping the cmp V2 infos \n cmpLoaded is = '+ pingReturn.cmpLoaded +' \n cmpStatus is = ' + pingReturn.cmpStatus);
console.debug(pingReturn);

/*Display a warning IF the cmploaded return FALSE */
  if (pingReturn.cmpLoaded === false ){ 
console.warn(" !!! WARNING !!! __tcfapi found (CMP v2) but not loaded ! check the CMP \n " + "cmpLoaded = " + pingReturn.cmpLoaded )
alert(" !!! WARNING !!! __tcfapi (CMP V2) found but not loaded ! check the CMP \n " + "cmpLoaded = " + pingReturn.cmpLoaded )
};
 
  }); 

// Now that we've checked the __tcfapi status lets check the datas

        __tcfapi('getTCData', 2, cmp_V2 => {

/*Check the cmpStatus is correctly loaded and if the consent string (tcString) is empty or null
 which mean the cmp is loaded but misconfigured or the user declined the whole CMP  */
  
            if (cmp_V2.cmpStatus == 'loaded' && (cmp_V2.tcString == '' || cmp_V2.tcString == null)) {
                console.warn('CONSENT STRING MISSING CHECK USER ACTIONS in cmp UI or CMP integration')
            }

 /* IF cmpStatus is loaded & tcString is not empty or null ,then proceed and log the infos*/           
            if (cmp_V2.cmpStatus == 'loaded' && (cmp_V2.tcString != '' || cmp_V2.tcString != null)) {
                console.debug("CMP v2 infos");
                console.warn("FOUND TCFAPI CMP.V2\nConsent string V2 (C)\n Copy & Paste it into an IAB TCF V2 decoder like https://consentstringdecoder.com or https://iabtcf.com/#/decode \n Vendors list https://iabeurope.eu/vendor-list-tcf-v2-0/ \n json version https://vendorlist.consensu.org/v2/vendor-list.json ");
                console.debug("Consent String");
                console.info(cmp_V2.tcString); // log the console string alone for ease of use and try to copy later
                console.debug(cmp_V2); // log the whole object for more detail 
              copy(cmp_V2.tcString); // try to copy the consent string to clipboard ( it may fail sometime depending the site)
              alert("Consent string V2 copied to clipboard ! ");


                window.open('https://consentstringdecoder.com/', '_blank'); //  open a windows to the official IAB decoder tool https://iabtcf.com/#/decode



            }
        });
    }

/* Now lets try to check IF the typeof __CMP (cmp v1) IS NOT undefined which mean it exist in the page context */ 
 
    if (typeof(__cmp) != 'undefined') {
      /* Check IF the consent string (consentData) is empty or null which mean integration issue or user decline the whole cmp */
        __cmp('getConsentData', 1, cmp_V1 => {
            if (cmp_V1.consentData == '' || cmp_V1.consentData == null) {
                console.warn('CONSENT STRING MISSING CHECK USER ACTIONS in cmp UI or CMP integration')
            }

            /* if consentData is not empty or null then proceed the data log */
            if (cmp_V1.consentData != '' || cmp_V1.consentData != null) {
                              console.debug("CMP v1 infos");
                console.warn("FOUND CMP.V1\nConsent string V1 (B)\n Copy & Paste it into an IAB TCF V1  decoder like https://acdn.origin.appnexus.net/cmp/docs/#/tools/vendor-cookie-inspector or use cookie glass https://chrome.google.com/webstore/detail/cookie-glasses/gncnjghkclkhpkfhghcbobednpchjifk");
                               console.info("Consent String");

                console.info(cmp_V1.consentData); // log the consent string alone for ease of use 
                console.debug(cmp_V1); // log the whole object for more detail 
                                copy(cmp_V1.consentData); // try to copy the consent string
                                alert("Consent string V1 copied to clipboard ! ");



                window.open('https://acdn.origin.appnexus.net/cmp/docs/#/tools/vendor-cookie-inspector', '_blank'); // open new window to appnexus decoding console 

            }

        });

    }

/* Lastly try to check the type of  __uspapi and return the full object
not much detail here was I dont have use case and its returned in the  __tcfapi anyway with only very few infos like version '1' and short string (uspString)
*/
        if (typeof(__uspapi) != 'undefined') {
__uspapi('getUSPData', 1, (CCPA) =>{
                                console.debug("CCPA infos");
                console.warn('FOUND CCPA FRAMEWORK \n ')
                console.debug(CCPA)
            }

    )

         }

    

/*  IF all the cmps invocation returned undefined that mean either CMP is not iab compliant OR  missing on the site */

    if (typeof(__cmp) == 'undefined' && typeof(__tcfapi) == 'undefined' && typeof(__uspapi)== 'undefined') {
        console.error(" !! NO IAB FRAMEWORK FOUND !! \n Check if there is GDPR string in your adcall and contact publisher")
                alert(" !! NO IAB FRAMEWORK FOUND !! \n Check if there is GDPR string in your adcall and contact publisher")

    }
}
// catch error 
catch (e) { 
    console.error(e);
}


} 
// call my useless function  now 
window.onload = cmpChk();
