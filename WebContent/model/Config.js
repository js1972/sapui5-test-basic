/**
 * Module to detect if we use mock data or not.
 */
(function() {
        "use strict";

        jQuery.sap.declare("model.Config");

        model.Config = {};

        (function() {

                // the "responder" URL parameter defines if the app shall run with mock data
                var responderOn = jQuery.sap.getUriParameters().get("responderOn");

                // set the flag for later usage
                model.Config.isMock = (responderOn === "true");
        })();
})();