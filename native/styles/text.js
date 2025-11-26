const fontSize = [
  'calc(1.375rem + 1.5vw)',
  'calc(1.325rem + .9vw)',
  'calc(1.3rem + .6vw)',
  'calc(1.275rem + .3vw)',
  20,
  16,
]

const text = {
  fs1: {fontSize: fontSize[0]},
  fs2: {fontSize: fontSize[1]},
  fs3: {fontSize: fontSize[2]},
  fs4: {fontSize: fontSize[3]},
  fs5: {fontSize: fontSize[4]},
  fs6: {fontSize: fontSize[5]},
  h1: {fontSize: fontSize[0], marginBottom: 8},
  h2: {fontSize: fontSize[1], marginBottom: 8},
  h3: {fontSize: fontSize[2], marginBottom: 8},
  h4: {fontSize: fontSize[3], marginBottom: 8},
  h5: {fontSize: fontSize[4], marginBottom: 8},
  h6: {fontSize: fontSize[5], marginBottom: 8},
  fwBold: {fontWeight: 700},
  fwSemiBold: {fontWeight: 600},
  fwNormal: {fontWeight: 400},
  fwLight: {fontWeight: 300},
  fwLight: {fontWeight: 300},
  fstItalic: {fontStyle: 'italic'},
  fstNormal: {fontStyle: 'normal'},
  textDecorationUnderLine: {textDecoration: 'underline'},
  textDecorationLineThrough: {textDecoration: 'line-through'},
  textDecorationNone: {textDecoration: 'none'},
  textStart: {textAlign: 'left'},
  textCenter: {textAlign: 'center'},
  textEnd: {textAlign: 'right'},
  capitals: {textTransform: 'capitalize'}
};

export default text;