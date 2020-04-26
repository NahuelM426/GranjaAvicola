server = require("./server")

mongoConnection = require("./src/mongo/mongoConnection")
Home = require("./src/mongo/mongoHome")
Recolecion = require ("./src/Recolecion")
mongoConnection.connect( (db) => {
    granjasHome = new Home("granja", db)
    galponesHome = new Home("galpone", db)    
    depocitoHome = new Home("depocito", db)    
    
    recolecionHome = new Home ("recolecion",db)

    recolecionHome.insert(new Recolecion(new Date("2016-05-18T16: 00: 00Z"),300,2))
    // recolecionHome.insert(new Recolecion(new Date("27-3-20"),300,0))
    // recolecionHome.insert(new Recolecion(new Date("28-3-20"),290,1))
    // recolecionHome.insert(new Recolecion(new Date("29-3-20"),225,1))
    // recolecionHome.insert(new Recolecion(new Date("30-3-20"),211,3))
    // recolecionHome.insert(new Recolecion(new Date("31-3-20"),244,4))
    server.register(granjasHome)
    server.register(galponesHome)
    server.register(depocitoHome)
    server.register(recolecionHome)
    
    server.init();
})

