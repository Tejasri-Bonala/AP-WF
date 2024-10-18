sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/format/DateFormat",
  ],
  function (BaseController, DateFormat) {
    "use strict";



    return BaseController.extend("com.aperam.workflowuimodule.controller.App", {
      determineFieldVisibility: function (accountingType, fieldType) {
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
        //   var oFeedModel = new sap.ui.model.json.JSONModel({
        //     EntryCollection: []
        // });
        // this.getView().setModel(oFeedModel, "Feed");
      },
      onPost: function (oEvent) {
        var oFormat = DateFormat.getDateTimeInstance({ style: "medium" });
        var oDate = new Date();
        var sDate = oFormat.format(oDate);
        var sValue = oEvent.getParameter("value");

        // create new entry
        var oEntry = {
          Author: "Saurabh",
          Text: sValue
        };

        // get the Feed model
        var oModel = this.getView().getModel("Feed");

        if (oModel) {
          var aEntries = oModel.getData().EntryCollection || [];
          aEntries.unshift(oEntry);
          oModel.setData({
            EntryCollection: aEntries
          });
        } else {
          console.error("Feed model not found");
        }
      }


    });
  });
