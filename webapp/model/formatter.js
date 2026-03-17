sap.ui.define([
], () => {
    "use strict";
    return {
        formatRating: function (Rating) {

            var ratingDesc = "";
            switch (Rating) {
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
            return Rating + ratingDesc;
        },
        formatStatus: function (Status) {
            var State = "None";
            if (Status === "PERMANENT") {
                State = 'Success';
            } else if (Status === "CONTRACT") {
                State = 'Error';
            }
            return State;
        }
    }
}
)