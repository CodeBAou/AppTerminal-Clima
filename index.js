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
                const lugares = await busquedas.ciudad( termino );
                const id = await listarLugares(lugares);
                const lugarSel = lugares.find( l => l.id === id ); // find devuelve el primer elemento que cumpla la condicion
                

                //Buscar los lugares

                //Seleccionar el lugar

                //Clima

                //Mostrar resultados

                console.log('\n Informacion de la ciudad\n'.green);
                console.log('Ciudad:',lugarSel.nombre);
                console.log('Lat:',lugarSel.lat);
                console.log('Lng:',lugarSel.lng);
                console.log('Temperatura:',);
                console.log('Minima:',);
                console.log('Maxima:',);
                break;
        }

        if ( opt !== '0') await pausa();

    } while ( opt !== '0' );

}

main();