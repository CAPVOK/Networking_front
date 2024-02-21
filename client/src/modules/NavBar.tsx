import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Palette,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../core/store";
import {
  clearChat,
  saveTheme,
  saveUserName,
  selectTheme,
  selectUser,
} from "../core/store/slices/app.slice";
import { LogoIcon } from "../components/icons/LogoIcon";
import { ThemeModeSwitch } from "../components/ThemeModeSwitch";
import { useWebSocket } from "../hooks/useWebSocket";

const Wrapper = styled.div<{ theme?: { palette: Palette } }>`
  padding-inline: 15px;
  padding-block: 5px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const NameShaper = styled.h3`
  margin: 0;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 50px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userName = useSelector(selectUser);
  const themeMode = useSelector(selectTheme);

  const { webSocketService } = useWebSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("userName");
    if (!user) return;
    dispatch(saveUserName(user));
    createConnection();

    return () => {
      webSocketService.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createConnection = () => {
    webSocketService.connect();
  };

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("userName");
    dispatch(saveUserName(""));
    dispatch(clearChat());
    webSocketService.disconnect();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const login = (name: string) => {
    if (!name) return;
    localStorage.setItem("userName", name);
    dispatch(saveUserName(name));
    createConnection();
  };

  const handleChangeMode = () => {
    dispatch(saveTheme(themeMode === "dark" ? "light" : "dark"));
  };

  const isCurrentThemeLight = themeMode === "light";

  return (
    <>
      <Wrapper>
        <ImageWrapper>
          <LogoIcon fill="" />
        </ImageWrapper>
        <ButtonsWrapper>
          {userName ? (
            <>
              <NameShaper>{userName}</NameShaper>
              <Button
                color="inherit"
                variant="outlined"
                onClick={handleLogoutClick}
              >
                Выйти
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleLoginClick}
            >
              Войти
            </Button>
          )}
          <ThemeModeSwitch
            setValue={handleChangeMode}
            value={isCurrentThemeLight}
          />
        </ButtonsWrapper>
      </Wrapper>
      <Dialog
        open={isModalOpen}
        onClose={handleModalClose}
        fullWidth
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const name = formJson.login;
            login(name.toString());
            handleModalClose();
          },
        }}
      >
        <DialogTitle>Вход в систему</DialogTitle>
        <DialogContent>
          <DialogContentText>Введите свой логин</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="login"
            label="Логин"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Отменить</Button>
          <Button type="submit">Войти</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export { NavBar };
