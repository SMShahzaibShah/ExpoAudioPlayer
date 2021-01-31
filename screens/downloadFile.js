const [getBook, setBook] = useState();
const [docsList, setdocsList] = useState([]);

const getAllFilesInDirectory = async () => {
  let dir = await FileSystem.getContentUriAsync(
    FileSystem.documentDirectory + "expoWordsWorthDownload"
  );
  dir.forEach((val) => {
    setdocsList.push(
      FileSystem.documentDirectory + "expoWordsWorthDownload/" + val
    );
  });

  await setState(docsList);
};

const saveFile = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === "granted") {
    const album = await MediaLibrary.getAlbumAsync("expoWordsWorthDownload");
    console.log(album);
  }
};

const readFile = async (bookName) => {
  // let dir = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'app_docs');
  const { status } = await Permissions.getAsync(Permissions.MEDIA_LIBRARY);
  if (status == "granted") {
    console.log(MediaLibrary.getAlbumAsync("expoWordsWorthDownload"));
  }
  {
    /**
    console.log(fileUri);
    FileSystem.readDirectoryAsync(fileUri)
      .then(({ url }) => {
        console.log("here");
        setBook(url);
      })
      .catch((error) => {
        console.error(error);
      });
       */
  }
};

useEffect(() => {
  saveFile();
}, []);
return (
  <View style={styles.container}>
    <Text>bye</Text>
    {/**
      <PDFReader
        source={{
          uri: getBook,
        }}
      />
     */}
  </View>
);
