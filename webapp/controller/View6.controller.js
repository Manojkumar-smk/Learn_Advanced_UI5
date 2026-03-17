sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";
    return Controller.extend("com.demo.learnui5.controller.View6", {
        onInit() {

        },
        onNavBack() {
            this.getOwnerComponent().getRouter().navTo("RouteView5");
        },
        onPressF4Help() {
            this.dialog = "";
                if (!this.dialog) {
            this.dialog = sap.ui.xmlfragment(this.getView().getId(),
                                            "com.demo.learnui5.fragments.empIdF4Help",
                                            this);
            this.getView().addDependent(this.dialog);
                };
                this.dialog.open();
        },
        onClose() {
            this.dialog.close();
        },
        onPressEmpId(oEvent) {
            var Empid = oEvent.getSource().getBindingContext("oModel").getObject().Empid;
            this.byId("oIpEmp").setValue(Empid);
            this.dialog.close();
        }
    })
})