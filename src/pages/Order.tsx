import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Order() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      paddingLeft="26px"
      paddingRight="26px"
    >
      <Box display="flex" gap="26px" justifyContent="center" padding="26px">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThovYUNWK2m3sH96jawln8TXHNQO6MXX-Lfw&s"
          alt="pizza"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYeg5c9JjZlCvM276iR71uf5NpmlssqFva-rvuedto1tSspyLrEUHrm-_18qopYiVg33Y&usqp=CAU"
          alt="pizza"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTDLKRNHG2SYgE_r8UceTknvyF9GZ-IME21Q&s"
          alt="pizza"
        />
      </Box>
      <Typography m="10px" variant="body2">
        Популярные ингредиенты для пиццы - начинки классика и экперименты
        Классическая итальянская: моцарелла, помидоры, базилик, оливковое масло.
        Мексиканская острая: говядина, перец чили, лук, перец, моцарелла.
        Гавайская: ветчина, ананас, моцарелла, соус барбекю. Вегетарианская:
        грибы, перцы, лук, оливки, моцарелла, томатный соус.
      </Typography>
    </Box>
  );
}
