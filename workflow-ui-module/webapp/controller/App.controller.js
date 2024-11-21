sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/format/DateFormat",
  ],
  function (BaseController, DateFormat) {
    "use strict";



    return BaseController.extend("com.aperam.workflowuimodule.controller.App", {
     
      formatYear: function (sValue) {
        if (sValue) {
            return sValue.replace(",", ""); 
        }
        return sValue;
    },
      onInit() {
        let oIconTabBar = this.byId("iconTabBar");
        oIconTabBar.setSelectedKey("BasicInfo");

        let oBasicInfoTab = oIconTabBar.getItems().find(item => item.getKey() === "BasicInfo");
        if (oBasicInfoTab) {
            oBasicInfoTab.getDomRef().focus();
        }
       
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
