// datatypes
// number string , bool => primitve data types
// object ,array => refrence data types 
// var let const

// functions

// function func2(){
//     console.log("function statement");
// }


// const func1 = function(){
//     console.log("function expression")
// }

// const func3 = ()=>{ // this 
//     console.log("arrow function")
// }

// // call bind apply 

// /// 
// const arr = [1,2,3,4];
// const fruits = ["apple",'orange','bannana'];

// // map filter reduce , find , findIndex

// console.log(arr.map((el,idx, arr)=>{
//     console.log(el,idx,arr)
//     return el*2;
// }))


/// es+
// template literals
// const x = "hello"
// const y = "world"
// const z = x + "" + y;
// console.log(`${x} ${y}`);

// desturucrting

// const user = {
//     name:"shady",
//     city:"mansoura",
//     age:24
// }
// const arr = [1,2,3,3]

// const [first, , ,fourth] = arr


// const {name ,age ,city } = user;


// // shallow copy , deep copy
// const obj1 = {
//     name:"shady",
//     address:{
//         city:"mansoura",
//         street:"15"
//     }
// }

// const obj2 = JSON.parse(JSON.stringify(obj1));

// obj2.address.city = "cairo";
// console.log("obj1",obj1)
// console.log("obj2",obj2)
// higher order function


// const double = (num)=>num*2; 
// const triple = (num)=>num*3;


// function multiplier(factor){
//     return function(number){
//         return factor(number);
//     }
// }


// const mul2 = multiplier(double);
// const mul3 = multiplier(triple);

// console.log(mul2(4));
// console.log(mul3(4));