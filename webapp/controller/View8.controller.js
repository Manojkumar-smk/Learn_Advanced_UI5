sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";
    return Controller.extend("com.demo.learnui5.controller.View8", {
        onInit() {
            this.certModel = this.getOwnerComponent().getModel("certModel");
            this.certModel.setData({
                aCertifications : [

                ]
            });
        },
        onNavBack() {
            this.getOwnerComponent().getRouter().navTo("RouteView6");
        },
        onAddRow() {
            this.certModel.getData().aCertifications.push(
                {
                    Empid: this.byId("oIpEmpIdC").getValue(),
                    Certcode: "",
                    Skill: "",
                    Certname: ""
                }
            );
            this.certModel.refresh();
        },
        onDeleteRow(oEvent) {
            var index = oEvent.getSource().getParent().getBindingContextPath().split("/")[2];
            this.certModel.getData().aCertifications.splice(index, 1);
            this.certModel.refresh();
        },
        onPressSave() {
            var empid = this.byId("oIpEmpIdC").getValue();
            var name = this.byId("oIpNameC").getValue();
            var desig = this.byId("oIpDesigC").getValue();
            var email = this.byId("oIpEmailC").getValue();
            var salary = this.byId("oIpSalaryC").getValue();
            var status = this.byId("oIpStatusC").getValue();
            var rating = this.byId("oIpRatingC").getValue();

            var payload = {
                Empid: empid,
                Name: name,
                Desig: desig,
                Email: email,
                Status: status,
                Salary: salary,
                Rating: parseInt(rating),
                toCertifications : this.certModel.getData().aCertifications
            }

            var oModel = this.getOwnerComponent().getModel("oModel");

            oModel.create("/EmployeeSet", payload, {
                success: function (req, res) {
                    console.log(res);
                    if (res.statusCode === "201") {
                        MessageBox.success("New Employee Created Successfully");
                    }
                }.bind(this),
                error: function (oError) {
                    console.log(oError);
                    MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                }
            })
        }
    })
})