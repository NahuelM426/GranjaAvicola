
server = require("./server")
const Galpon = require("./src/galpon")
const GalponHome = require("./src/mongo/galponHome")

mongoConnection = require("./src/mongo/mongoConnection")
Home = require("./src/mongo/mongoHome")
Recolecion = require ("./src/recoleccion")
Pesaje = require ("./src/pesaje")


galponHome= require("./src/mongo/galponHome")

mongoConnection.connect( (db) => {
    granjasHome = new Home("granja", db)  
    depocitoHome = new Home("depocito", db)  
    galponHome =  new  GalponHome ("galpones", db )
    
    pesajeHome = new Home("pesaje", db)  

    galpon = new Galpon("Galpon-1",new Date("<2020-03-2>"),10000)
    galpon2 = new Galpon("Galpon-2",new Date("<2020-09-2>"),10000)
    // pesajeHome.insert(new Pesaje (new Date("2020/02/4"),[1240,1200,1220,1320,1280,1220,1200,1300,1180,1200,1400,1360,1320,1360,1220,1260,1140,1400,1380,1240,1200,1040,1200,1160,1060,1080,1260,1140,1100,1320,1320,1180,1200,1280,1340,1260,1640,1180,1440,1220,1200,1240,1300,1400,1180,1200,1160,1460,1280,1180,1160,1160,1220,1220,1200,1320,1120,1200,1020,1400,1100]))
    // pesajeHome.insert(new Pesaje (new Date("2020/01/1"),[1230,1100,1200,1360,1300,1200,1300,1300,1200,1220,1420,1260,1220,1360,1220,1260,1140,1400,1380,1240,1200,1040,1220,1360,1160,1280,1360,1140,1120,1220,1120,1200,1200,1280,1340,1260,1640,1180,1440,1220,1200,1240,1300,1400,1180,1200,1160,1460,1280,1180,1160,1160,1220,1320,1300,1320,1120,1260,1320,1440,1300]))
    // pesajeHome.insert(new Pesaje (new Date("<2020-03-3>"),[960,1000,1200,1100,900,1120,1000,980
    // ,1200,1160,1140,1120,1000]))
    recolecionHome = new Home ("recolecion",db)
    recolecionHome.insert(new Recolecion(new Date("<2020-03-2>"),300,2))
    recolecionHome.insert(new Recolecion(new Date("<2020-03-3>"),300,0))
    recolecionHome.insert(new Recolecion(new Date("<2020-03-4>"),290,1))
    recolecionHome.insert(new Recolecion(new Date("<2020-03-5>"),225,1))
    recolecionHome.insert(new Recolecion(new Date("<2020-03-6>"),211,3))
    recolecionHome.insert(new Recolecion(new Date("<2020-03-7>"),244,4))
    galponHome.insert(galpon);
    galponHome.insert(galpon2)
    server.register(pesajeHome)
    server.register(granjasHome)
    server.register(galponHome)
    server.register(depocitoHome)
    server.register(recolecionHome)
    server.init();
})

