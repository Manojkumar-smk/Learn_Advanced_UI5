sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";
    return Controller.extend("com.demo.learnui5.controller.View4", {
        onInit() {

        },
        onNavBack() {
            this.getOwnerComponent().getRouter().navTo("RouteView3");
        },
        onSelChange: function () {
            var valueselBox = this.byId("oSelName").getSelectedKey();
            MessageBox.alert(valueselBox);
        },
        onMCBChange() {
            var MCBindx = this.byId("oMCBName").getSelectedKeys();
            for (var i = 0; i < MCBindx.length; i++) {
                MessageBox.alert(MCBindx[i]);
            }
        },
        onCBChange() {
            var valueCBBox = this.byId("oCBName").getSelectedKey();
            MessageBox.alert(valueCBBox);
        },
        onRBGChange: function () {
            var oSelectedBtn = this.byId("oRBGName").getSelectedButton();
            var sText = oSelectedBtn.getText();
            MessageBox.alert("You selected: " + sText);
        },
        nextPage() {
            this.getOwnerComponent().getRouter().navTo("RouteView5")
        }
    })
}
)