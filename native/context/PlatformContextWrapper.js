import GDriveContext from "../../shared/context/GDriveContext";
import StorageContext from "../../shared/context/StorageContext";
import useGDrive from "../hooks/useGDrive";
import useStorage from "../hooks/useStorage";

const PlatformContextWrapper = ({ children }) => {
  const [getGDrive] = useGDrive();
  const store = useStorage();

  return (
    <StorageContext.Provider value={store}>
      <GDriveContext.Provider value={getGDrive}>
        {children}
      </GDriveContext.Provider>
    </StorageContext.Provider>
  );
};

export default PlatformContextWrapper;