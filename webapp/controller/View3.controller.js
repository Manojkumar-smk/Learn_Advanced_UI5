sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/demo/learnui5/model/formatter"
], (Controller, formatter) => {
    "use strict";

    return Controller.extend("com.demo.learnui5.controller.View3", {
        f : formatter,
        onInit() {
            var oModel = this.getOwnerComponent().getModel("oModel");
            var empModel = this.getOwnerComponent().getModel("empModel");
            oModel.read("/EmployeeSet", {
                success: function (odata) {
                    console.log(odata);
                    for (var i = 0; i < odata.results.length; i++) {
                        var ratingDesc = "";
                        var rating = odata.results[i].Rating;
                        switch (rating) {
                            case 5:
                                ratingDesc = "(Outstanding)";
                                break;
                            case 4:
                                ratingDesc = "(Very Good)";
                                break;
                            case 3:
                                ratingDesc = "(Good)";
                                break;
                            case 2:
                                ratingDesc = "(Improvement Needed)";
                                break;
                            case 1:
                                ratingDesc = "(Unsatisfactory)";
                                break;
                            default:
                                ratingDesc = "(No Rating)";
                        }
                        odata.results[i].Rating = odata.results[i].Rating + ratingDesc;
                    }
                    empModel.setData(odata);

                },
                error: function (oError) {
                    console.log(oError);
                }
            })
        },
        onNavBack() {
            this.getOwnerComponent().getRouter().navTo("RouteView2");
        },
        nextPage() {
            this.getOwnerComponent().getRouter().navTo("RouteView4")
        }
    });
});