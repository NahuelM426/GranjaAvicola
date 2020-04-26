server = require("./server")

mongoConnection = require("./src/mongo/mongoConnection")
Home = require("./src/mongo/mongoHome")
Recolecion = require ("./src/Recolecion")
mongoConnection.connect( (db) => {
    granjasHome = new Home("granja", db)
    galponesHome = new Home("galpone", db)    
    depocitoHome = new Home("depocito", db)    
    
    recolecionHome = new Home ("recolecion",db)

    recolecionHome.insert(new Recolecion(new Date("<2020-03-2>"),300,2))
    recolecionHome.insert(new Recolecion(new Date("<2020-03-3>"),300,0))
    recolecionHome.insert(new Recolecion(new Date("<2020-03-4>"),290,1))
    recolecionHome.insert(new Recolecion(new Date("<2020-03-5>"),225,1))
    recolecionHome.insert(new Recolecion(new Date("<2020-03-6>"),211,3))
    recolecionHome.insert(new Recolecion(new Date("<2020-03-7>"),244,4))
    server.register(granjasHome)
    server.register(galponesHome)
    server.register(depocitoHome)
    server.register(recolecionHome)
    
    server.init();
})

