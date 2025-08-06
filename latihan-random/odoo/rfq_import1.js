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
            });
        }

        // Add a button to trigger the import modal
        if (window.location.pathname.startsWith('/my/rfq')) {
            // Check if the button already exists to avoid duplicates
            if ($('#import_rfq_btn').length === 0) {
                // Add the import button next to the export button
                $('.vendor_portal_table_scroll form#export_rfq_form').after(
                    '<button type="button" id="import_rfq_btn" class="btn btn-secondary" ' +
                    'data-toggle="modal" data-target="#modal_import_rfq_document" ' +
                    'style="margin-left: 10px;">Import RFQ</button>'
                );
            }
        }

        // Handle file input change event
        $('input.portal_vendor_rfq_import').change(async function(e) {
            var self = this;
            var fileName = e.target.files[0].name;
            
            // Display selected filename
            $(this).closest('div').find('.selected-filename').text(fileName);

            // Validate file extension
            if (!fileName.match(/\.(xlsx|xls|csv)$/i)) {
                alert("Please select a valid Excel (.xlsx, .xls) or CSV file.");
                self.value = null;
                return;
            }

            var reader = new FileReader();
            reader.onload = async function(e) {
                var name_sheet = false;
                if(fileName.match(/\.(xlsx|xls)$/i)){
                    var data = new Uint8Array(e.target.result);
                    var workbook = XLSX.read(data, {type: 'array'});
                    var list_sheet = workbook.SheetNames;
                    
                    if(list_sheet.length > 1){
                        $("body").append(`
                            <div class="modal fade" id="ModalSelectsheets" tabindex="-1" aria-labelledby="customModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Select Sheet</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="mb-3 mt-3">
                                                <label for="selection" class="form-label">Select Sheet:</label>
                                                <select name="selection" class="form-select" style="min-width: 207px; padding: 5px;">
                                                </select>
                                            </div>
                                            <button type="submit" class="btn btn-secondary btn-sm mr-2 btn-submit">ConfirmAsse</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `);
                        
                        $.each(list_sheet, function(i, sheet_name) {
                            $("select[name='selection']").append(`<option value="${sheet_name}">${sheet_name}</option>`);
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
                var loadingModal = $('<div class="modal fade" id="loadingModal" tabindex="-1" role="dialog" aria-hidden="true">' +
                    '<div class="modal-dialog modal-sm modal-dialog-centered" role="document">' +
                    '<div class="modal-content">' +
                    '<div class="modal-body text-center">' +
                    '<div class="spinner-border text-primary" role="status"></div>' +
                    '<p class="mt-2">Processing your import. Please wait...</p>' +
                    '</div></div></div></div>');
                $('body').append(loadingModal);
                $('#loadingModal').modal({backdrop: 'static', keyboard: false});
                $('#loadingModal').modal('show');
                
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
                            '<button type="button" class="btn btn-maroon" data-dismiss="modal" onclick="window.location.reload();">OK</button>' +
                            '</div>' +
                            '</div></div></div>');
                        $('body').append(resultModal);
                        $('#importResultModal').modal('show');
                    } else {
                        window.location.reload();
                    }
                    self.value = null;
                }).catch(function(error) {
                    // Hide loading indicator
                    $('#loadingModal').modal('hide');
                    $('#loadingModal').remove();

                    alert("An error occurred during import. Please try again.");
                    self.value = null;
                });
            };

            reader.readAsArrayBuffer(this.files[0]);
        });

        // Add download template handler
        $('#download_template_link').click(function(e) {
            e.preventDefault();
            
            // Create a workbook with sample data
            var workbook = XLSX.utils.book_new();
            
            // Add headers based on export format
            var headers = ['Name', 'Product', 'Quantity', 'Price Unit'];
            var data = [headers, ['RFQ001', 'Product A', '10', '100.00']];
            
            var worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, "RFQ Import");
            
            // Generate and download the file
            XLSX.writeFile(workbook, "rfq_import_template.xlsx");
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