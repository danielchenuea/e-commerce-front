import React, { useEffect, useState } from "react"

import { 
  Card, 
  Image, 
  Text, 
  Badge, 
  Button, 
  ActionIcon,
  Group,
  Notification,
  Modal
} from '@mantine/core';

import { useCounter } from '@mantine/hooks';

import { useParams } from 'react-router-dom'

import { encontrar_produto } from '../services/products-service.js'
import { mostrar_carrinho, adicionar_item, modificar_item } from '../services/carrinho-service'

import './ProductPage.css'

import { useNavigate } from  'react-router-dom';

import { IconPlus, IconMinus, IconCheck } from '@tabler/icons';

const MainPage = props => {
  const [count, handlers] = useCounter(1, { min: 1, max: 99 });
  const [openModal, setopenModal] = useState(false);
  const { id } = useParams()
  const [data, setData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(require("../../assets/random" + (Math.floor((Math.random() * 5) + 1)) + ".jpg"))

  const navigate = useNavigate()

  useEffect(() => {
    encontrar_produto( id ).then((res) => (
      setData(res)
    ))
  }, [])

  function AdicionarAoCarrinho(){
    const loginEmail = localStorage.getItem("email")
    if (loginEmail){
      mostrar_carrinho({"email": loginEmail}).then((res) => {

        const dataproduto = {
          "email": loginEmail,
          "id_produto": data.id_produto,
          "modo_adicionar": true,
          "quantidade": count
        }

        if(data.id_produto in res.produtos){
          // Existe item no carrinho
          modificar_item(dataproduto).then((res) => {
            if(res === true){
              console.log("adicionado")
            }
            navigate(0)
            setopenModal(true)
          })

        }else{
          // Não tem o item no carrinho
          adicionar_item(dataproduto).then((res) => {
            if(res === true){
              console.log("adicionado")
              navigate(0)
              setopenModal(true)
            }
          })

        }
      })
    }
  }

  function adicionarContador(){
    if(count < data.quantidade_estoque){
      handlers.increment()
    }
  }

  function subtrairContador(){
    handlers.decrement()
  }

  function AddLogged(){
    const loginEmail = localStorage.getItem("email")
    if (loginEmail){
      return (
        <Group style={{marginTop: 200}} position="center">
          <ActionIcon 
            onClick={() => subtrairContador()}
          >
            <IconMinus />
          </ActionIcon>
          <Text>{ count }</Text>
          <ActionIcon 
            onClick={() => adicionarContador()}
          >
            <IconPlus />
          </ActionIcon>
          <Button
            onClick={() => {AdicionarAoCarrinho()}}
          >Adicionar ao Carrinho</Button>
        </Group>
      )
    }else{
      return(
        <div style={{marginTop: 200}}></div>
      )
    }
  }

  return(
    <div className="mainbody">
      <div className="mainbodyproduct">
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
          <Image
            src={currentImageIndex}
            height={160}
            alt={data.id_produto}
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{ data.titulo }</Text>
            <Text weight={500}>Fornecedor: { data.fornecedor }</Text>
            <Badge color="green" variant="light">
              A venda
            </Badge>
          </Group>
          <div className="cellconfig"></div>

          <Text size="sm">Quantidade em estoque: { data.quantidade_estoque }</Text>
          
          <p></p>

          <Text size="sm" color="dimmed" >
          Praesent et urna ac tellus euismod luctus. In hac habitasse platea dictumst. Aenean eget suscipit lorem. Proin in justo ac lorem lobortis eleifend. Quisque vel aliquam felis. Cras interdum est sit amet elit vestibulum, eget hendrerit quam rhoncus. Vivamus eros est, volutpat at consectetur placerat, euismod sed orci. Cras gravida fringilla risus, ut ornare risus laoreet a. Maecenas pellentesque metus ut tempus condimentum. Sed sit amet lectus hendrerit, commodo mi eget, lobortis arcu. Suspendisse et mi imperdiet ex interdum aliquet. Cras sit amet aliquam mi, vel congue ligula. Ut iaculis rutrum vulputate. Vivamus lobortis commodo nibh, a pretium augue posuere quis. Suspendisse nulla nulla, consectetur ut quam sit amet, interdum lobortis ligula. Etiam sodales ipsum orci, ut rhoncus elit hendrerit ut.
          </Text>

          <AddLogged />
        </Card>
        <Modal
          opened={openModal}
          onClose={() => setopenModal(false)}
          title="Produto adicionado!"
        >
          <Notification icon={<IconCheck size={18} />} color="teal" title="Teal notification">
            Adicionado com Sucesso!
          </Notification>
        </Modal>
      </div>
    </div>
  )
}

export default MainPage