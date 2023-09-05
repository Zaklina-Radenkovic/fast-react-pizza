import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
function Menu() {
  //3. here we call our data
  const menu = useLoaderData();
  // console.log(menu);

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

//1. we define here loader with our api, then we need to set that loader within the component in router (App.js), then we call it in the component
export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
