'use strict';
const program = require("commander");
const filer = require('./cli/filer');
const access = require('./cli/access');

//Version
program
  .version("DonBot 1.0.0")
  .description("DonBot. CLI para operacion del integrador");

//Create app Token
program.
  command("access <user> <description> <expiration>").
  alias("ac").
  description("Crea un App Key, para una key sin expiracion enviar el valor noexpire en lugar del numero de dias u horas (2 days, 10h, 7d)").
  action((user, description, expiration)=>{
    access.createKey(user, description, expiration);
  });

//Create controller



//Create component

//Create model



//Lectura de archivo
program.
  command("readfile <path>").
  alias("r").
  description("Leer el archivo").
  action((path)=>{
    filer.readfile(path);
  });

program.parse(process.argv);
