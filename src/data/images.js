// Temporary photos from Unsplash (free, no attribution needed).
// Replace with real AU WOODS photos later. Only this file needs to change.
const u = (id, w = 1800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  // Sectional sofa with round coffee table
  hero: u("1550581190-9c1c48d21d6c", 2400),

  categories: {
    tables: u("1581428982868-e410dd047a90", 1600), // wooden coffee table beside white couch
    sofas: u("1567016376408-0226e4d0c1ea", 2000), // dark leather tub sofa
    beds: u("1560185128-e173042f79dd", 2000), // beige upholstered bed
    sideTables: u("1714926340157-dd3a67e7b2c4", 1600), // small side table with vase
  },

  services: {
    interiors: u("1617364852223-75f57e78dc96", 2200), // black padded wooden armchair
    swatches: u("1611967164521-abae8fba4668", 2200), // fabric sofa with pillows (fabric detail)
    professionals: u("1615066390971-03e4e1c36ddf", 2200), // black wooden dining table with chairs
    flagships: u("1583847268964-b28dc8f51f92", 1800), // showroom style living room, big window
  },

  edits: {
    bedroom: u("1757344454333-cc666252e596", 2200), // modern bedroom, wooden accents
    living: u("1493663284031-b7e3aefcae8e", 2200), // wooden table beside sofa chair
    dining: u("1505409628601-edc9af17fda6", 2200), // wooden dining set
    arrivals: u("1605702098590-d552a98dc93d", 2200), // wooden armchair
  },
    collection: {
    sofas: u("1567016376408-0226e4d0c1ea", 900),
    beds: u("1560185128-e173042f79dd", 900),
    dining: u("1505409628601-edc9af17fda6", 900),
    sideTables: u("1714926340157-dd3a67e7b2c4", 900),
    chairs: u("1493663284031-b7e3aefcae8e", 900),
    storage: u("1757344454333-cc666252e596", 900),
    desks: u("1581428982868-e410dd047a90", 900),
    accents: u("1605702098590-d552a98dc93d", 900),
  },
    bestSellers: {
    sofaA: u("1567016376408-0226e4d0c1ea", 1000),
    tvTable: u("1714926340157-dd3a67e7b2c4", 1000),
    chair: u("1493663284031-b7e3aefcae8e", 1000),
    sofaB: u("1617364852223-75f57e78dc96", 1000),
    coffeeTable: u("1581428982868-e410dd047a90", 1000),
    dining: u("1505409628601-edc9af17fda6", 1000),
    bed: u("1560185128-e173042f79dd", 1000),
    storage: u("1757344454333-cc666252e596", 1000),
    accent: u("1605702098590-d552a98dc93d", 1000),
  },
};