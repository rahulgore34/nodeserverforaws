function f() {
  return new Promise((resolve, reject)=> {
    // do async stuff
    setTimeout(() => {
      resolve('2000..!!');
    }, 2000);
  })
}
function f1() {
  return new Promise((resolve, reject)=> {
    // do async stuff
    setTimeout(() => {
      resolve('1000..!!');
    }, 1000);
  })
}

async function executeMe() {
try {
  const result = await Promise.all([f(),f1()]);
  console.log('Result ',result);
} catch (error) {
  console.log('Error  ',error);
  
}
  
}
executeMe()