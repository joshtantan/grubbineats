$(document).ready(function() {
  $('.dish-counter').change(function(){
    let total = 0;

    $('.dish-counter').each(function () {
      let quantityOutput = parseFloat($(this).val())
      let price = parseFloat($(this).attr("id"))
      total += quantityOutput * price
     })
    let totalString = `$${total.toFixed(2)}`
    $('#total-price').html(totalString)
  })
})
