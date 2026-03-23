sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "com/demo/learnui5/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/Sorter"
], (Controller, MessageBox, formatter, Filter, Sorter) => {
    "use strict";
    return Controller.extend("com.demo.learnui5.controller.View6", {
        f: formatter,
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
        },
        onPressGo() {
            var aFilters = [];
            var empid = this.byId("oIpEmp").getValue();
            var name = this.byId("oIpNameFilter").getValue();
            if (empid !== "") {
                aFilters.push(new Filter("Empid", "EQ", empid));
            }
            if (name !== "") {
                aFilters.push(new Filter("Name", "Contains", name));
            }
            var aSorters = [];
            var groupField = this.byId("oCBGroupField").getSelectedKey();
            var groupOrder = this.byId("oRBGGroupOrder").getSelectedIndex();

            if (groupField !== "" && groupOrder !== -1) {
                aSorters.push(new Sorter(groupField, (groupOrder === 0) ? false : true, function (oBindingConntext) {
                    if (groupField === "Status") {
                        var Status = oBindingConntext.getObject().Status;
                        return {
                            key: Status,
                            text: Status
                        }
                    }
                    else if (groupField === "Desig") {
                        var desig = oBindingConntext.getObject().Desig;
                        return {
                            key: desig,
                            text: desig
                        }
                    }


                }));
            }

            this.byId("oTabEmp").getBinding("items").filter(aFilters);

            var sortField = this.byId("oCBSortField").getSelectedKey();
            var sortOrder = this.byId("oRBGSortOrder").getSelectedIndex();

            if (sortField !== "" && sortOrder !== -1) {
                aSorters.push(new Sorter(sortField, (sortOrder === 0) ? false : true));
            }

            this.byId("oTabEmp").getBinding("items").sort(aSorters);

        },
        onPressReset() {
            this.byId("oIpEmp").setValue("");
            this.byId("oIpNameFilter").setValue("");
            this.byId("oTabEmp").getBinding("items").filter([]);
        },
        nextPage() {
            var empid = "E00005"
            this.getOwnerComponent().getRouter().navTo("RouteView7", { key: empid })
        },
        onPressRow(oEvent) {
            var empid = oEvent.getSource().getBindingContext("oModel").getObject().Empid;
            this.getOwnerComponent().getRouter().navTo("RouteView7", {
                key: empid
            });
        },
        onCreateEmp: function () {
            this.getOwnerComponent().getRouter().navTo("RouteView8");
        },
        onEditEmp: function () {
            var selRow = this.byId("oTabEmp").getSelectedItem();
            if (selRow === null) {
                MessageBox.error("Select Row frist");
                return;
            }
            var empid = selRow.getBindingContext("oModel").getObject().Empid;

            this.getOwnerComponent().getRouter().navTo("RouteView9", {
                key: empid
            });
        },
        onDeleteEmp: function() {
            var selRow = this.byId("oTabEmp").getSelectedItem();
            var empid = selRow.getBindingContext("oModel").getObject().Empid;
            var oModel = this.getOwnerComponent().getModel("oModel");

            oModel.remove("/EmployeeSet('" + empid + "')", {
                success: function (req, res) {
                    MessageBox.success("Employee Deleted Successfully");
                },
                error: function (oError) {
                    MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                }
            });
        }
    })
})