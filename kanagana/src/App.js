import { MantineProvider, Button, Container, Group, Title } from '@mantine/core';


function App() {
  return (
    <MantineProvider>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
          background: 'linear-gradient(to bottom,rgb(154, 208, 221),rgb(8, 132, 214))',
        }}
      >
        <Title order={1}>ひらがな</Title>
        <Title order={1}>と</Title>
        <Title order={1}>カタカナ</Title>
      </Container>
    </MantineProvider>
  );
}

export default App;
