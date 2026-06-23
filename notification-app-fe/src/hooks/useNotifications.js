import {
  useEffect,
  useState
} from "react";

import {
  fetchNotifications
} from "../api/notifications";

export function useNotifications(
  page,
  filter
) {
  const [
    notifications,
    setNotifications
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    error,
    setError
  ] = useState("");

  useEffect(
    function () {
      async function load() {
        try {
          setLoading(true);

          const data =
            await fetchNotifications(
              page,
              10,
              filter
            );

          setNotifications(
            data.notifications || []
          );

          setError("");
        } catch (err) {
          setError(
            "Failed to load notifications"
          );
        }

        setLoading(false);
      }

      load();
    },
    [page, filter]
  );

  return {
    notifications,
    totalPages: 10,
    loading,
    error
  };
}