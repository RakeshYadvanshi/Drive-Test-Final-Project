$(document).ready(() => {

    let allowedTimes = [];
    let allowedMin = ["00", "30"]
    for (let hour = "09"; hour <= 18; hour++) {
        for (let sec = 0; sec < allowedMin.length; sec++) {
            allowedTimes.push(`${hour}:${allowedMin[sec]}`)
        }
    }
    $('#slot').datetimepicker({
        inline: true,
        step: 30,
        format: 'Y-m-d H:i',
        disabledDates: [],
        allowTimes: allowedTimes,
        minDate: (new Date()).toISOString(),
        disabledWeekDays: [0],
        onSelectDate: function (d, e, e2, e3) {
            $("#selectedDate").text($("#slot").val().split(" ")[0])
            GetAvailibltiesByDate($("#slot").val().split(" ")[0]);
        },
    });


    $("#appointment-form").submit(function (e) {
        e.preventDefault();
        $.post("/api/admin/add-availablity", {
            Date: $("#slot").val().split(" ")[0],
            Time: $("#slot").val().split(" ")[1]

        }).then(() => {
            GetAvailibltiesByDate($("#slot").val().split(" ")[0]);
        })
    });

    function GetAvailibltiesByDate(date) {
        $.post("/api/admin/get-availabilty-by-date", {
            Date: date
        }).then((rs) => {
            let alreadyBlockedSlot = [];
            let html = "";
            rs.Data.forEach(slot => {
                html += '<div class="alert alert-primary" role="alert">' +
                    slot.Time +
                    '<button type="button" style="float:right" class="btn-close delete-avail" data-id="' + slot._id + '"></button>' +
                    '</div>';
                alreadyBlockedSlot.push(slot.Time);
            });

            $("#availablity-slots").html(html);
            $('#slot').datetimepicker('setOptions', { allowTimes: allowedTimes.filter(x => alreadyBlockedSlot.indexOf(x)==-1) });
            $(".delete-avail").click(function () {
                $.post("/api/admin/delete-availablity", {
                    Id: $(this).data("id"),
                }).then(() => {
                    GetAvailibltiesByDate($("#slot").val().split(" ")[0]);
                })
            });
        })
    }


    GetAvailibltiesByDate($("#slot").val().split(" ")[0])

})