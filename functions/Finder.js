export default class Finder{  
    static findCoincidences(employees){
        let coincidences = [];
    
        for(let i = 0; i < employees.length; i++){
            let employee1 = employees[i];
            let j = i + 1;
    
            for(j; j < employees.length; j++){
                let employee2 = employees[j]; 
                let numberOfCoincidences = this.compareSchedules(employee1.schedule, employee2.schedule);
                
                if(numberOfCoincidences > 0){
                    coincidences.push(`${employee1.name}-${employee2.name}: ${numberOfCoincidences}`);
                }
            }
        }
        return coincidences;
    }
    
    static compareSchedules(schedule1 , schedule2){
        let coincidences = 0;
    
        for(let i = 0; i < schedule1.length; i++){
            let workDay1 = schedule1[i];
    
            for(let j = 0; j < schedule2.length; j++){
                let workDay2 = schedule2[j];
                
                if(workDay1.day === workDay2.day){        
                    if(workDay1.start >= workDay2.start && workDay1.start < workDay2.end){
                        coincidences++;
                        continue;
                    }

                    if(workDay1.end > workDay2.start && workDay1.end <= workDay2.end){
                        coincidences++;
                        continue;
                    }

                    if(workDay2.start >= workDay1.start && workDay2.start < workDay1.end){
                        coincidences++;
                        continue;
                    }
                }
            }    
        }
        return coincidences;
    }    
}