import {
  AppBar,
  AppBarProps,
  Toolbar,
  styled,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/useAuth";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AppHeader = () => {
  const HeaderBar = styled(AppBar)<AppBarProps>(({ theme }) => {
    return {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: "black",
      color: "#FFFF",
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    };
  });

  const { dispatch } = useAuth();

  const navigate = useNavigate();

  const logOut = useCallback(() => {
    dispatch({ type: "clear", payload: { authen: "" } });
    navigate("/login");
  }, [dispatch]);
  return (
    <HeaderBar
      position="fixed"
      sx={{
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          minHeight: {
            sx: 56,
            sm: 56,
            md: 56,
            lg: 56,
            xl: 56,
          },
        }}
      >
        <Typography fontSize={16} fontWeight={600} component="div" noWrap>
          Cinemo
        </Typography>
        <Divider
          className="h-full"
          orientation="vertical"
          flexItem
          style={{
            backgroundColor: "white",
            margin: "20px 12px 20px 12px",
          }}
        />
        <Typography
          fontSize={16}
          fontWeight={600}
          component="div"
          flexGrow={1}
          noWrap
        >
          The Best Way To Discover Great Movie To Watch
        </Typography>
        <Typography
          fontSize={14}
          fontWeight={500}
          mr={1}
          component="div"
          noWrap
        >
          Test
        </Typography>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{
            backgroundColor: "#FFFFFF",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        />
        <IconButton
          color="inherit"
          edge="start"
          sx={{ p: 0, ml: 2 }}
          onClick={logOut}
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </HeaderBar>
  );
};
