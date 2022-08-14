//CONFIGURACION DE LAS VARIABLES DE ENTORNO CON dotenv-npm (Fichero tokens.txt)
require('dotenv').config()
//dotenv lee un fichero con el nombre < .env > y crea las variables de entorno con esos datos
//los datos se ponen en forma clave-valor (TOKENS=asdf.dsfsadfsd...)
//Lista variables de entorno de node
//        console.log(process.env);

const inquirer = require('inquirer');
const {leerInput, inquirerMenu, pausa, listarLugares} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');
const Busqueda = require('./models/busquedas');


const main = async() => {
    
    const busquedas = new Busquedas();
    let opt;

    do{
        opt = await inquirerMenu();

        switch( opt ){
            case '1':
                //Mostrar mensaje
                const termino = await leerInput( 'Ciudad: ' );
  
                //Buscar los lugares
                const lugares = await busquedas.ciudad( termino );

                //Seleccionar el lugar
                const id = await listarLugares(lugares);
                if( id === '0' ) continue;
                const lugarSel = lugares.find( l => l.id === id ); // find devuelve el primer elemento que cumpla la condicion
                
                //Guardar en db 
                busquedas.agregarHistorial( lugarSel.nombre );

                //Clima
                const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng );
                console.log(clima);

                //Mostrar resultados
                console.log('\n Informacion de la ciudad\n'.green);
                console.log('Ciudad:',lugarSel.nombre);
                console.log('Lat:',lugarSel.lat);
                console.log('Lng:',lugarSel.lng);
                console.log('Temperatura:',clima.temp);
                console.log('Minima:',clima.min);
                console.log('Maxima:', clima.max);
                console.log('Descripcion Clima:',clima.desc);
                break;

            case '2':
             
                busquedas.historialCapitalizado.forEach( ( lugar, i ) => {
                        const idx = `${i+1}.`.green;
                        console.log( `${idx} ${lugar}` );
                    }
                );
                break;
        }

        if ( opt !== '0') await pausa();

    } while ( opt !== '0' );

}

main();