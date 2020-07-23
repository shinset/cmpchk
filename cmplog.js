function cmpChk() {

try {

    if (typeof(__tcfapi) != 'undefined') {
        
        
  __tcfapi('ping', 2, (pingReturn) => {
console.log(pingReturn);

  if (pingReturn.cmpLoaded === false ){

console.log(" !!! WARNING !!! CMP V2 found but not loaded ! check the CMP \n " + "cmpLoaded = " + pingReturn.cmpLoaded )
alert(" !!! WARNING !!! CMP V2 found but not loaded ! check the CMP \n " + "cmpLoaded = " + pingReturn.cmpLoaded )
};

 
});

        
        
        
        __tcfapi('getTCData', 2, cmp_V2 => {

            if (cmp_V2.cmpStatus == 'loaded' && (cmp_V2.tcString == '' || cmp_V2.tcString == null)) {
                console.log('CONSENT STRING MISSING CHECK USER ACTIONS in cmp UI or CMP integration')
            }
            if (cmp_V2.cmpStatus == 'loaded' && (cmp_V2.tcString != '' || cmp_V2.tcString != null)) {
                console.log("FOUND TCFAPI CMP.V2\nConsent string V2 (C)\n Copy & Paste it into an IAB TCF V2 decoder like https://consentstringdecoder.com or https://iabtcf.com/#/decode \n Vendors list https://iabeurope.eu/vendor-list-tcf-v2-0/ \n json version https://vendorlist.consensu.org/v2/vendor-list.json ");
                console.log(cmp_V2.tcString);
                console.log(cmp_V2);
              copy(cmp_V2.tcString);
              alert("Consent string copied to clipboard ! ");


                window.open('https://consentstringdecoder.com/', '_blank'); // official IAB decoder tool https://iabtcf.com/#/decode



            }
        });
    }


    if (typeof(__cmp) != 'undefined') {
        __cmp('getConsentData', 1, cmp_V1 => {
            if (cmp_V1.consentData == '' || cmp_V1.consentData == null) {
                console.log('CONSENT STRING MISSING CHECK USER ACTIONS in cmp UI or CMP integration')
            }
            if (cmp_V1.consentData != '' || cmp_V1.consentData != null) {
                console.log("FOUND CMP.V1\nConsent string V1 (B)\n Copy & Paste it into an IAB TCF V1  decoder like https://acdn.origin.appnexus.net/cmp/docs/#/tools/vendor-cookie-inspector or use cookie glass https://chrome.google.com/webstore/detail/cookie-glasses/gncnjghkclkhpkfhghcbobednpchjifk");
                console.log(cmp_V1.consentData);
                console.log(cmp_V1);
                                copy(cmp_V1.consentData);
                                alert("Consent string copied to clipboard ! ");



                window.open('https://acdn.origin.appnexus.net/cmp/docs/#/tools/vendor-cookie-inspector', '_blank');

            }

        });

    }


        if (typeof(__uspapi) != 'undefined') {
__uspapi('getUSPData', 1, (CCPA) =>{
                console.log('FOUND CCPA FRAMEWORK \n ')
                console.log(CCPA)
            }

    )

         }

    



    if (typeof(__cmp) == 'undefined' && typeof(__tcfapi) == 'undefined' && typeof(__uspapi)== 'undefined') {
        console.log(" !! NO IAB FRAMEWORK FOUND !! \n Check if there is GDPR string in your adcall and contact publisher")
                alert(" !! NO IAB FRAMEWORK FOUND !! \n Check if there is GDPR string in your adcall and contact publisher")

    }
}

catch (e) {
    console.log(e);
}


} 

window.onload = cmpChk();
