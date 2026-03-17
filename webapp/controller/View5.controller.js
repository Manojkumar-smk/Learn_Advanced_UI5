sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";
    return Controller.extend("com.demo.learnui5.controller.View5", {
        onInit() {

        },
        onNavBack() {
            this.getOwnerComponent().getRouter().navTo("RouteView4");
        },
        onPressRow(oEvent) {
            console.log(oEvent);
            var email = oEvent.getSource().getBindingContext("oModel").getObject().Email;
            MessageBox.alert(email);
        },
        onGetEmployee() {
            var oTable = this.byId("oTabEmp");
            var oSelectedItem = oTable.getSelectedItem();

            if (oSelectedItem) {
                var oContext = oSelectedItem.getBindingContext("oModel");
                var sEmail = oContext.getObject().Email;

                MessageBox.alert("Employee Email: " + sEmail);
            } else {
                MessageBox.warning("Please select an employee from the list first.");
            }
        },
        onGetMultiEmp(){
            var oTable = this.byId("oMultiTabEmp");
            var aSelectedItems = oTable.getSelectedItems();
            console.log(aSelectedItems)
            for(var i=0; i< aSelectedItems.length; i++){
                var Email = aSelectedItems[i].getBindingContext("oModel").getObject().Email;
                MessageBox.alert(Email);
            }
        },
        nextPage() {
            this.getOwnerComponent().getRouter().navTo("RouteView6")
        }

    })
})