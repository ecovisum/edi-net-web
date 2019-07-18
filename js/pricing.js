const getTier = (buildings) => {
  if (buildings == 0) { return zero; }
  if (buildings < 5) { return tiers[0]; }
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
  extraPrice.innerHTML = tier.extra;
  extraBldgs.innerHTML = extra;
  finalPrice.innerHTML = getPrice(ev.target.value);
  [...document.querySelectorAll("[id^=altTier]")].forEach(el=>{el.classList.remove('highlight');})
  if(tier.id != 0) {
    document.getElementById(`altTier${tier.id}`).classList.add('highlight');
  }
}
buildingCount.addEventListener("input", altShowPrice);

const inputEvent = new Event('input');

const buildShadowEl = (elem, t) => {
  const template = document.getElementById(elem);
  let templateContent = template.content;
  const shadowRoot = t.attachShadow({mode: 'open'}).appendChild(templateContent.cloneNode(true));
}

class TierItem extends HTMLElement {
  constructor() {
    super();
    buildShadowEl('simple-tier', this);
  }
}

class TierList extends HTMLElement {
  constructor() {
    super();
    buildShadowEl('my-tiers', this);
  }
}

const createSlot = (name, value) => {
  let slot = document.createElement('span');
  slot.setAttribute('slot', name);
  slot.innerHTML = value;
  return slot;
}

// Object.entries for scalable DRY custom elements:
// const customElems = new Map(Object.entries({
//   'tier-item': TierItem,
//   'tier-list': TierList
// }));
// for (const [key, value] of customElems) {
//   console.log(key, value)
//   customElements.define(key, value);
// }

customElements.define('tier-item', TierItem);
customElements.define('tier-list', TierList);

const myList = document.createElement('tier-list');
const mySlot = document.createElement('span');
mySlot.setAttribute('slot', 'tiers');

tiers.forEach(t => {
  const myItem = document.createElement('tier-item');
  myItem.id = `altTier${t.id}`
  myItem.appendChild(createSlot('name', t.tier));
  myItem.appendChild(createSlot('buildings', t.buildings));
  myItem.appendChild(createSlot('price', t.price));
  myItem.appendChild(createSlot('extra', t.extra));
  myItem.addEventListener('click', ev => {
    buildingCount.value = t.buildings;
    buildingCount.dispatchEvent(inputEvent);
    buildingCount.focus();
  });
  mySlot.appendChild(myItem);
});
myList.appendChild(mySlot);
tierPricing.appendChild(myList);
