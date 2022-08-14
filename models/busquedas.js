const fs = require('fs');
const axios = require('axios');

class Busquedas{

    historial = [];
    dbPath = './db/database.json';

    constructor(){
        //TODO: leer DB si existe
        try{
            this.leerDB();
        }catch(err){
            console.log(err);
        }
        
    }

    get historialCapitalizado(){
        return this.historial.map( lugar => {
            let palabras = lugar.split(' ');
            palabras     = palabras.map( p=> p[0].toUpperCase() + p.substring(1) );
            return palabras.join(' ');
        });
        return this.historial;
    }

    get paramsMapbox(){
        return {
            'access_token' : process.env.MAPBOX_KEY,
            'limit': 5,
            'languaje': 'es'
        }
    }

    get paramsOpenweathermap(){
        return{
            appid: process.env.OPEWATHER_KEY,
            units:'metric',
            lang:'es'
        }
    }

    async ciudad ( lugar = '' ){

        try{

            //peticion http
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });
            
            const resp = await intance.get();
            
            return resp.data.features.map( lugar => (
                {
                    id: lugar.id,
                    nombre: lugar.place_name,
                    lng: lugar.center[0],
                    lat: lugar.center[1]
                }
            ));
            

            return[];

        }catch(error){
            return [];
        }
    }

    async climaLugar( lat, lon ){

        try{
            //Instancia axios.create()
            const instance = axios.create(
                {
                    baseURL:`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
                    params:this.paramsOpenweathermap
                }
            )

            const resp = await instance.get();
         
            //resp.data
            return{
                desc:resp.data.weather[0].description,
                min:resp.data.main.temp_min,
                max:resp.data.main.temp_max,
                temp:resp.data.main.temp
            }

        }catch( error ){
            console.log(error);
        }
    }

    agregarHistorial( lugar = '' ){
        
        if( this.historial.includes( lugar.toLocaleLowerCase() ) ){
            return;//ya existe no se guarda
        }

        //prevenir duplicados
        this.historial.unshift( lugar.toLocaleLowerCase() );

        // Grabar en DB
        this.guardarDB();
    }
    
    guardarDB(){

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync( this.dbPath, JSON.stringify(payload));
    }

    leerDB(){

        if(!fs.existsSync(this.dbPath) ) return;       
        const info     = fs.readFileSync( this.dbPath, { encoding: 'utf-8'} );
        const data     = JSON.parse( info );
        this.historial = data.historial;
    }
}

module.exports = Busquedas;