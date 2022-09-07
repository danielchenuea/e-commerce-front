import React, { useEffect, useState, useRef } from "react"
import {   
  Grid,
  Card,
  Button,
  Image,
  Group,
  Text,
  useMantineColorScheme,
} from '@mantine/core';

import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';

import { 
  useNavigate
} from  'react-router-dom';

import { lista_produtos } from '../services/products-service.js'

import './MainPage.css'

const MainPage = props => {
  const [data, setData] = useState([]);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  

  const navigate = useNavigate()

  const autoplay = useRef(Autoplay({ delay: 6000 }));

  useEffect(() => {
    // console.log(data.map(console.log(1)))
    lista_produtos().then((res) => (
      // console.log(res)
      setData(res || [])

    ))
  }, [])

  function clickProduct(product){
    navigate("/products/" + product)
  }

  return(
    <div className="mainbody">
      <Grid 
        className="maingrid"
        grow
        columns={4}
        // color={colorScheme}
      >
        <Grid.Col 
          span={4}
          className="banner"
          color={colorScheme}
        >
          <Carousel 
            sx={{ maxWidth: "100%" }} 
            className="carousel"
            slideSize="70%"
            slideGap="xl"
            // mx="auto" 
            color={colorScheme}
            withIndicators 
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            loop
          >
            <Carousel.Slide>
              <img
                src={require("../../assets/carousel1.jpg")}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: 'cover' }}
              />
            </Carousel.Slide>
            <Carousel.Slide>
              <img
                src={require("../../assets/carousel2.jpg")}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: 'cover' }}
              />
            </Carousel.Slide>
            <Carousel.Slide>
              <img
                src={require("../../assets/carousel3.jpg")}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: 'cover' }}
              />
            </Carousel.Slide>
          </Carousel>
        </Grid.Col>
        <Grid.Col
          span={4}
          color={colorScheme}
          // style={{}}
        >
          <p className="produtos">Conheça nossos produtos:</p>
        </Grid.Col>
        {
          data.map(prod => {
            return(
              <Grid.Col 
                className="cell"
                gutter="lg"
                // color = {colorScheme}
                key={prod.id_produto}
                span={1}
              >
                <Card>
                  <Card.Section>
                    <Image 
                      src={require("../../assets/random" + (Math.floor((Math.random() * 5) + 1)) + ".jpg")}
                      height={160}
                      alt={prod.id_produto}
                    />
                  </Card.Section>
                  <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{ prod.titulo } { prod.fornecedor }</Text>
                  </Group>
                  <Text>{prod.descricao}</Text>
                  <Text>Quantidade em estoque: {prod.quantidade_estoque}</Text>
                  <Button onClick={() => {clickProduct(prod.id_produto)}}>Mais informações</Button>
                  {/* </div> */}
                </Card>
              </Grid.Col>
            )
          })
        }
      </Grid>
      {/* <Button onClick={() => {console.log(data)}}></Button> */}
      <div style={{height: "300px"}}></div>
    </div>
  )
}

export default MainPage