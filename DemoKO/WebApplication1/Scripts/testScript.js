var viewModel = {
    myFunction: function (data, event) {
        if (event.shiftKey) {
            //do something different when user has shift key down
        } else {
            //do normal action
        }
    }
};
ko.applyBindings(viewModel);