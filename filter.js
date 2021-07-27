<script>
/***
*   @author Victor Chimenti, MSCS-SE '20
*   @file filter.js
*
*   jQuery
*   This script searches the Alumni SU Voice blog application content items for matches to the
*   user selected search parameters in the filter field dropdown menu
*
*   @version 4.2
*/






$(function () {
    // After the DOM is ready, Wait until the window loads
    $(window).load(function () {
        // Once window loads set a timeout delay
        setTimeout(function () {




            //** global array holds list of content items that will render after filter selection **//
            var visibleItems = [];
            var parseItems = {};



            
            //   ***   Process and Parse Visible Items   ***   //
            $(function () {
                let parseItemsToDisplay = function() {
                    // assign array of currently visible content items
                    visibleItems = $('.alumniVoice').not('.hideByDropdownCategories, hideByText');
                    // check to see if array is empty
                    if (visibleItems.length == 0) {
                        // when array is empty show the results message
                        $('.noResultsToShow').removeClass('hideResultsMessage');
                    } else {
                        // when array has content items suppress the results message
                        $('.noResultsToShow').addClass('hideResultsMessage');
                    }
                };
                parseItems.process = parseItemsToDisplay;
            });
            
            
            
            
            //   ***   Keyword Search   ***   //
            $(function () {
                // scan the keyword each character the user inputs
                $('#keystroke_filter').on('keyup', function () {
                    // Assign Search Key
                    let keyword = $(this).val().toLowerCase();
                    // filter the items for the input key
                    $(function () {
                        $('.alumniVoice').filter(function () {
                            // when the search key is not present in the item then hide the item
                            $(this).toggleClass('hideByText', !($(this).text().toLowerCase().indexOf(keyword) > -1));
                        });
                    });
                    // parse out unselected content items and limit display to user selected items
                    parseItems.process();
                });
            });




            //   ***   Category Filter   ***   //
            $(function () {
                // When the Dropdown Menu Selector Course Types Change - Execute change function
                $('#SelectBox-ByTopic').change(function () {
                    // Assign Search Key
                    let typeKey = $(this).val();
                    // Account for values with parenthesis
                    let newKey = typeKey.replace(/\s*\(.*?\)\s*/g, '');
                    // If Search Key is Not Null then Compare to the Type List Items in Each Content Item
                    if (newKey) {
                        // search tags in each item
                        $('ul.categories').filter(function (i, e) {
                            let typeValue = $(this).text();
                            // Account for values with parenthesis
                            let newValue = typeValue.replace(/\s*\(.*?\)\s*/g, '');
                            // Check to see if the Key and Value contain a Match
                            if (newValue.match(newKey)) {
                                $(this).parents('.alumniVoice').removeClass('hideByDropdownCategories');
                            } else {
                                $(this).parents('.alumniVoice').addClass('hideByDropdownCategories');
                            }
                        });
                        // Else the Search Key is Null so Reset all Content Items to Visible
                    } else {
                        $('.alumniVoice').removeClass('hideByDropdownCategories');
                    }
                    // parse out unselected content items and limit display to user selected items
                    parseItems.process();
                });
            });




        }, 10);
    });
});
</script>