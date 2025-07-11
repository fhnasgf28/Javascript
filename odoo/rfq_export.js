odoo.define('equip3_purchase_vendor_portal.rfq_export', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');

//    publicWidget.registry.RfqExportWidget = publicWidget.Widget.extend({
//        selector: '#export_rfq_form, #export_rfq_form_navbar',
//        events: {
//            'change .select-all': '_onSelectAllChange',
//            'change .rfq-select': '_onRfqSelectChange',
//            'submit': '_onFormSubmit'
//        },
//
//        /**
//         * @override
//         */
//        start: function () {
//            // Clear any previous hidden inputs when the widget starts
//            this._clearPreviousSelections();
//            return this._super.apply(this, arguments);
//        },
//
//        /**
//         * Clear any previous hidden inputs with selected RFQ IDs
//         * @private
//         */
//        _clearPreviousSelections: function () {
//            $('input[name="selected_rfq_ids"]', this.el).remove();
//        },
//
//        /**
//         * Handle "Select All" checkbox change
//         * @private
//         * @param {Event} ev
//         */
//        _onSelectAllChange: function (ev) {
//            var isChecked = $(ev.currentTarget).prop('checked');
//            $('.rfq-select').prop('checked', isChecked);
//            // Clear previous selections when changing checkboxes
//            this._clearPreviousSelections();
//        },
//
//        /**
//         * Update "Select All" checkbox state based on individual selections
//         * @private
//         */
//        _onRfqSelectChange: function () {
//            var totalCheckboxes = $('.rfq-select').length;
//            var checkedCheckboxes = $('.rfq-select:checked').length;
//
//            // Update select all checkbox
//            $('.select-all').prop('checked', totalCheckboxes === checkedCheckboxes && totalCheckboxes > 0);
//
//            // Clear previous selections when changing checkboxes
//            this._clearPreviousSelections();
//        },
//
//        /**
//         * Validate form submission - prevent if no RFQs selected
//         * @private
//         * @param {Event} ev
//         */
//        _onFormSubmit: function (ev) {
//            // Clear any previous hidden inputs first
//            this._clearPreviousSelections();
//
//            if ($('.rfq-select:checked').length === 0) {
//                ev.preventDefault();
//                // Show alert message
//                if (!$('.alert-no-selection').length) {
//                    var alertDiv = $('<div class="alert alert-warning alert-no-selection" role="alert">Please select at least one RFQ to export</div>');
//                    $(this.el).prepend(alertDiv);
//
//                    // Auto hide after 3 seconds
//                    setTimeout(function() {
//                        alertDiv.fadeOut('slow', function() {
//                            $(this).remove();
//                        });
//                    }, 3000);
//                }
//                return false;
//            }
//
//            // Collect all selected RFQ IDs
//            var selectedIds = [];
//            $('.rfq-select:checked').each(function() {
//                selectedIds.push($(this).val());
//            });
//
//            // Add a hidden input with all selected IDs
//            if (selectedIds.length > 0) {
//                $('<input>').attr({
//                    type: 'hidden',
//                    name: 'selected_rfq_ids',
//                    value: selectedIds.join(',')
//                }).appendTo($(this.el));
//            }
//        }
//    });
    
    // Add a new widget for the navbar export button
    publicWidget.registry.RfqNavbarExportWidget = publicWidget.Widget.extend({
        selector: '#export_rfq_form_navbar',
        events: {
            'click #export_selected_rfqs_navbar': '_onNavbarExportClick'
        },
        
        /**
         * Handle navbar export button click
         * @private
         * @param {Event} ev
         */
        _onNavbarExportClick: function (ev) {
            if ($('.rfq-select:checked').length === 0) {
                ev.preventDefault();
                // Show alert message at the top of the page
                if (!$('.alert-no-selection-navbar').length) {
                    var alertDiv = $('<div class="alert alert-warning alert-no-selection-navbar" role="alert">Please select at least one RFQ to export</div>');
                    $('.o_portal_search_panel').after(alertDiv);
                    
                    // Auto hide after 3 seconds
                    setTimeout(function() {
                        alertDiv.fadeOut('slow', function() {
                            $(this).remove();
                        });
                    }, 3000);
                }
                return false;
            }
            
            // Collect all selected RFQ IDs
            var selectedIds = [];
            $('.rfq-select:checked').each(function() {
                selectedIds.push($(this).val());
            });
            
            // Add a hidden input with all selected IDs
            if (selectedIds.length > 0) {
                $('input[name="selected_rfq_ids"]', this.el).remove();
                $('<input>').attr({
                    type: 'hidden',
                    name: 'selected_rfq_ids',
                    value: selectedIds.join(',')
                }).appendTo($(this.el));
            }
        }
    });
});

$(document).ready(function (e) {
    if(window.location.pathname=='/my/rfq'){
        let navbar_top = $('#o_portal_navbar_content .flex-column')
        if(navbar_top.length==1){
            let open_tender_act_button = `<div class="form-inline" style="margin-right: 10px;">
                <div class="btn-group">
                    <button id="portal_act_actions_btn" data-toggle="dropdown" class="btn btn-secondary btn-sm dropdown-toggle" aria-expanded="false">Actions</button>
                    <div class="dropdown-menu">
                            <a href="#" class="dropdown-item" id="act_export_doc">
                                <span>Export Document(s)</span>
                            </a>
                    </div>
                    <input type='file' class='d-none input_doc_tender'/>
                </div>
            </div>`
            $('#o_portal_navbar_content .flex-column').prepend(open_tender_act_button)
        }
    }
})

$(document).ready(function() {
    $(document).on('click', '#act_export_doc', function(e) {
        e.preventDefault();
        
        // Dapatkan semua checkbox yang dipilih
        var selectedRfqs = $('.rfq-select:checked');
        
        if (selectedRfqs.length === 0) {
            // Tampilkan pesan alert jika tidak ada RFQ yang dipilih
            if (!$('.alert-no-selection').length) {
                var alertDiv = $('<div class="alert alert-warning alert-no-selection" role="alert">Please select at least one RFQ to export</div>');
                // Tampilkan alert di bawah tabel, bukan di header
                $('.vendor_portal_table_scroll').before(alertDiv);
                
                // Auto hide setelah 3 detik
                setTimeout(function() {
                    $('.alert-no-selection').fadeOut('slow', function() {
                        $(this).remove();
                    });
                }, 3000);
            }
            return false;
        }
        
        // Buat hidden input untuk menyimpan ID RFQ yang dipilih
        var selectedIds = [];
        selectedRfqs.each(function() {
            selectedIds.push($(this).val());
        });
        
        // Hapus hidden input yang sudah ada sebelumnya
        $('#export_rfq_form input[name="selected_rfq_ids"]').remove();
        
        // Tambahkan hidden input baru dengan ID yang dipilih
        $('#export_rfq_form').append('<input type="hidden" name="selected_rfq_ids" value="' + selectedIds.join(',') + '"/>');
        
        // Submit form
        $('#export_rfq_form').submit();
    });
});
