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
        },
         onPressPhoto:function(){
            var url = "/sap/opu/odata/sap/ZB78_EMP_SRV/PhotoSet('"+this.empId+"')/$value";
            sap.m.URLHelper.redirect(url,false);
        },
        onDownloadFile : function (oEvent) {
            var empid = oEvent.getSource().getParent().getBindingContext("oModel").getObject().Empid;
            var filename = oEvent.getSource().getParent().getBindingContext("oModel").getObject().Filename;

            var url = "/sap/opu/odata/sap/ZB78_EMP_SRV/DocSet(Empid='"+empid+"',Filename='"+filename+"')/$value";

            sap.m.URLHelper.redirect(url, false);
        }
    })
})