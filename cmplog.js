 function cmpChk() { // create a useless function because this script could run without it as a simple snippet in your console

try { // lets try to call a CMP framework
 
    /* check IF the typeof __tcfapi (cmp V2) IS NOT undefined which mean it does exist in the page context */ 

    if (typeof(__tcfapi) != 'undefined') {
        
   /* Then PING the __tcfapi to check the CMP load & status then return the full object */     
  __tcfapi('ping', 2, (pingReturn) => {
console.log('Ping the cmp V2 infos \n cmpLoaded is = '+ pingReturn.cmpLoaded +' \n cmpStatus is = ' + pingReturn.cmpStatus);
console.log(pingReturn);

/*Display a warning IF the cmploaded return FALSE */
  if (pingReturn.cmpLoaded === false ){ 
console.log(" !!! WARNING !!! __tcfapi found (CMP v2) but not loaded ! check the CMP \n " + "cmpLoaded = " + pingReturn.cmpLoaded )
alert(" !!! WARNING !!! __tcfapi (CMP V2) found but not loaded ! check the CMP \n " + "cmpLoaded = " + pingReturn.cmpLoaded )
};
 
  }); 

// Now that we've checked the __tcfapi status lets check the datas

        __tcfapi('getTCData', 2, cmp_V2 => {

/*Check the cmpStatus is correctly loaded and if the consent string (tcString) is empty or null
 which mean the cmp is loaded but misconfigured or the user declined the whole CMP  */
  
            if (cmp_V2.cmpStatus == 'loaded' && (cmp_V2.tcString == '' || cmp_V2.tcString == null)) {
                console.log('CONSENT STRING MISSING CHECK USER ACTIONS in cmp UI or CMP integration')
            }

 /* IF cmpStatus is loaded & tcString is not empty or null ,then proceed and log the infos*/           
            if (cmp_V2.cmpStatus == 'loaded' && (cmp_V2.tcString != '' || cmp_V2.tcString != null)) {
                console.log("FOUND TCFAPI CMP.V2\nConsent string V2 (C)\n Copy & Paste it into an IAB TCF V2 decoder like https://consentstringdecoder.com or https://iabtcf.com/#/decode \n Vendors list https://iabeurope.eu/vendor-list-tcf-v2-0/ \n json version https://vendorlist.consensu.org/v2/vendor-list.json ");
                console.log(cmp_V2.tcString); // log the console string alone for ease of use and try to copy later
                console.log(cmp_V2); // log the whole object for more detail 
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
                console.log('CONSENT STRING MISSING CHECK USER ACTIONS in cmp UI or CMP integration')
            }

            /* if consentData is not empty or null then proceed the data log */
            if (cmp_V1.consentData != '' || cmp_V1.consentData != null) {
                console.log("FOUND CMP.V1\nConsent string V1 (B)\n Copy & Paste it into an IAB TCF V1  decoder like https://acdn.origin.appnexus.net/cmp/docs/#/tools/vendor-cookie-inspector or use cookie glass https://chrome.google.com/webstore/detail/cookie-glasses/gncnjghkclkhpkfhghcbobednpchjifk");
                console.log(cmp_V1.consentData); // log the consent string alone for ease of use 
                console.log(cmp_V1); // log the whole object for more detail 
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
                console.log('FOUND CCPA FRAMEWORK \n ')
                console.log(CCPA)
            }

    )

         }

    

/*  IF all the cmps invocation returned undefined that mean either CMP is not iab compliant OR  missing on the site */

    if (typeof(__cmp) == 'undefined' && typeof(__tcfapi) == 'undefined' && typeof(__uspapi)== 'undefined') {
        console.log(" !! NO IAB FRAMEWORK FOUND !! \n Check if there is GDPR string in your adcall and contact publisher")
                alert(" !! NO IAB FRAMEWORK FOUND !! \n Check if there is GDPR string in your adcall and contact publisher")

    }
}
// catch error 
catch (e) { 
    console.log(e);
}


} 
// call my useless function  now 
window.onload = cmpChk();
