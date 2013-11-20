/**
 * SAPUI5 Application
 */
(function() {
	jQuery.sap.declare("Application");
	jQuery.sap.require("sap.ui.app.Application");

	sap.ui.app.Application.extend("Application", {
	
		init : function() {
			this.Locale = new sap.ui.core.Locale(sap.ui.getCore().getConfiguration().getFormatLocale());

			var resourceModel = new sap.ui.model.resource.ResourceModel({bundleName:"i18n.i18n", bundleLocale: this.Locale});
			sap.ui.getCore().setModel(resourceModel, "i18n");
		},
	
		main : function() {
			// create app view and put to html root element
			var root = this.getRoot();
			sap.ui.xmlview({id: "mainView", viewName: "view.Hello", type:sap.ui.core.mvc.ViewType.XML}).placeAt(root);
		}

	});
})();