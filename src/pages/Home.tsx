import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { DATA } from "../constants";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../Context/useCart";

export default function Home() {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      marginTop="16px"
      marginLeft="14px"
      marginRight="14px"
      justifyContent="center"
    >
      {DATA.map((pizza) => {
        const quantity = getItemQuantity(pizza.id);

        return (
          <Card key={pizza.id} sx={{ maxWidth: "345px", margin: "10px" }}>
            <CardMedia
              sx={{ height: 300 }}
              image={pizza.image}
              title={pizza.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                {pizza.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {pizza.description}
              </Typography>
            </CardContent>
            <CardActions>
              {quantity === 0 ? (
                <Button
                  size="small"
                  color="primary"
                  onClick={() => addToCart(pizza)}
                >
                  add to cart
                </Button>
              ) : (
                <Box display="flex" alignItems="center" gap={1}>
                  <Button
                    size="small"
                    color="success"
                    onClick={() => addToCart(pizza)}
                    variant="outlined"
                  >
                    +
                  </Button>
                  <Typography
                    variant="body2"
                    sx={{ minWidth: "30px", textAlign: "center" }}
                  >
                    {quantity}
                  </Typography>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => removeFromCart(pizza.id)}
                    variant="outlined"
                  >
                    -
                  </Button>
                </Box>
              )}
              <Link to={`/details/${pizza.id}`}>
                <Button size="small" color="primary">
                  More details
                </Button>
              </Link>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
}
