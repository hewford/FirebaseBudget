export default (x) => {
    let n = String(x)
    let value = Number(n).toLocaleString('en');
    if(value === '0') {
        value = ''
    }
    else if(value.indexOf('.') === -1) {
        value += '.00'
    }
    else if(n[n.length-1] === '0' && value.length > 1) {
        value += 0
    }
    value = '$'+ value
    return value
}