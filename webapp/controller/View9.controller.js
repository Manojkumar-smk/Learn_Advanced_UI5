sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";
    return Controller.extend("com.demo.learnui5.controller.View9", {
        onInit() {
            this.getOwnerComponent().getRouter().getRoute("RouteView9").attachPatternMatched(this.onPatternMatched, this);
        },
        onPatternMatched: function (oEvent) {
            var empId = oEvent.getParameter("arguments").key;
            this.getView().bindElement("oModel>/EmployeeSet('" + empId + "')");
        },
        onNavBack() {
            this.getOwnerComponent().getRouter().navTo("RouteView6");
        },
        onPressSave: function () {
            var empId = this.byId("oIpEmpIdE").getValue();
            var name = this.byId("oIpNameE").getValue();
            var desig = this.byId("oIpDesigE").getValue();
            var email = this.byId("oIpEmailE").getValue();
            var salary = this.byId("oIpSalaryE").getValue();
            var status = this.byId("oIpStatusE").getValue();
            var rating = this.byId("oIpRatingE").getValue();

            var payload = {
                Empid: empId,
                Name: name,
                Desig: desig,
                Email: email,
                Salary: salary,
                Status: status,
                Rating: parseInt(rating),
            }

            var oModel = this.getOwnerComponent().getModel("oModel");
            var sPath = "/EmployeeSet('" + payload.Empid + "')"; 
            oModel.update(sPath, payload, {
                success: function (req, res) {
                    MessageBox.success("Employee Updated Successfully");
                }.bind(this),
                error: function (oError) {
                    MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                }
            });

        }
    })
})