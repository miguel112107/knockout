// Class to represent a row in the seat reservations grid
function rosterSpot(rosterPosition, defaultPlayer) {
    var self = this;
    self.rosterPosition = rosterPosition;
    self.playerOnField = ko.observable(defaultPlayer);
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.availablePlayers = [
        { playerName: "I. Casillas", rating: 88 },
        { playerName: "D. Carvajal", rating: 88 },
        { playerName: "S. Ramos", rating: 88 },
        { playerName: "Pepe", rating: 88 },
        { playerName: "R. Varane", rating: 88 },
        { playerName: "Marcelo", rating: 88 },
        { playerName: "F. Coentrao", rating: 88 },
        { playerName: "T. Kroos", rating: 88 },
        { playerName: "L. Modric", rating: 88 },
        { playerName: "L. Silva", rating: 88 },
        { playerName: "C. Ronaldo", rating: 88 },
        { playerName: "Jese", rating: 88 },
        { playerName: "G. Bale", rating: 88 },
        { playerName: "J. Rodriguez", rating: 88 },
        { playerName: "K. Benzema", rating: 88 }
    ];

    // Editable data
    self.availablePosition = ko.observableArray([
        new rosterSpot("GK", self.availablePlayers[0]),
        new rosterSpot("LB", self.availablePlayers[0])

    ]);

    self.addtoRoster = function () {
        self.availablePosition.push(new spotReservation(self.availablePlayers[0]));
    }
}

ko.applyBindings(new ReservationsViewModel());