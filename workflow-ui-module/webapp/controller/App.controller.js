sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.aperam.workflowuimodule.controller.App", {
        onInit() {
        },
        
        startWorkflowInstance: function () {
          var model = this.getView().getModel();
          var definitionId = "productapproval";
          var initialContext = model.getProperty("/initialContext");

          var data = {
            definitionId: definitionId,
            context: JSON.parse(initialContext),
          };

          $.ajax({
            url: this._getWorkflowRuntimeBaseURL() + "/workflow-instances",
            method: "POST",
            async: false,
            contentType: "application/json",
            headers: {
              "X-CSRF-Token": this._fetchToken(),
            },
            data: JSON.stringify(data),
            success: function (result, xhr, data) {
              model.setProperty(
                "/apiResponse",
                JSON.stringify(result, null, 4)
              );
            },
            error: function (request, status, error) {
              var response = JSON.parse(request.responseText);
              model.setProperty(
                "/apiResponse",
                JSON.stringify(response, null, 4)
              );
            },
          });
        },

        _fetchToken: function () {
          var fetchedToken;

          jQuery.ajax({
            url: this._getWorkflowRuntimeBaseURL() + "/xsrf-token",
            method: "GET",
            async: false,
            headers: {
              "X-CSRF-Token": "Fetch",
            },
            success(result, xhr, data) {
              fetchedToken = data.getResponseHeader("X-CSRF-Token");
            },
          });
          return fetchedToken;
        },

        _getWorkflowRuntimeBaseURL: function () {
          var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
          var appPath = appId.replaceAll(".", "/");
          var appModulePath = jQuery.sap.getModulePath(appPath);

          return appModulePath + "/bpmworkflowruntime/v1";
        },
      });
    });
  