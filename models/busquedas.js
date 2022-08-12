const axios = require('axios');

class Busquedas{

    historial = ['Tergucigalpa', 'Madrid', 'San Jose'];

    constructor(){
        //TODO: leer DB si existe
    }

    get paramsMapbox(){
        return {
            'access_token' : 'pk.eyJ1IjoiY29kZTQ0NTYiLCJhIjoiY2w2cW91ZXZwMGNlczNrbjJyZHRwa2ZsayJ9.EZ41m0BTClxr_M88uqracA',
            'limit': 5,
            'languaje': 'es'
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
}

module.exports = Busquedas;