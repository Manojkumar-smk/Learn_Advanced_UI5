sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.demo.learnui5.controller.View3", {
        onInit() {
        },
        onNavBack() {
            this.getOwnerComponent().getRouter().navTo("RouteView2");
        }
    });
});