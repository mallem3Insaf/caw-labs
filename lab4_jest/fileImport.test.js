const { mean } = require('./notation');

test ("Average of [55, 215, 15, 84] is 92.25",()=>{
    expect(mean([55,215,15,84])).toBe(92.25);
});
