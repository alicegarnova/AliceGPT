import { useCart } from "../Context/useCart";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function CartIcon() {
  const { getTotalItems } = useCart();

  return (
    <IconButton color="inherit">
      <Badge badgeContent={getTotalItems()} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}
