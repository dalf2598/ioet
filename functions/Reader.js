import fs from 'fs';
import Validator from './Validator.js';
import Employee from '../models/Employee.js';
import WorkDay from '../models/WorkDay.js';

export default class Reader{  
    static read(path) {
        let employees = [];
        let rows = fs.readFileSync(path).toString().split(/\r?\n/);
        rows = Validator.validateRowsFormat(rows);

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i].split(/[=,]/);
            let schedule = [];
            //First element always has the name
            let name = row[0]; 
            for (let j = 1; j < row.length; j++) {
                //Second and following elements have working days
                let day = row[j].slice(0, 2);
                let start = parseInt(row[j].slice(2, 4)) * 60 + parseInt(row[j].slice(5, 7));
                let end = parseInt(row[j].slice(8, 10)) * 60 + parseInt(row[j].slice(11, 13));
            
                schedule.push(new WorkDay(day, start, end));
            }
            employees.push(new Employee(name, schedule));
        }
        return employees;
    }
}


