function cmpChk() {

try {
    if (typeof(__tcfapi) != 'undefined') {
        __tcfapi('getTCData', 2, cmp_V2 => {

            if (cmp_V2.cmpStatus == 'loaded' && (cmp_V2.tcString == '' || cmp_V2.tcString == null)) {
                console.log('CONSENT STRING MISSING CHECK USER ACTIONS in cmp UI or CMP integration')
            }
            if (cmp_V2.cmpStatus == 'loaded' && (cmp_V2.tcString != '' || cmp_V2.tcString != null)) {
                console.log("FOUND TCFAPI CMP.V2\nConsent string V2 (C)\n Copy & Paste it into an IAB TCF V2 decoder like https://consentstringdecoder.com or https://iabtcf.com/#/decode");
                console.log(cmp_V2.tcString);
                console.log(cmp_V2);
                alert('Found Consent String TCF v2\n Check console log \n' + cmp_V2.tcString);
                copy(cmp_V2.tcString);
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
                alert('Found Consent String CMP v1\n Check console log \n' + cmp_V1.consentData);
                                copy(cmp_V1.consentData);


                window.open('https://acdn.origin.appnexus.net/cmp/docs/#/tools/vendor-cookie-inspector', '_blank');

            }

        });

    }

    if (typeof(__cmp) == 'undefined' && typeof(__tcfapi) == 'undefined') {
        console.log(" !! NO IAB FRAMEWORK FOUND !! \n Check if there is GDPR string in your adcall and contact publisher")
                alert(" !! NO IAB FRAMEWORK FOUND !! \n Check if there is GDPR string in your adcall and contact publisher")

    }
}

catch (e) {
    console.log(e);
}


} 

window.onload = cmpChk();
  /*
            function ReadCookie() {
               var allcookies = document.cookie;
               document.write ("All Cookies : " + allcookies );
               
               // Get all the cookies pairs in an array
               cookiearray = allcookies.split(';');
               
               // Now take key value pair out of this array
               for(var i=0; i<cookiearray.length; i++) {
                  name = cookiearray[i].split('=')[0];
                  value = cookiearray[i].split('=')[1];
                  document.write ("Key is : " + name + " and Value is : " + value);
               }
            }
         */
// https://www.tutorialspoint.com/javascript/javascript_cookies.htm | https://ppk.developpez.com/tutoriels/javascript/gestion-cookies-javascript/ | https://javascript.info/cookie
// ref https://iabeurope.eu/tcf-2-0/ | https://iabeurope.eu/events/tcf-workshop-webinars-switch-over-from-tcf-v1-0-to-tcf-v2-0-support/
