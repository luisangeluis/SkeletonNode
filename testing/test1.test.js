const sum =(a,b)=>a+b;

const test=()=>{
  const test1 =sum(1,6);
  
  if(test1===10){
    return 'felicidades pasaste el test';
  }
  return `Ups, tu resultado es ${test1} y tenia que ser: 10`;
  
}

console.log(test());