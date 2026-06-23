import { useState, useEffect } from "react";
import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";
import { Log } from "../logger";

export function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const {
    notifications,
    totalPages,
    loading,
    error,
  } = useNotifications(page, filter);

  const [viewedIds, setViewedIds] = useState([]);

  useEffect(
    function () {
      const saved =
        localStorage.getItem(
          "viewedNotifications"
        );

      if (saved) {
        setViewedIds(
          JSON.parse(saved)
        );
      }

      Log(
        "frontend",
        "info",
        "page",
        "notifications page loaded"
      );
    },
    []
  );

  function handleFilterChange(
    event,
    newFilter
  ) {
    if (newFilter) {
      setFilter(newFilter);
      setPage(1);

      Log(
        "frontend",
        "info",
        "component",
        "notification filter changed"
      );
    }
  }

  function handlePageChange(
    event,
    newPage
  ) {
    setPage(newPage);

    Log(
      "frontend",
      "info",
      "component",
      "page changed"
    );
  }

  function markViewed(id) {
    let tempList = [...viewedIds];

    let found = false;

    for (
      let i = 0;
      i < tempList.length;
      i++
    ) {
      if (tempList[i] === id) {
        found = true;
      }
    }

    if (!found) {
      tempList.push(id);

      setViewedIds(tempList);

      localStorage.setItem(
        "viewedNotifications",
        JSON.stringify(tempList)
      );
    }
  }

  const unreadCount =
    notifications.length -
    viewedIds.length;

  return (
    <Box
      sx={{
        maxWidth: 720,
        mx: "auto",
        px: 2,
        py: 4,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        mb={3}
      >
        <Badge
          badgeContent={unreadCount}
          color="primary"
          max={99}
        >
          <NotificationsIcon
            sx={{ fontSize: 28 }}
          />
        </Badge>

        <Typography
          variant="h5"
          fontWeight={700}
        >
          Notifications
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ mb: 3 }}>
        <NotificationFilter
          value={filter}
          onChange={
            handleFilterChange
          }
        />
      </Box>

      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          py={6}
        >
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      {!loading &&
        !error &&
        notifications.length === 0 && (
          <Alert severity="info">
            No notifications found
          </Alert>
        )}

      {!loading &&
        !error &&
        notifications.length > 0 && (
          <Stack spacing={2}>
            {notifications.map(
              function (n) {
                let viewed =
                  false;

                for (
                  let i = 0;
                  i <
                  viewedIds.length;
                  i++
                ) {
                  if (
                    viewedIds[i] ===
                    n.ID
                  ) {
                    viewed = true;
                  }
                }

                return (
                  <div
                    key={n.ID}
                    onClick={function () {
                      markViewed(
                        n.ID
                      );
                    }}
                  >
                    <NotificationCard
                      notification={n}
                      viewed={
                        viewed
                      }
                    />
                  </div>
                );
              }
            )}
          </Stack>
        )}

      {!loading && (
        <Box
          display="flex"
          justifyContent="center"
          mt={4}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={
              handlePageChange
            }
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}