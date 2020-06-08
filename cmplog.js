try {
    if (typeof(__tcfapi) != 'undefined') {
        __tcfapi('getTCData', 2, cmp_V2 => {

            if (cmp_V2.cmpStatus == 'loaded' && (cmp_V2.tcString == '' || cmp_V2.tcString == null)) {
                console.log('CONSENT STRING MISSING CHECK USER ACTIONS in cmp UI or CMP integration')
            }
            if (cmp_V2.cmpStatus == 'loaded' && (cmp_V2.tcString != '' || cmp_V2.tcString != null)) {
                console.log("FOUND TCFAPI CMP.V2\nConsent string V2 (C) copied into your clipboard !\nPaste it into an IAB TCF V2 decoder");
                console.log(cmp_V2.tcString);
                console.log(cmp_V2);
                copy(cmp_V2.tcString);
                alert('Consent V2 copied to clipboard !')
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
                console.log("FOUND CMP.V1\nConsent string V1 (B) copied into your clipboard !\nPaste it into an IAB TCF V1  decoder");
                console.log(cmp_V1.consentData);
                console.log(cmp_V1);
                copy(cmp_V1.consentData);
                alert('Consent V1 copied to clipboard !')

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
// ref https://iabeurope.eu/tcf-2-0/
