import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import Logo from "../../assets/Logo.png";
import { FORM_ID, LoginForm } from "./LoginForm";
import { loginFormSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink } from "react-router-dom";

export const LoginView = () => {
  const form = useForm<loginFormSchema>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginFormSchema),
  });

  const handleSubmit = (data: loginFormSchema) => console.log(data);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Stack
        gap={3}
        sx={(theme) => ({
          backgroundColor: theme.palette.action.focus,
          padding: 8,
          borderRadius: 2,
        })}
      >
        <Box display={"flex"} gap={2} justifyContent={"center"}>
          <Avatar variant="square" alt="Taskify logo" src={Logo} />
          <Typography variant="h4">Login</Typography>
        </Box>
        <LoginForm onSubmit={handleSubmit} formContext={form} />
        <Button type="submit" form={FORM_ID} variant="contained">
          Login
        </Button>
        <Button component={NavLink} to={"/register"}>
          Register
        </Button>
      </Stack>
    </Box>
  );
};
