server = require("./server")

mongoConnection = require("./src/mongo/mongoConnection")
Home = require("./src/mongo/mongoHome")
mongoConnection.connect( (db) => {
    granjasHome = new Home("granja", db)
    galponesHome = new Home("galpone", db)    
    depocitoHome = new Home("depocito", db)    
    
    server.register(granjasHome)
    server.register(galponesHome)
    server.register(depocitoHome)
    
    server.init();
})

