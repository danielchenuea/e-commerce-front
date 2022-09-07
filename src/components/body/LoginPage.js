import { useForm } from '@mantine/form';
import { TextInput, Button, Group, Tabs } from '@mantine/core';
import './LoginPage.css'

import { IconUser, IconPlus } from '@tabler/icons';

import { encontrar_usuario, adicionar_usuario } from '../services/user-service.js'

import { useNavigate } from  'react-router-dom';

const LoginPage = props => {

  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      nomecadastro: '',
      emailcadastro: '',
      email: 'adam@teste.com',
    },
    // // functions will be used to validate values at corresponding key
    // validate: {
    //   nomecadastro: (value) => (value.length < 2 ? 'Nome deve ser maior que 2 caracteres' : null),
    //   emailcadastro: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email Invalido'),
    // },
  });

  function cadastrarUser(user){
    const data = {
      "nome": user.nomecadastro,
      "email": user.emailcadastro
    }
    adicionar_usuario(data).then(res => {
      if(res == true){
        navigate(0)
        alert("Sucesso")
      }else{
        alert("Um erro aconteceu!")
      }
    })
  }

  function encontrarUser(user){
    encontrar_usuario(user.email).then(res => {
      if(res){
        localStorage.setItem("email", res.email)
        navigate('/')
        navigate(0)
      }
      console.log(res)
    })
  }

  return (
    <div style={{ maxWidth: 320, margin: 'auto' }}>
      <Tabs color="cyan" defaultValue="login">
        <Tabs.List>
          <Tabs.Tab value="cadastro" icon={<IconPlus size={14} />}>Cadastrar</Tabs.Tab>
          <Tabs.Tab value="login" icon={<IconUser size={14} />}>Login</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="cadastro">
          <p>Cadastro:</p>
          <form onSubmit={form.onSubmit((values) => cadastrarUser(values))}>
            <TextInput label="Nome" placeholder="Nome" {...form.getInputProps('nomecadastro')} />
            <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('emailcadastro')} />

            <Group position="center" mt="xl">
              <Button
                variant="outline"
                type="submit" 
              >
                Criar novo usuario
              </Button>
            </Group>
          </form>
        </Tabs.Panel>


        <Tabs.Panel value="login">
        <p>Login:</p>
          <form onSubmit={form.onSubmit((values) => encontrarUser(values))}>
            <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />

            <Group position="center" mt="xl">
              <Button
                variant="outline"
                type="submit" 
              >
                Login
              </Button>
            </Group>
          </form>
        </Tabs.Panel>
      </Tabs>
    </div>
  )

}

export default LoginPage