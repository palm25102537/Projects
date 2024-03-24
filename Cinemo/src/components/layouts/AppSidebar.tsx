import { Drawer, List, ListItem, ListItemButton, styled } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const AppSidebar = () => {
  const menu = [
    {
      path: "/",
      label: "Movie Finder",
    },
    {
      path: "/my-favorite-movie",
      label: "My Favorite Movie",
    },
  ];

  const navigate = useNavigate();

  const location = useLocation();

  const [selectedMenu, setSelectedMenu] = useState<string>(location.pathname);

  const onSelectMenu = useCallback(
    (e: string) => {
      navigate(e);
    },
    [navigate]
  );

  useEffect(() => {
    console.log(location);
    setSelectedMenu(() => location.pathname);
  }, [location]);

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "rgba(0,0,0,0.1)",
          },
        }}
      >
        <DrawerHeader />
        <List className="px-2 text-[#f5f5f1]">
          {menu.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => onSelectMenu(item.path)}
                selected={selectedMenu === item.path}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "red",
                    "&:hover": {
                      backgroundColor: "red",
                    },
                  },
                }}
              >
                {item.label}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
