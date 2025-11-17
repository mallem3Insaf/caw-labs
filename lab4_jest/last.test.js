const {last}=require("./last");
test("returns last element when n is null ",()=>{
    expect(last([1,2,3])).toBe(3);
});
test("returns last 2 elements ",()=>{
    expect(last([1,2,3],2)).toEqual([2,3]);
});
test("return empty array if array is null",()=>{
    expect(last(null, 2)).toEqual([]);
});
test("return entire array if n is > array.lenght",()=>{
    expect(last([1,2,3],10)).toEqual([1,2,3]);
});