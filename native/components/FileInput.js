import { useField } from "formik";
import useStyles from "../hooks/useStyles";
import { File } from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { Text, View } from "react-native";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";

const FileInput = ({ name }) => {
  const { flexRow, me2  } = useStyles();
  const [_, meta, helpers] = useField({ name });
  const file = meta.value;
  const fileName = file?.name;

  const onChooseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
      const file = new File(result.assets[0]);
      helpers.setValue(file);
    } catch (e) {
      helpers.setValue(null);
    }
  }

  return (
    <View>
      <View style={{...flexRow, width: '100%'}}>
        <Button style={me2} onPress={onChooseFile}>Choose a file</Button>
        {file ? (
          <Text
            numberOfLines={1}
            ellipsizeMode="middle"
            style={{ flexShrink: 1, margin: 'auto' }}>
            {fileName}
          </Text>
        ) : null}
      </View>
      <ErrorMessage name={name} />
    </View>
  )
};

export default FileInput;