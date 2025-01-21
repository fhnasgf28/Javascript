odoo.define('crminternal_ktt_modifier.calendar_view', function (require) {
    "use strict";

    var CalendarRenderer = require('calendar.CalendarRenderer');
    var core = require('web.core');
    var qweb = core.qweb;
    console.log('farhanassegaf ini ke load gaes')

    CalendarRenderer.include({
        _eventRender: function (event) {
            var result = this._super.apply(this, arguments);
            var end_time_value = event.record.r_end; // Ganti end_time_field_name dengan nama field end_time di model Anda

            if (end_time_value) {
                // Pastikan format waktu konsisten
                var end_time_formatted = moment(end_time_value).format("HH:mm");

                // Cari elemen dengan class 'fc-time' dan tambahkan end_time
                var timeElement = $(result).find('.fc-time');
                if (timeElement.length > 0) {
                    var currentContent = timeElement.text();
                    // Menambahkan end time dengan format "HH:mm - HH:mm"
                    timeElement.text(currentContent + " - " + end_time_formatted);
                } else {
                    // Jika elemen 'fc-time' tidak ditemukan, coba cari elemen lain yang mungkin menampilkan waktu
                    var titleElement = $(result).find('.fc-title');
                    if (titleElement.length > 0) {
                        var currentContent = titleElement.text();
                        // Menambahkan end time dengan format "HH:mm - HH:mm"
                        titleElement.text(currentContent + " (" + end_time_formatted + ")");
                    }
                }
            }

            return result;
        },
    });
});
