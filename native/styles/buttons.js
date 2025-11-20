const buttons = (theme) => ({
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
  groupStart: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
  },
  groupMiddle: {
    borderRadius: 0,
    borderRightWidth: 0,
  },
  groupEnd: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  }
});

export default buttons;