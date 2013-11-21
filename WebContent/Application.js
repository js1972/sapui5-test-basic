/**
 * Manage application startup
 * init() is called prior to the DOMN being available.
 * main() is called after the DOM is ready.
 */
(function() {
    "use sctrict";
    
    jQuery.sap.declare("Application");
    jQuery.sap.require("sap.ui.app.Application");
    jQuery.sap.require("model.Config");

    sap.ui.app.Application.extend("Application", {
	
        init : function() {
            // set global models
            
            // setup a model for internationalised texts. We just hard-code "en" here to stop
            // the spurious http requests looking for en-US, en, default properties files.
            
            //var locale = sap.ui.getCore().getConfiguration().getLanguage();
            var resourceModel = new sap.ui.model.resource.ResourceModel({
                bundleName:"i18n.i18n",
                bundleLocale: "en"  //locale
            });
            sap.ui.getCore().setModel(resourceModel, "i18n");

            //var model = new sap.ui.model.json.JSONModel("model/data.json");
            //var imgModel = new sap.ui.model.json.JSONModel("model/img.json");
            //sap.ui.getCore().setModel(model);
            //sap.ui.getCore().setModel(imgModel, "img");

            // read data global data models here - use mock data if url contains "responderOn"
            this.eventBus = sap.ui.getCore().getEventBus();
            
            if (model.Config.isMock) {
                jQuery.sap.require("sap.ui.app.MockServer");
                
                var mockServer = new sap.ui.app.MockServer({
                    rootUri: model.Config.getServiceUrl()
                });
                
                //The mock server needs a metadata XML file describing the data structure of your 
                //service. You can easily obtain this by opening the oData service root URL in a 
                //browser with the suffix "$metadata" appended. Copy the resulting XML file into 
                //the model folder of your application. 
                mockServer.simulate("model/metadata.xml", "model/");
                mockServer.start();
                
                // load the mock data model
                //var jsonModel = new sap.ui.model.json.JSONModel("model/mock.json");
                //sap.ui.getCore().setModel(jsonModel);
                //jsonModel.attachRequestCompleted(function() {
                //    this.eventBus.publish("data.loaded");
                //}, this);
            } else {
                // load real data from server
                //var odataModel = new sap.ui.model.odata.ODataModel(this.dataUrl);
                //sap.ui.getCore().setModel(odataModel);
                //odataModel.attachRequestCompleted(function() {
                //    this.eventBus.publish("data.loaded");
                //}, this);
            }
        },
	
        main : function() {
            // create app view and put to html root element
            var root = this.getRoot();
            sap.ui.xmlview("mainView", "view.Hello").placeAt(root);
        }

    });
})();