var mongoDriver= require('mongodb');

class GalponHome {
    constructor(type,db){
        this.type="galpones";
        this.galpones = db.collection("galpones")
    }

    insert(elemento){
        elemento.pesaje=[];
        this.galpones.insertOne(elemento,(error,result)=>{
            if(error) throw error
            console.log(`Resultado de insertar el elemento: ${JSON.stringify(result)}`)
        })
    }

    agregarTx(galponId, pesaje, callback) {
        var objectId = mongoDriver.ObjectID(galponId)
        this.galpones.findOne({"_id":objectId}, (error, galpon)=>{
            if(error)
                callback("error")
            else {
                console.log("el galpon es" + objectId)
                galpon.pesaje.push(pesaje)
                this.galpones.replaceOne({"_id":objectId}, galpon, (error, result)=>{
                    if(error)
                        callback("error")
                    else {
                        console.log(`Resultado de actualizar: ${JSON.stringify(result)}`)
                        callback("ok", pesaje)
                    }
                })
            }
        })
    }
    agregarRecolecion(galponId, recoleccion, callback) {
        var objectId = mongoDriver.ObjectID(galponId)
        this.galpones.findOne({"_id":objectId}, (error, galpon)=>{
            if(error)
                callback("error")
            else {
                console.log("el galpon es" + objectId)
                galpon.recolecion.push(recoleccion)
                this.galpones.replaceOne({"_id":objectId}, galpon, (error, result)=>{
                    if(error)
                        callback("error")
                    else {
                        console.log(`Resultado de actualizar: ${JSON.stringify(result)}`)
                        callback("ok", recoleccion)
                    }
                })
            }
        })
    }

 borrarCliente(elementId,callback) {
            var objectId = mongoDriver.ObjectID(elementId);
            this.galpones.findOne({"_id":objectId}, (error, galpon)=>{
                if(error)
                    callback("error")
                else {
                    console.log("el galpon es" + objectId)
                    
                    this.galpones.deleteOne({"_id":objectId}, galpon, (error, result)=>{
                        if(error)
                            callback("error")
                        else {
                            console.log(`Resultado de borrar: ${JSON.stringify(result)}`)
                            callback("ok", galpon)
                        }
                    })
                }
            })
        }

    agregarCliente(n_cliente, cliente, callback) {      
            this.galpones.findOne({"n_cliente":n_cliente}, (error,clien)=>{
                if(error){
                    callback("el cliente no existe")
                this.galpones.insertOne( cliente, (error, result)=>{
                        if(error) 
                            callback("error")
                            else{
                            console.log(`Resultado de insertar: ${JSON.stringify(cliente)}`)
                            callback("ok", cliente)
                            }
                            })
                }
            })
                    
            }
    


    getUnCliente(elementId,callback) {
            var objectId = elementId
            return this.galpones.findOne({"n_cliente" : objectId}, (error, result) => {
                if(error) throw error
                callback (result)
            })
        }

    getUnCliente2(elementId) {
            var objectId = elementId
            return this.galpones.findOne({"n_cliente" : objectId}, (error, result) => {
                if(error) throw error
                return (result)
            })
        }

    update(element) {
        var objectId = mongoDriver.ObjectID(element._id);
        element._id = objectId;
        this.galpones.replaceOne({"_id" : objectId}, element, (error, result)=>{
            if(error) throw error
            console.log(`Resultado de actualizar: ${JSON.stringify(result)}`)
        })
    }

  
  
  
  find(query, callback) {
        this.galpones.find(query).toArray( (error, result)=>{
            if(error) throw error
            callback(result)
        })
    }
    all(callback) {
        this.galpones.find({}).toArray( (error, result)=>{
            if(error) throw error
            callback(result)
        })
    }
    
}
module.exports= GalponHome;