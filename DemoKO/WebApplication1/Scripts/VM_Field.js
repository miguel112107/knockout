// Class to represent a row in the seat reservations grid
function rosterSpot(rosterPosition, defaultPlayer) {
    var self = this;
    self.rosterPosition = rosterPosition;
    self.playerOnField = ko.observable(defaultPlayer);

    self.formattedRating = ko.computed(function () {
        var rating = self.playerOnField().rating;
        return rating ?  + rating.toFixed(2) : "None";
    });
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.availablePlayers = [
        { playerName: "I. Casillas", rating: 88 },//0
        { playerName: "D. Carvajal", rating: 81 },//1
        { playerName: "S. Ramos", rating: 90 },//2
        { playerName: "Pepe", rating: 89 },//3
        { playerName: "R. Varane", rating: 83 },//4
        { playerName: "Marcelo", rating: 85 },//5
        { playerName: "F. Coentrao", rating: 80 },//6
        { playerName: "T. Kroos", rating: 86 },//7
        { playerName: "L. Modric", rating: 87 },//8
        { playerName: "L. Silva", rating: 82 },//9
        { playerName: "C. Ronaldo", rating: 98 },//10
        { playerName: "Jese", rating: 79 },//11
        { playerName: "G. Bale", rating: 88 },//12
        { playerName: "J. Rodriguez", rating: 86 },//13
        { playerName: "K. Benzema", rating: 88 }//14
    ];

    // Editable data
    self.availablePosition = ko.observableArray([
        self.keeper = new rosterSpot("GK", self.availablePlayers[0]),
        self.Rb = new rosterSpot("LB", self.availablePlayers[1]),
        self.Rcb = new rosterSpot("CB", self.availablePlayers[2]),
        self.Lcb = new rosterSpot("CB", self.availablePlayers[3]),
        self.Lb = new rosterSpot("RB", self.availablePlayers[5]),
        self.Rm = new rosterSpot("Rm", self.availablePlayers[8]),
        self.Cm = new rosterSpot("CM", self.availablePlayers[7]),
        self.Lm = new rosterSpot("LM", self.availablePlayers[13]),
        self.Rw = new rosterSpot("RW", self.availablePlayers[12]),
        self.St = new rosterSpot("ST", self.availablePlayers[14]),
        self.Lw = new rosterSpot("LW", self.availablePlayers[10])
    ]);

    
    self.finalKeeper = self.availablePosition[0];

    self.addtoRoster = function () {
        self.availablePosition.push(new spotReservation(self.availablePlayers[0]));
    }

    self.averageRating = ko.computed(function () {
        var total = 0;
        for (var i = 0; i < self.availablePosition().length; i++)
            total += (self.availablePosition()[i].playerOnField().rating) / self.availablePosition().length;
        return total;
    });
}

ko.applyBindings(new ReservationsViewModel());