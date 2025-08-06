odoo.define("equip3_purchase_vendor_portal.RfqImportDocument", function(require){
    "use strict";

    var Session = require("web.session");

    $(document).ready(function(){

        function arrayBufferToBase64(buffer) {
            let binary = '';
            let bytes = new Uint8Array(buffer);
            for (let i = 0; i < bytes.byteLength; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            return btoa(binary); // Convert binary to Base64
        }

        async function waitForUserSelectionsheets() {
            return new Promise((resolve) => {
                $("#ModalSelectsheets .btn-submit").off("click").on("click", function(event) {
                    event.preventDefault(); // Prevent form submission

                    let selectedOption = $("#ModalSelectsheets select").val();
                    if (selectedOption) {
                        $("#ModalSelectsheets").modal("hide");
                        resolve(selectedOption);
                    } else {
                        alert("Please select a sheet.");
                    }
                });
                
                // Add cancel button handler
                $("#ModalSelectsheets .btn-cancel").off("click").on("click", function(event) {
                    $("#ModalSelectsheets").modal("hide");
                    resolve(false);
                });
            });
        }

        // Add a button to trigger the import modal
        if (window.location.pathname.startsWith('/my/rfq')) {
            // Check if the button already exists to avoid duplicates
            if ($('#import_rfq_btn').length === 0) {
                // Add the import button next to the export button
                $('.vendor_portal_table_scroll form#export_rfq_form').after(
                    '<button type="button" id="import_rfq_btn" class="btn btn-maroon" ' +
                    'data-toggle="modal" data-target="#modal_import_rfq_document" ' +
                    'style="margin-left: 10px;">Import RFQ</button>'
                );
            }
        }

        // Handle file input change event
        $('input.vendor_pricelist_import').change(async function(e) {
            var self = this;
            var fileName = e.target.files[0].name;
            
            // Validate file extension
            if (!fileName.match(/\.(xlsx|xls|csv)$/i)) {
                alert("Please select a valid Excel (.xlsx, .xls) or CSV file.");
                self.value = null;
                return;
            }
            
            var reader = new FileReader();
            reader.onload = async function(e) {
                var name_sheet = false;
                if(fileName.includes('.xls') || fileName.includes('.xlsx')){
                    let data_xlsx = new Uint8Array(e.target.result);
                    let workbook = XLSX.read(data_xlsx, { type: 'array' });
                    var list_sheet = Object.keys(workbook.Sheets);
                    $('#ModalSelectsheets').remove();
                    if(list_sheet.length > 1){
                        $("body").append(`
                            <div class="modal fade" id="ModalSelectsheets" tabindex="-1" aria-labelledby="customModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-sm">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Select Sheet</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="mb-3">
                                                <label for="selection" class="form-label">Select Sheet:</label>
                                                <select name="selection" class="form-control">
                                                </select>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary btn-cancel" data-dismiss="modal">Cancel</button>
                                            <button type="submit" class="btn btn-primary btn-submit">Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `);
                        list_sheet.forEach(function(sheet) {
                            $("#ModalSelectsheets select").append(`<option value="${sheet}">${sheet}</option>`);
                        });
                        $("#ModalSelectsheets").modal("show");
                        name_sheet = await waitForUserSelectionsheets();
                        
                        if (name_sheet === false) {
                            self.value = null;
                            return;
                        }
                    }
                }

                // Show loading indicator
//                var loadingModal = $('<div class="modal fade" id="loadingModal" tabindex="-1" role="dialog" aria-hidden="true">' +
//                    '<div class="modal-dialog modal-sm modal-dialog-centered" role="document">' +
//                    '<div class="modal-content">' +
//                    '<div class="modal-body text-center">' +
//                    '<div class="spinner-border text-primary" role="status"></div>' +
//                    '<p class="mt-2">Processing your import. Please wait...</p>' +
//                    '</div></div></div></div>');
//                $('body').append(loadingModal);
//                $('#loadingModal').modal({backdrop: 'static', keyboard: false});
//                $('#loadingModal').modal('show');

                Session.rpc("/my/rfq/import_rfq_document", {
                    file: arrayBufferToBase64(e.target.result),
                    file_name: fileName,
                    name_sheet: name_sheet
                }).then(function(result) {
                    // Hide loading indicator
                    $('#loadingModal').modal('hide');
                    $('#loadingModal').remove();
                    
                    // Close the import modal
                    $("#modal_import_rfq_document").modal("hide");
                    
                    if (result && result.message !== undefined) {
                        // Create a modal to display the import results
                        var resultModal = $('<div class="modal fade" id="importResultModal" tabindex="-1" role="dialog" aria-hidden="true">' +
                            '<div class="modal-dialog" role="document">' +
                            '<div class="modal-content">' +
                            '<div class="modal-header">' +
                            '<h5 class="modal-title">Import Results</h5>' +
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                            '<span aria-hidden="true">&times;</span>' +
                            '</button>' +
                            '</div>' +
                            '<div class="modal-body">' +
                            '<pre style="white-space: pre-wrap;">' + result.message + '</pre>' +
                            '</div>' +
                            '<div class="modal-footer">' +
                            '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
                            '<button type="button" class="btn btn-maroon" onclick="window.location.reload();">Reload Page</button>' +
                            '</div>' +
                            '</div></div></div>');
                        $('body').append(resultModal);
                        $('#importResultModal').modal('show');
                    } else {
                        // Reload immediately without alert to improve speed
                        window.location.reload();
                    }
                    self.value = null;
                }).catch(function(error) {
                    // Hide loading indicator
//                    $('#loadingModal').modal('hide');
//                    $('#loadingModal').remove();
                    
                    alert("An error occurred during import. Please try again.");
                    self.value = null;
                });
            };

            reader.readAsArrayBuffer(this.files[0]);
        });

        // Show selected filename
        $('input.vendor_pricelist_import').on('change', function() {
            if (this.files && this.files[0]) {
                $('.selected-filename').text(this.files[0].name);
            } else {
                $('.selected-filename').text('');
            }
        });

        if ($('textarea[name="rfq_note"]').data() !== undefined &&
            $('textarea[name="rfq_note"]').data().readonly) {
            $('textarea[name="rfq_note"]').summernote('disable');
        } else {
            $('textarea[name="rfq_note"]').summernote({
                toolbar: [
                    // [groupName, [list of button]]
                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    ['font', ['strikethrough', 'superscript', 'subscript']],
                    ['fontsize', ['fontsize']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                ]
            });
        }
    });
});