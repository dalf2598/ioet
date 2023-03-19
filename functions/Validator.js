import WorkDay from '../models/WorkDay.js';
//Valid days format for working days
const days = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

export default class Validator {
    static validateRowsFormat(rows) {
        let validRows = [];
        let names = [];

        for (let i = 0; i < rows.length; i++) {
            let flag = true;
            let employee = rows[i];

            if (!employee.includes('=') || employee.split('=').length - 1 > 1) {
                flag = false;
                console.log(`Row ${i + 1} has incorrect '=' sign format -> ${employee}`);
                continue;
            }

            let row = rows[i].split(/[=,]/);

            //First element always has the name
            let name = row[0];
            if (names.indexOf(name.toLowerCase()) !== -1) {
                flag = false;
                console.log(`Row ${i + 1} has duplicate name -> ${name}`);
                continue;
            } else {
                names.push(name.toLowerCase());
            }

            let schedule = [];

            for (let j = 1; j < row.length; j++) {
                /*
                Second and following elements have working days
                Working must have the following format
                    MO10:00-12:00
                day|startHour|:|startMinute|-|endHour|:|endMinute
                */
                let temp = row[j];
                if (temp.length !== 13) {
                    flag = false;
                    console.log(`Row ${i + 1} has invalid work day format -> ${temp}. Length must be 13 characters`);
                    break;
                }

                let day = row[j].slice(0, 2);
                if (days.indexOf(day.toLowerCase()) === -1) {
                    flag = false;
                    console.log(`Row ${i + 1} has invalid work day format -> ${temp}. Invalid day -> ${day}`);
                    break;
                }

                let startHour = row[j].slice(2, 4);
                if (!this.validateNumber(startHour, 24)) {
                    flag = false;
                    console.log(`Row ${i + 1} has invalid work day format -> ${temp}. Invalid start hour -> ${startHour}`);
                    break;
                }
                
                let startSeparator = row[j].slice(4, 5);
                if (startSeparator !== ':') {
                    flag = false;
                    console.log(`Row ${i + 1} has invalid work day format -> ${temp}. Invalid time separator -> ${startSeparator}`);
                    break;
                }

                let startMinute = row[j].slice(5, 7);
                if (!this.validateNumber(startMinute, 60)) {
                    flag = false;
                    console.log(`Row ${i + 1} has invalid work day format -> ${temp}. Invalid start minute -> ${startMinute}`);
                    break;
                }
                
                let timeSeparator = row[j].slice(7, 8);
                if (timeSeparator !== '-') {
                    flag = false;
                    console.log(`Row ${i + 1} has invalid work day format -> ${temp}. Invalid time separator -> ${timeSeparator}`);
                    break;
                }

                let endHour = row[j].slice(8, 10);
                if (!this.validateNumber(endHour, 24)) {
                    flag = false;
                    console.log(`Row ${i + 1} has invalid work day format -> ${temp}. Invalid end hour -> ${endHour}`);
                    break;
                }
                
                let endSeparator = row[j].slice(10, 11);
                if (endSeparator !== ':') {
                    flag = false;
                    console.log(`Row ${i + 1} has invalid work day format -> ${temp}. Invalid time separator -> ${endSeparator}`);
                    break;
                }
                
                let endMinute = row[j].slice(11, 13);
                if (!this.validateNumber(endMinute, 60)) {
                    flag = false;
                    console.log(`Row ${i + 1} has invalid work day format -> ${temp}. Invalid end minute -> ${endMinute}`);
                    break;
                }

                let start = parseInt(startHour) * 60 + parseInt(startMinute);
                let end = parseInt(endHour) * 60 + parseInt(endMinute);

                if (start >= end) {
                    flag = false;
                    console.log(`Row ${i + 1} has invalid work day format -> ${temp}. The entry time is later than the exit time`);
                    break;
                }
                
                let workDay = new WorkDay(day, start, end);
                /*
                An employee cannot have overlapping working days 
                For example
                    MO10:00-12:00, MO11:00-11:30
                */
                if(this.validateOverlapping(workDay, schedule)){
                    schedule.push(workDay);
                }else{
                    flag = false;
                    console.log(`Row ${i + 1} has overlapping on working days -> ${temp}.`);
                    break;
                }
            }

            if (flag) {
                validRows.push(employee)
            }
        }

        console.log('********Valid-Rows**********');
        console.log(validRows);
        
        return validRows;
    }

    static validateNumber(number, limit) {
        return (isNaN(number) || parseInt(number) >= limit) ? false : true;
    }

    static validateOverlapping(workDay1, schedule){
        for(let i = 0; i < schedule.length; i++){
            let workDay2 = schedule[i];
            
            if(workDay1.day === workDay2.day){   
                if(workDay1.start >= workDay2.start && workDay1.start < workDay2.end){
                    return false;
                }

                if(workDay1.end > workDay2.start && workDay1.end <= workDay2.end){
                    return false;
                }

                if(workDay2.start >= workDay1.start && workDay2.start < workDay1.end){
                    return false;
                }
            }
        }
        return true;
    }
}