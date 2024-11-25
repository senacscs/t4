function tm () {
    let m1 = parseFloat(document.getElementById('me1').value)
    let m2 = parseFloat(document.getElementById('me2').value)
    let m3 = parseFloat(document.getElementById('me3').value)
    let media = Math.round((m1 + m2 + m3) / 3)
    document.getElementById('exmedia').innerText = `A média é ${media}`
}