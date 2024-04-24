
i=0;
var cards = document.getElementById('cards');
var c = document.getElementsByClassName('content')[0];
var s = '';
var arr = ['https://m.media-amazon.com/images/I/81dszCJ0etL._SY741_.jpg', 'https://m.media-amazon.com/images/I/81dk+-FgCNL._SY741_.jpg', 'https://m.media-amazon.com/images/I/81z+aTko9qL._SY741_.jpg','https://m.media-amazon.com/images/I/81Sp+ssmiSL._SY741_.jpg','https://m.media-amazon.com/images/I/91wBYH2ydbL._SY741_.jpg','https://m.media-amazon.com/images/I/61M+P4fxmoL._SX679_.jpg']

while(i<arr.length)
{ 
   s = s + `<img src = ${arr[i]} data-value=${i}>`;
   i = i+1;
}
cards.innerHTML = s;
var img_cards = cards.querySelectorAll('img');

img_cards[0].style.cssText= `border:2px solid rgb(66, 26, 116);
                             transform: scale(1.1)`; 

img_cards.forEach(e=>{
   e.onclick = ()=>{
      img_cards.forEach(e => {
         e.style.cssText= `border:2px solid rgb(66, 26, 116, 0);
                             transform: scale(1)`; 

      })
      e.style.cssText= `border:2px solid rgb(66, 26, 116);
                             transform: scale(1.1)`;
      document.querySelector('.container img').src = arr[e.dataset.value]
   }
})                             


var content = '';

fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448')
.then(response => response.text())
.then((data) => {
                 content = JSON.parse(data)

                 var p = content.product;
                 var act_price = parseInt(p.compare_at_price.replace('$', '')).toFixed(2);
                 var dis_price = parseInt(p.price.replace('$', '')).toFixed(2);
                 var dis = ((act_price - dis_price)*(100/act_price)).toFixed(0);
                 
                 var color = p.options[0].values;
                 var clr = '';
            
                 color.forEach(e => {
                    var values = Object.values(e);
                    var keys = Object.keys(e);
                    clr = clr + `<span class='outer-color' data-value= '${keys[0]}'><span class = 'color' style='background-color:${values[0]};'><i class="fa-solid fa-check" style="color: transparent"></i></span></span>`;
                   
                 });
                 color = null;
                 var size = p.options[1].values;
                 var sz = '';
                 size.forEach(e => {
                  var values = Object.values(e);
                  var str='';
                  values.forEach(e=>{
                    str = str + e;
                  })
                  sz = sz + `<span><input class='radio' type = 'radio' name='size' value='${str}'/><label>${str}</label></span>`;
                  
               });
                 
                 c.innerHTML = `<div>${p.vendor}</div>
                                <div>${p.title}</div>
                                <div><span>$${dis_price}</span> <span>${dis}% Off</span><br></div>
                                <div><s>$${act_price}</s></div>
                                <div>Choose a Color</div>
                                <div>${clr}</div>
                                <div>Choose a Size</div>
                                <div>${sz}</div>
                                <div><i class="fa-solid fa-minus"></i><span>1</span><i class="fa-solid fa-plus"></i></div>
                                <a><button><i class="fa-solid fa-bag-shopping"></i><span>Add To Cart</span></button></a>
                                <div></div>
                                <div>${p.description}</div>
                                `;
                var u_clr = document.querySelectorAll('.outer-color')
                                
                u_clr.forEach(e=>{
                                   
                        e.onclick = () => {
                               var icon = e.querySelector('.color i');
                               u_clr.forEach( t => {
                                        t.style.border = `3px solid transparent`;
                                        t.querySelector(".outer-color i").style.color = 'transparent';
                                     }) 
                              var k = e.querySelector('.color');
                               e.style.border = `3px solid ${k.style.backgroundColor}`;
                               icon.style.color = 'white';
                               color =  e.dataset.value;
                               
                                }
                                })
                 
                var qty =  document.querySelectorAll('.content :nth-child(9)')[0].children;
             
                qty[0].onclick = ()=>{
                  if(parseInt(qty[1].innerHTML) >= 1)
                  {
                     qty[1].innerHTML = parseInt(qty[1].innerHTML) - 1;
                  }

                }

                qty[2].onclick = ()=>{
                  if(parseInt(qty[1].innerHTML) >= 0)
                  {
                     qty[1].innerHTML = parseInt(qty[1].innerHTML) + 1;
                  }
                  
                }
                var radio = document.querySelectorAll('.content :nth-child(8) span');
                radio.forEach(e => {
                  
                  e.onclick = () => {
                     radio.forEach(t => {
                        t.style.cssText ='{background-color:rgba(109, 122, 131, 0.314);}';
                       
                     })
                    e.style.cssText = 'color: rgba(21, 33, 100, 0.804); background-color:rgba(45, 93, 127, 0.314)'
                    e.querySelector('input').checked = 'true';
                  }
               }
                )

                var cart =  document.querySelector('.content :nth-child(10)');
                cart.onclick = ()=>{
                  var radio = document.querySelector('input[name="size"]:checked');
                  var show =  document.querySelector('.content :nth-child(11)');
               
                  if(radio && color)
                  {
                    var size = radio.value;
                  
                     var info = `Embrace Sideboard with Color ${color} and Size ${size} added to cart`;
                     show.innerHTML = info;
                  }
                  else if(!color) {
                     
                     var info = 'Please select a color';
                     show.innerHTML = info;
                     show.style.opacity = 1;
                  }
                  else if(!radio){
                     var info = 'Please Select a size';
                     show.innerHTML = info;
                     show.style.opacity = 1;
                  }

                }


                   })

