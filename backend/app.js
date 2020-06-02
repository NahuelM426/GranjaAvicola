server = require("./server")

mongoConnection = require("./src/mongo/mongoConnection")
Home = require("./src/mongo/mongoHome")
Recolecion = require ("./src/recolecion")
Pesaje = require ("./src/pesaje")

mongoConnection.connect( (db) => {
    granjasHome = new Home("granja", db)
    galponesHome = new Home("galpon", db)    
    depocitoHome = new Home("depocito", db)  
    
    pesajeHome = new Home("pesaje", db)  
    pesajeHome.insert(new Pesaje (new Date("<2020-03-4>"),[1240,1200,1220,1320,1280,1220,1200,1300,1180,1200,1400,1360,1320,1360,1220,1260,1140,1400,1380,1240,1200,1040,1200,1160,1060,1080,1260,1140,1100,1320,1320,1180,1200,1280,1340,1260,1640,1180,1440,1220,1200,1240,1300,1400,1180,1200,1160,1460,1280,1180,1160,1160,1220,1220,1200,1320,1120,1200,1020,1400,1100]))
    // pesajeHome.insert(new Pesaje (new Date("<2020-03-1>"),[960,1000,1200,1100,900,1120,1000,980
    // ,1200,1160,1140,1120,1000]))
    // pesajeHome.insert(new Pesaje (new Date("<2020-03-3>"),[960,1000,1200,1100,900,1120,1000,980
    // ,1200,1160,1140,1120,1000]))
    recolecionHome = new Home ("recolecion",db)
    recolecionHome.insert(new Recolecion(new Date("<2020-03-2>"),300,2))
    recolecionHome.insert(new Recolecion(new Date("<2020-03-3>"),300,0))
    recolecionHome.insert(new Recolecion(new Date("<2020-03-4>"),290,1))
    recolecionHome.insert(new Recolecion(new Date("<2020-03-5>"),225,1))
    recolecionHome.insert(new Recolecion(new Date("<2020-03-6>"),211,3))
    recolecionHome.insert(new Recolecion(new Date("<2020-03-7>"),244,4))
    server.register(pesajeHome)
    server.register(granjasHome)
    server.register(galponesHome)
    server.register(depocitoHome)
    server.register(recolecionHome)
    server.init();
})

