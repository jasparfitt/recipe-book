const spacingValues = [0, 4, 8, 16, 24, 48, 'auto'];
const spacingTypes = [{name: 'm', property: 'margin'}, {name: 'p', property: 'padding'}];
const spacingSuffixes = [
  {name: '', property: ''},
  {name: 't', property: 'Top'},
  {name: 'b', property: 'Bottom'},
  {name: 's', property: 'Left'},
  {name: 'e', property: 'Right'},
  {name: 'x', property: 'Horizontal'},
  {name: 'y', property: 'Vertical'},
];

const getClasses = (name, nameSuffix, number, property, propertySuffix, value) => {
  const actualNumber = value === 'auto' ? 'Auto' : number;

  return {
    [`${name}${nameSuffix}${actualNumber}`]: { [`${property}${propertySuffix}`]: value }
  };
}

const spacing = spacingTypes.reduce((prev1, type) => ({
  ...prev1, ...spacingSuffixes.reduce((prev2, suffix) => ({
    ...prev2, ...spacingValues.reduce((prev3, value, number) => ({
      ...prev3, ...getClasses(type.name, suffix.name, number, type.property, suffix.property, value)
    }), {})
  }), {})
}), {});

export default {
  ...spacing, 
  myAuto: {marginTop: 'auto', marginBottom: 'auto'},
  mxAuto: {marginLeft: 'auto', marginRight: 'auto'},
};