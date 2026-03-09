sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.demo.learnui5.controller.View2", {
        onInit() {
        },
        onNavBack() {
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        }
    });
});