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

             var oModel = this.getOwnerComponent().getModel("oModel");
            oModel.read("/EmployeeSet('" + empId + "')/toCertifications", {
                success: function (data, response) {
                    this.getOwnerComponent().getModel("certUpdateModel").setData(data);
                }.bind(this)
            });
        },
        onPressAdd: function () {
           this.getOwnerComponent().getModel("certUpdateModel").getData().results.push(
                {
                    Empid: this.byId("oIpEmpIdE").getValue(),
                    Certcode: "",
                    Skill: "",
                    Certname: ""
                }
            );
            this.getOwnerComponent().getModel("certUpdateModel").refresh();
        },
        onDeleteRow: function (oEvent) {
            /// you need to find out the index and use splice function on the array
            var index = oEvent.getSource().getParent().getBindingContextPath().split("/")[2];
            this.getOwnerComponent().getModel("certUpdateModel").getData().results.splice(index, 1);
            this.getOwnerComponent().getModel("certUpdateModel").refresh();
        },
        onNavBack() {
            this.getOwnerComponent().getRouter().navTo("RouteView6");
        },
        onPressSave() {
            var empId = this.byId("oIpEmpIdE").getValue();
            var name = this.byId("oIpNameE").getValue();
            var desig = this.byId("oIpDesigE").getValue();
            var email = this.byId("oIpEmailE").getValue();
            var salary = this.byId("oIpSalaryE").getValue();
            var status = this.byId("oIpStatusE").getValue();
            var rating = this.byId("oIpRatingE").getValue();

            //perform any validation if required 

            var payload = {
                Empid: empId,
                Name: name,
                Desig: desig,
                Email: email,
                Salary: salary,
                Status: status,
                Rating: parseInt(rating),
                toCertifications: this.getOwnerComponent().getModel("certUpdateModel").getData().results
            };
            var oModel = this.getOwnerComponent().getModel("oModel");
            oModel.create("/EmployeeSet", payload, {
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