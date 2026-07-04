const buttons = (theme) => ({
  btnGroup: {
    borderRadius: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.outlinePrimary,
    overflow: 'hidden', 
    backgroundColor: '#3EB489'
  },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    lineHeight: 24,
    borderRadius: 6,
    borderStyle: 'solid',
    fontSize: 16,
    borderWidth: 1,
    color: theme.buttonText,
    textAlign: 'center',
  },
  btnPrimary: {
    borderColor: theme.primary,
    backgroundColor: theme.primary,
  },
  btnPrimaryPressed: {
    borderColor: theme.primaryActive,
    backgroundColor: theme.primaryActive,
  },
  btnOutlinePrimary: {
    borderColor: theme.outlinePrimary,
    color: theme.outlinePrimary,
  },
  btnOutlinePrimaryPressed: {
    borderColor: theme.primary,
    backgroundColor: theme.primary,
    color: theme.buttonText,
  },
  btnSecondary: {
    borderColor: theme.secondary,
    backgroundColor: theme.secondary,
  },
  btnSecondaryPressed: {
    borderColor: theme.secondaryActive,
    backgroundColor: theme.secondaryActive,
  },
  btnOutlineSecondary: {
    borderColor: theme.outlineSecondary,
    color: theme.outlineSecondary,
  },
  btnOutlineSecondaryPressed: {
    borderColor: theme.secondary,
    backgroundColor: theme.secondary,
    color: theme.buttonText,
  },
  btnLink: {
    color: theme.outlinePrimary,
    textDecorationLine: 'underline',
    borderWidth: 0,
  },
  groupBtn: {
    backgroundColor: theme.background,
  },
  groupStart: {
    borderWidth: 0,
    borderRadius: 0,
  },
  groupMiddle: {
    borderRadius: 0,
    borderRightWidth: 0,
  },
  groupEnd: {
    borderWidth: 0,
    borderLeftWidth: 1,
    borderRadius: 0,
  }
});

export default buttons;