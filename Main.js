import Reader from './functions/Reader.js';
import Finder from './functions/Finder.js';

/*
    Please change this line to run the program with other txt files
    For example: let employees = Reader.read('inputs/data3.txt') 
*/
let employees = Reader.read('inputs/data1.txt');

let coincidences = Finder.findCoincidences(employees);
console.log('********Coincidences*********');
console.log(coincidences);  