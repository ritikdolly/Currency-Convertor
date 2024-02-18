const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for (let select of dropdown) {
    for (currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name === "from" && currcode === "INR") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currcode === "USD") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateExchangerate=async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    //console.log(fromcurr.value,tocurr.value);
    const Url = `${base_url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(Url);
    let data = await response.json();
    let rate = data[tocurr.value.toLowerCase()];
    // console.log(data);
    // console.log(rate);
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal}${fromcurr.value}=${finalAmount}${tocurr.value}`;
}
const updateFlag = (element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangerate();
})

window.addEventListener("load",()=>{
    updateExchangerate();
});