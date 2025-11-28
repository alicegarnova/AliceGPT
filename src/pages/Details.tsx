import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { findPizza } from "../helpers/data";

export default function Details() {
  const { id } = useParams();
  const pizza = id ? findPizza(+id) : null;

  if (!pizza) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h5">Pizza not found</Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      paddingLeft="26px"
      paddingRight="26px"
    >
      <Box display="flex" gap="26px" justifyContent="center" padding="26px">
        <img src={pizza.image} alt={pizza.name} />
      </Box>
      <Typography m="10px" variant="body2" fontWeight="bold">
        {pizza.name}
      </Typography>
      <Typography m="10px" variant="body2">
        {pizza.description}
      </Typography>
      <Typography m="10px" variant="body2">
        {pizza.compound}
      </Typography>
      <Typography m="10px" variant="body2">
        {pizza.calorie}
      </Typography>
    </Box>
  );
}
