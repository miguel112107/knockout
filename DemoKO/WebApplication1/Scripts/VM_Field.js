// Class to represent each position in the field
function rosterSpot(rosterPosition, defaultPlayer) {
    var self = this;
    self.rosterPosition = rosterPosition;
    self.playerOnField = ko.observable(defaultPlayer);

    self.formattedRating = ko.computed(function () {
        var rating = self.playerOnField().rating;
        return rating ?  + rating.toFixed(2) : "None";
    });
}

//My fade Visible custom binding for displaying Player Bio Info
ko.bindingHandlers.fadeVisible = {
    init: function (element, valueAccessor) {
        // Start visible/invisible according to initial value
        var shouldDisplay = valueAccessor();
        $(element).toggle(shouldDisplay);
    },
    update: function (element, valueAccessor) {
        // On update, fade in/out
        var shouldDisplay = valueAccessor();
        shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
    }
};

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;

    // Non-editable roster data - List of players available to play
    self.availablePlayers = [
        { playerName: "I. Casillas", rating: 88, Country: 'Spain' },//0
        { playerName: "D. Carvajal", rating: 81, Country: 'Spain' },//1
        { playerName: "S. Ramos", rating: 90, Country: 'Spain' },//2
        { playerName: "Pepe", rating: 89, Country: 'Spain' },//3
        { playerName: "R. Varane", rating: 83, Country: 'Spain' },//4
        { playerName: "Marcelo", rating: 85, Country: 'Spain' },//5
        { playerName: "F. Coentrao", rating: 80, Country: 'Spain' },//6
        { playerName: "T. Kroos", rating: 86, Country: 'Spain' },//7
        { playerName: "L. Modric", rating: 87, Country: 'Spain' },//8
        { playerName: "L. Silva", rating: 82, Country: 'Spain' },//9
        { playerName: "C. Ronaldo", rating: 98, Country: 'Spain' },//10
        { playerName: "Jese", rating: 79, Country: 'Spain' },//11
        { playerName: "G. Bale", rating: 88, Country: 'Spain' },//12
        { playerName: "J. Rodriguez", rating: 86, Country: 'Spain' },//13
        { playerName: "K. Benzema", rating: 88, Country: 'Spain' }//14
    ];

    
    self.availablePosition = ko.observableArray([
        self.keeper = new rosterSpot("Def", self.availablePlayers[0]),
        self.Rb = new rosterSpot("Def", self.availablePlayers[1]),
        self.Rcb = new rosterSpot("Def", self.availablePlayers[2]),
        self.Lcb = new rosterSpot("Def", self.availablePlayers[3]),
        self.Lb = new rosterSpot("Def", self.availablePlayers[5]),
        self.Rm = new rosterSpot("Mid", self.availablePlayers[8]),
        self.Cm = new rosterSpot("Mid", self.availablePlayers[7]),
        self.Lm = new rosterSpot("Mid", self.availablePlayers[13]),
        self.Rw = new rosterSpot("Fwd", self.availablePlayers[12]),
        self.St = new rosterSpot("Fwd", self.availablePlayers[14]),
        self.Lw = new rosterSpot("Fwd", self.availablePlayers[10])
    ]);

    
    self.finalKeeper = self.availablePosition[0];

    self.addtoRoster = function () {
        self.availablePosition.push(new spotReservation(self.availablePlayers[0]));
    }

    //Defender average rating
    self.defRating = ko.computed(function () {
        var total = 0;
        var defNumber = 0;
        
        for (var i = 0; i < self.availablePosition().length; i++) {
            if (self.availablePosition()[i].rosterPosition == "Def") {
                defNumber ++ ;
                total += (self.availablePosition()[i].playerOnField().rating);
            }
        }
        total = total / defNumber;
        return total;
        });

    self.midRating = ko.computed(function () {
        var total = 0;
        var defNumber = 0;

        for (var i = 0; i < self.availablePosition().length; i++) {
            if (self.availablePosition()[i].rosterPosition == "Mid") {
                defNumber++;
                total += (self.availablePosition()[i].playerOnField().rating);
            }
        }
        total = total / defNumber;
        return total;
    });

    self.fwdRating = ko.computed(function () {
        var total = 0;
        var defNumber = 0;

        for (var i = 0; i < self.availablePosition().length; i++) {
            if (self.availablePosition()[i].rosterPosition == "Fwd") {
                defNumber++;
                total += (self.availablePosition()[i].playerOnField().rating);
            }
        }
        total = total / defNumber;
        return total;
    });


    self.averageRating = ko.computed(function () {
        var total = 0;
        for (var i = 0; i < self.availablePosition().length; i++)
            total += (self.availablePosition()[i].playerOnField().rating) / self.availablePosition().length;
        return total;
    });

    //bio custom binding in progress
    ko.bindingHandlers.playerBio = {
        init: function (element, valueAccessor) {
        },
        update: function (element, valueAccessor) {
            // Give the first x stars the "chosen" class, where x <= rating
            var observable = valueAccessor();
            $("span", element).each(function (index) {
                $(this).hover(
                    function () { $(this).prevAll().add(this).addClass("hoverChosen") },
                    function () { $(this).prevAll().add(this).removeClass("hoverChosen") }
                ).click(function () {
                    var observable = valueAccessor();  // Get the associated observable
                    observable(index + 1);               // Write the new rating to it
                });
            });
        }
    };

}

ko.applyBindings(new ReservationsViewModel());