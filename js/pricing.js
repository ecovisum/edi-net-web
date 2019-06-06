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
