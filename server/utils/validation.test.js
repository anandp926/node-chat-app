const expect = require('expect');
const { isRealString } = require('./validation')


describe('isRealString function', () => {
    it('should reject non-string value', () => {
        var res = isRealString(98);
        expect(res).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var res = isRealString('   ');
        expect(res).toBe(false);
    }); 
    it('should allow string with non-space characters', () => {
        var res = isRealString(' Anand ');
        expect(res).toBe(true)
    })
})
