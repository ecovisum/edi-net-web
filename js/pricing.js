const getTier = (buildings) => {
  if (buildings < 5) { return tiers[0] }
  if (buildings >= tiers[tiers.length - 1].buildings) { return tiers[tiers.length - 1] }
  let index = tiers.findIndex(element => {
    return element.buildings > buildings;
  })
  return tiers[index - 1]
}

const getPrice = (buildings) => {
  let tier = getTier(buildings);
  return tier.price + tier.extra * Math.max(0, buildings - tier.buildings)
}

const altShowPrice = ev => {
  let tier = getTier(ev.target.value);
  let extra = Math.max(0, ev.target.value - tier.buildings);
  altBldgs.innerHTML = ev.target.value;
  altPrice.innerHTML = tier.price;
  if (extra) {
    altExtras.innerHTML = ` + €${tier.extra} &times; ${extra} = €${getPrice(ev.target.value)}`
  } else {
    altExtras.innerHTML = "";
  }
  [...document.querySelectorAll("[id^=altTier]")].forEach(el=>{el.classList.remove('highlight');})
  document.getElementById(`altTier${tier.id}`).classList.add('highlight');
}
altBuildings.addEventListener("input", altShowPrice);

const inputEvent = new Event('input');

class TierItem extends HTMLElement {
  constructor() {
    super();
    let template = document.getElementById('simple-tier');
    let templateContent = template.content;
    const shadowRoot = this.attachShadow({mode: 'open'}).appendChild(templateContent.cloneNode(true));
  }
}

class TierList extends HTMLElement {
  constructor() {
    super();
    let template = document.getElementById('my-tiers');
    let templateContent = template.content;
    const shadowRoot = this.attachShadow({mode: 'open'}).appendChild(templateContent.cloneNode(true));
  }
}

const createSlot = (name, value) => {
  let slot = document.createElement('span');
  slot.setAttribute('slot', name);
  slot.innerHTML = value;
  return slot;
}

customElements.define('tier-item', TierItem)
customElements.define('tier-list', TierList)


let myList = document.createElement('tier-list');
let mySlot = document.createElement('span');
mySlot.setAttribute('slot', 'tiers');

tiers.forEach(t => {
  let myItem = document.createElement('tier-item');
  myItem.id = `altTier${t.id}`
  myItem.appendChild(createSlot('name', t.tier));
  myItem.appendChild(createSlot('buildings', t.buildings));
  myItem.appendChild(createSlot('price', t.price));
  myItem.appendChild(createSlot('extra', t.extra));
  myItem.addEventListener('click', ev => {
    altBuildings.value = t.buildings;
    altBuildings.dispatchEvent(inputEvent);
    altBuildings.focus();
  });
  mySlot.appendChild(myItem);
});
myList.appendChild(mySlot);
tierPricing.appendChild(myList);
