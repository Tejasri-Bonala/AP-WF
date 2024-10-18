sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";

      
  
      return BaseController.extend("com.aperam.workflowuimodule.controller.App", {
        determineFieldVisibility: function(accountingType, fieldType) {
          switch (accountingType) {
            case "Capex":
              return fieldType === "Capex";
            case "Opex":
              return fieldType === "Opex";
            case "Lease":
              return fieldType === "Lease";
            case "Capex/Opex":
              return fieldType === "Capex" || fieldType === "Opex";
            default:
              return false;
          }
        },
        onInit() {
        },
      });
    });
  