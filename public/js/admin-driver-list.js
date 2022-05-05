$(document).ready(() => {

    function LoadDriverList() {
        $.post("/api/admin-driver-list", {
            StartDate: $("#StartDate").val(),
            EndDate: $("#EndDate").val()
        }, function (rs) {
            if (rs.Status == 1) {
                let html = "";
                if (rs.Data.length>0){
                    rs.Data.forEach(apointment => {
                        html += " <tr><td>" +
                            apointment.ExamineeId.FirstName + " " + apointment.ExamineeId.LastName
                            + "</td><td>"
                            + apointment.Time
                            + "</td><td>" +
                            apointment.AppointmentType
                            + "</td><td>" +
                            apointment.AppointmentStatus
                            + "</td><td> " + (apointment.TestObservationId != null ? apointment.TestObservationId.OverAllResult : "N/a") + "</td></tr>"
                    });
                }else{
                    html += ' <tr><td colspan="5"><div class="alert alert-secondary" role="alert">No Result Found</div></td></tr>'
                }
                

                $("#driver-list").html(html);
            }
        });
    }
    $('#StartDate, #EndDate').datetimepicker({
        timepicker: false,
        format: 'Y-m-d',
        formatDate: 'Y-m-d'
    });
    $("#filterAppointments").click(LoadDriverList)
    LoadDriverList();

})