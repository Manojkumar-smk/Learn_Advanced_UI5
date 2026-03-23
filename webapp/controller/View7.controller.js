sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";
    return Controller.extend("com.demo.learnui5.controller.View7", {
        onInit() {
            this.getOwnerComponent().getRouter().getRoute("RouteView7").attachPatternMatched(this._onPatternMatched, this);
        },
        _onPatternMatched: function(oEvent) {
            var empId = oEvent.getParameter("arguments").key;
            this.empId =empId;
            this.getView().bindElement("oModel>/EmployeeSet('" + empId + "')");
        },
        onNavBack() {
            this.getOwnerComponent().getRouter().navTo("RouteView6");
        }
    })
})