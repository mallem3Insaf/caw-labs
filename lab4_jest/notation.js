function mean(A){
     let sum =0;
    for(let i=0 ; i<A.length; i++){
      sum += A[i];
    }
    return sum/A.length;
}

module.exports = { mean };