var isHas = 1

let b = {
    dd:"123",
    ...isHas?{aaaa:"213"}:{}
}
console.log(b);