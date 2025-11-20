import { StyleSheet } from 'react-native';
import spacing from './spacing';
import text from './text';
import flex from './flex';
import buttons from './buttons';

const regular = (theme) => StyleSheet.create({
  ...spacing,
  ...text,
  ...flex,
  ...buttons(theme),
  container: {
    ...spacing.mx3
  },
  screenContainer: {
    ...spacing.mx3,
    ...flex.flexColumn, 
    ...flex.flexFill,
  },
  text: {
    color: theme.text,
    fontSize: 16,
  },
  navbar: {
    ...spacing.py2,
    backgroundColor: theme.primary,
    borderBottomColor: theme.text,
    borderBottomWidth: 3,
  },
  logoText: {
    color: theme.buttonText,
    fontSize: 20,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 2,
  },
  headerButton: {
    borderColor: theme.buttonText
  },
  tag: {
    backgroundColor: theme.primary,
    color: theme.buttonText,
    marginTop: 'auto', 
    marginBottom: 'auto', 
    paddingLeft: 8,
    paddingRight: 6, 
    padding: 2, 
    borderRadius: 4, 
    fontSize: 16
  },
  list: { 
    borderWidth: 1, 
    borderColor: theme.outlinePrimary, 
    borderRadius: 4, 
  },
  card: {
    borderWidth: 1, 
    borderColor: theme.outlinePrimary, 
    borderRadius: 4,
    padding: 16,
  },
  listItem: {
    fontSize: 16,
    paddingHorizontal: 16, 
    paddingVertical: 8,
    borderColor: theme.outlinePrimary,
    borderTopWidth: 1,
  },
  listItemTop: {
    borderTopWidth: 0,
  },
  methodNumber: {
    paddingTop: 6, 
    paddingRight: 8,
  },
  textInput: {
    color: theme.text,
    borderColor: theme.inputBorder,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  errorMessage: {
    fontSize: 16,
    color: theme.outlineSecondary,
  },
  errorInput : {
    borderColor: theme.outlineSecondary,
  },
  errorBorder: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: theme.outlineSecondary,
  },
  dropdown: {
    backgroundColor: theme.background,
    height: 'auto',
  },
  dropdownOption: {
    borderRadius: 2,
    color: theme.text,
    fontSize: 16,
    backgroundColor: theme.background,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  searchIcon: {
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderColor: theme.inputBorder,
  },
  switchStyle: {
    marginLeft: -5, 
    transform:[{scale: 1.25}]
  }
});

export default regular;