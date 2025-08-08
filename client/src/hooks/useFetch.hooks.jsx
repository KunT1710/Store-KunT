import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setErr(null);

    fetch(url, { signal })
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          // console.log("Resquest bị hủy bởi component unmount hoặc timeout");
        } else {
          setErr(err);
          setLoading(false);
        }
      });
    return () => {
      controller.abort();
    };
  }, [url]);

  // console.log("Hook data:", data);

  return { data, loading, err };
}
