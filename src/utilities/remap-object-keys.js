// map: { foo: 'lol', bar: 'kek' }
// origin: { foo: 10, bar: 20 } result ->  { lol: 10: kek: 20 }
export const remapObjectKeys = (map, origin) => Object
  .entries(map)
  .reduce(
    (acc, [key, value]) => ({ ...acc, [key]: origin[value] }),
    {},
  )
