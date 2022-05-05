$(document).ready(() => {

    function LoadPendingAppointment() {
        $.post("/api/get-today-pending-appointment", { Date: $("#Date").val() }, function (rs) {
            if (rs.Status == 1) {
                let html = "";
                if (rs.Data.length > 0) {
                    rs.Data.forEach(apointment => {
                        html += " <tr><td>" +
                            apointment.ExamineeId.FirstName + " " + apointment.ExamineeId.LastName
                            + "</td><td>"
                            + apointment.Time
                            + "</td><td>" +
                            apointment.AppointmentType
                            + "</td><td>" +
                            apointment.AppointmentStatus + "</td>";
                        if (apointment.AppointmentStatus == 'Pending' || apointment.AppointmentStatus == 'Exam Started') {
                            html +=   "<td> <a href='/TakeExam/" + apointment.ExamineeId._id + "/" + apointment._id + "'>Start Exam</a> </td>";
                        }else{
                            html +=   "<td> </td>";
                        }
                        html += "</tr>"
                    });
                }
                else {
                    html += ' <tr><td colspan="5"><div class="alert alert-secondary" role="alert">No Result Found</div></td></tr>'
                }
                $("#apointment-list").html(html);


            }
        });
    }

    $('#Date').datetimepicker({
        timepicker: false,
        format: 'Y-m-d',
        formatDate: 'Y-m-d'
    });
    $("#filterAppointments").click(LoadPendingAppointment)
    LoadPendingAppointment();

})