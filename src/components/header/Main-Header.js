import { useState } from 'react';

import {   
  AppShell,
  ActionIcon,
  Button,
  Menu,
  Header,
  Text,
  useMantineColorScheme,
  Drawer,
  SimpleGrid,
  Card,
  Group
} from '@mantine/core';

import { 
  Routes,
  Route,
  useNavigate
} from  'react-router-dom';

import MainPage from '../body/MainPage';
import LoginPage from '../body/LoginPage';
import ProductPage from '../body/ProductPage';
import InfoPage from '../body/InfoPage';

import { IconInfoCircle, IconMoonStars, IconShoppingCart, IconArrowBarToLeft, IconBrandTabler, IconTrash } from '@tabler/icons';

import { mostrar_carrinho, deletar_item } from '../services/carrinho-service'

import './Main-header.css'

export default function HeaderComponent() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [open, setOpen] = useState(false);
  const [carrinho, setCarrinho] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const dark = colorScheme === 'dark';
  const navigate = useNavigate()

  function gotoInfo(){
    navigate('/info')
  }

  function gotoLogin(){
    navigate('/login')
  }

  function gotoMain(){
    navigate('/')
  }

  function Logout(){
    localStorage.removeItem("email")
    navigate('/login')
    navigate(0)
  }

  function abrirCarrinho(){
    const loginEmail = localStorage.getItem("email")
    mostrar_carrinho({"email": loginEmail}).then((res) => {
      setCarrinho(res || [])
      setProdutos(res.produtos || [])
    })
    setOpen(true)
  }

  function retirarItem(data){
    const loginEmail = localStorage.getItem("email")
    const entrada = {
      "email": loginEmail,
      "id_produto": data
    }
    deletar_item(entrada).then((res) => {
      if(res === true){
        console.log("retirado")
      }
      navigate(0)
    })
  }

  function CartLogged(){
    const loginEmail = localStorage.getItem("email")
    if (loginEmail){
      return (
        <div className='cartIcon'>
          <ActionIcon 
              color={dark ? 'yellow' : 'blue'}
              onClick={() => abrirCarrinho()}
            >
              <IconShoppingCart />
          </ActionIcon>
        </div>
      )
    }
  }

  function Logged(){
    const loginEmail = localStorage.getItem("email")
    if (loginEmail){
      return (
          <div className='userButtonLogin'>
            <Menu>
              <Menu.Target>
                <Button>
                  { loginEmail }
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Account</Menu.Label>
                <Menu.Item onClick={() => {Logout()}} color="red" icon={<IconArrowBarToLeft size={14} />}>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        // </span>
      )
    }else{
      return (
        <div className="userButton">
          <Button variant="default" color="dark" onClick={() => (gotoLogin())}>
            Entrar
          </Button>
        </div>
      )
    }
  }

  return (
    <div>
      <AppShell
        padding="md"
        header={
          <Header height={70} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%', position: 'relative'}}>

              <div className='logo'>
                <Button variant='subtle' className='logo' onClick={() => (gotoMain())} color = {colorScheme} style={{height: '65px'}}>
                  <IconBrandTabler  />
                  <Text className='logoTxt'>
                    E-Commerce Daniel
                  </Text>
                </Button>
              </div>

              <div className='infoButton'>
                <ActionIcon
                  color={dark ? 'yellow' : 'blue'}
                  onClick={() => gotoInfo()}        
                >
                  <IconInfoCircle />
                </ActionIcon>
              </div>
              
              <div className='lightButton'>
                <ActionIcon
                  color={dark ? 'yellow' : 'blue'}
                  onClick={() => toggleColorScheme()}        
                >
                  <IconMoonStars />
                </ActionIcon>
              </div>

              <CartLogged />
              <Logged />

            </div>
          </Header>
        }
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
      >
        <Routes>

          <Route path='/' element={<MainPage />} />

          <Route path='/products/:id' element={<ProductPage />} />

          <Route path='/login' element={<LoginPage />} />

          <Route path='/info' element={<InfoPage />} />

        </Routes>
      </AppShell>

      <Drawer 
        opened={open}
        onClose={() => setOpen(false)}
        title="Carrinho de compras"
        padding="xl"
        size="xl"
        position="right"
      >
        <SimpleGrid cols={1}>
        {
          Object.keys(produtos).map(prod => {
            return(
              <Card shadow="sm" p="lg" radius="md" withBorder key={prod}>
                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>{ produtos[prod].titulo } | Preço: { produtos[prod].quantidade} * { produtos[prod].preço_individual} = {produtos[prod].preço_individual * produtos[prod].quantidade}</Text>
                  <ActionIcon
                    color={'red'}
                    onClick={() => retirarItem(prod)}        
                  >
                    <IconTrash />
                  </ActionIcon>
                </Group>
              </Card>
          )})
        }
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Text> Quantidade de produtos no carrinho: {carrinho.quantidade_produtos} </Text>
          <br />
          <Text> Quantidade de Itens: {carrinho.quantidade_itens} </Text>
          <br />
          <Text> Preço Total: {carrinho.valor_total} </Text>
        </Card>
        </SimpleGrid>
      </Drawer>
    </div>
  );
}

// export default function Header() {
//   return (
//     <p>123456788!</p>
//   );
// }
