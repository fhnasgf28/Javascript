if(window.location.pathname=='/my/rfq'){
        let selectedOrders = [];

        // Add checkbox column to the table header
        $('thead tr.active').prepend('<th class="text-center"><input type="checkbox" id="select-all-rfq" /></th>');

        // Add checkbox to each row
        $('tbody tr').each(function() {
            const orderId = $(this).find('a').first().attr('href').match(/\/my\/rfq-tender\/(\d+)/);
            if (orderId && orderId[1]) {
                $(this).prepend(`<td class="text-center"><input type="checkbox" class="rfq-checkbox" data-id="${orderId[1]}" /></td>`);
            }
        });

        // Add export button
        $('div.o_portal_pager').before(`
            <div class="text-right mb-3">
                <button id="export_selected_rfq" class="btn btn-primary" disabled>
                    <i class="fa fa-download"></i> Export Selected
                </button>
            </div>
        `);

        // Handle select all checkbox
        $('#select-all-rfq').click(function() {
            const isChecked = $(this).prop('checked');
            $('.rfq-checkbox').prop('checked', isChecked);
            updateExportButton();
        });

        // Handle individual checkboxes
        $(document).on('change', '.rfq-checkbox', function() {
            updateExportButton();
        });

        // Update export button state
        function updateExportButton() {
            const selectedCount = $('.rfq-checkbox:checked').length;
            $('#export_selected_rfq').prop('disabled', selectedCount === 0);
        }

        // Handle export button click
        $('#export_selected_rfq').click(function() {
            const selectedIds = [];
            $('.rfq-checkbox:checked').each(function() {
                selectedIds.push($(this).data('id'));
            });

            if (selectedIds.length > 0) {
                window.location.href = '/export-purchase-orders?ids=' + selectedIds.join(',');
            }
        });
    }