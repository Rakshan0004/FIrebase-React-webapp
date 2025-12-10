
const obj = {
    a: 1,
    b: 2,
    sum() {
        return this.a + this.b;
    }
};

const res = obj.sum();     // or to use => obj.sum.bind(obj)
console.log(res);