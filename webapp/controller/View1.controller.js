sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.demo.learnui5.controller.View1", {
        onInit() {
            this.CurrentText = this.byId("oTxtWelcome").getText();
        },

        onNavTo(){
            this.getOwnerComponent().getRouter().navTo("RouteView2")
        },
        onPressSubmit(){
            var name = this.byId("oIpName").getValue();
            this.byId("oTxtWelcome").setText(name+ " " +this.CurrentText);
        },
        onEnter(){
            var color = this.byId("oIpColor").getValue();
            this.byId("oBtnColor").setType(color);
        }
    });
});