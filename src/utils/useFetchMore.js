import axios from "axios";
import { useCallback, useState } from "react";

const useFetchMore = (urlStart, count, confResult, initialArray = []) => {
  const [array, setArray] = useState(initialArray);
  const [more, setMore] = useState(true);

  const fetchMoreItems = useCallback(() => {
    let offset = array.length;
    console.log(offset);
    axios
      .get(urlStart + "&count=" + count + "&offset=" + offset)
      .then((response) => {
        console.log(response.data);
        let newArray = confResult(response);
        console.log(newArray);

        if (newArray.length % count !== 0) setMore(false);

        if (array) {
          setArray((prev) => [...prev, ...newArray]);
        } else {
          setArray(newArray);
        }
      })
      .catch((e) => console.log(e));
  }, [array, urlStart, count, confResult]);

  return [fetchMoreItems, array, more];
};

export default useFetchMore;
