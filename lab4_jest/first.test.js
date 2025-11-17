const {first}=require("./first");
test("returns first element when n is null ",()=>{
    expect(first([1,2,3])).toBe(1);
});
test("returns first 2 elements ",()=>{
    expect(first([1,2,3],2)).toEqual([1,2]);
});
test("returns empty array if n<=0",()=>{
    expect(first([1,2,3],0)).toEqual([]);

});
test("return empty array is array is null",()=>{
    expect(first(null, 2)).toEqual([]);
});