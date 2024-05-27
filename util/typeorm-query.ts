import 
{ FindManyOptions,
  Not,
  LessThan,
   



} 
from "typeorm";

export  function buildCustomQuery(inputData: any) : FindManyOptions {
 let query : FindManyOptions = {
    where: [],
    relations: {},
    select: {}
 } 
 
 for (let key in inputData) {
    if (inputData.hasOwnProperty(key)) {
        console.log(`${key}: ${inputData[key]}`);
    }
}


 return query

}