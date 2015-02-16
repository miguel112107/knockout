// Class to represent a row in the seat reservations grid
function spotReservation(defaultPlayer) {
    var self = this;
    self.name = name;
    self.playerOnField = ko.observable(defaultPlayer);
  
        
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.availablePlayers = [
        { playerName: "I. Casillas"},
        { playerName: "D. Carvajal"},
        { playerName: "S. Ramos"},
        { playerName: "Pepe"},
        { playerName: "R. Varane"},
        { playerName: "Marcelo"},
        { playerName: "F. Coentrao"},
        { playerName: "T. Kroos"},
        { playerName: "L. Modric"},
        { playerName: "L. Silva"},
        { playerName: "C. Ronaldo"},
        { playerName: "Jese"},
        { playerName: "G. Bale"},
        { playerName: "J. Rodriguez"},
        { playerName: "K. Benzema"}
    ];

    // Editable data
    self.availablePosition = ko.observableArray([
        new spotReservation(self.availablePlayers[0]),
    ]);
    //self.finalRoster = ko.observableArray([
    //    new 
   // ])
    self.addSeat = function () {
        self.availablePosition.push(new spotReservation(self.availablePlayers[0]));
    }

    self.Keeper = self.availablePlayers[0].valueOf();
    
}
    
ko.applyBindings(new ReservationsViewModel());