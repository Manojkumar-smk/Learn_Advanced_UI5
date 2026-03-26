sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageBox, JSONModel) => {
    "use strict";
    return Controller.extend("com.demo.learnui5.controller.View10", {
         onInit() {
            this.bulkEmpModel = new JSONModel( {
                aEmployees : []
            });

            this.getView().setModel(this.bulkEmpModel, "bulkEmpModel");
        },
        onNavBack() {
            this.getOwnerComponent().getRouter().navTo("RouteView6");
        },
        onSelectFile : function (oEvent) {
              var file = oEvent.getParameter("files")[0];
            this.readXLContentIntoJSONArray(file);
        },
        readXLContentIntoJSONArray : function (file) {
          var that = this;
            var aResults = [];
            if (file && window.FileReader) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    workbook.SheetNames.forEach(function (sheetName) {
                        // Here is your object for every sheet in workbook
                        aResults = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

                    });
                    // edit below two lines

                    that.bulkEmpModel.getData().aEmployees = aResults;
                    that.bulkEmpModel.refresh(true);
                };
                reader.onerror = function (ex) {
                    console.log(ex);
                };
                reader.readAsBinaryString(file);
            }
        },
        onSubmit: function () {
            var aEmployees = this.bulkEmpModel.getData().aEmployees;
            var oModel = this.getOwnerComponent().getModel("oModel");

            for( var i =0; i< aEmployees.length; i++ ){
                oModel.create("/EmployeeSet", aEmployees[i], {
                    groupId : "CREATE_GRP"
                });    
            }

            oModel.submitChanges({
                groupId : "CREATE_GRP",
                success : function (req,res){

                },
                error : function (oError) {

                } 
            });
        }
    })
})
