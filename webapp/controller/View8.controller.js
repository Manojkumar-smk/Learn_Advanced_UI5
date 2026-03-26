sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/unified/FileUploaderParameter",
    "sap/m/MessageToast"
], (Controller, MessageBox, FileUploaderParameter, MessageToast) => {
    "use strict";
    return Controller.extend("com.demo.learnui5.controller.View8", {
        onInit() {
           this.certModel = this.getOwnerComponent().getModel("certModel");
            this.certModel.setData({
                aCertifications: [
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
                toCertifications: this.certModel.getData().aCertifications
            }

            var oModel = this.getOwnerComponent().getModel("oModel");

            oModel.create("/EmployeeSet", payload, {
                success: function (req, res) {
                    console.log(res);
                    if (res.statusCode === "201") {
                        MessageBox.success("New Employee Created Successfully");
                    }
                    this.uploadPhoto();
                    this.uploadDocs();
                }.bind(this),
                error: function (oError) {
                    console.log(oError);
                    MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                }
            })
        },
        onSelFile: function (oEvent) {
        this.filename = oEvent.getParameter("files")[0].name;
        this.filetype = oEvent.getParameter("files")[0].type;
        },
        uploadPhoto : function () {
            var empid = this.byId("oIpEmpIdC").getValue();
            var slug = empid + "," + this.filename;
            var oFileUploader = this.byId("oFileUploaderPhoto")

            //1. add slug parameter
            oFileUploader.addHeaderParameter(new FileUploaderParameter({
                name: "slug",
                value: slug
            }));

            //2. add the File type parameter 
            oFileUploader.addHeaderParameter(new FileUploaderParameter({
                name: "Content-Type",
                value: this.fileType
            }));

            //3. add X-CSRF token
            this.getOwnerComponent().getModel("oModel").refreshSecurityToken();
            oFileUploader.addHeaderParameter(new FileUploaderParameter({
                name: "x-csrf-token",
                value: this.getOwnerComponent().getModel("oModel").getHeaders()['x-csrf-token']
            }));

            oFileUploader.upload();
        },
        onUploadComplete : function (oEvent) {
            var status = oEvent.getParameter("status");
            if(status === 201){
                MessageToast.show("Photo Uploaded Successfully")
            }else {
                MessageToast.show("Photo upload Failed")
            }
        },
        onDocUploadCompleted : function (oEvent) {
            var status = oEvent.getParameter("status");
            if(status === 201) {
                MessageToast.show("Documents uploaded Successfully")
            }else {
                MessageToast.show("Documents Upload Failed")
            }
        },
        uploadDocs : function () {
            var oUploadSet = this.byId("oUploadSet");
            var aFileItems = oUploadSet.getIncompleteItems();
            var empid = this.byId("oIpEmpIdC").getValue();

            for(var i=0; i< aFileItems.length; i++){
                var slug = empid + "," + aFileItems[i].getFileName();

                //1. send slug parameter
                oUploadSet.addHeaderField(new sap.ui.core.Item({
                    key: "SLUG",
					text: slug
                }));

                //2. send x-csrf token
                this.getOwnerComponent().getModel("oModel").refreshSecurityToken();
                oUploadSet.addHeaderField(new sap.ui.core.Item({
                    key: "X-CSRF-Token",
					text: this.getOwnerComponent().getModel("oModel").getSecurityToken()
                }));

                oUploadSet.uploadItem(aFileItems[i]);
                oUploadSet.removeAllHeaderFields();
            }
        }
    })
})