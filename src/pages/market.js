import "../App.css";
import Items from "./goods";
import { useEffect } from "react";

const Market = () => {
    // check git merge

    useEffect( () => {
        // create the image divs in relations to the amount of data we have
        for ( let i = 0; i < Items.length; i++ ) {  
            const market = document.getElementById("renderMarket");      
            // initialise all elements
            const imageDiv = document.createElement("div");
            imageDiv.classList.add("imageDiv");

            const img = document.createElement("img");
            img.src = Items[i].src;
            img.alt = Items[i].alt;
            img.title = Items[i].title;

            const div1 = document.createElement("div");
            div1.classList.add("div1");

            const button1 = document.createElement("input");
            button1.type = "button";
            button1.title = "Add to cart";
            button1.value =  button1.title;
            button1.classList.add("cartButton");
            button1.addEventListener( "click", CheckProfile)

            const button2 = document.createElement("input");
            button2.type = "button";
            button2.title = "Contact Seller";
            button2.value = button2.title;
            button2.classList.add("sellerButton")
            button2.addEventListener( "click", CheckProfile);

            // append children
            div1.appendChild(button1);
            div1.appendChild(button2);

            const button3 = document.createElement("button");
            button3.type = "button";
            button3.title = "Buy Item";
            button3.classList.add("buyButton");
            button3.innerHTML = button3.title;
            button3.addEventListener( "click", CheckProfile);

            // title
            const titleParagraph = document.createElement("p");
            titleParagraph.innerHTML = Items[i].title;
            titleParagraph.classList.add("title");
            titleParagraph.classList.add("titleParagraph")

            // price discounts
            const discountDiv = document.createElement("div");
            discountDiv.classList.add("priceDiscount");
            const discountPara = document.createElement("p");
            // perform discount evaluation
            let ItemOldPrice = Items[i].oldPrice;
            let ItemNewPrice = Items[i].newPrice;
            ItemOldPrice = ItemOldPrice.toString();
           
            if (ItemOldPrice !== "") {
                // replacing the commas and spaces
                ItemOldPrice = ItemOldPrice.toString().replace(",", "").replace(" ", "");
                ItemNewPrice = ItemNewPrice.toString().replace(",", "").replace(" ", "");
                // convert to type Number
                ItemOldPrice = parseFloat(ItemOldPrice)
                ItemNewPrice = parseFloat(ItemNewPrice)
                // eval
                const priceDifference = ItemOldPrice - ItemNewPrice;
                let discount = (priceDifference / ItemOldPrice) * 100;
                discount = Math.round(discount, 1);
                discountPara.innerHTML = discount + "% discount";
                discountDiv.appendChild(discountPara);

                // create a section for prices
                const pricesDiv = document.createElement("div");
                const oldPrice = document.createElement("p");
                const newPrice = document.createElement("p");
                pricesDiv.classList.add("pricesDiv");
                oldPrice.classList.add("oldPrice");
                oldPrice.innerHTML = `Ksh. ${Items[i].oldPrice}`;
                
                newPrice.innerHTML = `Now Ksh. ${Items[i].newPrice}`;
                newPrice.classList.add("newPrice");
                pricesDiv.appendChild(oldPrice);
                pricesDiv.appendChild(newPrice);
                
                // append general
                imageDiv.appendChild(img);
                imageDiv.appendChild(discountDiv);
                imageDiv.appendChild(titleParagraph);
                imageDiv.appendChild(pricesDiv);
                imageDiv.appendChild(div1);
                imageDiv.appendChild(button3)
                market.appendChild(imageDiv);
            } else {
                // we do not have an old price
                discountPara.innerHTML = "New Offer!";
                discountDiv.appendChild(discountPara)
                // discountDiv.style.display = "none";
                ItemNewPrice = ItemNewPrice.toString().replace(" ", "");
                const newPrice = document.createElement("p");
                newPrice.classList.add("newPrice")
                const pricesDiv = document.createElement("div");
                newPrice.innerHTML = `Ksh. ${ItemNewPrice}`;
                pricesDiv.appendChild(newPrice);
                pricesDiv.classList.add("pricesDiv")

                // append general
                imageDiv.appendChild(img);
                imageDiv.appendChild(discountDiv);
                imageDiv.appendChild(titleParagraph);
                imageDiv.appendChild(pricesDiv);
                imageDiv.appendChild(div1);
                imageDiv.appendChild(button3);
                market.appendChild(imageDiv);
            }
        }
    })

    // when the Add to Cart button is clicked.
    const CheckProfile = () => {
        const subjectStyle = getComputedStyle(document.getElementById("mypageLink")).display;
        if ( subjectStyle === "none" ) {
            ActionCannotComplete();
            return;
        }
    }

    // when a user wants to add an item to the basket but they are not logged.
    const ActionCannotComplete = () => {
        const CannotCompleteActionDiv = document.getElementById("actionCannotComplete");
        const thisInner = CannotCompleteActionDiv.querySelector("#innerActionCannotComplete");
        if ( CannotCompleteActionDiv ) {
            // also animate the inner div
            thisInner.classList.add("animateCannotComplete");
            CannotCompleteActionDiv.style.display = "grid";
            setTimeout(() => {
                thisInner.classList.remove("animateCannotComplete");
                CannotCompleteActionDiv.style.display = "";
            }, 3000);
            return;
        }
    }

    return(
        <div className="renderDivs" id="renderMarket">
            
        </div>
    )
}

export default Market;