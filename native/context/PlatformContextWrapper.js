import GDriveContext from "coook.shared/context/GDriveContext";
import StorageContext from "coook.shared/context/StorageContext";
import useGDrive from "../hooks/useGDrive";
import useStorage from "../hooks/useStorage";

const PlatformContextWrapper = ({ children }) => {
  const [getGDrive] = useGDrive();
  const store = useStorage();

  return (
    <StorageContext.Provider value={store}>
      <GDriveContext.Provider value={getGDrive}>
        {store && getGDrive ? children : null}
      </GDriveContext.Provider>
    </StorageContext.Provider>
  );
};

export default PlatformContextWrapper;