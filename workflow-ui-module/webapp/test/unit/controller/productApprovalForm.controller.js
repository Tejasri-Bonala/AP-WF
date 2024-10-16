/*global QUnit*/

sap.ui.define([
	"comaperam/workflow-ui-module/controller/productApprovalForm.controller"
], function (Controller) {
	"use strict";

	QUnit.module("productApprovalForm Controller");

	QUnit.test("I should test the productApprovalForm controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
